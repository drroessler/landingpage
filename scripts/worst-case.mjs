/** Ermittelt die tatsächlich höchste Antwortkombination.
 *
 *  Die Höhe eines Antwortblocks ist das Maximum aus linker Spalte (Frage und
 *  gewählte Option) und rechter Spalte (Einordnung) — Textlänge allein sagt sie
 *  deshalb nicht voraus. Dieses Skript rendert JEDE Option einzeln, misst sie und
 *  baut daraus den ungünstigsten Fall.
 *
 *  Aufruf: node scripts/worst-case.mjs
 */
import { build } from "esbuild";
import { writeFileSync, mkdirSync } from "node:fs";

/** Sprache der Messung: `node scripts/worst-case.mjs --en` misst die englische Fassung. */
const LANG = process.argv.includes("--en") ? "en" : "de";
import { join } from "node:path";

const cache = join(process.cwd(), "node_modules/.cache/reifecheck");
mkdirSync(cache, { recursive: true });
const entry = join(cache, "wc-entry.mjs");
writeFileSync(entry, `
import { evaluate } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/evaluate.ts"))};
import { renderDocumentHtml } from ${JSON.stringify(join(process.cwd(), "api/_lib/document.ts"))};
import { launchLocal } from ${JSON.stringify(join(process.cwd(), "api/_lib/pdf.ts"))};
import { ALL_QUESTIONS } from ${JSON.stringify(join(process.cwd(), "src/reifecheck/data.ts"))};
export { evaluate, renderDocumentHtml, launchLocal, ALL_QUESTIONS };`);
const out = join(cache, "wc.mjs");
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "esm",
              target: "node20", outfile: out, packages: "external" });
const { evaluate, renderDocumentHtml, launchLocal, ALL_QUESTIONS } = await import(out);

const browser = await launchLocal();
const page = await browser.newPage();
await page.setViewport({ width: Math.round((210 - 32) * 96 / 25.4), height: 1400 });

/** Misst die neun Antwortblöcke für eine Antwortkombination. */
async function heights(answers) {
  const ev = evaluate(answers, { createdAt: new Date().toISOString(), reference: "RC-MESS-0001", lang: LANG });
  const html = renderDocumentHtml(ev, { name: "Beispiel Empfänger", organisation: "Beispiel GmbH" });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const box = document.querySelector(".nt-page-2");
    return {
      items: [...box.querySelectorAll(".nt-item")].map((el) => el.getBoundingClientRect().height * 0.75),
      total: box.getBoundingClientRect().height * 0.75,
    };
  });
}

// Sprache der Messung: die Blockhöhen unterscheiden sich, weil die Texte
// unterschiedlich lang umbrechen. Beide Fassungen müssen drei Seiten halten.
// Ausgangspunkt: überall die erste Option.
const base = Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, q.options[0].key]));
const perOption = {};

for (let i = 0; i < ALL_QUESTIONS.length; i++) {
  const q = ALL_QUESTIONS[i];
  perOption[q.id] = {};
  for (const o of q.options) {
    const h = await heights({ ...base, [q.id]: o.key });
    perOption[q.id][o.key] = h.items[i];
  }
}

const worst = {};
console.log("Höhe je Antwortoption (pt):");
for (const q of ALL_QUESTIONS) {
  const row = perOption[q.id];
  const max = Object.entries(row).sort((a, b) => b[1] - a[1])[0];
  worst[q.id] = max[0];
  const cells = Object.entries(row).map(([k, v]) => `${k}:${v.toFixed(0)}${k === max[0] ? "*" : " "}`).join("  ");
  console.log(`  ${q.id}  ${cells}`);
}

// Die gemessene Kombination ist die Autorität; render-sample.mjs --worst liest sie.
writeFileSync(
  new URL(LANG === "en" ? "worst-case.en.json" : "worst-case.json", import.meta.url),
  JSON.stringify({ note: "Erzeugt von scripts/worst-case.mjs — je Frage die Option mit dem höchsten Block.", answers: worst }, null, 2) + "\n",
);

const w = await heights(worst);
const PAGE = 842 - (18 + 14) * 72 / 25.4;
console.log(`\nUngünstigster Fall: ${Object.entries(worst).map(([k, v]) => k + v).join(" ")}`);
console.log(`Seite 2 braucht dann ${w.total.toFixed(0)} pt von ${PAGE.toFixed(0)} pt ` +
            (w.total <= PAGE ? `— passt, ${(PAGE - w.total).toFixed(0)} pt Reserve` : `— ZU HOCH um ${(w.total - PAGE).toFixed(0)} pt`));
await browser.close();
process.exit(w.total <= PAGE ? 0 : 1);
