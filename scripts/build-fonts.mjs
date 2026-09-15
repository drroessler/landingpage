/** Erzeugt api/_lib/fonts.ts: die drei Schriften des Dokuments als @font-face
 *  mit eingebetteten woff2-Dateien.
 *
 *  Warum eingebettet: das PDF entsteht in einer Lambda-Umgebung ohne
 *  Systemschriften und ohne verlässlichen Netzzugriff auf fonts.gstatic.com.
 *  Würde die Schrift fehlen, fiele das Dokument lautlos auf eine Ersatzschrift
 *  zurück und sähe anders aus als die Fassung im Browser.
 *
 *  Aufruf: node scripts/build-fonts.mjs
 */

import { writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const get = async (url, asText) => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return asText ? res.text() : Buffer.from(await res.arrayBuffer());
};

const css = await get(CSS_URL, true);
const parts = css.split(/\/\*\s*([a-z0-9-]+)\s*\*\//);
const blocks = [];
let bytes = 0;

for (let i = 1; i < parts.length; i += 2) {
  const subset = parts[i];
  const block = parts[i + 1];
  if (subset !== "latin" && subset !== "latin-ext") continue;
  const m = block.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/);
  if (!m) continue;
  const buf = await get(m[1], false);
  bytes += buf.length;
  blocks.push(block.trim().replace(m[1], `data:font/woff2;base64,${buf.toString("base64")}`));
}

const out = `/* Erzeugt von scripts/build-fonts.mjs — nicht von Hand bearbeiten.
   ${blocks.length} @font-face, ${Math.round(bytes / 1024)} KB Schriftdaten. */

export const FONT_CSS = ${JSON.stringify(blocks.join("\n"))};
`;

writeFileSync(new URL("../api/_lib/fonts.ts", import.meta.url), out);
console.log(`api/_lib/fonts.ts: ${blocks.length} @font-face, ${Math.round(bytes / 1024)} KB`);
