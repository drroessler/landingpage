/** Gesamtprüfung des Auswertungs-PDF: rendert beide maßgeblichen Antwortfälle
 *  und prüft für jeden die geforderte Seitenaufteilung.
 *
 *  Geprüft werden beide Sprachfassungen: englische Texte brechen anders um, das
 *  Dokument muss auch dort genau drei Seiten umfassen.
 *
 *  Aufruf: npm run pdf:check
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dir = mkdtempSync(join(tmpdir(), "reifecheck-"));
const run = (args) => execFileSync("node", args, { stdio: "inherit" });

let failed = 0;
for (const [label, extra] of [
  ["Deutsch · Antworten des Entwurfs", []],
  ["Deutsch · ungünstigster Fall", ["--worst"]],
  ["Englisch · Antworten des Entwurfs", ["--en"]],
  ["Englisch · ungünstigster Fall", ["--en", "--worst"]],
]) {
  const pdf = join(dir, `${extra.join("") || "sample"}.pdf`);
  console.log(`\n── ${label} ─────────────────────────────`);
  try {
    execFileSync("node", ["scripts/render-sample.mjs", pdf, ...extra], { stdio: "pipe" });
    run(["scripts/check-pagination.mjs", pdf, ...extra.filter((a) => a === "--en")]);
  } catch {
    failed++;
  }
}
// Die Vorschau auf der Landingpage ist ein gerendertes Bild der ersten Seite.
// Ändert sich das Dokument, veraltet sie lautlos — deshalb hier der Abgleich.
const preview = "public/reifecheck-auswertung-seite1.jpg";
const quellen = [
  "api/_lib/document.ts",
  "src/reifecheck/copy.ts",
  "src/reifecheck/data.ts",
  "src/reifecheck/geometry.ts",
];
if (!existsSync(preview)) {
  console.log(`\nVorschau fehlt: ${preview} — \`npm run preview:build\` ausführen.`);
  failed++;
} else {
  const alter = statSync(preview).mtimeMs;
  const neuer = quellen.filter((f) => existsSync(f) && statSync(f).mtimeMs > alter);
  if (neuer.length > 0) {
    console.log(`\nVorschau ist älter als ${neuer.join(", ")} — \`npm run preview:build\` ausführen.`);
    failed++;
  }
}

console.log(failed === 0 ? "\nSeitenaufteilung stimmt, Vorschau ist aktuell." : `\n${failed} Punkt(e) offen.`);
process.exit(failed === 0 ? 0 : 1);
