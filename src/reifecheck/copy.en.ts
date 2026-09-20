/** Englische Fassung der Dokument- und Fragebogentexte.
 *
 *  Die Typen `DocCopy` und `FormCopy` stammen aus copy.ts: fehlt hier eine
 *  Passage oder kommt eine hinzu, schlägt der Typecheck fehl. Der Wortlaut folgt
 *  der deutschen Fassung — sie bleibt die Quelle, wenn Inhalte sich ändern.
 */

import type { DocCopy, FormCopy } from "./copy.js";

export const DOC_EN: DocCopy = {
  title: "IT Initiative Readiness Check",
  subtitle: "How solid is the ground under your decision?",
  runningHead: "IT Initiative Readiness Check — Evaluation",

  vorspann: {
    h2: "What you are looking at",
    left: [
      "At the beginning there is a business problem. Something costs too much, takes too long, ties up too many people, or can no longer be developed further. Out of it grows an initiative meant to solve that problem. Between the problem and the implementation lie two steps that decide the later outcome: a systematic analysis of the current situation, and a well-founded decision about what gets implemented.",
      "How far you have come with these two steps is what decision readiness describes. It says something about the ground on which you are about to commit. About the solution itself it says nothing.",
    ],
    right: [
      "You answered nine questions. Six of them describe where your decision readiness stands. The chart on this page shows them at a glance, and for each of your answers you will find a short assessment.",
      "This evaluation does not judge your initiative. It says nothing about whether your solution is the right one, whether the investment pays off, or how likely success is. We know too little of your situation for that, and a set of multiple-choice answers would not yield it in any case.",
    ],
    closing:
      "What you get: a structured view of where your preparation stands today, and which questions to ask before the next commitment. There is no score and no overall verdict. The six points stand side by side because they describe different things and cannot be offset against one another.",
  },

  diagram1: {
    rubric: "Chart 1",
    title: "Your decision readiness",
    meta: "Six axes · three levels",
  },

  contextSection: {
    rubric: "Your answers · F1 to F3",
    h2: "Status and context",
    lede: "Timing, agreement on the goal, and reach within the organization. These three answers describe properties of your initiative and do not feed into the chart.",
  },

  reifeSection: {
    rubric: "Your answers · R1 to R6",
    h2: "The six points in detail",
    lede: "The level shown next to each question is that point on the corresponding axis of the chart.",
  },

  diagram2: {
    rubric: "Chart 2 · Implementation readiness",
    h2: "The second half",
    left: "What you have seen so far describes the quality of the decision basis. Beside it stands a second web with the same structure and six further points. It describes the path from the decision taken to the implementation itself: ownership, traceability, direct contact with those affected, review rhythm, handling of assumptions proven wrong, and backing from the leadership level.",
    right: "This web stays empty here. It describes the path that lies ahead of you after the decision: how a sound analysis and a decision taken turn into an implementation whose risk can be reduced step by step.",
    pull: "The break between the two halves is where well-prepared decisions come apart during implementation. The reasoning does not reach the teams; what gets built matches the specification and still misses the problem.",
  },

  uebergang: {
    rubric: "Next step",
    h2: "Where it can go from here",
    left: "If you want to work on one of the open points, let us talk about it. A first conversation takes 30 minutes and serves to fill in the second half and to judge which of the visible gaps actually comes first for your initiative. That is the question this evaluation leaves open, because it depends on your context.",
    right: "Two things in advance. The conversation may well end with the conclusion that your initiative needs no support from us. That happens, and it will be said plainly. And once implementation has been commissioned, the moment for work on the decision basis has passed. Other points of leverage remain, but it would be dishonest to present it differently.",
    ctaLabel: "Arrange a first conversation",
    ctaMicro: "30 minutes · Rather ask a question first?",
  },

  methode: {
    rubric: "A note on method",
    h2: "Where the questions come from and what they do",
    left: "The nine questions are derived from published academic work. They take up success factors and complexity indicators that were obtained there from the study of real initiatives.",
    right: "The evaluation is rule-based. Each answer option returns a text formulated in advance; nothing is calculated and nothing is weighted. No language model takes part in the assessment.",
    imprint: "NarraTec — a brand of Dr. Richard Rößler Management Advisory, Dresden",
  },
};

export const FORM_EN: FormCopy = {
  rubric: "Readiness check",
  h1: "How solid is the ground under your decision?",
  lede: "Nine questions, about four minutes. You receive an evaluation of your decision readiness as a PDF by email — generated by rules, without a language model.",
  startLabel: "Start the readiness check",
  intro: {
    h2: "Before you begin",
    points: [
      {
        title: "Nine questions, single choice",
        body: "No free text. Three questions on the status and context of your initiative, six on decision readiness.",
      },
      {
        title: "With a bridge to implementation readiness",
        body: "The evaluation does not stop at the decision. Alongside it, it names the second half: the six points on the path from the decision taken to the implementation itself.",
      },
      {
        title: "Answer for one concrete initiative",
        body: "The evaluation is more useful the more precisely you have a single initiative in mind — not your organization in general.",
      },
    ],
  },
  contact: {
    rubric: "Last step",
    h2: "Where should we send the evaluation?",
    lede: "The evaluation is generated after you submit and sent to you as a PDF. It also appears directly here on this page.",
    fields: {
      name: "Name",
      email: "Email",
      organisation: "Organization",
      role: "Role",
      roleOptional: "optional",
    },
    consent:
      "I consent to my details and the evaluation being stored to process my enquiry and sent to me by email. I can withdraw this consent at any time, informally.",
    consentLinkLabel: "Privacy policy",
    submitLabel: "Generate and send the evaluation",
    sending: "Generating the evaluation …",
    honeypot: "Website (please leave blank)",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      organisation: "Please enter your organization.",
      consent: "Without this consent we cannot send you the evaluation.",
    },
  },
  toContact: "To the contact details",
  mailState: {
    pending: "The evaluation is being generated and sent …",
    sentBefore: "The evaluation is on its way as a PDF to ",
    sentAfter: ". If it does not arrive, please check your spam folder.",
    failedBefore:
      "Sending failed. Your evaluation is shown in full on this page — print it using your browser's print function, or drop a line to ",
    failedAfter: " and we will get it to you another way.",
  },
  progress: (current: number, total: number) => `Question ${current} of ${total}`,
  back: "Back",
  next: "Next",
};
