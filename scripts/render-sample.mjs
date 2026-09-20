/** Erzeugt ein Beispiel-PDF zur Sichtprüfung des Layouts nach Änderungen an
 *  Copy oder Gestaltung.
 *
 *    node scripts/render-sample.mjs [ziel.pdf]           Antworten wie im Entwurf
 *    node scripts/render-sample.mjs [ziel.pdf] --worst   längstmögliche Antworten
 *    node scripts/render-sample.mjs [ziel.pdf] --en      englische Fassung
 *
 *  Die Seitenhöhe hängt davon ab, welche Optionen gewählt wurden: längere
 *  Antworttexte und Statements brauchen mehr Zeilen. Das Dokument soll für JEDE
 *  Kombination drei Seiten umfassen — maßgeblich ist deshalb `--worst`.
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Das Bündel muss im Projekt liegen, sonst findet Node die externen Pakete nicht.
const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "entry.mjs");
writeFileSync(
  entry,
  `import { evaluate } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/evaluate.ts"))};
   import { renderDocumentHtml } from ${JSON.stringify(join(process.cwd(), "api/_lib/document.ts"))};
   import { renderPdf } from ${JSON.stringify(join(process.cwd(), "api/_lib/pdf.ts"))};
   export { evaluate, renderDocumentHtml, renderPdf };`,
);

const out = join(cache, "bundle.mjs");
await build({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  outfile: out,
  packages: "external",
});

const { evaluate, renderDocumentHtml, renderPdf } = await import(out);

// Dieselben Antworten wie im Gestaltungsentwurf …
let answers = { F1: "b", F2: "b", F3: "c", R1: "c", R2: "b", R3: "b", R4: "a", R5: "b", R6: "b" };

// … oder der ungünstigste Fall aus scripts/worst-case.json. Welche Option den
// höchsten Block ergibt, lässt sich nicht an der Textlänge ablesen — Frage und
// Einordnung stehen in verschiedenen Spalten, die höhere bestimmt die Zeile.
// Die Datei erzeugt `node scripts/worst-case.mjs`.
const lang = process.argv.includes("--en") ? "en" : "de";

if (process.argv.includes("--worst")) {
  const file = new URL(lang === "en" ? "worst-case.en.json" : "worst-case.json", import.meta.url);
  if (!existsSync(file)) {
    console.error(`${file.pathname.split("/").pop()} fehlt — erst \`node scripts/worst-case.mjs${lang === "en" ? " --en" : ""}\` laufen lassen.`);
    process.exit(1);
  }
  answers = JSON.parse(readFileSync(file, "utf8")).answers;
  console.log("ungünstigster Fall:", Object.entries(answers).map(([k, v]) => k + v).join(" "));
}
const ev = evaluate(answers, { createdAt: new Date().toISOString(), reference: "RC-MUST-ER01", lang });
const html = renderDocumentHtml(ev, {
  name: lang === "en" ? "Sample Recipient" : "Beispiel Empfänger",
  organisation: lang === "en" ? "Example Ltd" : "Beispiel GmbH",
});

const target = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "reifecheck-beispiel.pdf";
writeFileSync(target.replace(/\.pdf$/, ".html"), html);
const pdf = await renderPdf(html, ev.reference, lang);
writeFileSync(target, pdf);
console.log(`${target} — ${(pdf.length / 1024).toFixed(0)} KB, Sprache ${lang}, Stufen ${ev.stufen.join("-")}`);
