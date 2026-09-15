# NarraTec Landingpage

Vite + React + TypeScript. Landingpage, Rechtsseiten und der **Reifecheck** —
eine Selbstdiagnose, die nach neun Fragen ein Auswertungsdokument erzeugt, es
per Mail zustellt und den Vorgang in Notion ablegt.

## Entwickeln

```bash
npm install
npm run dev
```

Mit der Serverfunktion (braucht die Umgebungsvariablen aus [api/README.md](api/README.md)):

```bash
npx vercel dev
```

## Routen

| Pfad | Inhalt |
|---|---|
| `/` | Landingpage inklusive Reifecheck-Sektion (`#reifecheck`) |
| `/impressum`, `/datenschutz`, `/agb` | Rechtsseiten |

## Methoden-Film im Hero

Der Hero ist zweispaltig: Copy links, rechts ein durchlaufender Film der vier
Phasen (`src/hero/`). Portiert aus dem Claude-Design-Entwurf
„NarraTec Hero Methode.dc.html".

```
src/hero/
  timeline.ts    Zeitachse: Easings, interpolate, animate, useFilmClock
  MethodFilm.tsx Die Komposition — Weltebene 720×500, Kamerafahrt, vier Phasen
  filmCopy.ts    Beschriftungen im Film, DE und EN
```

**Wie er aufgebaut ist:** eine Bühne mit festen Maßen (893×584, sichtbar 893×558
= 16:10), die per `transform: scale()` auf die Spaltenbreite gebracht wird. Der
Entwurf war 760 breit; für 16:10 wurde die Bühne **verbreitert, nicht gekürzt** —
gekürzt hätte sie unten in die Welt geschnitten, die bis 556 reicht. Die Welt
(720 breit) steht darin zentriert. Alle Positionen und
die Kamerafahrt rechnen in diesen Koordinaten — wird das Layout stattdessen neu
berechnet, laufen Choreografie und Positionen auseinander. Die vier Phasen
überlagern einander auf einer gemeinsamen Ebene statt sich abzulösen; die
Arbeitspakete wandern sichtbar aus dem Narrativ heraus. Gesamtlänge 20,5 s,
danach von vorn.

**Was den Film anhält:**

| Zustand | Verhalten |
|---|---|
| außerhalb des Viewports | Uhr steht (IntersectionObserver) |
| Tab im Hintergrund | Uhr steht (`visibilitychange`) |
| `prefers-reduced-motion: reduce` | Standbild bei `POSTER_T`, keine Uhr |
| sonst | ~30 fps — der Film ist ruhig gesetzt, 60 fps wären nur doppelte Last |

Beim Ändern der Choreografie: die Zeitangaben in `MethodFilm.tsx` sind Sekunden
auf der Gesamtachse, die Phasenwechsel liegen bei 0 / 5 / 10,5 / 15,5 (`CUES`).

## Reifecheck

Der Reifecheck ist **Sektion 10 der Landingpage** (`#reifecheck`), keine eigene
Seite: Einführung, Fragen, Kontaktdaten und Auswertung wechseln an Ort und Stelle.
Er ist der bevorzugte Kontaktweg — alle Haupt-CTAs (Navigation, Hero, mittlerer
Abschnitt) springen dorthin. Die dunkle Abschlussbande darunter führt zur
Kalenderbuchung, die Mailadresse steht in Fußzeile und Auswertung.

```
src/reifecheck/
  data.ts        Fragen, Antwortoptionen, Feedback-Statements (Quelle: reifecheck_set1_v40.md)
  copy.ts        Textpassagen des Dokuments und des Formulars
  evaluate.ts    Auswertungsregeln — eine Regel, keine Rechnung, kein Sprachmodell
  geometry.ts    Geometrie des Netzdiagramms, geteilt von Web-Ansicht und PDF
  ReifecheckSection.tsx  Sektion der Landingpage: Einführung → neun Fragen →
                         Kontaktdaten → Auswertung, alles an Ort und Stelle
  ResultView.tsx         Auswertung im Browser
api/
  reifecheck.ts  Serverfunktion: auswerten, PDF rendern, versenden, in Notion ablegen
  _lib/          Dokument, PDF, Mail, Notion, eingebettete Schriften
```

**Eine Quelle für die Inhalte:** Bildschirmfassung, PDF und Notion-Eintrag lesen
alle aus `src/reifecheck/data.ts` und `copy.ts`. Wer dort eine Formulierung
ändert, ändert alle drei.

**Der Server rechnet neu.** Was der Browser an Statements angezeigt hat, wird
nicht übernommen — sonst ließe sich der Inhalt des Dokuments von außen bestimmen.

Beispiel-PDF ohne Versand erzeugen:

```bash
npm run pdf:sample -- auswertung.pdf
```

### Das Dokument hat genau drei Seiten

| Seite | Inhalt |
|---|---|
| 1 | Titel, Vorspann, Diagramm 1 |
| 2 | Status und Kontext (F1–F3) **und** Die sechs Punkte (R1–R6) |
| 3 | Diagramm 2, Nächster Schritt, methodischer Hinweis |

Die Umbrüche sind gesetzt (`.nt-page-2`, `.nt-page-3` mit `break-before: page`),
nicht erhofft. Passt der Inhalt einer Seite nicht mehr, entsteht **lautlos eine
vierte Seite**. Nach jeder Änderung an Copy oder Gestaltung deshalb:

```bash
npm run pdf:check
```

Das rendert zwei Fälle und prüft beide: die Antworten des Gestaltungsentwurfs und
den **ungünstigsten Fall** — je Frage die Option, die den höchsten Block ergibt.
Maßgeblich ist der zweite: die Seitenhöhe hängt davon ab, was der Interessent
ankreuzt. Welche Option die höchste ist, lässt sich nicht an der Textlänge
ablesen (Frage und Einordnung stehen in verschiedenen Spalten, die höhere
bestimmt die Zeile) — deshalb misst `npm run pdf:worst` alle Optionen einzeln
und schreibt das Ergebnis nach `scripts/worst-case.json`. Nach Änderungen an den
Antworttexten in `data.ts` einmal neu bestimmen lassen.

Die Stellschraube für die Höhe ist die Typo-Skala `T` am Kopf von
`api/_lib/document.ts`. Seite 2 ist die enge; sie hat rund 33 pt Reserve.

### Die Vorschau auf der Landingpage

Die Reifecheck-Sektion zeigt eine Miniatur der **echten** ersten Seite
(`public/reifecheck-auswertung-seite1.jpg`), gerendert aus demselben
`renderDocumentHtml()`. Nach Änderungen am Dokument neu erzeugen:

```bash
npm run preview:build
```

`npm run pdf:check` meldet, wenn das Bild älter ist als `document.ts`, `copy.ts`,
`data.ts` oder `geometry.ts` — sonst würde die Vorschau lautlos etwas anderes
zeigen als das, was verschickt wird. Beides braucht **poppler** (`pdftoppm`,
`pdftotext`, `pdfinfo`), unter macOS via `brew install poppler`.

Die Seitenränder stehen **nur** in `api/_lib/pdf.ts` (`page.pdf({ margin })`).
In `@page` gehören sie nicht: Chromium addiert dann beide, und mit `margin: 0`
verliert der Inhalt die Ränder ganz und läuft in Kopf- und Fußzeile.

Die Bildschirmfassung (`ResultView.tsx`) ist bewusst großzügiger gesetzt — sie
hat keine Seitengrenze und wird gescrollt, nicht geblättert. Beim Ausdrucken der
Landingpage blendet `reifecheck.css` alles außer der Auswertung aus, damit auch
der Browser-Druck ein brauchbares Dokument liefert.

## Bereitstellung

Vercel, verbunden mit diesem Repository. Jeder Push auf `main` baut und
veröffentlicht; Branches bekommen eine Vorschau-URL.

* Build: `npm run build` → `dist/`
* Umgebungsvariablen: siehe [api/README.md](api/README.md)
* Routen: `vercel.json` leitet alles außer `/api/*` auf `index.html`

Die Seite lief vorher auf GitHub Pages mit `HashRouter` (`/#/impressum`). Seit
dem Umzug gilt `BrowserRouter`; alte Hash-Links werden in `src/main.tsx` einmalig
auf den neuen Pfad umgeschrieben, damit geteilte Links weiter funktionieren.

## Prüfen

```bash
npm run build                    # Typen (App + API) und Produktionsbau
npm run lint
npm run pdf:check                # Seitenaufteilung des PDF, beide Antwortfälle
node scripts/test-endpoint.mjs   # Endpunkt gegen Fehlbedienung und Gutfall
```
