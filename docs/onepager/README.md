# NarraTec — Methoden-One-Pager (PDF)

Zweikommunikationsstück für niederschwellige Conversion: A4, zwei Seiten (ein Blatt
beidseitig), gedacht als Anhang vor dem Erstgespräch, als Leave-behind nach einem Termin
und als Download auf der Landingpage.

**Ergebnis:** `NarraTec-Methode-Onepager-DE.pdf`

## Inhalt

| Seite | Abschnitte |
|---|---|
| 1 | 01 Positionierung · 02 Ist-Zustand (drei Befunde + Execution Gap) · 03 Die Methode (Ablaufgrafik, vier Phasen) · 05 Narrative Feedback Cycle |
| 2 | 04 Nachverfolgbarkeit (Transformationskette am FOSS-Fall) · 05 Belege + Publikationen · 06 Leistungen · 07 Wann wir absagen · 08 Team · Abschluss-CTA mit QR-Code |

Fachliche Grundlage sind die drei Manuskripte von Rößler & Wieland
(Vorgehensmodell zur Narrativerstellung, Narrative-to-Action, Narrative Feedback Cycle);
Tonalität, Copy und Designsystem sind an `src/components/RedesignLanding.tsx` und
`src/redesign.css` angeglichen.

## Bauen

```bash
python3 docs/onepager/build.py
```

Das Skript setzt aus `onepager-de.html` + `flow.svg` eine vollständig eingebettete HTML
zusammen (Google-Fonts-Subsets als data-URI, QR-Code als Inline-SVG, Portraits als
data-URI), rendert sie über Playwright/Chromium nach A4 und setzt die PDF-Metadaten.
`--html-only` überspringt das Rendern.

Voraussetzungen: `pip install segno playwright pypdf && playwright install chromium`.
Ohne Playwright greift das Skript auf einen installierten Chromium-Browser zurück; ohne
beides bleibt der Weg über *Drucken → Als PDF sichern* (A4, Ränder: keine,
Hintergrundgrafiken an).

Die Font-Subsets werden nach `build/.cache/fonts-inline.css` gecacht — Datei löschen,
um sie neu zu laden.

## Bearbeiten

* **Copy und Layout:** `onepager-de.html` (ein File, Design-Tokens oben im `<style>`).
* **Ablaufgrafik:** `flow.svg`, Koordinatensystem `viewBox="0 0 700 96"`.
* **QR-Ziel:** Konstante `BOOKING_URL` in `build.py`. Der Parameter `?src=onepager`
  macht Buchungen aus dem PDF im Kalender-Tool unterscheidbar.

Jede Seite ist eine `.page` mit fester Höhe (`296.8mm`) und `overflow:hidden`. Nach
inhaltlichen Änderungen prüfen, dass nichts abgeschnitten wird — am schnellsten über die
gebaute HTML im Browser:

```js
[...document.querySelectorAll('.page')].map(p => {
  const r = p.getBoundingClientRect(); let max = 0;
  p.querySelectorAll('*').forEach(el => { const q = el.getBoundingClientRect();
    if (q.height) max = Math.max(max, q.bottom - r.top); });
  return (r.height - max) / r.height * 296.8;   // freier Rest in mm, muss > 0 sein
})
```

## Anmerkungen

* Keine €-Beträge; die Preiszeilen nennen nur das Abrechnungsmodell.
* Die Fallzahlen stammen aus der Landingpage und den Manuskripten. Die Spanne „50–90 %“
  ist bewusst mit dem Hinweis auf die umstrittene Datenbasis versehen — so steht sie auch
  im Manuskript.
* Fonts liegen als Type3-Vektorglyphen im PDF (Chromium-Export variabler Schriften) und
  sind damit vollständig eingebettet. Die drei Pfeilzeichen `← → ↺` fehlen im
  latin-Subset von JetBrains Mono und kommen als eingebetteter Menlo-Ausschnitt mit.
* Eine englische Fassung existiert noch nicht; sie wäre eine Kopie mit übersetzter Copy
  (`onepager-en.html`) und einem zweiten Build-Ziel.
