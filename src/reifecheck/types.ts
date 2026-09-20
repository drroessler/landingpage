/** Datenmodell des Reifechecks.
 *
 *  Fachliche Grundlage: reifecheck_set1_v40.md (Rößler/Wieland, HMD 2025).
 *  Die Auswertung ist vollständig regelbasiert: jede gewählte Antwortoption
 *  gibt genau ein vorformuliertes Statement aus, die sechs Reifeantworten
 *  setzen zusätzlich einen Punkt auf ihrer Achse. Es wird nicht gerechnet,
 *  nicht gewichtet und kein Sprachmodell beteiligt.
 */

/** Stufe auf einer Reifeachse. Stufe 1 liegt auf dem inneren Ring, nicht im Mittelpunkt. */
export type Stufe = 1 | 2 | 3;

/** Sprache von Fragebogen, Dokument und Begleitmail. */
export type Lang = "de" | "en";

/** Kennungen der drei Kontextfragen (kein Diagramm) und der sechs Reifedimensionen. */
export type ContextId = "F1" | "F2" | "F3";
export type ReifeId = "R1" | "R2" | "R3" | "R4" | "R5" | "R6";
export type QuestionId = ContextId | ReifeId;

export interface Option {
  /** Buchstabe der Option, wie in der Quelle: a, b, c, d */
  key: string;
  /** Antworttext, wie er im Fragebogen und im Dokument erscheint */
  label: string;
  /** Nur bei Reifefragen: der Punkt, den diese Option auf der Achse setzt */
  stufe?: Stufe;
  /** Überschrift des Statements, dient im Dokument nicht der Ausgabe */
  statementTitle: string;
  /** Das eine Statement, das diese Option ausgibt */
  statement: string;
}

export interface Question {
  id: QuestionId;
  /** Kurzname der Dimension bzw. des Kontextaspekts, z. B. "Analysetiefe" */
  axis: string;
  /** Die Frage selbst */
  prompt: string;
  /** Nur bei Kontextfragen: erklärt, warum sie nicht ins Diagramm eingeht */
  note?: string;
  options: Option[];
}

/** Die neun Antworten, jeweils der `key` der gewählten Option. */
export type Answers = Partial<Record<QuestionId, string>>;
export type CompleteAnswers = Record<QuestionId, string>;

export interface Contact {
  name: string;
  email: string;
  organisation: string;
  /** freiwillig */
  role: string;
  /** ausdrückliche Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO */
  consent: boolean;
}

/** Eine ausgewertete Antwort: Frage, gewählte Option, Statement, ggf. Stufe. */
export interface EvaluatedAnswer {
  id: QuestionId;
  axis: string;
  prompt: string;
  /** Erläuterung zur Frage, etwa die Auflösung eines Sternchens im Fragetext.
   *  Steht im Fragebogen unter den Optionen und im Dokument unter der Frage. */
  note?: string;
  optionKey: string;
  optionLabel: string;
  statement: string;
  stufe?: Stufe;
}

/** Das vollständige Ergebnis, aus dem Web-Ansicht, PDF und Notion-Eintrag entstehen. */
export interface Evaluation {
  /** ISO-Datum der Auswertung */
  createdAt: string;
  /** kurze, nicht erratbare Kennung — taucht im Dokument und in Notion auf */
  reference: string;
  /** Sprache, in der ausgewertet wurde — Dokument und Mail folgen ihr. */
  lang: Lang;
  context: EvaluatedAnswer[];
  reife: EvaluatedAnswer[];
  /** die sechs Stufen in Achsenreihenfolge R1..R6 */
  stufen: Stufe[];
}
