/** Die Auswertungslogik. Eine einzige Regel:
 *  Jede gewählte Antwortoption gibt genau ein Statement aus.
 *  Die sechs Reifeantworten setzen zusätzlich einen Punkt auf ihrer Achse.
 *
 *  Es wird nicht gerechnet und nicht gewichtet. Kein Sprachmodell beteiligt.
 */

import { CONTEXT_QUESTIONS, REIFE_QUESTIONS, ALL_QUESTIONS } from "./data";
import type {
  Answers,
  CompleteAnswers,
  EvaluatedAnswer,
  Evaluation,
  Question,
  QuestionId,
  Stufe,
} from "./types";

function evaluateOne(q: Question, optionKey: string): EvaluatedAnswer {
  const option = q.options.find((o) => o.key === optionKey);
  if (!option) {
    throw new Error(`Unbekannte Antwortoption "${optionKey}" für Frage ${q.id}`);
  }
  return {
    id: q.id,
    axis: q.axis,
    prompt: q.prompt,
    optionKey: option.key,
    optionLabel: option.label,
    statement: option.statement,
    stufe: option.stufe,
  };
}

/** Prüft, ob für jede der neun Fragen eine gültige Option gewählt wurde. */
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
  opts: { createdAt?: string; reference?: string } = {},
): Evaluation {
  const context = CONTEXT_QUESTIONS.map((q) => evaluateOne(q, answers[q.id]));
  const reife = REIFE_QUESTIONS.map((q) => evaluateOne(q, answers[q.id]));

  return {
    createdAt: opts.createdAt ?? new Date().toISOString(),
    reference: opts.reference ?? makeReference(),
    context,
    reife,
    stufen: reife.map((a) => a.stufe as Stufe),
  };
}

/** Deutsches Langdatum, wie es im Dokumentkopf steht. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
