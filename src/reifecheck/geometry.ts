/** Geometrie des Netzdiagramms — geteilt von Web-Ansicht und PDF, damit beide
 *  dieselbe Figur zeigen.
 *
 *  Bewusste Festlegung aus der Vorlage: Stufe 1 liegt auf dem INNEREN RING,
 *  nicht im Mittelpunkt. Läge die schwächste Stufe im Zentrum, fiele die Fläche
 *  eines schwach vorbereiteten Vorhabens fast zum Punkt zusammen — der Empfänger
 *  sähe ein Bild, das ihn beschämt, und läse nicht weiter.
 */

export const CENTER = { x: 160, y: 150 };
export const VIEWBOX = "-40 8 400 292";
/** Radius je Stufe: innerer Ring, mittlerer Ring, äußerer Ring. */
export const RADII = [48, 78, 108] as const;

/** Sechs Achsen im Uhrzeigersinn ab oben. */
const ANGLES = [0, 1, 2, 3, 4, 5].map((i) => (-90 + i * 60) * (Math.PI / 180));

export function point(axisIndex: number, radius: number): { x: number; y: number } {
  const a = ANGLES[axisIndex];
  return {
    x: round(CENTER.x + radius * Math.cos(a)),
    y: round(CENTER.y + radius * Math.sin(a)),
  };
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Polygonpunkte für einen der drei Ringe. */
export function ringPoints(stufe: 1 | 2 | 3): string {
  return polygon(ANGLES.map((_, i) => point(i, RADII[stufe - 1])));
}

/** Polygonpunkte der gefüllten Fläche aus sechs Stufenwerten. */
export function areaPoints(stufen: readonly number[]): string {
  return polygon(stufen.map((s, i) => point(i, RADII[clampStufe(s) - 1])));
}

/** Die sechs Eckpunkte der Fläche, für die Markierungspunkte. */
export function areaVertices(stufen: readonly number[]): { x: number; y: number }[] {
  return stufen.map((s, i) => point(i, RADII[clampStufe(s) - 1]));
}

export function axisLines(): { x1: number; y1: number; x2: number; y2: number }[] {
  return ANGLES.map((_, i) => {
    const outer = point(i, RADII[2]);
    return { x1: CENTER.x, y1: CENTER.y, x2: outer.x, y2: outer.y };
  });
}

/** Beschriftungsanker je Achse, aus der Vorlage übernommen. */
export const AXIS_LABELS = [
  { x: 160, y: 26, anchor: "middle" as const },
  { x: 264, y: 94, anchor: "start" as const },
  { x: 264, y: 210, anchor: "start" as const },
  { x: 160, y: 284, anchor: "middle" as const },
  { x: 56, y: 210, anchor: "end" as const },
  { x: 56, y: 94, anchor: "end" as const },
];

/** Stufenziffern entlang der oberen Achse. */
export const TICKS = [
  { label: "1", x: 166, y: 106 },
  { label: "2", x: 166, y: 76 },
  { label: "3", x: 166, y: 46 },
];

function clampStufe(s: number): 1 | 2 | 3 {
  return (s < 1 ? 1 : s > 3 ? 3 : s) as 1 | 2 | 3;
}

function polygon(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}
