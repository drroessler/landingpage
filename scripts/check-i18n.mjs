/** Vergleicht die deutsche und die englische Fassung des Fragenkatalogs.
 *
 *  Die Auswertung rechnet mit Kennungen und Optionsschlüsseln, nicht mit dem
 *  Wortlaut: F1..R6 und a/b/c/d müssen in beiden Sprachen dieselben sein, und
 *  jede Option muss dieselbe Stufe tragen. Läuft das auseinander, bekäme ein
 *  englischer Durchlauf eine andere Bewertung als derselbe deutsche — oder die
 *  Antwort ließe sich gar nicht mehr zuordnen.
 *
 *  Prüft außerdem, dass kein Text unübersetzt geblieben ist.
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "i18n-entry.mjs");
writeFileSync(entry,
  `export { ALL_QUESTIONS, REIFE_AXES, UMSETZUNG_AXES } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/data.ts"))};\n` +
  `export { ALL_QUESTIONS_EN, REIFE_AXES_EN, UMSETZUNG_AXES_EN } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/data.en.ts"))};`);
const out = join(cache, "i18n.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const M = await import(out);

const fehler = [];
const de = M.ALL_QUESTIONS, en = M.ALL_QUESTIONS_EN;

if (de.length !== en.length) fehler.push(`Anzahl der Fragen: de ${de.length}, en ${en.length}`);

for (let i = 0; i < Math.min(de.length, en.length); i++) {
  const d = de[i], e = en[i];
  if (d.id !== e.id) { fehler.push(`Position ${i + 1}: Kennung de "${d.id}" ≠ en "${e.id}"`); continue; }
  const dk = d.options.map((o) => o.key).join(",");
  const ek = e.options.map((o) => o.key).join(",");
  if (dk !== ek) fehler.push(`${d.id}: Optionsschlüssel de [${dk}] ≠ en [${ek}]`);
  for (const o of d.options) {
    const g = e.options.find((x) => x.key === o.key);
    if (g && o.stufe !== g.stufe) fehler.push(`${d.id} ${o.key}: Stufe de ${o.stufe} ≠ en ${g.stufe}`);
  }
  // Unübersetzt Gebliebenes fällt dadurch auf, dass der Text wörtlich gleich ist.
  if (d.prompt === e.prompt) fehler.push(`${d.id}: Frage ist in beiden Fassungen gleich — übersetzt?`);
  for (const o of d.options) {
    const g = e.options.find((x) => x.key === o.key);
    if (g && o.statement === g.statement) fehler.push(`${d.id} ${o.key}: Auswertungstext unübersetzt`);
  }
}

if (M.REIFE_AXES.length !== M.REIFE_AXES_EN.length)
  fehler.push("Achsenzahl von Diagramm 1 unterschiedlich");
if (M.UMSETZUNG_AXES.length !== M.UMSETZUNG_AXES_EN.length)
  fehler.push("Achsenzahl von Diagramm 2 unterschiedlich");

if (fehler.length > 0) {
  console.error("Deutsche und englische Fassung passen nicht zusammen:\n");
  for (const f of fehler) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`Sprachfassungen stimmen überein (${de.length} Fragen, ${de.reduce((n, q) => n + q.options.length, 0)} Antwortoptionen).`);
