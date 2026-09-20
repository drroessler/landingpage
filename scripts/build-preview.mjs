/** Erzeugt die Miniaturansicht der ersten Seite des Auswertungsdokuments für
 *  die Reifecheck-Sektion der Landingpage.
 *
 *  Warum ein Bild und keine Nachbildung in React: die Vorschau soll zeigen, was
 *  der Interessent tatsächlich bekommt. Eine zweite Implementierung würde mit
 *  jeder Copy-Änderung von der echten Auswertung abweichen, ohne dass es jemand
 *  bemerkt. Hier entsteht das Bild aus demselben renderDocumentHtml().
 *
 *  Aufruf: npm run preview:build      deutsche Fassung
 *          npm run preview:build:en   englische Fassung
 *
 *  Beide Bilder werden gebraucht: die Sektion zeigt im englischen Modus sonst
 *  ein deutsches Blatt und verspricht etwas anderes, als sie liefert.
 *  Benötigt poppler (pdftoppm) — dasselbe Werkzeug wie `npm run pdf:check`.
 */
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync, renameSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "pv-entry.mjs");
writeFileSync(entry, `
import { evaluate } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/evaluate.ts"))};
import { renderDocumentHtml } from ${JSON.stringify(join(process.cwd(), "api/_lib/document.ts"))};
import { renderPdf } from ${JSON.stringify(join(process.cwd(), "api/_lib/pdf.ts"))};
export { evaluate, renderDocumentHtml, renderPdf };`);
const out = join(cache, "pv.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const { evaluate, renderDocumentHtml, renderPdf } = await import(out);

const LANG = process.argv.includes("--en") ? "en" : "de";

// Neutrale Beispielangaben: die Vorschau steht für den Dokumenttyp, nicht für
// einen realen Vorgang. Antworten wie im Gestaltungsentwurf.
const evaluation = evaluate(
  { F1: "b", F2: "b", F3: "c", R1: "c", R2: "b", R3: "b", R4: "a", R5: "b", R6: "b" },
  {
    createdAt: new Date().toISOString(),
    reference: LANG === "en" ? "RC-SAMPLE" : "RC-BEISPIEL",
    lang: LANG,
  },
);
const html = renderDocumentHtml(evaluation, {
  name: LANG === "en" ? "Sample evaluation" : "Beispielauswertung",
  organisation: LANG === "en" ? "Example Organization" : "Musterorganisation",
});

const pdf = join(cache, "preview.pdf");
writeFileSync(pdf, await renderPdf(html, evaluation.reference, LANG));

// 2x der Anzeigebreite (~330 px), damit die Vorschau auf Retina scharf bleibt.
const stem = join(cache, "preview-page");
execFileSync("pdftoppm", ["-jpeg", "-jpegopt", "quality=82", "-f", "1", "-l", "1",
                          "-scale-to-x", "760", "-scale-to-y", "-1", pdf, stem]);

const name = LANG === "en"
  ? "public/reifecheck-auswertung-seite1.en.jpg"
  : "public/reifecheck-auswertung-seite1.jpg";
const target = join(process.cwd(), name);
renameSync(`${stem}-1.jpg`, target);
rmSync(pdf, { force: true });
console.log(`${name} — ${(statSync(target).size / 1024).toFixed(0)} KB`);
