/** Englische Fassung der Fragen, Antwortoptionen und Auswertungsbausteine.
 *
 *  Struktur identisch zu data.ts: gleiche Kennungen, gleiche Optionsschlüssel,
 *  gleiche Stufen. Nur die Texte sind übersetzt — die Auswertung rechnet mit den
 *  Schlüsseln, nicht mit dem Wortlaut. `npm run check:i18n` vergleicht beide
 *  Fassungen und schlägt an, wenn sie auseinanderlaufen.
 */

import type { Question } from "./types.js";

export const CONTEXT_QUESTIONS_EN: Question[] = [
  {
    id: "F1",
    axis: "Timing",
    prompt: "Where does your initiative stand?",
    options: [
      {
        key: "a",
        label: "We are still assessing whether and how to take it on",
        statementTitle: "Still assessing",
        statement:
          "This is the point at which a correction costs least. Whatever you settle about the starting position now, you will not have to make up for later — at a higher price — during implementation.",
      },
      {
        key: "b",
        label: "The decision has been made, implementation is not yet commissioned",
        statementTitle: "Decided, not yet commissioned",
        statement:
          "As long as no capacity is committed, a gap in the preparation can still be closed without much friction.",
      },
      {
        key: "c",
        label: "Implementation is already under way",
        statementTitle: "Implementation is under way",
        statement:
          "The quality of the decision basis is already taking effect. Two levers remain: the interval between review dates, and direct contact between those affected and those who build. Both limit how long a false assumption keeps running unnoticed.",
      },
    ],
  },
  {
    id: "F2",
    axis: "Agreement on the goal",
    prompt: "How much do those involved agree on the goal?",
    options: [
      {
        key: "a",
        label: "Everyone pursues the same goal. There are no major conflicts of interest",
        statementTitle: "Everyone pursues the same goal",
        statement:
          "A favorable starting position. It is still worth checking: does the agreement rest on a shared basis of facts, or on the contentious points not having come up yet?",
      },
      {
        key: "b",
        label: "Largely the same goals, with individual points of friction between groups",
        statementTitle: "Individual points of friction",
        statement:
          "Points of friction are easy to handle at this stage. Name them while they are small. With every decision that passes over them, they grow.",
      },
      {
        key: "c",
        label: "Opposing interests. There are open conflicts of objectives",
        statementTitle: "Open conflicts of objectives",
        statement:
          "Opposing interests do not dissolve during implementation. They resurface there as delay — by then without room to negotiate. Which conflict of objectives has not yet been said out loud?",
      },
    ],
  },
  {
    id: "F3",
    axis: "Reach",
    prompt: "How far does the initiative reach into the organization?",
    options: [
      {
        key: "a",
        label: "One team or one department",
        statementTitle: "One team or one department",
        statement:
          "Short distances. In this setting a shared view of the starting position usually emerges by itself, which keeps the coordination effort low.",
      },
      {
        key: "b",
        label: "Several departments within one division",
        statementTitle: "Several departments",
        statement:
          "Check whether the central terms and metrics mean the same thing in every department involved. In our experience, differing definitions only surface once results are compared.",
      },
      {
        key: "c",
        label: "Several divisions, legal entities or sites",
        statementTitle: "Several divisions or sites",
        statement:
          "Across divisional boundaries, a shared starting position does not emerge by itself. What counts as known in one division is unknown or disputed in the next. Which statement about the starting position would go unchallenged in every division involved?",
      },
    ],
  },
];

export const REIFE_QUESTIONS_EN: Question[] = [
  {
    id: "R1",
    axis: "Depth of analysis",
    prompt: "How thoroughly has the current situation been analyzed?",
    options: [
      {
        key: "a",
        label:
          "A solution was fixed early on. What analysis followed has largely confirmed it",
        stufe: 1,
        statementTitle: "Solution fixed early",
        statement:
          "An analysis that confirms an already fixed solution may well be right. It simply cannot be shown to be. The difference turns on one question: which finding would have been inconvenient for the solution, and was it looked for?",
      },
      {
        key: "b",
        label:
          "What is described is mainly complaints and symptoms. The causes behind them were not examined systematically",
        stufe: 1,
        statementTitle: "Symptoms, not causes",
        statement:
          "Complaints show where it hurts, but not why. Without a root-cause analysis, every measure keeps treating the symptom, however well it is carried out. What would have to be true for the problem as described to disappear?",
      },
      {
        key: "c",
        label: "The causes were examined, but a solution in mind steered the reasoning",
        stufe: 2,
        statementTitle: "Causes examined, steered by a solution",
        statement:
          "A solution in the background quietly shapes which questions get asked and which never come up at all. The examination did take place, but its search space was already narrowed. Which cause would you have found if that idea had not been in the room from the start?",
      },
      {
        key: "d",
        label:
          "The causes were examined from several angles, for example: capabilities of the staff, technical prerequisites, organizational conditions",
        stufe: 3,
        statementTitle: "Several angles",
        statement:
          "That lays the groundwork on which most initiatives fail long before implementation. The follow-up question is whether the reasoning behind your analysis also reaches the people who implement it.",
      },
    ],
  },
  {
    id: "R2",
    axis: "Assumptions",
    prompt: "How explicit are the assumptions the analysis builds on?",
    options: [
      {
        key: "a",
        label: "They are not stated explicitly. Everyone involved carries their own",
        stufe: 1,
        statementTitle: "Not stated explicitly",
        statement:
          "Every initiative rests on assumptions. Left unspoken, everyone involved holds their own and all take them to be shared. It only shows once one of them does not hold. Which assumption would put your initiative at risk if it were wrong?",
      },
      {
        key: "b",
        label: "The most important ones are stated, but not backed by evidence such as figures, data, facts",
        stufe: 2,
        statementTitle: "Stated, without evidence",
        statement:
          "The assumptions are visible, which is the harder part done. What remains open is which of them have been tested and which merely sound plausible. That distinction decides where you should look first.",
      },
      {
        key: "c",
        label: "They are written down and backed by evidence",
        stufe: 3,
        statementTitle: "Written down and evidenced",
        statement:
          "Assumptions with evidence, or with an open test question attached, can be re-examined as things proceed. That gives you a way to notice when the basis of the decision shifts, instead of seeing it only in the result.",
      },
    ],
  },
  {
    id: "R3",
    axis: "Ownership",
    prompt: "Who owns the analysis of the current situation?",
    options: [
      {
        key: "a",
        label: "No one explicitly. The assessments of those involved stand side by side",
        stufe: 1,
        statementTitle: "No one explicitly",
        statement:
          "If no one brings the assessments together, it stays a collection of individual views. No shared picture of the starting position comes out of it, and contradictions surface only during implementation. When two people describe the cause differently: who decides which account holds?",
      },
      {
        key: "b",
        label: "The project lead takes it on alongside their other duties",
        stufe: 2,
        statementTitle: "Project lead on the side",
        statement:
          "An analysis that runs between a project lead's other duties is the first thing cut under deadline pressure. The reason is rarely negligence. It is the only task without a date of its own. How much time was actually available for analysis last time?",
      },
      {
        key: "c",
        label:
          "A named person owns the analysis and brings the contributions together into one consistent picture",
        stufe: 3,
        statementTitle: "A named person",
        statement:
          "The role is filled. That creates the precondition for a consistent line of reasoning to emerge from heterogeneous contributions, rather than a row of positions standing side by side.",
      },
    ],
  },
  {
    id: "R4",
    axis: "Involvement",
    prompt: "How closely involved are those directly affected?",
    options: [
      {
        key: "a",
        label: "They are represented by managers or staff functions",
        stufe: 1,
        statementTitle: "Represented by others",
        statement:
          "Whoever describes a problem without having it describes symptoms. A review round with those directly affected is the cheapest way to catch a misdiagnosis while it is still correctable. Who in the current group experiences the problem themselves, and who reports on it?",
      },
      {
        key: "b",
        label: "They were consulted. But they never got to see the conclusions drawn from it",
        stufe: 2,
        statementTitle: "Consulted, not reflected back",
        statement:
          "Giving information and reviewing conclusions are different things. Reflecting them back is the step at which it shows whether the diagnosis holds. What would those consulted say if they got to read the conclusions drawn from it?",
      },
      {
        key: "c",
        label: "They reviewed the analysis, by contributing or by commenting in a review",
        stufe: 3,
        statementTitle: "Analysis reviewed",
        statement:
          "The diagnosis is confirmed by the people it concerns. It therefore rests on more than a second-hand account. That account is the most common reason why a formally sound decision finds no acceptance during implementation.",
      },
    ],
  },
  {
    id: "R5",
    axis: "Feedback",
    prompt: "How is feedback on the analysis of the current situation given?",
    options: [
      {
        key: "a",
        label: "There is no feedback round for it",
        stufe: 1,
        statementTitle: "No feedback round",
        statement:
          "Without a round of its own, the analysis stays the view of those who wrote it. Whether it matches the situation only shows during implementation — where a correction costs most. Who else could have read the analysis and objected?",
      },
      {
        key: "b",
        label: "Verbally in the meeting. Whoever speaks up is taken into account",
        stufe: 2,
        statementTitle: "Verbally in the meeting",
        statement:
          "In a verbal round, what counts is who speaks up. Whoever stays silent is taken to agree, even if they were merely too slow or did not dare. On top of that, rhetoric often decides how much weight an objection carries. Whose objection was lost last time because it was never raised in the meeting?",
      },
      {
        key: "c",
        label: "In writing, on the actual document",
        stufe: 3,
        statementTitle: "In writing, on the document",
        statement:
          "Written feedback forces precision on both sides: the author toward clarity, the commenter toward pinning an objection to a specific passage. That moves the discussion from opinions to facts.",
      },
    ],
  },
  {
    id: "R6",
    axis: "Approval",
    prompt: "How binding is the decision to implement?",
    options: [
      {
        key: "a",
        label: "There is no named authority. Approval arises from no one objecting",
        stufe: 1,
        statementTitle: "No named authority",
        statement:
          "Approval by absence of objection feels like consensus in the room. It holds only as long as nothing gets difficult. When things later turn out otherwise, no one remembers having agreed. Who would sign today if you asked them to?",
      },
      {
        key: "b",
        label: "An authority is named, the decision is made without a documented basis",
        stufe: 2,
        statementTitle: "Authority named, basis not documented",
        statement:
          "Responsibility is settled, the basis of the decision is not. Approval therefore hangs on what those involved had in mind when they agreed. Those pictures drift apart over time, without anyone noticing.",
      },
      {
        key: "c",
        label: "A named authority decides on a documented basis",
        stufe: 3,
        statementTitle: "Named authority, documented basis",
        statement:
          "Responsibility and basis are both settled. It is therefore possible to reconstruct later what the decision rested on — the precondition for changing it with good reason when new findings emerge.",
      },
    ],
  },
];

export const ALL_QUESTIONS_EN: Question[] = [...CONTEXT_QUESTIONS_EN, ...REIFE_QUESTIONS_EN];
export const REIFE_AXES_EN = REIFE_QUESTIONS_EN.map((q) => q.axis);

/** Achsenbeschriftung von Diagramm 2 — angedeutet, bewusst ohne Inhalte. */
export const UMSETZUNG_AXES_EN = [
  "Role assignment",
  "Traceability",
  "Direct contact",
  "Review rhythm",
  "Feedback loops",
  "Leadership backing",
];
