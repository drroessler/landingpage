/** Die Auswertungslogik. Eine einzige Regel:
 *  Jede gewählte Antwortoption gibt genau ein Statement aus.
 *  Die sechs Reifeantworten setzen zusätzlich einen Punkt auf ihrer Achse.
 *
 *  Es wird nicht gerechnet und nicht gewichtet. Kein Sprachmodell beteiligt.
 */

import { ALL_QUESTIONS, contextQuestionsFor, reifeQuestionsFor } from "./data.js";
import type {
  Answers,
  CompleteAnswers,
  EvaluatedAnswer,
  Evaluation,
  Lang,
  Question,
  QuestionId,
  Stufe,
} from "./types.js";

function evaluateOne(q: Question, optionKey: string): EvaluatedAnswer {
  const option = q.options.find((o) => o.key === optionKey);
  if (!option) {
    throw new Error(`Unbekannte Antwortoption "${optionKey}" für Frage ${q.id}`);
  }
  return {
    id: q.id,
    axis: q.axis,
    prompt: q.prompt,
    ...(q.note ? { note: q.note } : {}),
    optionKey: option.key,
    optionLabel: option.label,
    statement: option.statement,
    stufe: option.stufe,
  };
}

/** Prüft, ob für jede der neun Fragen eine gültige Option gewählt wurde.
 *  Sprachunabhängig: geprüft werden Kennungen und Optionsschlüssel, die in
 *  beiden Fassungen dieselben sind. */
export function isComplete(answers: Answers): answers is CompleteAnswers {
  return ALL_QUESTIONS.every((q) => {
    const key = answers[q.id];
    return typeof key === "string" && q.options.some((o) => o.key === key);
  });
}

/** Listet die Fragen ohne gültige Antwort — für Serverseitige Validierung. */
export function missingAnswers(answers: Answers): QuestionId[] {
  return ALL_QUESTIONS.filter((q) => {
    const key = answers[q.id];
    return !(typeof key === "string" && q.options.some((o) => o.key === key));
  }).map((q) => q.id);
}

/** Kurze, nicht erratbare Kennung des Durchlaufs, z. B. "RC-8F3K-2QD1". */
export function makeReference(random: () => number = Math.random): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // ohne I, O, 0, 1
  const block = () =>
    Array.from({ length: 4 }, () => alphabet[Math.floor(random() * alphabet.length)]).join("");
  return `RC-${block()}-${block()}`;
}

export function evaluate(
  answers: CompleteAnswers,
  opts: { createdAt?: string; reference?: string; lang?: Lang } = {},
): Evaluation {
  const lang: Lang = opts.lang ?? "de";
  const context = contextQuestionsFor(lang).map((q) => evaluateOne(q, answers[q.id]));
  const reife = reifeQuestionsFor(lang).map((q) => evaluateOne(q, answers[q.id]));

  return {
    createdAt: opts.createdAt ?? new Date().toISOString(),
    reference: opts.reference ?? makeReference(),
    lang,
    context,
    reife,
    stufen: reife.map((a) => a.stufe as Stufe),
  };
}

/** Langdatum für Dokumentkopf und Begleitmail, in der Sprache der Auswertung. */
export function formatDate(iso: string, lang: Lang = "de"): string {
  return new Date(iso).toLocaleDateString(lang === "en" ? "en-GB" : "de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
