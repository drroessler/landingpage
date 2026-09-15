/** Zeitachse für den Methoden-Film im Hero.
 *
 *  Portiert aus der Runtime des Entwurfs („animations-v3"), reduziert auf das,
 *  was der Film tatsächlich benutzt. Die Formeln sind bewusst unverändert
 *  übernommen — die Choreografie ist auf genau diese Kurven abgestimmt.
 */

import { useEffect, useRef, useState } from "react";

export const Easing = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
} as const;

type Ease = (t: number) => number;

/** Stückweise Interpolation über Stützstellen; außerhalb wird geklemmt. */
export function interpolate(
  input: readonly number[],
  output: readonly number[],
  ease: Ease = Easing.linear,
): (t: number) => number {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        return output[i] + (output[i + 1] - output[i]) * ease(local);
      }
    }
    return output[output.length - 1];
  };
}

/** Einzelner Tween: vor `start` gilt `from`, nach `end` gilt `to`. */
export function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: Ease;
}): (t: number) => number {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

/** Szenen des Films. Die Startzeiten sind die laufende Summe der Dauern —
 *  der Film verweist über sie auf die Phasenwechsel. */
export const SCENES = [
  { name: "Verstehen", dur: 5 },
  { name: "Entscheiden", dur: 5.5 },
  { name: "Uebersetzen", dur: 5 },
  { name: "Liefern", dur: 5 },
] as const;

export const CUES: Record<string, number> = (() => {
  const table: Record<string, number> = {};
  let start = 0;
  for (const s of SCENES) {
    table[s.name] = start;
    start += s.dur;
  }
  return table;
})();

export const TOTAL = SCENES.reduce((sum, s) => sum + s.dur, 0);

/** Repräsentativer Standbild-Zeitpunkt: das aufgebaute Narrativ mit
 *  Randkommentaren und Freigaben — die aussagekräftigste Einzelansicht. */
export const POSTER_T = 10.0;

/**
 *  Laufende Zeit in Sekunden, 0 → TOTAL, danach von vorn.
 *
 *  Läuft nur, solange der Film wirklich zu sehen ist: außerhalb des Viewports
 *  oder in einem Hintergrund-Tab steht die Uhr. Bei `prefers-reduced-motion`
 *  bleibt sie ganz aus und der Film zeigt ein Standbild.
 */
export function useFilmClock(ref: React.RefObject<HTMLElement | null>): number {
  const [t, setT] = useState(POSTER_T);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const raf = useRef(0);

  // Die Einstellung kann sich im laufenden Betrieb ändern (Systemeinstellungen).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const node = ref.current;
    if (!node) return;

    let visible = false;
    let startedAt = 0;
    let elapsed = 0;
    // ~30 fps: der Film ist ruhig gesetzt, 60 fps wären hier nur doppelte
    // Rechenlast für dieselbe Wirkung.
    const step = 1000 / 30;
    let lastPaint = 0;

    const tick = (now: number) => {
      raf.current = requestAnimationFrame(tick);
      if (now - lastPaint < step) return;
      lastPaint = now;
      setT(((elapsed + (now - startedAt)) / 1000) % TOTAL);
    };

    const start = () => {
      if (raf.current) return;
      startedAt = performance.now();
      raf.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!raf.current) return;
      elapsed += performance.now() - startedAt;
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };

    const sync = () => {
      if (visible && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, [ref, reduced]);

  return reduced ? POSTER_T : t;
}
