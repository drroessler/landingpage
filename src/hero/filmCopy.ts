/** Beschriftungen im Methoden-Film.
 *
 *  Kurze Etiketten, keine ausformulierte Prosa — deshalb hier zweisprachig,
 *  anders als beim Reifecheck. Die Positionen im Film sind auf diese Längen
 *  abgestimmt: bleiben die Übersetzungen knapp, sonst überlaufen die Karten.
 */

export interface FilmCopy {
  phases: [string, string, string, string];
  istAnalyse: string;
  columns: [string, string, string];
  symptom: string;
  causeMark: string;
  causeTitle: string;
  causeText: string;
  narrative: string;
  decisionPaper: string;
  approval: string;
  approvers: [string, string, string];
  owner: string;
  criterionMet: string;
  boardColumns: [string, string, string];
  cadence: string;
  packs: [string, string, string, string];
  owners: [string, string, string, string];
}

export const FILM_DE: FilmCopy = {
  phases: ["01 VERSTEHEN", "02 ENTSCHEIDEN", "03 ÜBERSETZEN", "04 LIEFERN"],
  istAnalyse: "Ist-Analyse",
  columns: ["MENSCH", "TECHNIK", "ORGANISATION"],
  symptom: "Symptom",
  causeMark: "↳ Ursache",
  causeTitle: "Ursache",
  causeText: "Freigabe läuft per E-Mail — sechs Wochen, unabhängig vom Risiko.",
  narrative: "Narrativ",
  decisionPaper: "Entscheidungsvorlage",
  approval: "Freigabe",
  approvers: ["Bereichsleitung IT", "Fachbereich Einkauf", "Rechtsabteilung"],
  owner: "Zuständig",
  criterionMet: "Prüfkriterium erfüllt",
  boardColumns: ["Planung", "Umsetzung", "Ergebnis"],
  cadence: "Takt",
  packs: [
    "Freigabeprozess neu schneiden",
    "Prüfkriterien je Risikofall festlegen",
    "Rollen und Schnittstellen klären",
    "Rhythmus für Vorführung setzen",
  ],
  owners: ["Plattform-Team", "Recht & Compliance", "Bereichsleitung", "Umsetzungsteams"],
};

export const FILM_EN: FilmCopy = {
  phases: ["01 UNDERSTAND", "02 DECIDE", "03 TRANSLATE", "04 DELIVER"],
  istAnalyse: "Situation analysis",
  columns: ["PEOPLE", "TECHNOLOGY", "ORGANISATION"],
  symptom: "Symptom",
  causeMark: "↳ Root cause",
  causeTitle: "Root cause",
  causeText: "Approvals run by email — six weeks, regardless of risk.",
  narrative: "Narrative",
  decisionPaper: "Decision paper",
  approval: "Approval",
  approvers: ["Head of IT", "Procurement", "Legal"],
  owner: "Owner",
  criterionMet: "Criterion met",
  boardColumns: ["Planning", "Implementation", "Outcome"],
  cadence: "Cadence",
  packs: [
    "Recut the approval process",
    "Set acceptance criteria per risk case",
    "Clarify roles and interfaces",
    "Set a cadence for demos",
  ],
  owners: ["Platform team", "Legal & compliance", "Head of division", "Delivery teams"],
};
