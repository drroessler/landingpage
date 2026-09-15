/** Prüft den Endpunkt gegen erwartbare Fehlbedienung und den Gutfall.
 *  Ohne SMTP-/Notion-Zugangsdaten: der Gutfall muss das PDF erzeugen und dann
 *  am Versand scheitern (502) — das ist hier das erwartete Ergebnis.
 *
 *  Aufruf: node scripts/test-endpoint.mjs
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "handler-entry.mjs");
writeFileSync(entry, `export { default as handler } from ${JSON.stringify(join(process.cwd(), "api/reifecheck.ts"))};`);
const out = join(cache, "handler.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const { handler } = await import(out);

const GOOD = { F1: "b", F2: "b", F3: "c", R1: "c", R2: "b", R3: "b", R4: "a", R5: "b", R6: "b" };
const contact = { name: "Testperson Muster", email: "test@example.invalid",
                  organisation: "Beispiel GmbH", role: "Bereichsleitung", consent: true };

function res() {
  const r = { code: 0, body: null, headers: {} };
  r.status = (c) => { r.code = c; return r; };
  r.json = (b) => { r.body = b; return r; };
  r.end = () => r;
  r.setHeader = (k, v) => { r.headers[k] = v; };
  return r;
}

process.env.ALLOWED_ORIGINS = "https://www.narratec.io";
const OK_ORIGIN = { origin: "https://www.narratec.io" };

const cases = [
  ["GET statt POST", { method: "GET", headers: {}, body: {} }, 405],
  ["fehlende Einwilligung", { method: "POST", headers: OK_ORIGIN,
      body: { contact: { ...contact, consent: false }, answers: GOOD } }, 400],
  ["ungültige E-Mail", { method: "POST", headers: OK_ORIGIN,
      body: { contact: { ...contact, email: "keine-adresse" }, answers: GOOD } }, 400],
  ["unvollständige Antworten", { method: "POST", headers: OK_ORIGIN,
      body: { contact, answers: { ...GOOD, R4: undefined } } }, 400],
  ["unbekannte Antwortoption", { method: "POST", headers: OK_ORIGIN,
      body: { contact, answers: { ...GOOD, R2: "z" } } }, 400],
  ["Honigtopf gefüllt", { method: "POST", headers: OK_ORIGIN,
      body: { contact: { ...contact, website: "spam" }, answers: GOOD } }, 400],
  ["fremde Herkunft", { method: "POST", headers: { origin: "https://boese.example" },
      body: { contact, answers: GOOD } }, 403],
  ["Gutfall (ohne SMTP → 502 nach PDF)", { method: "POST",
      headers: { origin: "https://www.narratec.io" },
      body: { contact, answers: GOOD, createdAt: new Date().toISOString(), reference: "RC-TEST-0001" } }, 502],
];

let failed = 0;
for (const [name, req, expected] of cases) {
  const r = res();
  try {
    await handler(req, r);
  } catch (e) {
    console.log(`  FEHLER  ${name}: ${e.message}`); failed++; continue;
  }
  const ok = r.code === expected;
  if (!ok) failed++;
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${name.padEnd(38)} ${r.code} (erwartet ${expected})` +
              (r.body?.error ? `  „${r.body.error}"` : ""));
}
console.log(failed === 0 ? "\nAlle Fälle wie erwartet." : `\n${failed} Fall/Fälle abweichend.`);
process.exit(failed === 0 ? 0 : 1);
