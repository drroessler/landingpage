/** Prüft die geforderte Seitenaufteilung des Auswertungs-PDF:
 *
 *    Seite 1  Titel, Vorspann, Diagramm 1
 *    Seite 2  Status und Kontext (F1–F3) und Die sechs Punkte (R1–R6)
 *    Seite 3  Diagramm 2, Nächster Schritt, methodischer Hinweis
 *
 *  Die großen Blöcke stehen auf break-inside:avoid und rutschen lautlos auf die
 *  nächste Seite, sobald sie um wenige Punkte nicht mehr passen. Diese Prüfung
 *  macht das sichtbar.
 *
 *  Aufruf: node scripts/check-pagination.mjs [datei.pdf]
 */
import { execFileSync } from "node:child_process";

const pdf = process.argv[2] ?? "reifecheck-beispiel.pdf";
const run = (args) => execFileSync("pdftotext", args, { encoding: "utf8" });

const pageCount = Number(
  execFileSync("pdfinfo", [pdf], { encoding: "utf8" }).match(/Pages:\s+(\d+)/)[1],
);
const pages = Array.from({ length: pageCount }, (_, i) =>
  run(["-f", String(i + 1), "-l", String(i + 1), pdf, "-"]),
);

// Marker, die genau einmal und nur im gemeinten Abschnitt vorkommen.
const EXPECTED = [
  ["SECHS ACHSEN", "Diagramm 1", 1],
  ["Status und Kontext", "F1–F3", 2],
  ["Die sechs Punkte im Einzelnen", "R1–R6", 2],
  ["Wie explizit sind die Annahmen", "letzte Reifefrage (R6)", 2],
  ["DIAGRAMM 2", "Diagramm 2", 3],
  ["Wie es weitergehen kann", "Nächster Schritt", 3],
  ["Woher die Fragen kommen", "methodischer Hinweis", 3],
];

let bad = 0;
console.log(`${pageCount} Seiten` + (pageCount === 3 ? "" : "   <-- erwartet: 3"));
if (pageCount !== 3) bad++;

for (const [needle, label, want] of EXPECTED) {
  const at = pages.findIndex((t) => t.includes(needle)) + 1 || "?";
  const ok = at === want;
  if (!ok) bad++;
  console.log(`  ${ok ? "ok  " : "FALSCH"} ${label.padEnd(24)} Seite ${at}${ok ? "" : ` (erwartet ${want})`}`);
}

// Restfläche je Seite: zu wenig heißt, der nächste Eingriff kippt den Umbruch.
const TOP = 18 * 72 / 25.4, BOT = 842 - 14 * 72 / 25.4;
const bbox = run(["-bbox", pdf, "-"]);
const boxes = [...bbox.matchAll(/<page width="[\d.]+" height="[\d.]+">([\s\S]*?)<\/page>/g)];
const frei = boxes.map((m) => {
  const ys = [...m[1].matchAll(/yMax="([\d.]+)"/g)].map((x) => +x[1]).filter((y) => y > TOP - 6 && y < BOT + 6);
  return ys.length ? Math.round(BOT - Math.max(...ys)) : Math.round(BOT - TOP);
});
console.log(`  Restfläche je Seite: [${frei.join(", ")}] pt von ${Math.round(BOT - TOP)} pt`);

process.exit(bad === 0 ? 0 : 1);
