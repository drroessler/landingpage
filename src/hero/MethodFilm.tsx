/** NarraTec — die vier Phasen der Methode als durchlaufender Film.
 *
 *  Portiert aus dem Entwurf „NarraTec Hero Methode.dc.html" (Claude Design).
 *  Die Choreografie ist unverändert: eine Weltebene von 720×500, über die eine
 *  Kamera fährt, darauf vier Phasen, die einander überlagern statt abzulösen.
 *  Zeitangaben sind Sekunden auf der Gesamtachse (0 … 20,5).
 *
 *  Farben kommen aus den Design-Tokens der Seite (redesign.css), nicht als
 *  festen Werten wie im Entwurf — so bleibt der Film mit dem Rest der Seite
 *  in Deckung, wenn dort eine Farbe nachgezogen wird.
 */

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { CUES, Easing, animate, interpolate, useFilmClock } from "./timeline";
import type { FilmCopy } from "./filmCopy";
import "./methodfilm.css";

const C = {
  paper: "var(--paper)",
  paper2: "var(--paper-2)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ink3: "var(--ink-3)",
  rule: "var(--rule)",
  ruleStrong: "var(--rule-strong)",
  accent: "var(--accent)",
  accentInk: "var(--accent-ink)",
  accentWash: "var(--accent-wash)",
};
const F = {
  display: "var(--f-display)",
  sans: "var(--f-sans)",
  mono: "var(--f-mono)",
};

const MOTION = {
  enter: (from: number, to: number, start: number, dur: number) =>
    animate({ from, to, start, end: start + dur, ease: Easing.easeOutCubic }),
  glide: (from: number, to: number, start: number, dur: number) =>
    animate({ from, to, start, end: start + dur, ease: Easing.easeInOutCubic }),
  pop: (from: number, to: number, start: number, dur: number) =>
    animate({ from, to, start, end: start + dur, ease: Easing.easeOutBack }),
};

/** Weltmaße (Dokumentkoordinaten) aus dem Entwurf. */
const W = 720;
const H = 500;
/** Sichtbare Höhe: die Leiste belegt 0–46, die Welt 56–556 — darunter ist die
 *  Bühne leer und wird vom Rahmen abgeschnitten. */
export const STAGE_VISIBLE_H = 558;
/** Bühnenbreite für ein Seitenverhältnis von 16:10 (558 × 1,6 = 893).
 *
 *  Der Entwurf war 760 breit (≈ 1,36). Gekürzt statt verbreitert würde 16:10
 *  unten in die Welt schneiden — die reicht bis 556. Deshalb bekommt die Bühne
 *  seitlich mehr Raum: die Welt (720 breit) steht darin zentriert, jeder Pixel
 *  der Komposition bleibt in Originalgröße. */
export const STAGE_W = 893;
export const STAGE_H = 584;
/** Linker Rand der Welt in der Bühne — hält sie mittig. */
const WORLD_LEFT = Math.round((STAGE_W - W) / 2);
const WORLD_TOP = 56;


/* ---------- Grundformen ---------- */

function Bar({ x, y, w, h = 6, c = C.rule, o = 1, r = 1 }: {
  x: number; y: number; w: number; h?: number; c?: string; o?: number; r?: number;
}) {
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: c, opacity: o, borderRadius: r }} />;
}

function Sheet({ x, y, w, h, o = 1, bg = C.paper, children, shadow = true }: {
  x: number; y: number; w: number; h: number; o?: number; bg?: string; children?: ReactNode; shadow?: boolean;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h, opacity: o,
      background: bg, border: `1px solid ${C.rule}`, borderRadius: 3,
      boxShadow: shadow ? `0 1px 0 ${C.rule}, 0 18px 40px -28px rgba(0,0,0,0.35)` : "none",
    }}>{children}</div>
  );
}

function Mono({ x, y, children, size = 13, c = C.ink3, ls = "0.12em", w }: {
  x: number; y: number; children: ReactNode; size?: number; c?: string; ls?: string; w?: number;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, fontFamily: F.mono, fontSize: size,
      letterSpacing: ls, color: c, textTransform: "uppercase",
      whiteSpace: w ? "normal" : "nowrap", lineHeight: 1.5,
    }}>{children}</div>
  );
}

function Check({ x, y, o = 1, s = 16 }: { x: number; y: number; o?: number; s?: number }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: s, height: s, opacity: o,
      border: `1px solid ${C.accentInk}`, borderRadius: 1, background: C.accentWash,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: F.mono, fontSize: s * 0.72, color: C.accentInk, lineHeight: 1,
    }}>✓</div>
  );
}

/* ---------- Phase 1 — Ursachenanalyse ---------- */

/** Spalten der Ist-Analyse. Die Balkenbreiten sind die „Zeilen" des Protokolls. */
const COLS = [
  { x: 68, widths: [140, 120, 96, 132, 88, 148, 126, 138, 104] },
  { x: 272, widths: [128, 150, 92, 144, 84, 132, 152, 118, 140] },
  { x: 476, widths: [150, 122, 100, 118, 92, 112] },
];

function PhaseUnderstand({ T, L }: { T: number; L: FilmCopy }) {
  const frame = interpolate([0, 4.6, 5.3, 19.8, 20.45], [1, 1, 0, 0, 1])(T);
  const body = interpolate([0, 4.5, 5.1], [1, 1, 0])(T);
  const cause = interpolate([3.05, 3.6, 4.5, 5.0], [0, 1, 1, 0])(T);
  return (
    <Fragment>
      <Sheet x={40} y={10} w={640} h={470} o={frame}>
        <Mono x={28} y={22} size={14} c={C.accentInk}>{L.istAnalyse}</Mono>
        <Bar x={28} y={52} w={584} h={1} c={C.rule} o={frame} />
      </Sheet>
      <div style={{ opacity: body }}>
        {COLS.map((col, ci) => (
          <Fragment key={L.columns[ci]}>
            <Mono x={col.x} y={72} size={14} c={C.ink3}>
              <span style={{ opacity: MOTION.enter(0, 1, 0.2 + ci * 0.12, 0.4)(T) }}>{L.columns[ci]}</span>
            </Mono>
            <Bar x={col.x} y={96} w={176} h={1} c={C.rule} o={MOTION.enter(0, 1, 0.25 + ci * 0.18, 0.5)(T)} />
            {col.widths.map((bw, i) => {
              const t0 = 0.55 + ci * 0.2 + i * 0.13;
              const o = MOTION.enter(0, 1, t0, 0.45)(T);
              // Zeile 3 jeder Spalte ist ein Symptom, Zeile 5 die Ursache.
              const struck = i === 2;
              const causal = i === 4;
              return (
                <Fragment key={i}>
                  <Bar x={col.x} y={114 + i * 26} w={bw} h={6} o={o} c={struck || causal ? C.ink3 : C.rule} />
                  {struck && (
                    <Bar x={col.x - 3} y={117 + i * 26} w={MOTION.glide(0, bw + 6, 2.05 + ci * 0.22, 0.4)(T)} h={1.5} c={C.accent} />
                  )}
                  {struck && (
                    <div style={{
                      position: "absolute", left: col.x, top: 107 + i * 26, width: 176, textAlign: "right",
                      fontFamily: F.mono, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: C.accent, opacity: MOTION.enter(0, 1, 2.35 + ci * 0.22, 0.4)(T),
                    }}>{L.symptom}</div>
                  )}
                  {causal && (
                    <Fragment>
                      <Bar x={col.x - 3} y={113 + i * 26} w={2} h={8} c={C.accentInk} o={MOTION.enter(0, 1, 2.55 + ci * 0.2, 0.35)(T)} />
                      <div style={{
                        position: "absolute", left: col.x, top: 107 + i * 26, width: 176, textAlign: "right",
                        fontFamily: F.mono, fontSize: 12.5, letterSpacing: "0.12em", textTransform: "uppercase",
                        color: C.accentInk, opacity: MOTION.enter(0, 1, 2.55 + ci * 0.2, 0.4)(T),
                      }}>{L.causeMark}</div>
                    </Fragment>
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        ))}
        <div style={{
          position: "absolute", left: 476, top: 258, width: 200, opacity: cause,
          background: C.accentWash, border: `1px solid ${C.rule}`, borderLeft: `2px solid ${C.accent}`,
          borderRadius: 2, padding: "13px 16px 16px",
          transform: `translateY(${MOTION.pop(8, 0, 3.05, 0.6)(T)}px)`,
        }}>
          <div style={{ fontFamily: F.mono, fontSize: 13, letterSpacing: "0.14em", color: C.accentInk, textTransform: "uppercase" }}>{L.causeTitle}</div>
          <div style={{ marginTop: 9, fontFamily: F.sans, fontSize: 18, lineHeight: 1.38, color: C.ink }}>
            {L.causeText}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

/* ---------- Phase 2 — Das Narrativ ---------- */

const PB = { x: 190, y: 20, w: 340, h: 450 };
const PARA = [
  [284, 262, 274],
  [270, 288, 246],
  [286, 252, 268],
  [258, 280, 236],
];
const REVIEWERS = ["R. R.", "M. W.", "A. S."];

function PhaseNarrative({ T, L }: { T: number; L: FilmCopy }) {
  const sheet = interpolate([4.6, 5.5, 10.4, 11.6, 19.7, 20.3], [0, 1, 1, 0.14, 0.14, 0])(T);
  const rise = MOTION.enter(26, 0, 4.6, 1.1)(T);
  const body = interpolate([5.0, 5.8, 10.3, 11.2], [0, 1, 1, 0])(T);
  return (
    <div style={{ transform: `translateY(${rise}px)` }}>
      <Sheet x={PB.x} y={PB.y} w={PB.w} h={PB.h} o={sheet}>
        <div style={{ opacity: interpolate([4.8, 5.6, 10.3, 11.2], [0, 1, 1, 0])(T) }}>
          <div style={{ position: "absolute", left: 28, top: 24, fontFamily: F.display, fontSize: 34, lineHeight: 1, color: C.ink }}>{L.narrative}</div>
          <div style={{ position: "absolute", left: 28, top: 66, fontFamily: F.mono, fontSize: 12, letterSpacing: "0.13em", color: C.accentInk, textTransform: "uppercase" }}>{L.decisionPaper}</div>
          <Bar x={28} y={90} w={284} h={1} c={C.rule} />
        </div>
      </Sheet>
      <div style={{ opacity: body }}>
        {PARA.map((block, bi) => (
          <Fragment key={bi}>
            {block.map((bw, i) => (
              <Bar key={i} x={PB.x + 28} y={PB.y + 110 + bi * 58 + i * 15} w={bw} h={5}
                   o={MOTION.enter(0, 1, 5.5 + bi * 0.22 + i * 0.07, 0.4)(T)} />
            ))}
          </Fragment>
        ))}
        {[0, 1, 2].map((i) => {
          const t0 = 6.5 + i * 0.55;
          return (
            <div key={i} style={{
              position: "absolute",
              left: PB.x + PB.w - 26 + MOTION.enter(24, 0, t0, 0.6)(T),
              top: PB.y + 118 + i * 74,
              width: 124, opacity: MOTION.enter(0, 1, t0, 0.5)(T),
              background: C.paper2, border: `1px solid ${C.rule}`, borderRadius: 2, padding: "9px 12px",
              boxShadow: "0 10px 24px -20px rgba(0,0,0,0.4)",
            }}>
              <div style={{ fontFamily: F.mono, fontSize: 13, letterSpacing: "0.08em", color: C.ink3 }}>{REVIEWERS[i]}</div>
              <div style={{ marginTop: 7, height: 4, width: 92, background: C.rule, borderRadius: 1 }} />
              <div style={{ marginTop: 6, height: 4, width: 64, background: C.rule, borderRadius: 1 }} />
            </div>
          );
        })}
        <Bar x={PB.x + 28} y={PB.y + 346} w={284} h={1} c={C.ruleStrong} o={MOTION.enter(0, 1, 8.3, 0.4)(T)} />
        <Mono x={PB.x + 28} y={PB.y + 354} size={13} c={C.ink3}>
          <span style={{ opacity: MOTION.enter(0, 1, 8.4, 0.4)(T) }}>{L.approval}</span>
        </Mono>
        {L.approvers.map((name, i) => {
          const t0 = 8.75 + i * 0.42;
          return (
            <Fragment key={name}>
              <div style={{
                position: "absolute", left: PB.x + 54, top: PB.y + 378 + i * 24, fontFamily: F.sans, fontSize: 16,
                color: C.ink2, opacity: MOTION.enter(0, 1, t0 - 0.2, 0.35)(T), whiteSpace: "nowrap",
              }}>{name}</div>
              <div style={{
                position: "absolute", left: PB.x + 28, top: PB.y + 379 + i * 24, width: 16, height: 16,
                border: `1px solid ${C.ruleStrong}`, borderRadius: 1,
                opacity: MOTION.enter(0, 1, t0 - 0.25, 0.3)(T),
              }} />
              <Check x={PB.x + 28} y={PB.y + 379 + i * 24} s={16} o={MOTION.pop(0, 1, t0, 0.45)(T)} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Phase 3 + 4 — Arbeitspakete, Arbeitsstruktur ---------- */

const BOARD_COLS = [30, 270, 510];
const SLOT_Y = [124, 200, 276, 352];
const GRID = [[30, 104], [390, 104], [30, 296], [390, 296]];
const CARD_H = 172;
const CARD_H_C = 74;

interface Pack {
  id: string;
  /** [Zeitpunkt, Zielspalte] — 0 Planung, 1 Umsetzung, 2 Ergebnis */
  moves: [number, number][];
}

const PACKS: Pack[] = [
  { id: "AP-01", moves: [[16.85, 1], [18.1, 2]] },
  { id: "AP-02", moves: [[17.45, 1], [18.85, 2]] },
  { id: "AP-03", moves: [[18.3, 1]] },
  { id: "AP-04", moves: [[19.15, 1]] },
];

/** Bahn eines Pakets: aus dem Narrativ heraus, zum Raster, dann über das Board. */
function packTrack(p: Pack, i: number) {
  const src = [PB.x + 28, PB.y + 110 + i * 58];
  const ts = [10.3, 11.55, 15.3, 16.45];
  const xv = [src[0], GRID[i][0], GRID[i][0], BOARD_COLS[0]];
  const yv = [src[1], GRID[i][1], GRID[i][1], SLOT_Y[i]];
  const xs = ts.slice();
  let lastCol = 0;
  p.moves.forEach(([at, col]) => {
    xs.push(at, at + 0.55);
    xv.push(BOARD_COLS[lastCol], BOARD_COLS[col]);
    lastCol = col;
  });
  return {
    x: interpolate(xs, xv, Easing.easeInOutCubic),
    y: interpolate(ts, yv, Easing.easeInOutCubic),
    w: interpolate(ts, [284, 300, 300, 200], Easing.easeInOutCubic),
    h: interpolate(ts, [16, CARD_H, CARD_H, CARD_H_C], Easing.easeInOutCubic),
    doneAt: p.moves.length && p.moves[p.moves.length - 1][1] === 2
      ? p.moves[p.moves.length - 1][0] + 0.45
      : null,
  };
}

const TRACKS = PACKS.map(packTrack);

function Packages({ T, L }: { T: number; L: FilmCopy }) {
  const shell = interpolate([10.25, 11.0, 19.7, 20.3], [0, 1, 1, 0])(T);
  const detail = interpolate([11.0, 11.7, 15.3, 15.9], [0, 1, 1, 0])(T);
  return (
    <Fragment>
      {PACKS.map((p, i) => {
        const tr = TRACKS[i];
        const x = tr.x(T);
        const y = tr.y(T);
        const w = tr.w(T);
        const h = tr.h(T);
        const compact = h < 100;
        const criterion = Math.min(detail, MOTION.pop(0, 1, 12.35 + i * 0.5, 0.45)(T));
        const done = tr.doneAt !== null && T > tr.doneAt;
        return (
          <div key={p.id} style={{
            position: "absolute", left: x, top: y, width: w, height: h, opacity: shell,
            background: C.paper, border: `1px solid ${C.rule}`,
            borderLeft: `2px solid ${done ? C.accent : C.ruleStrong}`,
            borderRadius: 2, boxShadow: "0 12px 30px -24px rgba(0,0,0,0.45)", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", left: 16, top: compact ? 11 : 16, fontFamily: F.mono, fontSize: 14, letterSpacing: "0.12em", color: C.accentInk }}>{p.id}</div>
            <div style={{
              position: "absolute", left: 16, top: compact ? 30 : 42, width: w - (compact ? 32 : 44),
              fontFamily: F.sans, fontSize: compact ? 15 : 19, lineHeight: 1.28, color: C.ink,
              opacity: MOTION.enter(0, 1, 10.85 + i * 0.12, 0.5)(T),
            }}>{L.packs[i]}</div>
            <div style={{ opacity: detail }}>
              <Bar x={16} y={98} w={w - 44} h={1} c={C.rule} />
              <Mono x={16} y={108} size={13}>{L.owner}</Mono>
              <div style={{ position: "absolute", left: 124, top: 106, fontFamily: F.sans, fontSize: 16, color: C.ink2, whiteSpace: "nowrap" }}>{L.owners[i]}</div>
            </div>
            <div style={{ opacity: criterion }}>
              <Check x={16} y={134} s={16} />
              <Mono x={40} y={135} size={13} c={C.accentInk}>{L.criterionMet}</Mono>
            </div>
            {compact && (
              <Check x={w - 32} y={10} s={16} o={tr.doneAt !== null ? MOTION.pop(0, 1, tr.doneAt, 0.4)(T) : 0} />
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

function Board({ T, L }: { T: number; L: FilmCopy }) {
  const frame = interpolate([14.9, 15.8, 19.7, 20.3], [0, 1, 1, 0])(T);
  const head = interpolate([15.4, 16.2, 19.7, 20.2], [0, 1, 1, 0])(T);
  const sweep = interpolate([16.5, 19.9], [30, 710], Easing.linear)(T);
  // Der Takt pulsiert leicht — er läuft, er wird nicht abgezählt.
  const beat = 0.55 + 0.45 * Math.abs(Math.sin(T * 2.6));
  return (
    <Fragment>
      <Sheet x={14} y={50} w={692} h={420} o={frame} bg={C.paper2} shadow={false} />
      <div style={{ opacity: head }}>
        {L.boardColumns.map((label, i) => (
          <Fragment key={label}>
            <Mono x={BOARD_COLS[i]} y={72} size={14.5} c={i === 2 ? C.accentInk : C.ink3}>{label}</Mono>
            <Bar x={BOARD_COLS[i]} y={100} w={200} h={1} c={C.ruleStrong} />
          </Fragment>
        ))}
        <Bar x={30} y={438} w={680} h={1} c={C.rule} />
        <Mono x={30} y={446} size={13}>{L.cadence}</Mono>
        {[0, 1, 2, 3, 4].map((i) => (
          <Bar key={i} x={200 + i * 128} y={434} w={1} h={9} c={C.ruleStrong} />
        ))}
        <div style={{
          position: "absolute", left: sweep - 3.5, top: 431, width: 7, height: 7, borderRadius: 4,
          background: C.accent, opacity: interpolate([16.4, 16.8, 19.9, 20.1], [0, 1, 1, 0])(T),
        }} />
        <div style={{
          position: "absolute", left: sweep, top: 104, width: 1, height: 326, background: C.accent,
          opacity: interpolate([16.4, 16.9, 19.8, 20.1], [0, 0.35 * beat, 0.35 * beat, 0])(T),
        }} />
      </div>
    </Fragment>
  );
}

/* ---------- Phasenleiste und Kamera ---------- */

/** Die Leiste spannt über die volle Bühnenbreite: vier Zellen plus Rand. */
const RAIL_X0 = 10;
const RAIL_CELL = Math.floor((STAGE_W - 2 * RAIL_X0) / 4);

function Rail({ T, L }: { T: number; L: FilmCopy }) {
  const centers = L.phases.map((_, i) => RAIL_X0 + i * RAIL_CELL + RAIL_CELL / 2);
  const railX = interpolate(
    [0, CUES.Entscheiden - 0.45, CUES.Entscheiden + 0.35,
     CUES.Uebersetzen - 0.45, CUES.Uebersetzen + 0.35,
     CUES.Liefern - 0.45, CUES.Liefern + 0.35, 19.9, 20.45],
    [centers[0], centers[0], centers[1], centers[1], centers[2], centers[2], centers[3], centers[3], centers[0]],
    Easing.easeInOutCubic,
  )(T);
  let active = 0;
  let best = Infinity;
  centers.forEach((c, i) => {
    const d = Math.abs(c - railX);
    if (d < best) { best = d; active = i; }
  });
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: STAGE_W, height: 46 }}>
      {L.phases.map((label, i) => (
        <div key={label} style={{
          position: "absolute", left: RAIL_X0 + i * RAIL_CELL, top: 10, width: RAIL_CELL, textAlign: "center",
          fontFamily: F.mono, fontSize: 15.5, letterSpacing: "0.1em", textTransform: "uppercase",
          color: i === active ? C.accentInk : C.ink3, opacity: i === active ? 1 : 0.5,
        }}>{label}</div>
      ))}
      <div style={{ position: "absolute", left: railX - RAIL_CELL * 0.45, top: 36, width: RAIL_CELL * 0.9, height: 1.5, background: C.accent }} />
      <Bar x={0} y={45} w={STAGE_W} h={1} c={C.rule} />
    </div>
  );
}

/** Kamerafahrt: Position und Zoom über die Weltebene. */
const CAM_T = [0, 2.3, 4.25, 5.5, 8.2, 9.75, 10.9, 12.7, 14.05, 15.25, 17.0, 19.2, 20.15, 20.5];
const CAM_X = [360, 360, 552, 360, 360, 360, 360, 360, 186, 360, 360, 360, 360, 360];
const CAM_Y = [246, 250, 300, 250, 254, 392, 250, 252, 192, 250, 250, 246, 246, 246];
const CAM_S = [1.0, 1.03, 1.34, 1.0, 1.05, 1.4, 0.95, 0.98, 1.4, 0.95, 0.98, 1.0, 1.0, 1.0];

const camX = interpolate(CAM_T, CAM_X, Easing.easeInOutCubic);
const camY = interpolate(CAM_T, CAM_Y, Easing.easeInOutCubic);
const camS = interpolate(CAM_T, CAM_S, Easing.easeInOutCubic);

function Stage({ T, L }: { T: number; L: FilmCopy }) {
  const cx = camX(T);
  const cy = camY(T);
  const cs = camS(T);
  return (
    <div style={{ position: "absolute", inset: 0, background: C.paper, fontFamily: F.sans }}>
      <Rail T={T} L={L} />
      <div style={{ position: "absolute", left: WORLD_LEFT, top: WORLD_TOP, width: W, height: H, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0",
          transform: `translate(${W / 2 - cx * cs}px,${H / 2 - cy * cs}px) scale(${cs})`,
        }}>
          <PhaseUnderstand T={T} L={L} />
          <Board T={T} L={L} />
          <PhaseNarrative T={T} L={L} />
          <Packages T={T} L={L} />
        </div>
      </div>
    </div>
  );
}

/**
 *  Der Film in einem Rahmen, der sich auf die verfügbare Breite skaliert.
 *
 *  Die Bühne hat feste Maße (760×584) — die Choreografie rechnet in diesen
 *  Koordinaten. Angepasst wird über `scale`, nicht über ein Neurechnen des
 *  Layouts; sonst würden Kamerafahrt und Positionen auseinanderlaufen.
 */
export default function MethodFilm({ label, copy }: { label: string; copy: FilmCopy }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const T = useFilmClock(frameRef);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE_W);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mf-frame" ref={frameRef} role="img" aria-label={label}>
      <div
        className="mf-stage"
        aria-hidden="true"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        <Stage T={T} L={copy} />
      </div>
    </div>
  );
}
