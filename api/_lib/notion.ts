/** Ablage von Kontakt und Auswertung in einer Notion-Datenbank.
 *
 *  Die Eigenschaften der Zieldatenbank werden zur Laufzeit gelesen und nur
 *  gesetzt, wenn sie dort existieren und vom passenden Typ sind. So bricht die
 *  Ablage nicht ab, wenn in Notion eine Spalte umbenannt oder entfernt wird —
 *  sie fällt dann nur weg. Die vollständige Auswertung steht ohnehin im
 *  Seiteninhalt.
 */

import { Client } from "@notionhq/client";
import { formatDate } from "../../src/reifecheck/evaluate";
import type { Contact, EvaluatedAnswer, Evaluation } from "../../src/reifecheck/types";

/** Spaltennamen der Notion-Datenbank. Siehe api/README.md für das Schema. */
const P = {
  name: "Name",
  email: "E-Mail",
  organisation: "Organisation",
  role: "Funktion",
  date: "Datum",
  reference: "Kennung",
  source: "Quelle",
  status: "Status",
  stufen: "Stufen",
} as const;

type PropMap = Record<string, { type: string }>;

/** Alle Spalten, die diese Ablage füllen kann — für die Schemaprüfung im Skript. */
export const EXPECTED_COLUMNS: string[] = [
  ...Object.values(P),
  "F1", "F2", "F3",
  "R1", "R2", "R3", "R4", "R5", "R6",
];

function text(content: string) {
  return [{ type: "text" as const, text: { content: content.slice(0, 2000) } }];
}

function paragraph(content: string) {
  return {
    object: "block" as const,
    type: "paragraph" as const,
    paragraph: { rich_text: text(content) },
  };
}

function heading(level: 2 | 3, content: string) {
  return level === 2
    ? { object: "block" as const, type: "heading_2" as const, heading_2: { rich_text: text(content) } }
    : { object: "block" as const, type: "heading_3" as const, heading_3: { rich_text: text(content) } };
}

function divider() {
  return { object: "block" as const, type: "divider" as const, divider: {} };
}

function callout(content: string) {
  return {
    object: "block" as const,
    type: "callout" as const,
    callout: { rich_text: text(content), icon: { type: "emoji" as const, emoji: "📐" } },
  };
}

/** Ein Antwortblock als Notion-Blöcke: Frage, gewählte Antwort, Einordnung. */
function answerBlocks(a: EvaluatedAnswer) {
  const stufe = a.stufe === undefined ? "" : ` · Stufe ${a.stufe}/3`;
  return [
    heading(3, `${a.id} — ${a.axis}${stufe}`),
    {
      object: "block" as const,
      type: "quote" as const,
      quote: { rich_text: text(`${a.prompt}\nAntwort (${a.optionKey}): ${a.optionLabel}`) },
    },
    paragraph(a.statement),
  ];
}

function buildProperties(props: PropMap, contact: Contact, evaluation: Evaluation) {
  const out: Record<string, unknown> = {};

  const has = (key: string, ...types: string[]) =>
    props[key] !== undefined && types.includes(props[key].type);

  // Der Titel ist die einzige Pflichteigenschaft. Heißt er anders, wird die
  // vorhandene title-Spalte gesucht, damit die Seite nicht namenlos bleibt.
  const titleKey =
    props[P.name]?.type === "title"
      ? P.name
      : Object.keys(props).find((k) => props[k].type === "title");
  if (titleKey) out[titleKey] = { title: text(contact.name) };

  if (has(P.email, "email")) out[P.email] = { email: contact.email };
  else if (has(P.email, "rich_text")) out[P.email] = { rich_text: text(contact.email) };

  if (has(P.organisation, "rich_text")) out[P.organisation] = { rich_text: text(contact.organisation) };
  else if (has(P.organisation, "select") && contact.organisation)
    out[P.organisation] = { select: { name: contact.organisation.slice(0, 100) } };

  if (contact.role && has(P.role, "rich_text")) out[P.role] = { rich_text: text(contact.role) };

  if (has(P.date, "date")) out[P.date] = { date: { start: evaluation.createdAt } };
  if (has(P.reference, "rich_text")) out[P.reference] = { rich_text: text(evaluation.reference) };
  if (has(P.source, "select")) out[P.source] = { select: { name: "Reifecheck" } };
  if (has(P.status, "select")) out[P.status] = { select: { name: "Neu" } };
  else if (has(P.status, "status")) out[P.status] = { status: { name: "Neu" } };
  if (has(P.stufen, "rich_text")) out[P.stufen] = { rich_text: text(evaluation.stufen.join("-")) };

  // Je Frage eine Spalte, falls angelegt: F1..F3 als Auswahl, R1..R6 als Zahl.
  for (const a of evaluation.context) {
    if (has(a.id, "select")) out[a.id] = { select: { name: `${a.optionKey}) ${a.optionLabel}`.slice(0, 100) } };
    else if (has(a.id, "rich_text")) out[a.id] = { rich_text: text(a.optionLabel) };
  }
  for (const a of evaluation.reife) {
    if (has(a.id, "number")) out[a.id] = { number: a.stufe };
    else if (has(a.id, "select")) out[a.id] = { select: { name: `Stufe ${a.stufe}` } };
    else if (has(a.id, "rich_text")) out[a.id] = { rich_text: text(`Stufe ${a.stufe} — ${a.optionLabel}`) };
  }

  return out;
}


export interface NotionEnv {
  token: string;
  databaseId: string;
}

export function readNotionEnv(): NotionEnv {
  const missing = ["NOTION_TOKEN", "NOTION_DATABASE_ID"].filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Notion nicht konfiguriert, es fehlen: ${missing.join(", ")}`);
  }
  return { token: process.env.NOTION_TOKEN!, databaseId: process.env.NOTION_DATABASE_ID! };
}

/** Notion meldet eine Kennung als unbekannt — sie gehört zu einem anderen Typ,
 *  ist falsch, oder die Integration ist nicht freigegeben. */
function isMissing(err: unknown): boolean {
  const code = (err as { code?: string } | null)?.code;
  return code === "object_not_found" || code === "validation_error";
}

/** Die Datenquelle zur konfigurierten Kennung finden.
 *  Exportiert, weil `scripts/test-notion.mjs` damit das Schema abgleicht.
 *
 *  Seit der Notion-Version 2025-09-03 hängen die Eigenschaften nicht mehr an der
 *  Datenbank, sondern an einer Datenquelle darunter — eine Datenbank kann mehrere
 *  haben. `NOTION_DATABASE_ID` darf beides bezeichnen: in der Notion-URL steht die
 *  Datenbank, aus einer Freigabe kann aber auch eine Datenquellen-Kennung stammen.
 *  Erst wird die Datenbank gelesen, und wenn darunter keine liegt, die Kennung
 *  selbst als Datenquelle versucht.
 */
export async function resolveDataSource(
  notion: Client,
  configured: string,
): Promise<{ id: string; properties: PropMap }> {
  let dataSourceId = configured;

  try {
    const db = await notion.databases.retrieve({ database_id: configured });
    const sources = "data_sources" in db ? db.data_sources : [];
    if (sources.length === 0) {
      throw new Error(`Die Notion-Datenbank ${configured} enthält keine Datenquelle.`);
    }
    // Mehrere Datenquellen sind der Sonderfall; ohne weitere Angabe ist die erste gemeint.
    dataSourceId = sources[0].id;
  } catch (err) {
    if (!isMissing(err)) throw err;
    // Keine Datenbank unter dieser Kennung — unten als Datenquelle versuchen.
  }

  try {
    const source = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
    if (!("properties" in source)) {
      throw new Error(`Die Notion-Datenquelle ${dataSourceId} liefert keine Eigenschaften.`);
    }
    return { id: dataSourceId, properties: source.properties as unknown as PropMap };
  } catch (err) {
    if (!isMissing(err)) throw err;
    throw new Error(
      `Notion kennt ${configured} weder als Datenbank noch als Datenquelle. ` +
        "NOTION_DATABASE_ID prüfen und die Integration über „… → Verbindungen“ " +
        "auf der Datenbank freigeben.",
    );
  }
}

export async function storeInNotion(
  env: NotionEnv,
  contact: Contact,
  evaluation: Evaluation,
): Promise<string> {
  const notion = new Client({ auth: env.token });
  const source = await resolveDataSource(notion, env.databaseId);

  const children = [
    callout(
      `Reifecheck vom ${formatDate(evaluation.createdAt)} · Kennung ${evaluation.reference} · ` +
        `Stufen ${evaluation.stufen.join("-")} (Analysetiefe, Verantwortung, Beteiligung, Rückmeldung, Freigabe, Annahmen)`,
    ),
    heading(2, "Status und Kontext"),
    ...evaluation.context.flatMap(answerBlocks),
    divider(),
    heading(2, "Die sechs Reifedimensionen"),
    ...evaluation.reife.flatMap(answerBlocks),
    divider(),
    paragraph(
      "Regelbasiert erzeugt: jede Antwortoption gibt einen vorher formulierten Text aus. " +
        "Es wird nicht gerechnet und nicht gewichtet, kein Sprachmodell ist beteiligt.",
    ),
  ];

  const page = (await notion.pages.create({
    parent: { type: "data_source_id", data_source_id: source.id },
    properties: buildProperties(source.properties, contact, evaluation) as never,
    children: children as never,
  })) as { id: string };

  return page.id;
}
