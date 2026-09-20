import { reifeAxesFor, umsetzungAxesFor } from "./data";
import {
  AXIS_LABELS,
  TICKS,
  VIEWBOX,
  areaPoints,
  areaVertices,
  axisLines,
  ringPoints,
} from "./geometry";
import type { Stufe, Lang } from "./types";

/** Zweizeilig gesetzte Achsenbeschriftungen von Diagramm 2 — sonst kollidieren
 *  sie mit dem Netz. Der Umbruchpunkt ist aus der Vorlage übernommen. */
const WRAPPED: Record<string, [string, string]> = {
  Rückverfolgbarkeit: ["Rückverfolg-", "barkeit"],
  "Direkter Kontakt": ["Direkter", "Kontakt"],
  Führungsrückhalt: ["Führungs-", "rückhalt"],
};

function AxisLabel({ text, index, fill }: { text: string; index: number; fill: string }) {
  const pos = AXIS_LABELS[index];
  const wrapped = WRAPPED[text];
  if (!wrapped) {
    return (
      <text x={pos.x} y={pos.y} textAnchor={pos.anchor} fill={fill}>
        {text}
      </text>
    );
  }
  // Bei zwei Zeilen rückt die erste um eine halbe Zeile nach oben.
  const y = pos.anchor === "middle" ? pos.y : pos.y - 8;
  return (
    <text x={pos.x} y={y} textAnchor={pos.anchor} fill={fill}>
      {wrapped[0]}
      <tspan x={pos.x} dy={19}>
        {wrapped[1]}
      </tspan>
    </text>
  );
}

function Rings({ outerDashed = false }: { outerDashed?: boolean }) {
  return (
    <>
      <polygon
        points={ringPoints(3)}
        fill={outerDashed ? "none" : "var(--rc-net-fill, oklch(98% 0.005 85))"}
        stroke={outerDashed ? "var(--rule-strong)" : "var(--rule-strong)"}
        strokeWidth={outerDashed ? 1.4 : 1.2}
        strokeDasharray={outerDashed ? "6 4" : undefined}
      />
      <polygon points={ringPoints(2)} fill="none" stroke="var(--rc-ring)" strokeWidth={1} strokeDasharray="3 3" />
      <polygon points={ringPoints(1)} fill="none" stroke="var(--rc-ring)" strokeWidth={1} strokeDasharray="3 3" />
      <g stroke="var(--rc-ring)" strokeWidth={1}>
        {axisLines().map((l, i) => (
          <line key={i} {...l} />
        ))}
      </g>
    </>
  );
}

/** Diagramm 1 — Entscheidungsreife, mit gefüllter Fläche. */
export function EntscheidungsreifeChart({ stufen, lang = "de" }: { stufen: Stufe[]; lang?: Lang }) {
  const REIFE_AXES = reifeAxesFor(lang);
  const label = REIFE_AXES.map((a, i) => `${a} Stufe ${stufen[i]}`).join(", ");
  return (
    <svg viewBox={VIEWBOX} className="rc-net" role="img" aria-label={`Netzdiagramm Entscheidungsreife: ${label}`}>
      <Rings />
      <polygon
        points={areaPoints(stufen)}
        fill="color-mix(in oklab, var(--accent) 15%, transparent)"
        stroke="var(--accent)"
        strokeWidth={2.4}
      />
      <g fill="var(--accent-ink)">
        {areaVertices(stufen).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4.4} />
        ))}
      </g>
      <g fontFamily="var(--f-mono)" fontSize={13} fill="var(--ink-3)">
        {TICKS.map((t) => (
          <text key={t.label} x={t.x} y={t.y}>
            {t.label}
          </text>
        ))}
      </g>
      <g fontFamily="var(--f-sans)" fontSize={16} fill="var(--ink)">
        {REIFE_AXES.map((a, i) => (
          <AxisLabel key={a} text={a} index={i} fill="var(--ink)" />
        ))}
      </g>
    </svg>
  );
}

/** Diagramm 2 — Umsetzungsreife, angedeutet. Gleicher Aufbau, keine Fläche.
 *  Die Symmetrie macht die Aussage ohne erklärenden Satz. */
export function UmsetzungsreifeChart({ lang = "de" }: { lang?: Lang } = {}) {
  const UMSETZUNG_AXES = umsetzungAxesFor(lang);
  return (
    <svg
      viewBox={VIEWBOX}
      className="rc-net"
      role="img"
      aria-label="Netzdiagramm Umsetzungsreife, identischer Aufbau, keine gefüllte Fläche"
    >
      <Rings outerDashed />
      <g fontFamily="var(--f-sans)" fontSize={16} fill="var(--ink-3)">
        {UMSETZUNG_AXES.map((a, i) => (
          <AxisLabel key={a} text={a} index={i} fill="var(--ink-3)" />
        ))}
      </g>
    </svg>
  );
}

/** Stufenleiter — dieselbe Information als Liste, für schmale Viewports und
 *  als Textalternative zum Netz. */
export function Stufenleiter({ stufen, lang = "de" }: { stufen: Stufe[]; lang?: Lang }) {
  const REIFE_AXES = reifeAxesFor(lang);
  return (
    <div className="rc-ladder">
      {REIFE_AXES.map((axis, i) => (
        <div className="rc-ladder-row" key={axis}>
          <div className={`rc-ladder-label${stufen[i] === 1 ? " is-low" : ""}`}>{axis}</div>
          <div className="rc-ladder-bars">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`rc-bar${s <= stufen[i] ? " is-on" : ""}`} aria-hidden="true" />
            ))}
            <span className={`rc-ladder-num${stufen[i] === 1 ? " is-low" : ""}`}>{stufen[i]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
