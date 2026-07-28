# Review: Kundenansprache & Lead-Generierung

**Gegenstand:** `src/components/RedesignLanding.tsx` (landingDe/landingEn), `index.html`
**Zielgruppe:** (IT-)Entscheider in Mittelstand & Konzern · **Ziel:** gebuchte Erstgespräche
**Kanal:** organischer Traffic + LinkedIn ab Herbst 2026
**Stand:** 28.07.2026 · keine Dateien der Seite geändert

---

## A) Kurzurteil

Die Seite ist inhaltlich deutlich besser als das, was in diesem Segment üblich ist. Der Problemabschnitt trifft
präzise, was Entscheider erleben („Folien machen schwierige Fragen flacher, als sie sind"), das Narrativ-Callout
erklärt den Kernbegriff in sechs Zeilen, und die Abgrenzungssektion („Wann wir absagen") ist ein Vertrauensasset,
das fast niemand hat. Der Ton ist erwachsen, nicht vertrieblich — genau richtig für diese Zielgruppe.

Die größte Conversion-Bremse ist nicht der Text, sondern die **Reihenfolge der Beweisführung**: Die drei Sektionen,
die Skepsis abbauen (Praxisfälle, Personen mit Springer-Publikation, Abgrenzung), sind explizit als „Anhang A/B/C"
etikettiert und stehen hinter Methode und Preisen. Ein kalter Besucher wird also gebeten, über 15.000 € nachzudenken,
bevor er weiß, wer Sie sind und dass die Methode peer-reviewed ist. Zweitgrößte Bremse: Die Seite beantwortet die
Frage, die diese Zielgruppe als Erstes stellt — *„was kostet mich das an interner Zeit?"* — an keiner Stelle, obwohl
das Modell komplett auf der Zeit Ihrer eigenen Leute aufbaut. Für LinkedIn fehlt zusätzlich die technische Basis:
Es gibt keine Open-Graph-Tags, jeder geteilte Link rendert als grauer Kasten ohne Bild.

---

## B) Priorisierte Vorschläge

| # | Sektion | Befund | Vorschlag | Wirkung | Aufwand | Fundstelle |
|---|---------|--------|-----------|---------|---------|------------|
| 1 | `<head>` | Keine Open-Graph-/Twitter-Tags. Jeder LinkedIn-Post mit Link rendert ohne Bild und mit von LinkedIn selbst zusammengesuchtem Text. Kein OG-Bild in `public/` vorhanden. | Vollständigen OG-Block ergänzen + 1200×630-Bild anlegen. Vor dem ersten Post erledigen, sonst verbrennen Sie Reichweite an einer 20-Minuten-Aufgabe. | H | N | [index.html:7](index.html:7) |
| 2 | Alle CTAs | Vier Buttons, zwei verschiedene Beschriftungen für dieselbe Aktion. „Erstgespräch **anfragen**" verspricht ein Formular mit Wartezeit, dahinter liegt ein Kalender mit Sofortbuchung — die Seite lässt sich schlechter aussehen, als sie ist. | Eine einheitliche Beschriftung, die die Mechanik nennt: „30 Min Erstgespräch buchen". Zusätzlich eine Mail-Alternative sichtbar machen (heute nur im Footer). | H | N | [:23-30](src/components/RedesignLanding.tsx:23), [:464](src/components/RedesignLanding.tsx:464), [:530](src/components/RedesignLanding.tsx:530) |
| 3 | Methode / Leistungen | Der interne Zeitaufwand wird nirgends beziffert. Genau das ist bei einem Enablement-Modell der zentrale Einwand: unbezifferter interner Aufwand = unbegrenztes Risiko. Nächste Angabe ist „mehrere Wochen". | Einen kurzen Block „Was es Sie an Zeit kostet" mit Personenzahl, Stunden pro Kopf und Dauer. Zahlen brauche ich von Ihnen. | H | N | [:75](src/components/RedesignLanding.tsx:75), [:93](src/components/RedesignLanding.tsx:93) |
| 4 | Hero | Headline und Lede beschreiben einen Prozess, nennen aber weder Kategorie noch Adressat. Ein fremder CIO erfährt in den ersten 5 Sekunden nicht, dass er gemeint ist. Der Rubrik-Slot darüber („01 MOTIVATION & ZIELSETZUNG") ist inhaltsleer. | Rubrik trägt den Adressaten, Lede nennt den Peer-Review-Status. Headline bleibt — sie ist gut und markenbildend. | H | N | [:39-49](src/components/RedesignLanding.tsx:39) |
| 5 | Struktur | Praxisbelege, Team (inkl. Springer-Paper) und Abgrenzung sind als „ANHANG A/B/C" etikettiert und stehen hinter den Preisen. Das Layout sagt dem Besucher wörtlich: „hier kommt nur noch Anhang". | Umbenennen in 06/07/08 und Belege + Personen **vor** Leistungen & Preise ziehen. Beweis vor Preis. | H | M | [:105](src/components/RedesignLanding.tsx:105), [:171](src/components/RedesignLanding.tsx:171), [:194](src/components/RedesignLanding.tsx:194), [:897-909](src/components/RedesignLanding.tsx:897) |
| 6 | Trust-Bar | Der stärkste Beleg, den Sie haben — peer-reviewed bei Springer — steht auf Position 9 von 11. Kein Wettbewerber kann das behaupten. | Peer-Review in die Trust-Bar direkt unter dem Hero. | H | N | [:50-54](src/components/RedesignLanding.tsx:50), [:185-191](src/components/RedesignLanding.tsx:185) |
| 7 | Trust-Bar | „Sie beauftragen uns zum Festpreis, **ohne Risiko**." Ein Festpreis begrenzt das Kostenrisiko, nicht das Ergebnisrisiko. Ein Entscheider liest das als Werbesprache — mitten in einer Sektion, die Substanz beweisen soll. | „ohne Risiko" streichen; der Festpreis trägt allein. Oder durch eine echte Zusage ersetzen, falls es eine gibt. | M | N | [:52](src/components/RedesignLanding.tsx:52) |
| 8 | Pre-Read-PDF | Das Manuskript (1,7 MB) wird ungetrackt als statische Datei aus der Team-Sektion verlinkt. Wer es lädt, verschwindet — kein Anschluss, kein Signal. Für kalten LinkedIn-Traffic ist das das naheliegendste Conversion-Asset. | Offen lassen (ein Gate widerspricht „kein Vertrieb"), aber als Event tracken und direkt daneben den zweiten Schritt anbieten. | H | M | [:14](src/components/RedesignLanding.tsx:14), [:188-191](src/components/RedesignLanding.tsx:188) |
| 9 | Analytics | Umami läuft, aber kein einziger CTA sendet ein Event. Sie werden nach dem LinkedIn-Start nicht sagen können, welche Sektion oder welcher Post Buchungen erzeugt. | `data-umami-event` auf alle vier CTAs, den Pre-Read-Link und das Springer-Paper. | H | N | [index.html:13](index.html:13) |
| 10 | `<head>` | Die Meta-Description verspricht „in Tagen statt Monaten" — diese Aussage steht nirgends auf der Seite. Wer über Suche kommt, findet stattdessen „mehrere Wochen". | Description an die tatsächliche Positionierung und an die Zielgruppe angleichen. | M | N | [index.html:8](index.html:8) |
| 11 | Nächste Schritte / Final | Beide CTA-Sektionen tragen wortgleich dieselbe Überschrift und denselben Fließtext. Wörtliche Wiederholung liest sich als Template-Artefakt, nicht als Verstärkung. | Mittige Sektion auf den kleinen Schritt drehen (Pre-Read lesen), finale Sektion auf die Buchung. | M | N | [:99-103](src/components/RedesignLanding.tsx:99), [:203-207](src/components/RedesignLanding.tsx:203) |
| 12 | Team | Die Credential-Chips sind generisch („10+ Jahre IT-Steuerung", „Methodenexperte in komplexen Vorhaben") — währenddessen stehen die harten Fakten (Technical Lead Data & AI im DAX-Konzern, acatech-Forschungsbeirat, DFKI-Aufsichtsrat, Neuausrichtung einer 500-Personen-Organisation) mitten im dritten Absatz. | Chips mit den harten Fakten belegen. Gleiche Fläche, ungleich mehr Wirkung. | M | N | [:178](src/components/RedesignLanding.tsx:178), [:183](src/components/RedesignLanding.tsx:183) |
| 13 | Praxis · Fall 2 | Der Ist-Zustand ist beziffert („mehrere Wochen"), das Ergebnis nicht („deutlich schneller"). Die einzige echte Vorher-Nachher-Zahl der Seite fehlt genau dort, wo sie hingehört. | Nachher-Wert ergänzen, falls freigebbar. Ein „von 6 Wochen auf 2 Tage" ist mehr wert als der ganze Absatz. | H | N | [:134-141](src/components/RedesignLanding.tsx:134) |
| 14 | Problem | Die Kostenzeilen bleiben abstrakt („Investitionen ohne Wirkung", „Kein Alignment, kein Fortschritt"). Ein CIO, der das intern weiterträgt, braucht die Währung seines CFO. | Kosten in Zeit oder Geld übersetzen — notfalls mit Literaturbeleg, den Sie als publizierender Autor sauber zitieren können. | M | M | [:60-62](src/components/RedesignLanding.tsx:60) |
| 15 | Einsatzgebiete | „Technical Sales" adressiert einen anderen Käufer (Vertrieb eines Anbieters), nicht Ihre Zielgruppe. Es fehlen die Anlässe, für die IT-Entscheider tatsächlich Budget haben: Legacy-/Plattformentscheidung, Make-or-Buy, Sourcing-Auswahl, Post-Merger-IT-Integration. | Einen Fall tauschen. Falls Technical Sales ein reales Umsatzsegment ist, bleibt es — dann gehört es aber deutlich als Zweitzielgruppe markiert. | M | M | [:166](src/components/RedesignLanding.tsx:166) |
| 16 | Referenzen | Kein einziges Zitat auf der Seite — auch kein anonymisiertes. Bei drei DAX-Vorhaben ist ein rollenanonymisierter O-Ton („Bereichsleiter IT, DAX-Konzern") meist NDA-verträglich und wirkt stärker als jede Selbstbeschreibung. | Ein bis zwei Zitate einholen und in die Praxis-Sektion setzen. | H | M | [:104-159](src/components/RedesignLanding.tsx:104) |
| 17 | Sprache | Sprachwahl liegt nur in `localStorage`, nicht in der URL. Ein englischsprachiger LinkedIn-Post kann nicht auf die englische Seite verlinken; Nicht-Deutschsprachige landen zuerst auf Deutsch. | `?lang=en` auswerten, falls LinkedIn auch englisch bespielt wird. Sonst bewusst zurückstellen. | M | M | [LanguageContext.tsx:17-25](src/i18n/LanguageContext.tsx:17) |
| 18 | EN-Fassung | „Proven across several initiatives in a DAX corporation" — außerhalb des deutschsprachigen Raums sagt „DAX" nichts. | Kurze Glosse ergänzen. Ansonsten ist die EN-Fassung inhaltlich und in der Schärfe gleichwertig; „Book an intro call" ist sogar besser als das deutsche „anfragen" (siehe #2). | N | N | [:242](src/components/RedesignLanding.tsx:242) |
| 19 | Preise | Strategische Frage, keine Copy-Frage: „ab 15.000 €" qualifiziert im Mittelstand gut vor, kann im Konzern aber als *klein* ankern und das Vorhaben tektonisch als taktisch einordnen. | Nicht blind entfernen. Entweder Preise behalten und gegen das Investitionsvolumen ankern, über das entschieden wird — oder Einstiegspreis behalten, obere Pakete auf „auf Anfrage". Entscheidung bei Ihnen, siehe Frage D4. | M | M | [:93-96](src/components/RedesignLanding.tsx:93) |

**Ausdrücklich nicht ändern:** Problemsektion (Befunde A–C), Narrativ-Callout, KI-Grundsatz, Abgrenzungssektion,
Hero-Headline, der durchgehende Dokument-Duktus mit Rubriken. Das ist die Substanz, die die Seite vom Umfeld
abhebt — Kürzen oder „conversion-optimiertes" Glätten würde hier Wert vernichten.

---

## C) Konkrete Textvorschläge — Top 5

### C1 · Social-/Meta-Tags (Tabelle #1, #10) — `index.html`

**Ist** ([index.html:7-8](index.html:7)):

> `<title>NarraTec — Evidenzbasierte IT-Entscheidungen</title>`
> `<meta name="description" content="NarraTec übersetzt komplexe IT-Entscheidungen in strukturierte Narrative — evidenzbasiert, in Tagen statt Monaten, intern getragen bis ins Arbeitspaket." />`

**Neufassung:**

```html
<title>NarraTec — Evidenzbasierte Entscheidungen in IT-Vorhaben</title>
<meta name="description" content="Für IT-Entscheider in Konzern und Mittelstand: von der Ursachenanalyse über ein tragfähiges Entscheidungsnarrativ bis ins Arbeitspaket. Peer-reviewed publiziert, zum Festpreis." />

<meta property="og:type" content="website" />
<meta property="og:url" content="https://narratec.io/" />
<meta property="og:site_name" content="NarraTec" />
<meta property="og:locale" content="de_DE" />
<meta property="og:title" content="Vom Problem zur Entscheidung. Von der Entscheidung in die Umsetzung." />
<meta property="og:description" content="Ihre Fachleute haben die Antworten. NarraTec gibt ihnen die Struktur — eine peer-reviewed publizierte Methode für Entscheidungen in komplexen IT-Vorhaben." />
<meta property="og:image" content="https://narratec.io/og-narratec.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="NarraTec — vom Problem zur Entscheidung, von der Entscheidung in die Umsetzung" />
<meta name="twitter:card" content="summary_large_image" />
```

Das Bild `public/og-narratec.png` muss noch entstehen. Empfehlung: die Headline in der Seitentypografie auf dem
dunklen Hintergrund, unten klein „NarraTec · peer-reviewed publiziert, HMD/Springer". Kein Stockfoto.

---

### C2 · Hero (Tabelle #4, #6)

**Ist** ([RedesignLanding.tsx:40-47](src/components/RedesignLanding.tsx:40)):

> Rubrik: „01 MOTIVATION & ZIELSETZUNG"
> Lede: „Ihre Fachleute haben die Antworten. NarraTec gibt ihnen die Struktur: einen erprobten Weg von der Fragestellung zur begründeten Entscheidung — und von dort zu Arbeitspaketen und leistungsfähigen Teams."

**Neufassung** (Headline bleibt unverändert):

> Rubrik: **„01 FÜR ENTSCHEIDER IN KOMPLEXEN IT-VORHABEN"**
>
> Lede: **„Ihre Fachleute haben die Antworten. NarraTec gibt ihnen die Struktur: einen erprobten und wissenschaftlich publizierten Weg von der Fragestellung zur begründeten Entscheidung — und von dort zu Arbeitspaketen und leistungsfähigen Teams."**
>
> Abschluss (unverändert): „Wir befähigen Ihre Leute, statt sie zu ersetzen."

Zwei Eingriffe, beide klein: Die Rubrik kostet Sie nichts an Ästhetik und liefert den fehlenden Adressatenanker.
Die drei Wörter „und wissenschaftlich publizierten" ziehen Ihren stärksten Beleg aus Position 9 nach vorn.

**Trust-Bar** ([:50-54](src/components/RedesignLanding.tsx:50)) direkt darunter:

> Ist: „Sie beauftragen uns zum *Festpreis*, ohne Risiko."
> Neu: **„Sie beauftragen uns zum *Festpreis* — keine Tagessätze, keine offene Rechnung."**
>
> Ist: „Ihre sensiblen Informationen geschützt durch ein *NDA*."
> Neu: **„Peer-reviewed publiziert in *HMD — Praxis der Wirtschaftsinformatik* (Springer)."**
>
> Erste Zeile unverändert: „In mehreren Vorhaben im *DAX-Konzern* erprobt."

Das NDA verliert nichts: Es steht bereits in jeder CTA-Mikrozeile („NDA auf Wunsch") und damit häufiger sichtbar
als in der Trust-Bar.

---

### C3 · CTA-System (Tabelle #2, #11)

**Ist** ([:23-30](src/components/RedesignLanding.tsx:23)): vier Buttons, zwei Beschriftungen —
„Erstgespräch anfragen" (Nav, Nächste Schritte) und „30 Min Sparring mit den Gründern" (Hero, Final).

**Neufassung — eine Beschriftung überall:**

> `book:` **„30 Min Erstgespräch buchen"**
> `spar:` **„30 Min Erstgespräch buchen"**
> `seeMethod:` „Methode ansehen" *(unverändert)*
> `micro:` **„kostenfrei · direkt mit den Gründern · kein Vertrieb · NDA auf Wunsch"**
> `microShort:` **„30 Min · Termin direkt im Kalender · NDA auf Wunsch"**
> `finalMicro:` **„kostenfrei · Sie wählen den Termin selbst · NDA auf Wunsch"**

**Zusätzlich, als sekundäre Zeile unter dem CTA in der finalen Sektion:**

> **„Lieber erst eine Frage stellen? contact@narratec.io — Antwort in der Regel am selben Tag."**

Begründung: Ein Teil dieser Zielgruppe bucht nicht als Erstkontakt einen Kalendertermin, sondern will erst
schreiben oder intern weiterleiten. Heute steht die Adresse nur im Footer. Den Antwortzeit-Zusatz nur aufnehmen,
wenn Sie ihn halten können.

---

### C4 · Aufwandsblock (Tabelle #3) — neu, im Anschluss an die Methodenschritte

Auf der Seite existiert dazu heute nichts; nächstliegende Stelle ist
[:93](src/components/RedesignLanding.tsx:93) („mehrere Wochen").

**Neuer Block:**

> **Was es Sie kostet — an Zeit.**
>
> **Ein Narrative Sprint bindet fünf bis acht Ihrer Fachleute über rund sechs Wochen. Pro Kopf sind das etwa zwölf Stunden: vier moderierte Arbeitsrunden, eine Lesephase und der Entscheidungstermin. Aufbereitung, Schreiben und Qualitätsprüfung liegen bei uns. Wir brauchen Ihre Leute für ihr Wissen — nicht für Fleißarbeit.**

Ein Hinweis in eigener Sache: Die Zahlen (5–8 Personen, 6 Wochen, 12 Stunden) sind mein Vorschlag, abgeleitet aus
Ihrer Sprint-Beschreibung. Sie sind der einzige Teil dieses Dokuments, den ich nicht aus dem Repo belegen kann —
bitte gegen Ihre Erfahrung prüfen und ersetzen. Der Block wirkt nur, solange die Zahlen stimmen; eine geschönte
Angabe fällt Ihnen im zweiten Gespräch auf die Füße.

---

### C5 · Rubriken und Reihenfolge (Tabelle #5, #11)

**Ist** ([:105](src/components/RedesignLanding.tsx:105), [:171](src/components/RedesignLanding.tsx:171), [:194](src/components/RedesignLanding.tsx:194)):

> „A ANHANG · BELEGE AUS DER PRAXIS" · „B ANHANG · PERSONEN" · „C ANHANG · ABGRENZUNG"

**Neufassung der Rubriken:**

> **„06 BELEGE AUS DER PRAXIS"** · **„07 WER DAHINTER STEHT"** · **„08 WANN WIR ABSAGEN"**

**Neue Sektionsreihenfolge** ([:897-909](src/components/RedesignLanding.tsx:897)):

`Hero → Trust-Bar → 02 Problem → 03 Methode → 04 Einsatzgebiete → 05 Belege aus der Praxis → 06 Wer dahinter steht → CTA-Zwischenblock → 07 Leistungen & Preise → 08 Wann wir absagen → Final-CTA`

Nav-Labels entsprechend: `Problem · Methode · Einsatz · Praxis · Team · Leistungen`.

**Der CTA-Zwischenblock** (heute wortgleich mit dem Final-Block) bekommt eine eigene, kleinere Stufe:

> Rubrik: **„ZWISCHENSCHRITT"**
> Überschrift: **„Noch nicht so weit? Lesen Sie zuerst."**
> Text: **„Das Manuskript zur Methode beschreibt auf wenigen Seiten, wie aus einem Narrativ prüfbare Arbeitspakete werden. Kein Formular, keine Anmeldung — Sie laden es und entscheiden danach, ob ein Gespräch sich lohnt."**
> Button: **„Manuskript lesen (PDF)"** · Mikrozeile: **„13 Seiten · kein Formular"**

Damit bekommt die Seite erstmals einen Pfad für die Mehrheit der LinkedIn-Besucher, die heute noch nicht buchen —
und der Final-Block behält die Buchung exklusiv, statt sie zweimal identisch anzubieten.

---

## D) Offene Fragen an Sie

1. **Interner Aufwand:** Wie viele Personen, wie viele Stunden pro Kopf, über welchen Zeitraum — je Baustein? Ohne diese Zahlen bleibt C4 ein Entwurf.
2. **Fall 2 (Open-Source-Freigabe):** „mehrere Wochen" vorher — was ist der Nachher-Wert, und darf er veröffentlicht werden? Das ist die stärkste einzelne Zahl, die die Seite haben könnte.
3. **Zitate:** Gibt es Beteiligte aus den drei Vorhaben, die ein rollenanonymisiertes Zitat freigeben würden („Bereichsleiter IT, DAX-Konzern")? Das schlägt jede Selbstbeschreibung.
4. **Preisstrategie:** Preise auf der Seite behalten, gegen das Investitionsvolumen ankern, oder obere Pakete auf „auf Anfrage" setzen? Ich habe keine Empfehlung ohne Ihre Zahlen zu Lead-Qualität — für den Mittelstand sprechen die Preise, für den Konzern eher der Anker. (In einer früheren Fassung gab es offenbar eine Formulierung „unter 3 % des Investitionsvolumens" — bewusst entfernt oder verloren gegangen?)
5. **„ohne Risiko":** Steht dahinter eine echte Zusage (Abbruchoption, Nachbesserung, Rückerstattung)? Wenn ja, benennen wir sie. Wenn nein, streichen.
6. **Meta-Description:** Ist „in Tagen statt Monaten" noch wahr und nur nicht auf die Seite gewandert, oder überholt?
7. **Branchen:** Welche Branchen wollen Sie anziehen? Die Seite sagt „Konzernumfeld" und sonst nichts — für LinkedIn-Targeting brauchen Sie das ohnehin.
8. **LinkedIn-Sprache:** Nur Deutsch oder auch Englisch? Davon hängt ab, ob #17 (Deep-Link auf die EN-Fassung) Arbeit wert ist.
9. **OG-Bild:** Soll ich es aus der Seitentypografie generieren, oder haben Sie ein Asset?

---

## E) Umsetzung in drei Wellen

**Welle 1 — vor dem ersten LinkedIn-Post** *(keine Zuarbeit nötig, ~½ Tag)*
Tabelle #1, #2, #4, #6, #7, #9, #10, #18. Also: OG-/Meta-Tags samt Bild, CTA-Vereinheitlichung inklusive
Mail-Alternative, Hero-Rubrik und Peer-Review-Nennung, Trust-Bar-Tausch, Umami-Events auf allen CTAs.
Das ist die Basis, ohne die Sie den Kanalstart nicht messen und nicht sauber teilen können.

**Welle 2 — Substanz** *(braucht Ihre Antworten auf D1–D3, ~½ Tag + Ihre Zuarbeit)*
Tabelle #3, #12, #13, #14, #16. Aufwandsblock, geschärfte Credential-Chips, Nachher-Zahl in Fall 2,
konkretere Problemkosten, erste Zitate. Hier liegt der eigentliche Vertrauensgewinn — und der einzige Teil,
den ich nicht ohne Sie liefern kann.

**Welle 3 — Struktur** *(~1 Tag)*
Tabelle #5, #8, #11, #15, #17, #19. Reihenfolge und Rubriken, Pre-Read als eigener Zwischenschritt,
Use-Case-Tausch, EN-Deep-Link, Preisentscheidung. Bewusst zuletzt: Diese Änderungen greifen tiefer, und nach
vier bis sechs Wochen LinkedIn-Traffic sehen Sie in Umami, wo Besucher tatsächlich abspringen — dann entscheiden
Sie über die Reihenfolge mit Daten statt mit meiner Vermutung.
