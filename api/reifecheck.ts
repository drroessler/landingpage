/** POST /api/reifecheck
 *
 *  Nimmt die neun Antworten und die Kontaktdaten entgegen, wertet regelbasiert
 *  aus, rendert das PDF, verschickt es und legt den Vorgang samt Dokument in
 *  Notion ab.
 *
 *  Die Auswertung wird hier aus den Antworten NEU berechnet. Was der Browser an
 *  Statements angezeigt hat, wird nicht übernommen — sonst könnte man den Inhalt
 *  des Dokuments von außen bestimmen.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { evaluate, isComplete, missingAnswers } from "../src/reifecheck/evaluate.js";
import type { Answers, CompleteAnswers, Contact, Lang } from "../src/reifecheck/types.js";
import { renderDocumentHtml } from "./_lib/document.js";
import { pdfFilename, renderPdf } from "./_lib/pdf.js";
import { readMailEnv, sendEvaluation } from "./_lib/mail.js";
import { readNotionEnv, storeInNotion } from "./_lib/notion.js";

export const config = { maxDuration: 60 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Herkunft prüfen: der Fragebogen läuft auf der eigenen Seite. */
function originAllowed(req: VercelRequest): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true; // nicht konfiguriert: nicht blockieren
  const origin = (req.headers.origin as string) || "";
  const referer = (req.headers.referer as string) || "";
  return allowed.some((a) => origin === a || referer.startsWith(a));
}

interface Body {
  contact?: Partial<Contact> & { website?: string };
  answers?: Answers;
  createdAt?: string;
  reference?: string;
  lang?: string;
}

function validate(body: Body): { error: string } | { contact: Contact; answers: CompleteAnswers } {
  const c = body.contact ?? {};
  // Honigtopf: ein für Menschen unsichtbares Feld. Ist es gefüllt, war es ein Bot.
  if (typeof c.website === "string" && c.website.trim() !== "") {
    return { error: "abgelehnt" };
  }
  const name = String(c.name ?? "").trim();
  const email = String(c.email ?? "").trim();
  const organisation = String(c.organisation ?? "").trim();
  const role = String(c.role ?? "").trim();

  if (!name) return { error: "Name fehlt." };
  if (!EMAIL_RE.test(email)) return { error: "E-Mail-Adresse ist ungültig." };
  if (!organisation) return { error: "Organisation fehlt." };
  if (c.consent !== true) return { error: "Ohne Einwilligung erfolgt keine Verarbeitung." };
  if (name.length > 120 || email.length > 200 || organisation.length > 200 || role.length > 200) {
    return { error: "Eingaben zu lang." };
  }

  const answers = (body.answers ?? {}) as Answers;
  if (!isComplete(answers)) {
    return { error: `Unvollständig: ${missingAnswers(answers).join(", ")}` };
  }

  return { contact: { name, email, organisation, role, consent: true }, answers };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST." });
  }
  if (!originAllowed(req)) {
    return res.status(403).json({ error: "Herkunft nicht erlaubt." });
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as Body;
  const checked = validate(body);
  if ("error" in checked) {
    return res.status(400).json({ error: checked.error });
  }
  const { contact, answers } = checked;

  // Zeitstempel und Kennung kommen vom Browser, damit Bildschirm, PDF und Notion
  // dieselbe Auswertung bezeichnen. Beide werden auf Plausibilität geprüft.
  const createdAt =
    typeof body.createdAt === "string" && !Number.isNaN(Date.parse(body.createdAt))
      ? body.createdAt
      : new Date().toISOString();
  const reference =
    typeof body.reference === "string" && /^RC-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(body.reference)
      ? body.reference
      : undefined;

  // Sprache des Fragebogens: bestimmt Dokument und Begleitmail. Alles außer
  // "en" gilt als Deutsch — ein unbekannter Wert darf keinen Fehler auslösen.
  const lang: Lang = body.lang === "en" ? "en" : "de";

  const evaluation = evaluate(answers, { createdAt, reference, lang });

  let pdf: Buffer;
  try {
    const html = renderDocumentHtml(evaluation, {
      name: contact.name,
      organisation: contact.organisation,
    });
    pdf = await renderPdf(html, evaluation.reference, lang);
  } catch (err) {
    console.error("[reifecheck] PDF fehlgeschlagen", evaluation.reference, err);
    return res.status(500).json({ error: "Das Dokument konnte nicht erzeugt werden." });
  }

  // Der Versand ist der Teil, den der Interessent bemerkt — er entscheidet über
  // den Statuscode. Die Notion-Ablage läuft daneben; scheitert sie, ist der
  // Vorgang über die Blindkopie an das eigene Postfach trotzdem nicht verloren.
  let mailed = false;
  try {
    await sendEvaluation(readMailEnv(), contact, evaluation, pdf, pdfFilename(evaluation.reference));
    mailed = true;
  } catch (err) {
    console.error("[reifecheck] Mailversand fehlgeschlagen", evaluation.reference, err);
  }

  let notionPageId: string | null = null;
  try {
    notionPageId = await storeInNotion(readNotionEnv(), contact, evaluation, {
      content: pdf,
      filename: pdfFilename(evaluation.reference),
    });
  } catch (err) {
    console.error("[reifecheck] Notion-Ablage fehlgeschlagen", evaluation.reference, err);
  }

  if (!mailed) {
    return res
      .status(502)
      .json({ error: "Die Auswertung konnte nicht versendet werden.", reference: evaluation.reference, stored: Boolean(notionPageId) });
  }

  return res.status(200).json({
    ok: true,
    reference: evaluation.reference,
    stored: Boolean(notionPageId),
  });
}
