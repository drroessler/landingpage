/** Prüft, dass relative Importe der Serverfunktion eine Dateiendung tragen.
 *
 *  `package.json` setzt "type": "module", also kompiliert Vercel `api/` zu ESM.
 *  Node löst dort endungslose Spezifizierer NICHT auf: aus einem fehlenden `.js`
 *  wird zur Laufzeit ERR_MODULE_NOT_FOUND und die Funktion stirbt beim Laden,
 *  noch bevor der Handler beginnt. Lokal fällt das nie auf, weil esbuild (die
 *  Prüfskripte) und Vite (das Frontend) endungslos auflösen.
 *
 *  Geprüft wird api/ samt der Dateien aus src/reifecheck/, die mitgeladen werden.
 *  Die .tsx-Dateien bleiben außen vor — die sieht nur Vite.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

function filesIn(dir, ext = ".ts") {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...filesIn(p, ext));
    else if (e.name.endsWith(ext) && !e.name.endsWith(".d.ts")) out.push(p);
  }
  return out;
}

const RELATIVE = /from\s+"(\.\.?\/[^"]*)"/g;
const problems = [];

for (const file of [...filesIn("api"), ...filesIn("src/reifecheck")]) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  for (const [i, line] of lines.entries()) {
    for (const m of line.matchAll(RELATIVE)) {
      const spec = m[1];
      if (!/\.(js|json|css)$/.test(spec)) {
        problems.push(`${file}:${i + 1}  ${spec}  →  ${spec}.js`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error("Relative Importe ohne Dateiendung — im Lambda ERR_MODULE_NOT_FOUND:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\n${problems.length} Stelle(n). Endung ".js" anfügen, auch wenn die Datei .ts heißt.`);
  process.exit(1);
}

console.log(`ESM-Importe in Ordnung (${[...filesIn("api"), ...filesIn("src/reifecheck")].length} Dateien).`);
