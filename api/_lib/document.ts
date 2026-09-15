/** Erzeugt das A4-Auswertungsdokument als eigenständiges HTML.
 *
 *  Vorlage: "Reifecheck Auswertung v2.dc.html" (Claude Design). Die Gestaltung
 *  ist hierher übertragen; Geometrie und Texte kommen aus den geteilten Modulen
 *  unter src/reifecheck, damit Bildschirmfassung und PDF nicht auseinanderlaufen.
 *
 *  Bewusst ohne externes JavaScript: Chromium lädt die Seite, wartet auf die
 *  Schriften und druckt. Nichts anderes muss ausgeführt werden.
 */

import { DOC } from "../../src/reifecheck/copy.js";
import { FONT_CSS } from "./fonts.js";
import { UMSETZUNG_AXES, REIFE_AXES } from "../../src/reifecheck/data.js";
import { formatDate } from "../../src/reifecheck/evaluate.js";
import {
  AXIS_LABELS,
  TICKS,
  VIEWBOX,
  areaPoints,
  areaVertices,
  axisLines,
  ringPoints,
} from "../../src/reifecheck/geometry.js";
import type { EvaluatedAnswer, Evaluation, Stufe } from "../../src/reifecheck/types.js";

const BOOK_URL = "https://cal.meetergo.com/richard-rossler/narratec?src=reifecheck-pdf";
const MAIL = "contact@narratec.io";

/* Farben der Vorlage, als feste Werte — das PDF erbt keine CSS-Variablen der Seite. */
const C = {
  ink: "oklch(18% 0.01 85)",
  ink2: "oklch(32% 0.01 85)",
  ink3: "oklch(48% 0.008 85)",
  rule: "oklch(87% 0.005 85)",
  ruleStrong: "oklch(72% 0.008 85)",
  ring: "oklch(84% 0.005 85)",
  paper: "oklch(98% 0.005 85)",
  paper2: "oklch(96% 0.008 85)",
  bar: "oklch(88% 0.005 85)",
  accent: "oklch(52% 0.18 25)",
  accentInk: "oklch(38% 0.16 25)",
  onInk: "oklch(97% 0.005 85)",
  onInk2: "oklch(84% 0.008 85)",
  onInk3: "oklch(74% 0.008 85)",
  inkPanel: "oklch(23% 0.008 85)",
  inkPanelRule: "oklch(36% 0.008 85)",
};

const F = {
  display: "'Instrument Serif', Georgia, 'Times New Roman', serif",
  sans: "'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
};

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Netzdiagramme ---------- */

const WRAPPED: Record<string, [string, string]> = {
  Rückverfolgbarkeit: ["Rückverfolg-", "barkeit"],
  "Direkter Kontakt": ["Direkter", "Kontakt"],
  Führungsrückhalt: ["Führungs-", "rückhalt"],
};

function axisLabelSvg(text: string, index: number): string {
  const pos = AXIS_LABELS[index];
  const wrapped = WRAPPED[text];
  if (!wrapped) {
    return `<text x="${pos.x}" y="${pos.y}" text-anchor="${pos.anchor}">${escapeHtml(text)}</text>`;
  }
  const y = pos.anchor === "middle" ? pos.y : pos.y - 8;
  return `<text x="${pos.x}" y="${y}" text-anchor="${pos.anchor}">${escapeHtml(
    wrapped[0],
  )}<tspan x="${pos.x}" dy="19">${escapeHtml(wrapped[1])}</tspan></text>`;
}

function ringsSvg(outerDashed: boolean): string {
  const outer = outerDashed
    ? `<polygon points="${ringPoints(3)}" fill="none" stroke="${C.ruleStrong}" stroke-width="1.4" stroke-dasharray="6 4"></polygon>`
    : `<polygon points="${ringPoints(3)}" fill="${C.paper}" stroke="${C.ruleStrong}" stroke-width="1.2"></polygon>`;
  return `${outer}
<polygon points="${ringPoints(2)}" fill="none" stroke="${C.ring}" stroke-width="1" stroke-dasharray="3 3"></polygon>
<polygon points="${ringPoints(1)}" fill="none" stroke="${C.ring}" stroke-width="1" stroke-dasharray="3 3"></polygon>
<g stroke="${C.ring}" stroke-width="1">${axisLines()
    .map((l) => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"></line>`)
    .join("")}</g>`;
}

function entscheidungsreifeSvg(stufen: Stufe[]): string {
  const label = REIFE_AXES.map((a, i) => `${a} Stufe ${stufen[i]}`).join(", ");
  return `<svg viewBox="${VIEWBOX}" style="width:100%;height:auto;overflow:visible" role="img" aria-label="Netzdiagramm Entscheidungsreife: ${escapeHtml(label)}">
${ringsSvg(false)}
<polygon points="${areaPoints(stufen)}" fill="color-mix(in oklab, ${C.accent} 15%, transparent)" stroke="${C.accent}" stroke-width="2.4"></polygon>
<g fill="${C.accentInk}">${areaVertices(stufen)
    .map((p) => `<circle cx="${p.x}" cy="${p.y}" r="4.4"></circle>`)
    .join("")}</g>
<g font-family="${F.mono}" font-size="13" fill="oklch(60% 0.008 85)">${TICKS.map(
    (t) => `<text x="${t.x}" y="${t.y}">${t.label}</text>`,
  ).join("")}</g>
<g font-family="${F.sans}" font-size="16" fill="${C.ink}">${REIFE_AXES.map((a, i) =>
    axisLabelSvg(a, i),
  ).join("")}</g>
</svg>`;
}

function umsetzungsreifeSvg(): string {
  return `<svg viewBox="${VIEWBOX}" style="width:100%;height:auto;overflow:visible" role="img" aria-label="Netzdiagramm Umsetzungsreife, identischer Aufbau, keine gefüllte Fläche">
${ringsSvg(true)}
<g font-family="${F.sans}" font-size="16" fill="${C.ink3}">${UMSETZUNG_AXES.map((a, i) =>
    axisLabelSvg(a, i),
  ).join("")}</g>
</svg>`;
}

function bars(stufe: Stufe, width: number): string {
  return [1, 2, 3]
    .map(
      (s) =>
        `<span style="width:${width}px;height:7px;background:${
          s <= stufe ? C.accent : C.bar
        };display:inline-block"></span>`,
    )
    .join("");
}

function ladder(stufen: Stufe[]): string {
  const rows = REIFE_AXES.map((axis, i) => {
    const last = i === REIFE_AXES.length - 1;
    const border = last ? "" : `border-bottom:1px solid ${C.rule};`;
    const low = stufen[i] === 1;
    return `<div style="padding:5px 0;${border}${low ? `color:${C.accentInk};` : ""}">${escapeHtml(axis)}</div>
<div style="padding:5px 0;${border}display:flex;gap:4px;align-items:center">${bars(stufen[i], 20)}<span style="font-family:${F.mono};font-size:11.5px;color:${low ? C.accentInk : C.ink3};margin-left:6px">${stufen[i]}</span></div>`;
  }).join("");
  return `<div class="nt-lad" style="flex:1 1 0;min-width:0">
<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:0 14px;align-items:center;font-size:14px">${rows}</div>
</div>`;
}
/* ---------- Typografische Größen ----------
   Das Dokument soll genau drei Seiten umfassen: Titel und Diagramm 1 auf Seite 1,
   alle neun Antworten auf Seite 2, der Rest auf Seite 3. Diese Werte sind der
   Hebel dafür — nach jeder Änderung prüfen mit:

     npm run pdf:sample -- /tmp/p.pdf && node scripts/check-pagination.mjs /tmp/p.pdf

   Seite 2 ist die enge: neun Antworten mit Frage, gewählter Option und Einordnung
   auf einer Seite. Deshalb stehen dort Frage und Antwort links, die Einordnung
   rechts daneben — nebeneinander braucht beides weniger Fläche als untereinander. */
const T = {
  // Seite 1
  title: 44,
  subtitle: 25,
  h2: 27,
  body: 13.5,
  bodyLh: 1.56,
  // Seite 2 — die neun Antworten
  itemMeta: 9,
  itemPrompt: 14.5,
  itemAnswer: 9.5,
  itemStatement: 10,
  itemLh: 1.42,
  itemPad: 5,
  // Seite 3
  blockH2: 25,
  blockBody: 11.5,
  blockLh: 1.5,
  pull: 15.5,
  note: 10.5,
};

/* ---------- Ein Antwortblock (Seite 2) ---------- */

function itemHtml(a: EvaluatedAnswer, opts: { first?: boolean } = {}): string {
  const top = opts.first ? "" : `border-top:1px solid ${C.rule};`;
  const low = a.stufe === 1;
  const meta = [
    `<span style="color:${C.accentInk}">${a.id}</span>`,
    `<span style="color:${low ? C.accentInk : C.ink3}">${escapeHtml(a.axis).toUpperCase()}</span>`,
    a.stufe === undefined
      ? ""
      : `<span style="display:inline-flex;gap:3px;align-items:center">${bars(a.stufe, 12)}` +
        `<span style="color:${low ? C.accentInk : C.ink3};margin-left:5px">Stufe ${a.stufe}/3</span></span>`,
  ]
    .filter(Boolean)
    .join(`<span style="color:${C.rule}">·</span>`);

  return `<div class="nt-item" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.02fr);gap:0 22px;padding:${T.itemPad}px 0;${top}">
<div>
<div style="display:flex;align-items:center;gap:7px;font-family:${F.mono};font-size:${T.itemMeta}px;letter-spacing:0.09em;line-height:1.4">${meta}</div>
<div style="margin-top:4px;font-family:${F.display};font-size:${T.itemPrompt}px;line-height:1.14;letter-spacing:-0.008em;color:${C.ink}">${escapeHtml(a.prompt)}</div>
<div style="margin-top:5px;padding:5px 9px;border:1px solid color-mix(in oklab, ${C.accent} 24%, #fff);border-radius:2px;background:color-mix(in oklab, ${C.accent} 8%, #fff);color:${C.accentInk};font-size:${T.itemAnswer}px;line-height:1.42"><span style="font-family:${F.mono};font-size:${T.itemMeta - 0.5}px;letter-spacing:0.1em;text-transform:uppercase;margin-right:7px">Ihre Antwort</span>${escapeHtml(a.optionLabel)}</div>
</div>
<div style="padding-top:${T.itemMeta + 3}px">
<p style="margin:0;font-size:${T.itemStatement}px;line-height:${T.itemLh};color:${C.ink2}">${escapeHtml(a.statement)}</p>
</div>
</div>`;
}

function rubric(text: string, onDark = false): string {
  const col = onDark ? C.onInk3 : C.ink3;
  return `<div style="display:flex;align-items:center;gap:9px;font-family:${F.mono};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${col}"><span style="width:16px;height:1px;background:${col};display:inline-block"></span>${escapeHtml(text)}</div>`;
}

/** Überschrift eines Antwort-Abschnitts auf Seite 2 — knapper als auf Seite 1. */
function sectionHead(r: string, h2: string, lede: string, marginTop: number): string {
  return `<div style="margin-top:${marginTop}px">${rubric(r)}</div>
<h2 class="nt-h" style="font-family:${F.display};font-size:21px;line-height:1.05;letter-spacing:-0.015em;margin:6px 0 2px;color:${C.ink}">${escapeHtml(h2)}</h2>
<p style="margin:0 0 4px;max-width:96ch;color:${C.ink3};font-size:${T.note}px;line-height:1.45">${escapeHtml(lede)}</p>`;
}

/* ---------- Das ganze Dokument ---------- */

export function renderDocumentHtml(
  evaluation: Evaluation,
  recipient: { name: string; organisation: string },
): string {
  const { context, reife, stufen } = evaluation;

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Reifecheck IT-Vorhaben — Auswertung ${evaluation.reference}</title>
<style>
${FONT_CSS}
</style>
<style>
  /* Nur das Format, KEINE Ränder: die setzt pdf() in api/_lib/pdf.ts.
     Stehen sie zusätzlich hier, addiert Chromium beide (Satzspiegel schrumpft);
     steht hier "margin: 0", verliert der Inhalt die Ränder ganz und läuft in
     Kopf- und Fußzeile hinein. */
  @page { size: A4; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: ${F.sans};
    font-size: ${T.body}px;
    line-height: ${T.bodyLh};
    color: ${C.ink};
    -webkit-font-smoothing: antialiased;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  /* Blöcke nicht über Seitengrenzen zerreißen — sonst steht die Einordnung
     ohne ihre Frage auf der nächsten Seite. */
  .nt-item, .nt-fig, .nt-block { break-inside: avoid; orphans: 3; widows: 3; }
  .nt-h { break-after: avoid; }
  /* Die drei Seiten sind gesetzt, nicht erhofft. */
  .nt-page-2, .nt-page-3 { break-before: page; }
  a { color: ${C.accentInk}; }
  h1, h2 { font-weight: 400; }
</style>
</head>
<body>

<h1 style="font-family:${F.display};font-size:${T.title}px;line-height:1.0;letter-spacing:-0.015em;margin:0;max-width:24ch;color:${C.ink}">${escapeHtml(DOC.title)}</h1>
<p style="font-family:${F.display};font-style:italic;font-size:${T.subtitle}px;line-height:1.15;letter-spacing:-0.01em;color:${C.accentInk};margin:9px 0 0">${escapeHtml(DOC.subtitle)}</p>

<div style="display:flex;align-items:baseline;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:20px;padding-top:10px;border-top:1px solid ${C.rule};font-family:${F.mono};font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:${C.ink3}">
<span>Für ${escapeHtml(recipient.name)}${recipient.organisation ? ` · ${escapeHtml(recipient.organisation)}` : ""}</span>
<span>Auswertung vom ${formatDate(evaluation.createdAt)} · ${evaluation.reference}</span>
</div>

<h2 class="nt-h" style="font-family:${F.display};font-size:${T.h2}px;line-height:1.1;letter-spacing:-0.01em;margin:22px 0 11px;color:${C.ink}">${escapeHtml(DOC.vorspann.h2)}</h2>
<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:30px">
<div>${DOC.vorspann.left.map((p) => `<p style="margin:0 0 10px">${escapeHtml(p)}</p>`).join("")}</div>
<div>${DOC.vorspann.right.map((p) => `<p style="margin:0 0 10px">${escapeHtml(p)}</p>`).join("")}</div>
</div>
<p style="margin:4px 0 0;color:${C.ink2}">${escapeHtml(DOC.vorspann.closing)}</p>

<div class="nt-fig" style="margin-top:18px;border:1px solid ${C.rule};border-left:3px solid ${C.accent};border-radius:3px;background:${C.paper2};padding:16px 24px 12px">
<div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;flex-wrap:wrap">
<div>
${rubric(DOC.diagram1.rubric)}
<div style="margin-top:4px;font-family:${F.display};font-size:24px;line-height:1.1;letter-spacing:-0.01em;color:${C.ink}">${escapeHtml(DOC.diagram1.title)}</div>
</div>
<div style="font-family:${F.mono};font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:${C.accentInk}">${escapeHtml(DOC.diagram1.meta)}</div>
</div>
<div style="display:flex;gap:26px;align-items:center;margin-top:8px">
<div style="flex:0 0 290px;max-width:290px">${entscheidungsreifeSvg(stufen)}</div>
${ladder(stufen)}
</div>
</div>

<div class="nt-page-2">
${sectionHead(DOC.contextSection.rubric, DOC.contextSection.h2, DOC.contextSection.lede, 0)}
${context.map((a, i) => itemHtml(a, { first: i === 0 })).join("")}

${sectionHead(DOC.reifeSection.rubric, DOC.reifeSection.h2, DOC.reifeSection.lede, 10)}
${reife.map((a, i) => itemHtml(a, { first: i === 0 })).join("")}
</div>

<div class="nt-page-3">
<div class="nt-block" style="padding:18px 24px 16px;border-radius:3px;background:${C.paper2};border:1px solid ${C.rule};border-left:3px solid ${C.accent}">
${rubric(DOC.diagram2.rubric)}
<h2 style="font-family:${F.display};font-size:${T.blockH2}px;line-height:1.06;letter-spacing:-0.015em;margin:7px 0 10px;color:${C.ink}">${escapeHtml(DOC.diagram2.h2)}</h2>
<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:26px">
<p style="margin:0;font-size:${T.blockBody}px;line-height:${T.blockLh};color:${C.ink2}">${escapeHtml(DOC.diagram2.left)}</p>
<p style="margin:0;font-size:${T.blockBody}px;line-height:${T.blockLh};color:${C.ink2}">${escapeHtml(DOC.diagram2.right)}</p>
</div>
<div style="display:flex;gap:24px;align-items:center;margin-top:12px;padding-top:12px;border-top:1px dashed ${C.ruleStrong}">
<div style="flex:0 0 235px;max-width:235px">${umsetzungsreifeSvg()}</div>
<p style="flex:1 1 0;min-width:0;margin:0;font-family:${F.display};font-size:${T.pull}px;line-height:1.28;letter-spacing:-0.005em;color:${C.ink}">${escapeHtml(DOC.diagram2.pull)}</p>
</div>
</div>

<div class="nt-block" style="margin-top:16px;border-radius:3px;background:${C.inkPanel};border-top:3px solid ${C.accent};padding:18px 24px 20px;color:${C.onInk}">
${rubric(DOC.uebergang.rubric, true)}
<h2 style="font-family:${F.display};font-size:${T.blockH2}px;line-height:1.05;letter-spacing:-0.015em;margin:7px 0 10px;color:${C.onInk};max-width:26ch">${escapeHtml(DOC.uebergang.h2)}</h2>
<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:26px">
<p style="margin:0;font-size:${T.blockBody}px;line-height:${T.blockLh};color:${C.onInk2}">${escapeHtml(DOC.uebergang.left)}</p>
<p style="margin:0;font-size:${T.blockBody}px;line-height:${T.blockLh};color:${C.onInk2}">${escapeHtml(DOC.uebergang.right)}</p>
</div>
<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:14px;padding-top:13px;border-top:1px solid ${C.inkPanelRule}">
<a href="${BOOK_URL}" style="display:inline-flex;align-items:center;gap:9px;padding:9px 16px;border-radius:2px;background:${C.onInk};color:${C.ink};font-size:12px;font-weight:500;text-decoration:none">${escapeHtml(DOC.uebergang.ctaLabel)} <span style="font-family:${F.mono}">→</span></a>
<span style="font-family:${F.mono};font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:${C.onInk3}">${escapeHtml(DOC.uebergang.ctaMicro)} <a href="mailto:${MAIL}" style="color:oklch(88% 0.03 25);text-decoration:underline;text-underline-offset:3px">${MAIL}</a></span>
</div>
</div>

<div class="nt-block" style="border-top:1px solid ${C.rule};margin-top:18px;padding-top:14px">
${rubric(DOC.methode.rubric)}
<h2 style="font-family:${F.display};font-size:22px;line-height:1.08;letter-spacing:-0.01em;margin:7px 0 9px;color:${C.ink};max-width:36ch">${escapeHtml(DOC.methode.h2)}</h2>
<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:26px">
<p style="margin:0;font-size:${T.note}px;line-height:1.5;color:${C.ink2}">${escapeHtml(DOC.methode.left)}</p>
<p style="margin:0;font-size:${T.note}px;line-height:1.5;color:${C.ink2}">${escapeHtml(DOC.methode.right)}</p>
</div>
<p style="margin:14px 0 0;font-family:${F.mono};font-size:9.5px;line-height:1.7;letter-spacing:0.04em;color:${C.ink3}">${escapeHtml(DOC.methode.imprint)}</p>
</div>
</div>

</body>
</html>`;
}

/** Kopf- und Fußzeile für Chromium — dort, wo die Vorlage sie hatte. */
export function headerTemplate(): string {
  return `<div style="width:100%;padding:0 16mm;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b66;display:flex;justify-content:space-between;border-bottom:1px solid #dedcd7;padding-bottom:5px;margin-bottom:4px">
<span>NarraTec</span><span>${DOC.runningHead}</span></div>`;
}

export function footerTemplate(reference: string): string {
  return `<div style="width:100%;padding:0 16mm;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:0.08em;color:#6b6b66;display:flex;justify-content:space-between;border-top:1px solid #dedcd7;padding-top:5px">
<span>${MAIL} · ${reference}</span><span class="pageNumber"></span></div>`;
}
