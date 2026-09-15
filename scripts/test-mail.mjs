/** Prüft den Mailweg — erst die Zugangsdaten, auf Wunsch die ganze Kette.
 *
 *  Ohne Zieladresse wird nur die SMTP-Verbindung geprüft, es geht nichts raus:
 *
 *    npm run mail:test
 *
 *  Mit Zieladresse wird die vollständige Auswertung erzeugt (Chromium, PDF) und
 *  wirklich versendet — dieselbe Mail, die ein Interessent bekommt:
 *
 *    npm run mail:test -- dein.name@example.com
 *
 *  Die SMTP_*-Variablen kommen aus der Umgebung. Nie ins Repo schreiben; für den
 *  lokalen Gebrauch gehören sie in die (ignorierte) .env oder in die Shell.
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import nodemailer from "nodemailer";

// Eine lokale .env mitnehmen, falls vorhanden — sie ist von git ausgeschlossen.
try {
  process.loadEnvFile(".env");
} catch {
  /* keine .env vorhanden, dann zählt nur die Umgebung */
}

const to = process.argv[2];

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "mail-entry.mjs");
writeFileSync(
  entry,
  `export { readMailEnv, sendEvaluation } from ${JSON.stringify(join(process.cwd(), "api/_lib/mail.ts"))};\n` +
    `export { renderDocumentHtml } from ${JSON.stringify(join(process.cwd(), "api/_lib/document.ts"))};\n` +
    `export { renderPdf, pdfFilename } from ${JSON.stringify(join(process.cwd(), "api/_lib/pdf.ts"))};\n` +
    `export { evaluate } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/evaluate.ts"))};`,
);
const out = join(cache, "mail-test.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const { readMailEnv, sendEvaluation, renderDocumentHtml, renderPdf, pdfFilename, evaluate } =
  await import(out);

let env;
try {
  env = readMailEnv();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  console.error("Beispiel: SMTP_HOST=smtp.migadu.com SMTP_PORT=465 SMTP_USER=… SMTP_PASS=… SMTP_FROM=… npm run mail:test");
  process.exit(1);
}
console.log(`    ${env.user} über ${env.host}:${env.port}${env.bcc ? `, Blindkopie an ${env.bcc}` : ", ohne Blindkopie"}`);

// Anmeldung prüfen, bevor irgendetwas gerendert wird.
try {
  const probe = nodemailer.createTransport({
    host: env.host, port: env.port, secure: env.port === 465,
    auth: { user: env.user, pass: env.pass },
  });
  await probe.verify();
  console.log("ok  SMTP-Anmeldung erfolgreich");
} catch (err) {
  console.error("Anmeldung fehlgeschlagen:", err instanceof Error ? err.message : err);
  process.exit(1);
}

if (!to) {
  console.log("    Kein Empfänger angegeben — es wurde nichts versendet.");
  console.log("    Vollständiger Durchlauf: npm run mail:test -- dein.name@example.com");
  process.exit(0);
}

const answers = { F1: "b", F2: "b", F3: "c", R1: "c", R2: "b", R3: "b", R4: "a", R5: "b", R6: "b" };
const contact = { name: "Testperson Muster", email: to, organisation: "Beispiel GmbH",
                  role: "Bereichsleitung", consent: true };
const evaluation = evaluate(answers, { createdAt: new Date().toISOString(), reference: "RC-TEST-0001" });

const pdf = await renderPdf(
  renderDocumentHtml(evaluation, { name: contact.name, organisation: contact.organisation }),
  evaluation.reference,
);
console.log(`ok  PDF erzeugt (${(pdf.length / 1024).toFixed(0)} kB)`);

await sendEvaluation(env, contact, evaluation, pdf, pdfFilename(evaluation.reference));
console.log(`ok  Versendet an ${to}`);
console.log("    Prüfen: Anhang hat drei Seiten, Absender stimmt, Mail liegt nicht im Spam.");
