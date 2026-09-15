/** Prüft die Notion-Ablage allein — ohne PDF, ohne Mailversand.
 *
 *  Legt eine echte Testseite in der konfigurierten Datenbank an und meldet,
 *  welche Spalten erkannt und welche übersprungen wurden. Gibt es eine
 *  Datei-Spalte, wird auch das echte PDF erzeugt und hochgeladen. Die Seite darf
 *  danach gelöscht werden; sie trägt die Kennung RC-TEST-0001.
 *
 *  Aufruf:
 *    npm run notion:test              Schema zeigen und Testseite anlegen
 *    npm run notion:test -- --schema  nur das Schema abgleichen, nichts schreiben
 *
 *  Die Zugangsdaten kommen aus der Umgebung oder einer lokalen .env.
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Eine lokale .env mitnehmen, falls vorhanden — sie ist von git ausgeschlossen.
try {
  process.loadEnvFile(".env");
} catch {
  /* keine .env vorhanden, dann zählt nur die Umgebung */
}

for (const k of ["NOTION_TOKEN", "NOTION_DATABASE_ID"]) {
  if (!process.env[k]) {
    console.error(`${k} fehlt. Aufruf: NOTION_TOKEN=… NOTION_DATABASE_ID=… node scripts/test-notion.mjs`);
    process.exit(1);
  }
}

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "notion-entry.mjs");
writeFileSync(
  entry,
  `export { storeInNotion, readNotionEnv, resolveDataSource, EXPECTED_COLUMNS } from ${JSON.stringify(join(process.cwd(), "api/_lib/notion.ts"))};\n` +
    `export { renderDocumentHtml } from ${JSON.stringify(join(process.cwd(), "api/_lib/document.ts"))};\n` +
    `export { renderPdf, pdfFilename } from ${JSON.stringify(join(process.cwd(), "api/_lib/pdf.ts"))};\n` +
    `export { evaluate } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/evaluate.ts"))};`,
);
const out = join(cache, "notion-test.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const { storeInNotion, readNotionEnv, resolveDataSource, EXPECTED_COLUMNS, evaluate,
        renderDocumentHtml, renderPdf, pdfFilename } = await import(out);

const env = readNotionEnv();

// Erst zeigen, was die Datenbank anbietet. Eine Spalte, die hier fehlt, wird beim
// Anlegen stillschweigend übersprungen — in Notion sieht man ihr das nicht an.
const { Client } = await import("@notionhq/client");
const source = await resolveDataSource(new Client({ auth: env.token }), env.databaseId);
const vorhanden = EXPECTED_COLUMNS.filter((c) => source.properties[c] !== undefined);
const fehlend = EXPECTED_COLUMNS.filter((c) => source.properties[c] === undefined);

console.log(`    Datenquelle ${source.id}`);
console.log(`ok  ${vorhanden.length} von ${EXPECTED_COLUMNS.length} Spalten erkannt:`);
for (const c of vorhanden) console.log(`      ${c.padEnd(14)} ${source.properties[c].type}`);
if (fehlend.length > 0) {
  console.log(`    ${fehlend.length} übersprungen (in Notion nicht vorhanden oder anders benannt):`);
  console.log(`      ${fehlend.join(", ")}`);
  console.log("    Das ist kein Fehler — fehlende Spalten fallen weg, die vollständige");
  console.log("    Auswertung steht im Seiteninhalt. Namen: api/_lib/notion.ts unter P.");
}

const unbekannt = Object.keys(source.properties).filter((k) => !EXPECTED_COLUMNS.includes(k));
if (unbekannt.length > 0) {
  console.log(`    In Notion zusätzlich vorhanden, wird nicht gefüllt: ${unbekannt.join(", ")}`);
}

if (process.argv.includes("--schema")) {
  console.log("    --schema: es wurde nichts geschrieben.");
  process.exit(0);
}

const answers = { F1: "b", F2: "b", F3: "c", R1: "c", R2: "b", R3: "b", R4: "a", R5: "b", R6: "b" };
const contact = {
  name: "Testperson Muster",
  email: "test@example.invalid",
  organisation: "Beispiel GmbH",
  role: "Bereichsleitung",
  consent: true,
};
const evaluation = evaluate(answers, {
  createdAt: new Date().toISOString(),
  reference: "RC-TEST-0001",
});

// Gibt es eine Datei-Spalte, gehört das echte Dokument dazu — sonst prüft der
// Lauf den Upload nicht mit.
let pdf;
if (source.properties["Reifecheck"]?.type === "files") {
  const bytes = await renderPdf(
    renderDocumentHtml(evaluation, { name: contact.name, organisation: contact.organisation }),
    evaluation.reference,
  );
  pdf = { content: bytes, filename: pdfFilename(evaluation.reference) };
  console.log(`ok  PDF erzeugt (${(bytes.length / 1024).toFixed(0)} kB), wird hochgeladen`);
}

try {
  const pageId = await storeInNotion(env, contact, evaluation, pdf);
  console.log(`ok  Seite angelegt: ${pageId}`);
  console.log(`    https://www.notion.so/${pageId.replace(/-/g, "")}`);
  console.log("    Inhalt prüfen, dann löschen — die Seite ist nur ein Test.");
} catch (err) {
  console.error("Ablage fehlgeschlagen:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
}
