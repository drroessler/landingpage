/** Fragen, Antwortoptionen und Feedback-Statements des Reifechecks.
 *
 *  Quelle: reifecheck_set1_v40.md — Arbeitsstand v0.40.
 *  Der Wortlaut ist bewusst unverändert übernommen. Änderungen hier ändern das
 *  ausgelieferte Dokument und die Notion-Ablage gleichermaßen; beide lesen aus
 *  dieser Datei.
 */

import type { Question } from "./types.js";

/** Reihenfolge der Ausgabe im Dokument: F1, F2, F3, R1 bis R6. */
export const CONTEXT_QUESTIONS: Question[] = [
  {
    id: "F1",
    axis: "Zeitpunkt",
    prompt: "Wo steht Ihr Vorhaben?",
    options: [
      {
        key: "a",
        label: "Wir prüfen noch, ob und wie wir es angehen",
        statementTitle: "Wir prüfen noch",
        statement:
          "Das ist der Zeitpunkt, an dem eine Korrektur am wenigsten kostet. Was Sie jetzt an der Ausgangslage klären, müssen Sie später nicht (teurer) in der Umsetzung nachholen.",
      },
      {
        key: "b",
        label: "Die Entscheidung ist gefallen, die Umsetzung ist noch nicht beauftragt",
        statementTitle: "Entschieden, noch nicht beauftragt",
        statement:
          "Solange keine Kapazität gebunden ist, lässt sich eine Lücke in der Vorbereitung ohne größeren Reibungsverlust schließen.",
      },
      {
        key: "c",
        label: "Die Umsetzung läuft bereits",
        statementTitle: "Die Umsetzung läuft",
        statement:
          "Die Qualität der Entscheidungsgrundlage wirkt bereits. Zwei Stellschrauben bleiben Ihnen: der Abstand zwischen zwei Prüfterminen und der direkte Kontakt zwischen den Betroffenen und denen, die bauen. Beides begrenzt, wie lange eine falsche Annahme unbemerkt weiterläuft.",
      },
    ],
  },
  {
    id: "F2",
    axis: "Einigkeit über das Ziel",
    prompt: "Wie einig sind sich die Beteiligten über das Ziel?",
    options: [
      {
        key: "a",
        label: "Alle verfolgen dasselbe Ziel. Größere Interessengegensätze gibt es nicht",
        statementTitle: "Alle verfolgen dasselbe Ziel",
        statement:
          "Eine günstige Ausgangslage. Eine Prüfung lohnt sich trotzdem: Beruht die Einigkeit auf einer geteilten Faktenbasis, oder darauf, dass die strittigen Punkte noch nicht zur Sprache kamen?",
      },
      {
        key: "b",
        label: "Überwiegend gleiche Ziele, einzelne Reibungspunkte zwischen Gruppen",
        statementTitle: "Einzelne Reibungspunkte",
        statement:
          "Reibungspunkte sind zu diesem Zeitpunkt gut behandelbar. Benennen Sie sie, solange sie klein sind. Mit jeder Festlegung, die über sie hinweggeht, wachsen sie.",
      },
      {
        key: "c",
        label: "Gegenläufige Interessen. Es gibt offene Zielkonflikte",
        statementTitle: "Offene Zielkonflikte",
        statement:
          "Gegenläufige Interessen lösen sich in der Umsetzung nicht auf. Sie tauchen dort als Verzögerung wieder auf, dann allerdings ohne Verhandlungsspielraum. Welcher Zielkonflikt ist bisher nicht offen ausgesprochen worden?",
      },
    ],
  },
  {
    id: "F3",
    axis: "Reichweite",
    prompt: "Wie weit reicht das Vorhaben in die Organisation?",
    options: [
      {
        key: "a",
        label: "Ein Team oder eine Abteilung",
        statementTitle: "Ein Team oder eine Abteilung",
        statement:
          "Kurze Wege. Eine gemeinsame Sicht auf die Ausgangslage entsteht in dieser Konstellation meist von selbst, was den Abstimmungsaufwand gering hält.",
      },
      {
        key: "b",
        label: "Mehrere Abteilungen innerhalb eines Bereichs",
        statementTitle: "Mehrere Abteilungen",
        statement:
          "Prüfen Sie, ob die zentralen Begriffe und Kennzahlen in allen beteiligten Abteilungen dasselbe bedeuten. Unterschiedliche Definitionen fallen erfahrungsgemäß erst auf, wenn Ergebnisse verglichen werden.",
      },
      {
        key: "c",
        label: "Mehrere Bereiche, Gesellschaften oder Standorte",
        statementTitle: "Mehrere Bereiche oder Standorte",
        statement:
          "Über Bereichsgrenzen hinweg entsteht keine geteilte Ausgangslage von selbst. Was in einem Bereich als bekannt gilt, ist im nächsten unbekannt oder umstritten. Welche Aussagen zur Ausgangslage würde in allen beteiligten Bereichen unwidersprochen bleiben?",
      },
    ],
  },
];

export const REIFE_QUESTIONS: Question[] = [
  {
    id: "R1",
    axis: "Analysetiefe",
    prompt: "Wie gründlich ist die Ausgangssituation analysiert?",
    options: [
      {
        key: "a",
        label:
          "Eine Lösungsidee war früh gesetzt. Was danach an Analyse erfolgte, hat sie im Wesentlichen bestätigt",
        stufe: 1,
        statementTitle: "Lösungsidee war früh gesetzt",
        statement:
          "Eine Analyse, die eine bereits gesetzte Lösung bestätigt, kann richtig sein. Nachweisen lässt es sich so allerdings nicht. Der Unterschied zeigt sich an einer Frage: Welcher Befund wäre unbequem für die Lösung gewesen, und wurde danach gesucht?",
      },
      {
        key: "b",
        label:
          "Beschrieben sind vor allem Beschwerden und Symptome. Die Ursachen dahinter wurden nicht systematisch untersucht",
        stufe: 1,
        statementTitle: "Symptome, keine Ursachen",
        statement:
          "Beschwerden zeigen, wo es wehtut, aber nicht warum. Ohne Ursachenanalyse behandelt jede Maßnahme weiter das Symptom, unabhängig davon, wie gut sie umgesetzt wird. Was müsste wahr sein, damit das beschriebene Problem verschwindet?",
      },
      {
        key: "c",
        label: "Die Ursachen wurden untersucht, aber eine Lösungsidee hat die Überlegungen gelenkt",
        stufe: 2,
        statementTitle: "Ursachen untersucht, Lösungsidee hat gelenkt",
        statement:
          "Eine Lösungsidee im Hintergrund bestimmt unauffällig mit, welche Fragen gestellt werden und welche gar nicht erst aufkommen. Die Untersuchung hat stattgefunden, ihr Suchraum war allerdings schon eingegrenzt. Welche Ursache hätten Sie gefunden, wenn diese Idee zu Beginn nicht im Raum gestanden hätte?",
      },
      {
        key: "d",
        label:
          "Die Ursachen wurden aus mehreren Blickwinkeln untersucht, beispielsweise: Fähigkeiten des Personals, technische Voraussetzungen, organisatorische Rahmenbedingungen",
        stufe: 3,
        statementTitle: "Mehrere Blickwinkel",
        statement:
          "Damit ist die Grundlage gelegt, an der die meisten Vorhaben lange vor der Umsetzung scheitern. Die Anschlussfrage lautet dann, ob die Begründung Ihrer Analyse auch bei denen ankommt, die sie umsetzen.",
      },
    ],
  },
  {
    id: "R2",
    axis: "Annahmen",
    prompt: "Wie explizit sind die Annahmen, auf denen die Analyse aufbaut?",
    options: [
      {
        key: "a",
        label: "Sie sind nicht ausdrücklich benannt. Jeder Beteiligte hat seine eigenen im Kopf",
        stufe: 1,
        statementTitle: "Nicht ausdrücklich benannt",
        statement:
          "Jedes Vorhaben ruht auf Annahmen. Sind sie unausgesprochen, hat jeder Beteiligte eigene, und alle halten sie für geteilt. Auffallen wird das erst, wenn eine davon nicht zutrifft. Welche Annahme würde Ihr Vorhaben gefährden, wenn sie falsch wäre?",
      },
      {
        key: "b",
        label: "Die wichtigsten sind benannt, aber nicht mit Belegen hinterlegt, bspw. Zahlen, Daten, Fakten",
        stufe: 2,
        statementTitle: "Benannt, ohne Belege",
        statement:
          "Die Annahmen sind sichtbar, was den schwierigeren Teil bereits erledigt. Offen bleibt, welche davon geprüft sind und welche bislang nur plausibel klingen. Diese Unterscheidung entscheidet darüber, wo Sie zuerst nachsehen sollten.",
      },
      {
        key: "c",
        label: "Sie sind schriftlich festgehalten und belegt",
        stufe: 3,
        statementTitle: "Festgehalten und belegt",
        statement:
          "Annahmen mit Beleg oder offener Prüffrage lassen sich im Verlauf gezielt überprüfen. Damit haben Sie einen Mechanismus, um zu bemerken, wenn sich die Grundlage der Entscheidung verändert, statt es erst am Ergebnis zu sehen.",
      },
    ],
  },  {
    id: "R3",
    axis: "Verantwortung",
    prompt: "Wer verantwortet die Analyse der Ausgangssituation?",
    options: [
      {
        key: "a",
        label: "Niemand ausdrücklich. Die Einschätzungen der Beteiligten stehen nebeneinander",
        stufe: 1,
        statementTitle: "Niemand ausdrücklich",
        statement:
          "Wenn niemand die Einschätzungen zusammenführt, bleibt es bei einer Sammlung von Einzelsichten. Ein gemeinsames Bild der Ausgangslage entsteht daraus nicht, und Widersprüche fallen erst in der Umsetzung auf. Wenn zwei Beteiligte die Ursache unterschiedlich beschreiben: Wer entscheidet, welche Darstellung gilt?",
      },
      {
        key: "b",
        label: "Die Projektleitung macht das mit, neben ihren übrigen Aufgaben",
        stufe: 2,
        statementTitle: "Projektleitung nebenbei",
        statement:
          "Eine Analyse, die zwischen den übrigen Aufgaben der Projektleitung läuft, wird unter Termindruck als Erstes gekürzt. Der Grund liegt selten in Nachlässigkeit. Sie ist die einzige Aufgabe ohne eigenen Termin. Wie viel Zeit war zuletzt tatsächlich für Analyse verfügbar?",
      },
      {
        key: "c",
        label:
          "Eine benannte Person verantwortet die Analyse und führt die Beiträge zu einem konsistenten Bild zusammen",
        stufe: 3,
        statementTitle: "Benannte Person",
        statement:
          "Die Funktion ist besetzt. Damit ist die Voraussetzung dafür geschaffen, dass aus heterogenen Beiträgen eine konsistente Argumentation entsteht statt einer Reihe nebeneinanderstehender Positionen.",
      },
    ],
  },
  {
    id: "R4",
    axis: "Beteiligung",
    prompt: "Wie eng sind die eingebunden, die direkt betroffen sind?",
    options: [
      {
        key: "a",
        label: "Sie werden durch Führungskräfte oder Stabsstellen vertreten",
        stufe: 1,
        statementTitle: "Vertreten durch Dritte",
        statement:
          "Wer ein Problem beschreibt, ohne es zu haben, beschreibt Symptome.  Genau die ist der häufigste Grund dafür, dass eine formal saubere Entscheidung in der Umsetzung keine Zustimmung findet. Wer im aktuellen Kreis erlebt das Problem selbst, und wer berichtet darüber?",
      },
      {
        key: "b",
        label: "Sie wurden befragt. Die daraus gezogenen Schlüsse haben sie aber nicht mehr zu sehen bekommen",
        stufe: 2,
        statementTitle: "Befragt, aber nicht rückgespiegelt",
        statement:
          "Auskunft geben und Schlussfolgerungen prüfen sind verschiedene Dinge. Die Rückspiegelung ist der Schritt, an dem sich zeigt, ob die Diagnose stimmt. Was würden die Befragten sagen, wenn sie die daraus gezogenen Schlüsse zu lesen bekämen?",
      },
      {
        key: "c",
        label: "Sie haben die Analyse geprüft, durch Mitarbeit oder durch Stellungnahme im Review",
        stufe: 3,
        statementTitle: "Analyse geprüft",
        statement:
          "Die Diagnose ist von denen bestätigt, die es betrifft. Sie ruht damit auf mehr als einer Stellvertreterbeschreibung. Genau die ist der häufigste Grund dafür, dass eine formal saubere Entscheidung in der Umsetzung keine Zustimmung findet.",
      },
    ],
  },
  {
    id: "R5",
    axis: "Rückmeldung",
    prompt: "Wie wird Feedback zur Analyse der Ausgangssituation gegeben?",
    options: [
      {
        key: "a",
        label: "Es gibt dazu keine Feedback-Runde",
        stufe: 1,
        statementTitle: "Keine Feedback-Runde",
        statement:
          "Ohne eine eigene Runde bleibt die Analyse die Sicht derer, die sie geschrieben haben. Ob sie die Lage trifft, zeigt sich dann erst in der Umsetzung — dort ist eine Korrektur am teuersten. Wer hätte noch die Analyse lesen und widersprechen können?",
      },
      {
        key: "b",
        label: "Mündlich im Termin. Berücksichtigt wird, wer sich äußert",
        stufe: 2,
        statementTitle: "Mündlich im Termin",
        statement:
          "In der mündlichen Runde zählt, wer sich äußert. Wer schweigt, gilt als einverstanden, auch wenn er nur zu langsam war oder sich nicht getraut hat. Zusätzlich entscheidet oft die Rhetorik über das Gewicht eines Einwands. Wessen Einwand ist zuletzt untergegangen, weil er im Termin nicht vorgebracht wurde?",
      },
      {
        key: "c",
        label: "Schriftlich am konkreten Dokument",
        stufe: 3,
        statementTitle: "Schriftlich am Dokument",
        statement:
          "Schriftliches Feedback zwingt beide Seiten zur Präzision: den Autor zur Klarheit, den Kommentierenden dazu, seinen Einwand an einer konkreten Stelle zu belegen. Damit verschiebt sich die Diskussion von Meinungen zu Fakten.",
      },
    ],
  },
  {
    id: "R6",
    axis: "Freigabe",
    prompt: "Wie verbindlich ist die Entscheidung zur Umsetzung geregelt?",
    options: [
      {
        key: "a",
        label: "Es gibt keine benannte Instanz. Zustimmung entsteht dadurch, dass niemand widerspricht",
        stufe: 1,
        statementTitle: "Keine benannte Instanz",
        statement:
          "Zustimmung durch Nicht-Widerspruch fühlt sich im Termin wie Konsens an. Sie hält nur, solange nichts schwierig wird. Wenn es später anders kommt, kann sich niemand erinnern, zugestimmt zu haben. Wer würde heute unterschreiben, wenn Sie darum bäten?",
      },
      {
        key: "b",
        label: "Eine Instanz ist benannt, die Entscheidung erfolgt ohne dokumentierte Grundlage",
        stufe: 2,
        statementTitle: "Instanz benannt, Grundlage nicht dokumentiert",
        statement:
          "Die Zuständigkeit ist geklärt, die Grundlage der Entscheidung nicht. Damit hängt die Freigabe daran, was die Beteiligten im Kopf hatten, als sie zustimmten. Diese Bilder gehen mit der Zeit auseinander, ohne dass es jemandem auffällt.",
      },
      {
        key: "c",
        label: "Eine benannte Instanz entscheidet auf einer dokumentierten Grundlage",
        stufe: 3,
        statementTitle: "Benannte Instanz, dokumentierte Grundlage",
        statement:
          "Zuständigkeit und Grundlage sind beide geklärt. Damit lässt sich später rekonstruieren, worauf die Entscheidung beruhte, und das ist die Voraussetzung dafür, sie bei neuen Erkenntnissen begründet zu ändern.",
      },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = [...CONTEXT_QUESTIONS, ...REIFE_QUESTIONS];

/** Achsenbeschriftung von Diagramm 1, im Uhrzeigersinn ab oben. */
export const REIFE_AXES = REIFE_QUESTIONS.map((q) => q.axis);

/** Achsenbeschriftung von Diagramm 2 — angedeutet, bewusst ohne Inhalte. */
export const UMSETZUNG_AXES = [
  "Rollenbesetzung",
  "Rückverfolgbarkeit",
  "Direkter Kontakt",
  "Prüfrhythmus",
  "Rückkopplung",
  "Führungsrückhalt",
];
