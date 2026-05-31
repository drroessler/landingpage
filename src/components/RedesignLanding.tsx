import { type MouseEvent, type CSSProperties, type ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import "../redesign.css";

const onJump = (id: string) => (e: MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const BOOK_URL = "https://cal.meetergo.com/richard-rossler/narratec";
const PAPER_PUBLISHED_URL = "https://link.springer.com/epdf/10.1365/s40702-025-01234-z?sharing_token=2GcSA2NwyHc5ZFVHNLOokX2kjFioqY_JoFJDVSa1602aUYkWxEZ0qDiq0nqKya3TVcFpFlMJ-w6U_3aV089ye1tk2LK8kCB7LXf3vW4rNlkuQzP6Iv71lk5qIUaz2KuVMlxU-loa0RJZ4qvO6c6UaS6fnPhQeXqYPV8neYP5xbM%3D";
const PAPER_PREREAD_URL = "/Pre-Read%20Narrative%20To%20Action.pdf";
const hl: CSSProperties = { color: "var(--accent-ink)", fontStyle: "italic" };

// ---------- Bilingual content ----------

const landingDe = {
  cta: {
    book: "Erstgespräch anfragen",
    spar: "30 Min Sparring mit den Gründern",
    seeMethod: "Methode ansehen",
    micro: "30 Min · kostenfrei · kein Vertrieb · NDA auf Wunsch",
    finalMicro: "contact@narratec.io · 30 Min · kostenfrei · kein Vertrieb · NDA auf Wunsch",
  },
  nav: [
    { label: "Problem", id: "problem" },
    { label: "Einsatz", id: "einsatz" },
    { label: "Methode", id: "methode" },
    { label: "Team", id: "team" },
    { label: "Ergebnis", id: "ergebnis" },
  ],
  hero: {
    kicker: "DER ENTSCHEIDUNGS-STANDARD FÜR STRATEGISCH TRAGENDE IT-INVESTMENTS",
    headline: (
      <>
        <span className="line">Strategische IT-Investments</span>
        <span className="line">in 4 Wochen <em>tragfähig</em></span>
        <span className="line"> entschieden.</span>
      </>
    ) as ReactNode,
    lede: "In vier Wochen verdichten wir Ihre komplexe Ausgangslage zu einem signierten, verbindlichen Umsetzungsmandat — direkt übersetzt in operative Arbeitspakete. So gewinnen Sie Investitionssicherheit, bevor der erste Euro fließt.",
    italic: "Am Ende wissen Sie nicht nur, was zu tun ist — Sie haben Monate an Umwegen gespart, bevor das Projekt überhaupt startet.",
  },
  trust: [
    (<>In mehreren Vorhaben im <span style={hl}>DAX-Konzern</span> erprobt.</>) as ReactNode,
    (<>Sie beauftragen uns zum <span style={hl}>Festpreis</span>, ohne Risiko.</>) as ReactNode,
    (<>Ihre sensiblen Informationen geschützt durch ein <span style={hl}>NDA</span>.</>) as ReactNode,
  ],
  problem: {
    rubric: "§ 01 · Diagnose",
    h2: (<>Vier Muster, die <em>jedes</em> Großprojekt gefährden.</>) as ReactNode,
    lede: "Nicht Technologie scheitert — Übersetzung scheitert. Die vier Muster, die in der Praxis immer wieder auftauchen:",
    items: [
      { n: "01", t: "Vorschnelle Lösungen", b: "Teams diskutieren Lösungen, bevor das Problem verstanden ist. Symptombehandlung statt Ursachenforschung.", cost: "Fehlgeleitete Aktivitäten ab Tag 1" },
      { n: "02", t: "Silo-Denken", b: "Fachbereiche und Management sprechen unterschiedliche Sprachen. Es fehlt das verbindende Element.", cost: "Kein Alignment, kein Fortschritt" },
      { n: "03", t: "Trivialisierung durch Stichpunkte", b: "Meetings und Präsentationen bieten keinen Raum für Diskurs. Komplexe Probleme werden durch Stichpunkte trivialisiert.", cost: "Scheinentscheidungen statt Klarheit" },
      { n: "04", t: "Execution-Falle", b: "Getroffene Entscheidungen versanden. Die Umsetzung stagniert.", cost: "Investitionen ohne Wirkung" },
    ],
  },
  position: {
    rubric: "§ 02 · POSITION",
    h2: (<>Zwischen Strategie <em>und Umsetzung.</em></>) as ReactNode,
    lede: "NarraTec ersetzt weder Strategieberatung noch Umsetzungspartner. Wir schließen eine spezifische Lücke: den Moment, in dem aus einer strategischen Absicht eine tragfähige, signaturreife Investitionsentscheidung werden muss.",
    compareLabel: "Vergleich",
    rowPhase: "Phase",
    rowQuestion: "Leitfrage",
    rowOutput: "Output",
    cols: [
      { label: "Strategieberatung", phase: "Vor der Entscheidung", q: "„Wohin sollen wir gehen?“", output: "Zielbild, Roadmap, Business Case" },
      { label: "NarraTec", phase: "Beim Schließen der Entscheidung", q: "„Wie genau – und mit welchen Voraussetzungen?“", output: "Umsetzungsmandat, Arbeitspakete mit Verantwortlichkeit und Akzeptanzkriterien" },
      { label: "Umsetzungspartner", phase: "Nach der Entscheidung", q: "„Wir bauen es.“", output: "Lauffähiges System, Prozess, Organisation" },
    ],
  },
  caseStudy: {
    rubric: "§ 03 · Case Study",
    h2: (<>Das Dashboard wäre gebaut worden — <em>auf falscher Grundlage.</em></>) as ReactNode,
    lede: "Anonymisierter Realfall · Industrieunternehmen · DACH · 2025",
    phases: [
      { n: "Ausgangslage", t: "Entscheidung schien klar.", d: "Dashboard zur Produktkosten-Steuerung. Budget reserviert. Dienstleister vorselektiert. Intern bereits kommuniziert." },
      { n: "Was wir gefunden haben", t: "Die Datengrundlage hätte das Projekt scheitern lassen.", d: "9 Interviews mit Fachexperten aus Controlling, Produktion und IT legten offen, was intern nie artikuliert worden war: kritische Datenlücken, Quellkonflikte und fehlende Systemanbindungen — die das Dashboard entweder nutzlos gemacht oder zu unplanbaren Verzögerungen geführt hätten." },
      { n: "Ergebnis", t: "Eine bessere Entscheidung.", d: "Statt eines generischen Dashboards: ein verbindliches Umsetzungsmandat mit definierten Datenanforderungen, klaren Quellsystemen und messbaren Akzeptanzkriterien. Die Umsetzung startete ohne Architekturschleifen." },
    ],
    metricsLabel: "Ergebnis in Zahlen",
    metrics: [
      { k: "Entscheidungszeit", v: "4 Wochen" },
      { k: "Time-to-Backlog", v: "6 Wochen" },
      { k: "Vor Fehlallokation geschütztes Budget", v: "1,3 Mio €" },
    ],
    docLabel: "Das entstandene Narrativ (Auszug)",
    docMetaLeft: "Narrativ · v1.2",
    docMetaRight: "Status: entschieden",
    docH4: "Dashboard Produktkosten-Steuerung: Beauftragen oder Voraussetzungen schaffen?",
    docSub: "Vorhaben 2025-Q3 · Verantwortlich: IT-Leitung · Beteiligt: Controlling, Produktion, Data Engineering",
    docSections: [
      { k: "Hypothese", v: (<>Die fehlende Kostentransparenz ist nicht durch ein Dashboard lösbar, solange die Datengrundlage unbereinigt ist. <span className="hl">Ein sofortiger Dashboardbau würde das Budget fehlallokieren</span> — die eigentlichen Probleme blieben unsichtbar.</>) as ReactNode },
      { k: "Evidenz", v: (<>9 Interviews mit Fachexperten aus Controlling, Produktion und IT. <span className="hl">Mehrere kritische Datenlücken und Quellkonflikte</span> identifiziert. Fehlende Anbindung von 3 Quellsystemen dokumentiert.</>) as ReactNode },
      { k: "Entscheidung", v: (<>Feingranulares Umsetzungsmandat statt generischem Dashboard. Klare Datenanforderungen, definierte Quellsysteme, priorisierte Kostenträger und messbare Akzeptanzkriterien.</>) as ReactNode },
      { k: "Backlog", v: (<>7 Arbeitspakete, 3 Owner, Akzeptanzkriterien je Arbeitspaket definiert.</>) as ReactNode },
    ],
    docSig: "Signatur:\nIT-Leitung · Controlling · Data Engineering",
    docDate: "22.09.2025",
  },
  outcomes: {
    rubric: "§ 04 · Messversprechen",
    h2: (<>Drei Kennzahlen. <em>Vor Projektstart vereinbart.</em></>) as ReactNode,
    lede: "Wir liefern keine Versprechen — wir vereinbaren Messgrößen. Drei Kennzahlen, auf die wir uns mit Ihnen festlegen, bevor die Analyse beginnt. Am Ende berichten wir offen, was sich bewegt hat.",
    items: [
      { n: "01", label: "Reallokationsvolumen", body: "Differenz zwischen ursprünglich geplanter Budgetallokation und signiertem Beschluss. Wir berichten Bewegungsrichtung und -höhe." },
      { n: "02", label: "Entscheidungszeit", body: "Vom offenen Problem bis zur signierten Entscheidung." },
      { n: "03", label: "Time-to-Backlog", body: "Zeit von der signierten Entscheidung bis zum ersten umsetzungsfähigen Arbeitspaket." },
    ],
  },
  method: {
    rubric: "§ 05 · Methode",
    h2: (<>Von der Hypothese ins Backlog: So wird die Entscheidung <em>tragfähig.</em></>) as ReactNode,
    lede: "Eine strukturierte Analyse, die Ursachen, Entscheidungslogik und Maßnahmen in einem gemeinsam erarbeiteten Dokument verbindet — und damit Entscheidungen trägt, die intern halten.",
    steps: [
      { phase: "Tag 0", title: "Kick-off", desc: "Problem, Ziel und Wert-Hypothese schärfen, Stakeholder und Erfolgskriterien festlegen. Wir definieren, woran sich eine gute Entscheidung am Ende messen lassen muss." },
      { phase: "Woche 1–2", title: "Faktenbasis schaffen", desc: "Interviews, Datenaudit, Second-Opinion-Review. Wir hören zu, bevor wir eine Hypothese formulieren." },
      { phase: "Woche 3", title: "Optionen aufzeigen", desc: "Kriterien, Trade-offs und Entscheidungslogik — schriftlich gegen die zuvor definierten Erfolgskriterien argumentiert." },
      { phase: "Woche 4", title: "In Arbeitspakete übersetzen", desc: "Freigabe, Arbeitspakete, Verantwortlichkeiten. Die Entscheidung endet nicht mit der Signatur." },
    ],
    principleLabel: "Grundsatz",
    principleTitle: (<>KI &amp;<br />Verantwortung</>) as ReactNode,
    statement1: (<>KI unterstützt bei Verdichtung, Recherche und der Übersetzung in Arbeitspakete. <span style={{ color: "oklch(82% 0.008 85)" }}>Nie bei der Entscheidung.</span></>) as ReactNode,
    statement2: (<>Verantwortung bleibt <span style={{ color: "oklch(72% 0.14 25)" }}>menschlich.</span></>) as ReactNode,
  },
  usecases: {
    rubric: "§ 06 · Einsatzgebiete",
    h2: (<>Wo die Methode <em>wirkt.</em></>) as ReactNode,
    lede: "Überall dort, wo Komplexität auf Umsetzungsdruck trifft und Entscheidungen breit getragen werden müssen.",
    cases: [
      { t: "Strategische Transformation", b: "Reorganisationen, neue Geschäftsmodelle oder Plattformwechsel scheitern selten an der Technologie — sondern an unklaren Zielen und mangelndem Alignment. Gemeinsam schaffen wir die gemeinsame Entscheidungsgrundlage vor dem ersten Investitionsschritt.", outs: ["Belastbares Stakeholder-Alignment vor Projektstart", "Tragfähige Grundlage für Budget- und Ressourcenfreigaben"] },
      { t: "Technical Sales", b: "Im komplexen Lösungsvertrieb entscheidet die Tiefe des Problemverständnisses über den Abschluss. Statt eines Standard-Pitches entsteht im Co-Creation-Format mit dem Kunden ein Zielbild, das seine Situation präziser beschreibt als jede vorbereitete Präsentation.", outs: ["Vertrauen durch nachweisliches Tiefenverständnis", "Lösungsarchitektur entlang realer Anforderungen"] },
      { t: "Task-Forces & kritische Lagen", b: "In Krisensituationen dominiert oft der Reflex zur sofortigen Maßnahme. Die strukturierte Analyse zwingt das Team, vor der Reaktion die tatsächliche Ursache zu identifizieren und Handlungsoptionen sauber zu bewerten.", outs: ["Belastbare Ursachenanalyse statt Symptombehandlung", "Priorisierte, wirksame Gegenmaßnahmen"] },
    ],
  },
  team: {
    rubric: "§ 07 · Wer dahinter steht",
    h2: (<>Zwei Perspektiven. <em>Ein</em> Anspruch.</>) as ReactNode,
    lede: "Beide Gründer haben selbst komplexe IT-Entscheidungen verantwortet. Die Methodik ist das Ergebnis — nicht die Grundlage.",
    people: [
      { photo: "/Roessler.jpeg", name: "Dr. Richard Rößler", role: "Entwickler der NarraTec-Methodik", bio: "10+ Jahre IT-Steuerung in komplexen Vorhaben — an der Schnittstelle von Managementforschung und Projektpraxis. Als Entwickler der NarraTec-Methodik setze ich strukturierte Analysen als Instrument ein, das Entscheidungsqualität systematisch messbar macht und Fehlallokationen vor Projektstart verhindert.", credentials: ["10+ Jahre IT-Steuerung", "Methodenexperte in komplexen Vorhaben", "NarraTec-Gründer"] },
      { photo: "/Wieland.jpeg", name: "Prof. Dr. Uwe Wieland", role: "Digitale Transformation & Prozessoptimierung", bio: "Führungserfahrung in der digitalen Transformation: ich weiß, was es bedeutet, mit unzureichenden Informationen weitreichende Entscheidungen treffen zu müssen. Als Mitgründer von NarraTec bringe ich die Perspektive der Entscheidungsverantwortlichen ein — und stelle sicher, dass unsere Methodik an den realen Anforderungen von Führungskräften in komplexen Transformationsvorhaben ausgerichtet bleibt.", credentials: ["Führungserfahrung Digitale Transformation", "Perspektive der Entscheidungsverantwortlichen", "Professur"] },
    ],
    badgeLabel: "Wissenschaftlich publiziert",
    badgeTitle: (<>HMD <span style={{ color: "var(--ink-3)" }}>—</span> Praxis der Wirtschaftsinformatik</>) as ReactNode,
    badgeSub: "Peer-reviewed · Springer",
    papers: [
      { status: "Veröffentlicht", title: "Evidenzbasierte IT-Entscheidungen durch strukturierte Narrative", meta: "HMD · 2025", url: PAPER_PUBLISHED_URL },
      { status: "Pre-Read", title: "Narrative-to-Action: Ein Framework zur Überführung in agile Backlog-Items", meta: "In Begutachtung · Manuskript verfügbar", url: PAPER_PREREAD_URL },
    ],
  },
  disqualify: {
    rubric: "§ 08 · ABGRENZUNG",
    h2: (<>Wann wir <em>absagen.</em></>) as ReactNode,
    lede: "Ein präzises Werkzeug erkennt seine Grenzen. Es gibt Konstellationen, in denen NarraTec nicht der richtige Schritt ist. Wenn Sie sich in einem der folgenden Fälle wiederfinden, verweisen wir Sie gerne an Partner aus unserem Netzwerk.",
    notLabel: "Nicht passend",
    items: [
      { n: "01", t: "Sie haben bereits entschieden und suchen Legitimation.", b: "Unsere Analyse kann zu Ergebnissen führen, die der intern bereits getroffenen Entscheidung widersprechen. Wer ein nachträgliches Argument sucht, ist bei uns falsch." },
      { n: "02", t: "Die Umsetzung läuft bereits.", b: "Wir arbeiten vor der Investitionsentscheidung, nicht während der Implementierung. Ist der Vertrag mit dem Umsetzungspartner unterschrieben und das Projekt im Lauf, bringen wir keinen Hebel mehr, sondern stiften Reibung." },
      { n: "03", t: "Sie suchen jemanden, der den Job für Sie macht.", b: "Der Erfolg von NarraTec beruht auf dem Wissen und dem Enablement Ihrer Experten. Wir führen die Analyse, aber die Substanz kommt aus Ihrem Haus — wer eine Bearbeitung ohne eigene Beteiligung erwartet, ist bei uns nicht richtig." },
      { n: "04", t: "Das Investitionsvolumen rechtfertigt unser Vorgehen nicht.", b: "Unsere Methodik ist auf strategisch tragende Investments ausgelegt. Bei kleineren Vorhaben übersteigt unser Aufwand den möglichen Wertbeitrag — einfachere Formate führen schneller zum Ziel. Die Schwelle benennen wir offen im Erstgespräch." },
    ],
    closing: (<>Unsicher, ob Ihr Vorhaben passt? Das 30-minütige Erstgespräch klärt <span style={{ color: "var(--accent-ink)" }}>genau diese Frage</span> — ohne Folgekosten, ohne Verpflichtung.</>) as ReactNode,
  },
  faq: {
    rubric: "§ 09 · FAQ",
    h2: (<>Die sechs Fragen, die <em>C-Level</em> zuerst stellt.</>) as ReactNode,
    items: [
      { q: "Was kostet ein Vorhaben?", a: "Festpreis, abhängig von Scope und Stakeholderzahl. Typische Range 15k - 35k€. Das Briefing selbst ist kostenfrei und unverbindlich." },
      { q: "Wer ist im Briefing dabei?", a: "Ein Partner. Kein Vertrieb. NDA auf Wunsch vor dem Gespräch." },
      { q: "Wie lange dauert die Zusammenarbeit?", a: "4–6 Wochen von Auftrag bis signierter Entscheidung sind ein typischer Rahmen. Die Dauer hängt von Stakeholderzahl und Datenverfügbarkeit ab, nicht von unserem Kalender." },
      { q: "Ersetzt das unsere Strategieberatung?", a: "Nein. NarraTec arbeitet für die Entscheidung, wir sind der Schritt zwischen Strategie und Umsetzung." },
      { q: "Was passiert mit unseren Daten?", a: "Alle Materialien bleiben Ihr Eigentum. Ergebnisdokumente werden übergeben, interne Arbeitsdaten auf Wunsch binnen 30 Tagen gelöscht." },
      { q: "Nutzen Sie KI in der Erstellung?", a: "Ja — bei Verdichtung, Recherche und Backlog-Übersetzung. Nie bei Hypothesenbildung, Entscheidungsempfehlung oder Signatur. Wir dokumentieren transparent, wo KI eingesetzt wurde." },
    ],
  },
  final: {
    rubric: "§ 10 · NÄCHSTER SCHRITT",
    h2: (<>30 Minuten. Ein Partner. <em>Ihre</em> nächste Entscheidung.</>) as ReactNode,
    lede: "Bringen Sie eine offene Frage mit — wir bringen die Methode. Keine Folien, keine Vertriebsschleife. Am Ende wissen Sie, ob eine Zusammenarbeit der richtige nächste Schritt ist.",
  },
};

type LandingCopy = typeof landingDe;

const landingEn: LandingCopy = {
  cta: {
    book: "Book an intro call",
    spar: "30-min sparring with the founders",
    seeMethod: "See the method",
    micro: "30 min · free · no sales · NDA on request",
    finalMicro: "contact@narratec.io · 30 min · free · no sales · NDA on request",
  },
  nav: [
    { label: "Problem", id: "problem" },
    { label: "Use cases", id: "einsatz" },
    { label: "Method", id: "methode" },
    { label: "Team", id: "team" },
    { label: "Results", id: "ergebnis" },
  ],
  hero: {
    kicker: "THE DECISION STANDARD FOR STRATEGICALLY CRITICAL IT INVESTMENTS",
    headline: (
      <>
        <span className="line">Strategic IT investments,</span>
        <span className="line">decided to <em>hold</em></span>
        <span className="line"> in 4 weeks.</span>
      </>
    ),
    lede: "In four weeks, we distill your complex starting position into a signed, binding implementation mandate — translated directly into operational work packages. You gain investment certainty before the first euro is spent.",
    italic: "In the end you don't just know what to do — you've saved months of detours before the project even starts.",
  },
  trust: [
    <>Proven across several initiatives in a <span style={hl}>DAX corporation</span>.</>,
    <>You engage us at a <span style={hl}>fixed price</span>, without risk.</>,
    <>Your sensitive information protected by an <span style={hl}>NDA</span>.</>,
  ],
  problem: {
    rubric: "§ 01 · Diagnosis",
    h2: <>Four patterns that endanger <em>every</em> major project.</>,
    lede: "Technology rarely fails — translation does. The four patterns that keep surfacing in practice:",
    items: [
      { n: "01", t: "Premature solutions", b: "Teams debate solutions before the problem is understood. Treating symptoms instead of finding root causes.", cost: "Misdirected activity from day 1" },
      { n: "02", t: "Silo thinking", b: "Business units and management speak different languages. The connecting element is missing.", cost: "No alignment, no progress" },
      { n: "03", t: "Trivialization by bullet points", b: "Meetings and slide decks leave no room for discourse. Complex problems get trivialized into bullet points.", cost: "Pseudo-decisions instead of clarity" },
      { n: "04", t: "The execution trap", b: "Decisions that were made fizzle out. Implementation stalls.", cost: "Investments without impact" },
    ],
  },
  position: {
    rubric: "§ 02 · POSITION",
    h2: <>Between strategy <em>and delivery.</em></>,
    lede: "NarraTec replaces neither strategy consulting nor delivery partners. We close one specific gap: the moment a strategic intent has to become a viable, signature-ready investment decision.",
    compareLabel: "Comparison",
    rowPhase: "Phase",
    rowQuestion: "Guiding question",
    rowOutput: "Output",
    cols: [
      { label: "Strategy consulting", phase: "Before the decision", q: "“Where should we go?”", output: "Vision, roadmap, business case" },
      { label: "NarraTec", phase: "Closing the decision", q: "“How exactly — and under what conditions?”", output: "Implementation mandate, work packages with ownership and acceptance criteria" },
      { label: "Delivery partner", phase: "After the decision", q: "“We build it.”", output: "Working system, process, organization" },
    ],
  },
  caseStudy: {
    rubric: "§ 03 · Case Study",
    h2: <>The dashboard would have been built — <em>on the wrong foundation.</em></>,
    lede: "Anonymized real case · Industrial company · DACH · 2025",
    phases: [
      { n: "Starting point", t: "The decision seemed clear.", d: "A dashboard for product-cost control. Budget reserved. Vendor pre-selected. Already communicated internally." },
      { n: "What we found", t: "The data foundation would have sunk the project.", d: "9 interviews with experts from controlling, production and IT exposed what had never been articulated internally: critical data gaps, source conflicts and missing system integrations — which would have rendered the dashboard useless or caused unplannable delays." },
      { n: "Outcome", t: "A better decision.", d: "Instead of a generic dashboard: a binding implementation mandate with defined data requirements, clear source systems and measurable acceptance criteria. Delivery started without architecture loops." },
    ],
    metricsLabel: "Outcome in numbers",
    metrics: [
      { k: "Decision time", v: "4 weeks" },
      { k: "Time-to-backlog", v: "6 weeks" },
      { k: "Budget protected from misallocation", v: "€1.3M" },
    ],
    docLabel: "The resulting narrative (excerpt)",
    docMetaLeft: "Narrative · v1.2",
    docMetaRight: "Status: decided",
    docH4: "Product-cost dashboard: commission it, or create the conditions first?",
    docSub: "Initiative 2025-Q3 · Owner: Head of IT · Involved: Controlling, Production, Data Engineering",
    docSections: [
      { k: "Hypothesis", v: <>The missing cost transparency cannot be solved by a dashboard while the data foundation is uncleaned. <span className="hl">Building the dashboard immediately would misallocate the budget</span> — the real problems would stay invisible.</> },
      { k: "Evidence", v: <>9 interviews with experts from controlling, production and IT. <span className="hl">Several critical data gaps and source conflicts</span> identified. Missing integration of 3 source systems documented.</> },
      { k: "Decision", v: <>A fine-grained implementation mandate instead of a generic dashboard. Clear data requirements, defined source systems, prioritized cost objects and measurable acceptance criteria.</> },
      { k: "Backlog", v: <>7 work packages, 3 owners, acceptance criteria defined per package.</> },
    ],
    docSig: "Signed off:\nHead of IT · Controlling · Data Engineering",
    docDate: "Sep 22, 2025",
  },
  outcomes: {
    rubric: "§ 04 · Measurement Promise",
    h2: <>Three metrics. <em>Agreed before the project starts.</em></>,
    lede: "We don't make promises — we agree on metrics. Three figures we commit to with you before the analysis begins. In the end, we report openly on what moved.",
    items: [
      { n: "01", label: "Reallocation volume", body: "Difference between the originally planned budget allocation and the signed decision. We report the direction and magnitude of the shift." },
      { n: "02", label: "Decision time", body: "From the open problem to the signed decision." },
      { n: "03", label: "Time-to-backlog", body: "Time from the signed decision to the first implementation-ready work package." },
    ],
  },
  method: {
    rubric: "§ 05 · Method",
    h2: <>From hypothesis to backlog: how the decision becomes <em>durable.</em></>,
    lede: "A structured analysis that connects root causes, decision logic and actions in one jointly developed document — producing decisions that hold internally.",
    steps: [
      { phase: "Day 0", title: "Kick-off", desc: "Sharpen the problem, goal and value hypothesis; define stakeholders and success criteria. We define how a good decision must ultimately be measured." },
      { phase: "Week 1–2", title: "Build the evidence base", desc: "Interviews, data audit, second-opinion review. We listen before we form a hypothesis." },
      { phase: "Week 3", title: "Lay out the options", desc: "Criteria, trade-offs and decision logic — argued in writing against the success criteria defined earlier." },
      { phase: "Week 4", title: "Translate into work packages", desc: "Sign-off, work packages, ownership. The decision doesn't end with the signature." },
    ],
    principleLabel: "Principle",
    principleTitle: <>AI &amp;<br />accountability</>,
    statement1: <>AI assists with synthesis, research and translation into work packages. <span style={{ color: "oklch(82% 0.008 85)" }}>Never with the decision.</span></>,
    statement2: <>Accountability stays <span style={{ color: "oklch(72% 0.14 25)" }}>human.</span></>,
  },
  usecases: {
    rubric: "§ 06 · Where it applies",
    h2: <>Where the method <em>works.</em></>,
    lede: "Wherever complexity meets implementation pressure and decisions must be broadly supported.",
    cases: [
      { t: "Strategic transformation", b: "Reorganizations, new business models or platform changes rarely fail on technology — they fail on unclear goals and missing alignment. Together we create the shared decision basis before the first investment step.", outs: ["Robust stakeholder alignment before project start", "Solid basis for budget and resource approvals"] },
      { t: "Technical sales", b: "In complex solution sales, the depth of problem understanding decides the deal. Instead of a standard pitch, a co-creation format with the client produces a target picture that describes their situation more precisely than any prepared presentation.", outs: ["Trust through demonstrable depth of understanding", "Solution architecture along real requirements"] },
      { t: "Task forces & critical situations", b: "In crises, the reflex to act immediately tends to dominate. The structured analysis forces the team to identify the actual root cause before reacting and to assess options cleanly.", outs: ["Robust root-cause analysis instead of treating symptoms", "Prioritized, effective countermeasures"] },
    ],
  },
  team: {
    rubric: "§ 07 · Who's behind it",
    h2: <>Two perspectives. <em>One</em> standard.</>,
    lede: "Both founders have owned complex IT decisions themselves. The method is the result — not the premise.",
    people: [
      { photo: "/Roessler.jpeg", name: "Dr. Richard Rößler", role: "Creator of the NarraTec method", bio: "10+ years of IT governance in complex initiatives — at the intersection of management research and project practice. As the creator of the NarraTec method, I use structured analysis as an instrument that makes decision quality systematically measurable and prevents misallocations before a project starts.", credentials: ["10+ years of IT governance", "Method expert in complex initiatives", "NarraTec founder"] },
      { photo: "/Wieland.jpeg", name: "Prof. Dr. Uwe Wieland", role: "Digital transformation & process optimization", bio: "Leadership experience in digital transformation: I know what it means to make far-reaching decisions with insufficient information. As co-founder of NarraTec, I bring the perspective of the decision-maker — and make sure our method stays aligned with the real demands on executives in complex transformation programs.", credentials: ["Leadership in digital transformation", "Decision-maker's perspective", "Professorship"] },
    ],
    badgeLabel: "Academically published",
    badgeTitle: <>HMD <span style={{ color: "var(--ink-3)" }}>—</span> Praxis der Wirtschaftsinformatik</>,
    badgeSub: "Peer-reviewed · Springer",
    papers: [
      { status: "Published", title: "Evidenzbasierte IT-Entscheidungen durch strukturierte Narrative", meta: "HMD · 2025", url: PAPER_PUBLISHED_URL },
      { status: "Pre-Read", title: "Narrative-to-Action: Ein Framework zur Überführung in agile Backlog-Items", meta: "Under review · manuscript available", url: PAPER_PREREAD_URL },
    ],
  },
  disqualify: {
    rubric: "§ 08 · BOUNDARIES",
    h2: <>When we <em>say no.</em></>,
    lede: "A precise tool knows its limits. There are situations where NarraTec is not the right step. If one of the following describes you, we're happy to refer you to partners in our network.",
    notLabel: "Not a fit",
    items: [
      { n: "01", t: "You've already decided and are looking for legitimacy.", b: "Our analysis can lead to results that contradict the decision already made internally. If you're looking for an after-the-fact argument, we're the wrong choice." },
      { n: "02", t: "Implementation is already underway.", b: "We work before the investment decision, not during implementation. Once the contract with the delivery partner is signed and the project is running, we add no leverage — only friction." },
      { n: "03", t: "You're looking for someone to do the job for you.", b: "NarraTec's success rests on the knowledge and enablement of your experts. We lead the analysis, but the substance comes from your organization — if you expect delivery without your own involvement, we're not the right fit." },
      { n: "04", t: "The investment volume doesn't justify our approach.", b: "Our method is built for strategically critical investments. For smaller initiatives, our effort exceeds the possible value contribution — simpler formats get there faster. We name the threshold openly in the intro call." },
    ],
    closing: <>Unsure whether your initiative fits? The 30-minute intro call answers <span style={{ color: "var(--accent-ink)" }}>exactly that question</span> — no follow-up cost, no obligation.</>,
  },
  faq: {
    rubric: "§ 09 · FAQ",
    h2: <>The six questions <em>C-level</em> asks first.</>,
    items: [
      { q: "What does an engagement cost?", a: "Fixed price, depending on scope and number of stakeholders. Typical range €15k–35k. The briefing itself is free and non-binding." },
      { q: "Who's in the briefing?", a: "One partner. No sales. NDA on request before the call." },
      { q: "How long does the engagement take?", a: "4–6 weeks from engagement to signed decision is a typical range. Duration depends on the number of stakeholders and data availability, not on our calendar." },
      { q: "Does this replace our strategy consulting?", a: "No. NarraTec works for the decision — we're the step between strategy and delivery." },
      { q: "What happens to our data?", a: "All materials remain your property. Result documents are handed over; internal working data is deleted within 30 days on request." },
      { q: "Do you use AI in the work?", a: "Yes — for synthesis, research and backlog translation. Never for forming hypotheses, decision recommendations or sign-off. We transparently document where AI was used." },
    ],
  },
  final: {
    rubric: "§ 10 · NEXT STEP",
    h2: <>30 minutes. One partner. <em>Your</em> next decision.</>,
    lede: "Bring an open question — we bring the method. No slides, no sales loop. In the end you'll know whether working together is the right next step.",
  },
};

const LANDING: Record<"de" | "en", LandingCopy> = { de: landingDe, en: landingEn };

// ---------- Sections ----------

function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div
      aria-label="Sprache / Language"
      style={{ display: "inline-flex", border: "1px solid var(--rule-strong)", borderRadius: 2, overflow: "hidden" }}
    >
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            padding: "7px 10px",
            cursor: "pointer",
            border: "none",
            background: lang === l ? "var(--ink)" : "transparent",
            color: lang === l ? "var(--paper)" : "var(--ink-2)",
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Nav({ nav, cta }: { nav: LandingCopy["nav"]; cta: LandingCopy["cta"] }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" onClick={onJump("top")} className="logo" aria-label="NarraTec">
          <Layers size={20} strokeWidth={2.5} aria-hidden="true" style={{ color: "var(--accent)", flexShrink: 0, transform: "translateY(2px)" }} />
          <span>NarraTec</span>
        </a>
        <nav className="nav-links" aria-label="Hauptnavigation">
          {nav.map((l) => (
            <a key={l.id} className="nav-link" href={`#${l.id}`} onClick={onJump(l.id)}>{l.label}</a>
          ))}
          <LangToggle />
          <a className="btn btn-primary nav-cta" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
            {cta.book} <span className="btn-arrow" aria-hidden="true"></span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ c, cta }: { c: LandingCopy["hero"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="hero container" id="top" data-screen-label="01 Hero">
      <div className="hero-kicker">
        <span className="dot" aria-hidden="true"></span>
        <span className="rubric no-line">{c.kicker}</span>
      </div>

      <h1 className="display" style={{ fontSize: "clamp(52px, 8.5vw, 118px)", lineHeight: 1.06, marginBottom: 0, marginTop: 24 }}>
        {c.headline}
      </h1>

      <div style={{ borderTop: "1px solid var(--rule)", margin: "36px 0 0" }} />

      <div style={{ paddingTop: 36 }}>
        <p className="lede" style={{ maxWidth: "52ch", marginTop: 0 }}>{c.lede}</p>
        <p style={{ maxWidth: "52ch", marginTop: 16, marginBottom: 0, fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.4, color: "var(--ink-2)", letterSpacing: "-0.005em" }}>
          {c.italic}
        </p>
        <div className="hero-actions" style={{ marginTop: 28 }}>
          <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
            {cta.spar} <span className="btn-arrow" aria-hidden="true"></span>
          </a>
          <a className="btn btn-ghost" href="#methode" onClick={onJump("methode")}>{cta.seeMethod}</a>
        </div>
        <div style={{ marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          {cta.micro}
        </div>
      </div>
    </section>
  );
}

function TrustBar({ items }: { items: LandingCopy["trust"] }) {
  return (
    <div data-screen-label="01b TrustBar" style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      <div className="trust-strip" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {items.map((label, i) => (
          <div key={i} style={{ padding: "clamp(18px, 2.2vw, 26px) clamp(16px, 2.5vw, 32px)", borderRight: i < items.length - 1 ? "1px solid var(--rule)" : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.3vw, 19px)", lineHeight: 1.3, color: "var(--ink)", letterSpacing: "-0.005em", textAlign: "center", maxWidth: "30ch" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Problem({ c }: { c: LandingCopy["problem"] }) {
  return (
    <section className="section" id="problem" data-screen-label="02 Problem">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>
        <div className="patterns">
          {c.items.map((it) => (
            <article className="pattern" key={it.n}>
              <div className="pattern-num">{it.n}</div>
              <h3 className="pattern-title">{it.t}</h3>
              <p className="pattern-body">{it.b}</p>
              <div className="pattern-cost"><span className="arrow">↳</span>{it.cost}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Position({ c }: { c: LandingCopy["position"] }) {
  const rows = [
    { k: c.rowPhase, f: "phase" as const },
    { k: c.rowQuestion, f: "q" as const },
    { k: c.rowOutput, f: "output" as const },
  ];
  return (
    <section className="section" id="position" data-screen-label="03 Position">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>

        <div className="pos-table" style={{ border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden", background: "var(--paper)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 140px) repeat(3, minmax(0, 1fr))", borderBottom: "1px solid var(--rule)", background: "var(--paper-2)" }}>
            <div style={{ padding: "20px 22px", borderRight: "1px solid var(--rule)", fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)" }}>{c.compareLabel}</div>
            {c.cols.map((col, i) => (
              <div key={col.label} style={{ padding: "20px 22px", borderRight: i < c.cols.length - 1 ? "1px solid var(--rule)" : "none", fontFamily: "var(--f-display)", fontSize: 22, lineHeight: 1.15, color: i === 1 ? "var(--accent-ink)" : "var(--ink)", fontStyle: i === 1 ? "italic" : "normal", letterSpacing: "-0.005em" }}>
                {col.label}
              </div>
            ))}
          </div>

          {rows.map((r, ri) => (
            <div key={r.k} style={{ display: "grid", gridTemplateColumns: "minmax(0, 140px) repeat(3, minmax(0, 1fr))", borderBottom: ri < rows.length - 1 ? "1px solid var(--rule)" : "none" }}>
              <div style={{ padding: "18px 22px", borderRight: "1px solid var(--rule)", background: "var(--paper-2)", fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)" }}>{r.k}</div>
              {c.cols.map((col, ci) => (
                <div key={col.label + r.k} style={{ padding: "18px 22px", borderRight: ci < c.cols.length - 1 ? "1px solid var(--rule)" : "none", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink)" }}>
                  {col[r.f]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: one card per provider (the table is unreadable in 3 columns) */}
        <div className="pos-cards" style={{ flexDirection: "column", gap: 16 }}>
          {c.cols.map((col, i) => {
            const highlight = i === 1;
            return (
              <div key={col.label} style={{ border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden", background: "var(--paper)" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--rule)", background: "var(--paper-2)", fontFamily: "var(--f-display)", fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.005em", color: highlight ? "var(--accent-ink)" : "var(--ink)", fontStyle: highlight ? "italic" : "normal" }}>
                  {col.label}
                </div>
                <div style={{ padding: "6px 20px 12px" }}>
                  {rows.map((r, idx) => (
                    <div key={r.k} style={{ padding: "12px 0", borderTop: idx === 0 ? "none" : "1px solid var(--rule)" }}>
                      <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 6 }}>{r.k}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink)" }}>{col[r.f]}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DecisionBridge({ steps }: { steps: LandingCopy["method"]["steps"] }) {
  return (
    <div style={{ "--nt-ink": "var(--ink)", "--nt-muted": "var(--ink-3)", "--nt-line": "var(--rule)", "--nt-accent": "var(--accent-ink)", "--nt-paper": "var(--paper)", marginTop: 48 } as CSSProperties}>
      <div className="db-wrap" style={{ position: "relative" }}>
        <span aria-hidden="true" className="db-rail" style={{ position: "absolute", left: "12.5%", right: "12.5%", top: 20, height: 1, background: "var(--nt-line)" }} />
        <ol className="db-list" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24, listStyle: "none", margin: 0, padding: 0 }}>
          {steps.map((s, i) => (
            <li key={s.phase} className="db-item" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--nt-accent)", background: "var(--nt-paper)", color: "var(--nt-accent)", fontFamily: "var(--f-mono)", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                {i + 1}
              </span>
              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--nt-accent)" }}>{s.phase}</div>
                <h3 style={{ margin: "6px 0 0", fontFamily: "var(--f-display)", fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.005em", color: "var(--nt-ink)", fontWeight: 400 }}>{s.title}</h3>
                <p style={{ margin: "10px auto 0", maxWidth: "22rem", fontSize: 14, lineHeight: 1.65, color: "var(--nt-muted)" }}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Method({ c }: { c: LandingCopy["method"] }) {
  return (
    <section className="section" id="methode" data-screen-label="04 Methode">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>

        <DecisionBridge steps={c.steps} />
        <div className="method-principle" style={{ marginTop: 48, background: "var(--ink)", color: "var(--paper)", borderRadius: 3, padding: "clamp(40px, 5vw, 64px) clamp(32px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 180px) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "start", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--accent)" }} />
          <div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "oklch(72% 0.008 85)", marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 18, height: 1, background: "oklch(72% 0.008 85)" }}></span>
              {c.principleLabel}
            </div>
            <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.15, color: "oklch(72% 0.14 25)", letterSpacing: "-0.005em" }}>
              {c.principleTitle}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "clamp(24px, 2.6vw, 36px)", lineHeight: 1.25, color: "oklch(92% 0.008 85)", margin: "0 0 18px", letterSpacing: "-0.01em", maxWidth: "24ch" }}>
              {c.statement1}
            </p>
            <p style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.1, margin: 0, letterSpacing: "-0.015em", color: "var(--paper)" }}>
              {c.statement2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases({ c }: { c: LandingCopy["usecases"] }) {
  return (
    <section className="section" id="einsatz" data-screen-label="02 Einsatz">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>
        <div className="usecases">
          {c.cases.map((uc, i) => (
            <article className="usecase" key={i}>
              <h3 className="usecase-title" style={{ fontWeight: 500 }}>{uc.t}</h3>
              <p className="usecase-body">{uc.b}</p>
              <ul className="usecase-outs">
                {uc.outs.map((o, j) => <li key={j}><span className="check" aria-hidden="true">✓</span>{o}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team({ c }: { c: LandingCopy["team"] }) {
  return (
    <section className="section" id="team" data-screen-label="06 Team">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>

        <div className="team-grid">
          {c.people.map((p, i) => (
            <article className="person" key={i}>
              <div className="person-head">
                <div className="person-avatar" aria-hidden="true">
                  <img src={p.photo} alt={p.name} />
                </div>
                <div className="person-id">
                  <div className="person-name">{p.name}</div>
                  <div className="person-role">{p.role}</div>
                </div>
              </div>
              <p className="person-bio">{p.bio}</p>
              <ul className="person-creds">
                {p.credentials.map((cr, j) => <li key={j}>{cr}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="team-badge" style={{ marginTop: 28, border: "1px solid var(--rule)", borderRadius: 3, background: "var(--paper)", display: "grid", gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)", gap: 0, overflow: "hidden" }}>
          <div style={{ padding: "28px 30px", borderRight: "1px solid var(--rule)", background: "var(--paper-2)", display: "flex", flexDirection: "column", gap: 14, justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2 L15 9 L22 10 L17 15 L18.5 22 L12 18.5 L5.5 22 L7 15 L2 10 L9 9 Z" />
                </svg>
                {c.badgeLabel}
              </div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 28, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                {c.badgeTitle}
              </div>
            </div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".06em", color: "var(--ink-3)", textTransform: "uppercase", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
              {c.badgeSub}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {c.papers.map((paper, i, arr) => {
              const accent = i === 0;
              const statusColor = accent ? "var(--accent-ink)" : "var(--ink-2)";
              const statusBg = accent ? "var(--accent-wash)" : "var(--paper-2)";
              return (
                <a key={i} href={paper.url} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "22px 28px", borderBottom: i < arr.length - 1 ? "1px solid var(--rule)" : "none", display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 20, alignItems: "center", transition: "background .15s", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--paper-2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px", background: statusBg, color: statusColor, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", borderRadius: 2, marginBottom: 10, border: `1px solid ${accent ? "color-mix(in oklab, var(--accent-ink) 18%, transparent)" : "var(--rule)"}` }}>
                      <span style={{ width: 5, height: 5, borderRadius: 999, background: statusColor }}></span>
                      {paper.status}
                    </div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 19, lineHeight: 1.25, color: "var(--ink)", letterSpacing: "-0.005em", marginBottom: 6 }}>
                      „{paper.title}"
                    </div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".04em", color: "var(--ink-3)" }}>
                      {paper.meta}
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 13, color: "var(--ink-3)" }}>→</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Disqualify({ c, cta }: { c: LandingCopy["disqualify"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="section" id="abgrenzung" data-screen-label="05 Abgrenzung">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--rule)" }}>
          {c.items.map((it) => (
            <article key={it.n} className="dq-item" style={{ display: "grid", gridTemplateColumns: "minmax(0, 200px) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 64px)", padding: "32px 0 32px", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{c.notLabel}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", color: "var(--accent-ink)" }}>{it.n}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--ink)", margin: "0 0 14px", maxWidth: "32ch" }}>{it.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: "60ch" }}>{it.b}</p>
              </div>
            </article>
          ))}
        </div>

        <p style={{ marginTop: 32, fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.3, color: "var(--ink-2)", maxWidth: "58ch", letterSpacing: "-0.01em" }}>
          {c.closing}
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
            {cta.book} <span className="btn-arrow" aria-hidden="true"></span>
          </a>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
            {cta.micro}
          </span>
        </div>
      </div>
    </section>
  );
}

function Outcomes({ c }: { c: LandingCopy["outcomes"] }) {
  return (
    <section className="section" id="ergebnis" data-screen-label="07 Ergebnis">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>
        <div className="outcomes">
          {c.items.map((o, i) => (
            <div className="outcome" key={i}>
              <div className="outcome-src" style={{ marginTop: 0, marginBottom: 14 }}> {o.n}</div>
              <div className="outcome-n" style={{ fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.05, color: "var(--ink)", fontStyle: "italic" }}>{o.label}</div>
              <div className="outcome-body" style={{ marginTop: 10 }}>{o.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ c }: { c: LandingCopy["caseStudy"] }) {
  return (
    <section className="section" data-screen-label="08 Case">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede">{c.lede}</p>
          </div>
        </div>

        <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)", gap: 0, borderTop: "1px solid var(--rule)", marginTop: 48 }}>
          <div className="case-col-left" style={{ borderRight: "1px solid var(--rule)", display: "flex", flexDirection: "column" }}>
            {c.phases.map((p) => (
              <div key={p.n} style={{ padding: "28px 36px 28px 0", borderBottom: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 8 }}>{p.n}</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 18, lineHeight: 1.25, color: "var(--ink)", marginBottom: 10 }}>{p.t}</div>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>{p.d}</p>
              </div>
            ))}
            <div style={{ marginTop: 28, marginRight: 36, padding: "20px 22px", background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 3 }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 12 }}>
                {c.metricsLabel}
              </div>
              <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.metrics.map(({ k, v }) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                    <dt style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.4 }}>{k}</dt>
                    <dd style={{ margin: 0, fontFamily: "var(--f-display)", fontSize: 17, color: "var(--ink)", textAlign: "right", letterSpacing: "-0.005em" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="case-doc-col" style={{ padding: "40px 0 40px 40px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 16 }}>{c.docLabel}</div>
            <figure className="doc" style={{ margin: 0, flex: 1 }}>
              <div className="doc-meta">
                <span>{c.docMetaLeft}</span>
                <span>{c.docMetaRight}</span>
              </div>
              <h4>{c.docH4}</h4>
              <div className="doc-sub">{c.docSub}</div>
              {c.docSections.map((s) => (
                <div className="doc-section" key={s.k}><span className="k">{s.k}</span><span className="v">{s.v}</span></div>
              ))}
              <div className="doc-footer">
                <span style={{ whiteSpace: "pre-line" }}>{c.docSig}</span>
                <span>{c.docDate}</span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ c }: { c: LandingCopy["faq"] }) {
  return (
    <section className="section" data-screen-label="09 FAQ">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
          </div>
        </div>
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, borderTop: "1px solid var(--rule)", marginTop: 0 }}>
          {c.items.map((it, i) => (
            <div key={i} style={{ padding: "32px 36px", borderBottom: "1px solid var(--rule)", borderRight: i % 2 === 0 ? "1px solid var(--rule)" : "none" }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 19, lineHeight: 1.25, color: "var(--ink)", marginBottom: 14 }}>{it.q}</div>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Final({ c, cta }: { c: LandingCopy["final"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="final" id="final" data-screen-label="10 Final CTA">
      <div className="container">
        <div className="section-head">
          <div className="rubric">{c.rubric}</div>
          <div>
            <h2 className="display">{c.h2}</h2>
            <p className="lede" style={{ marginTop: 20 }}>{c.lede}</p>
            <div className="hero-actions" style={{ marginTop: 36 }}>
              <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
                {cta.spar} <span className="btn-arrow" aria-hidden="true"></span>
              </a>
              <a className="btn btn-ghost" href="#methode" onClick={onJump("methode")}>{cta.seeMethod}</a>
            </div>
            <div style={{ marginTop: 22, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "oklch(72% 0.008 85)" }}>
              {cta.finalMicro}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© 2026 NarraTec GmbH. {t.legalLayout.copyright}</div>
        <div className="footer-links">
          <Link to="/impressum">{t.legalLayout.impressum}</Link>
          <Link to="/datenschutz">{t.legalLayout.datenschutz}</Link>
          <Link to="/agb">{t.legalLayout.agb}</Link>
          <a href="mailto:contact@narratec.io">contact@narratec.io</a>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Zurück nach oben"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid var(--rule-strong)",
        background: "var(--paper)",
        color: "var(--ink)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--f-mono)",
        fontSize: 16,
        boxShadow: "0 4px 16px oklch(18% 0.01 85 / 0.12)",
        transition: "background .15s, border-color .15s, transform .15s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--ink)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--paper)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--paper)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)"; }}
    >
      ↑
    </button>
  );
}

function RedesignLanding() {
  const { lang } = useI18n();
  const L = LANDING[lang];
  return (
    <div className="nt-page">
      <Nav nav={L.nav} cta={L.cta} />
      <main>
        <Hero c={L.hero} cta={L.cta} />
        <TrustBar items={L.trust} />
        <Problem c={L.problem} />
        <Position c={L.position} />
        <CaseStudy c={L.caseStudy} />
        <Outcomes c={L.outcomes} />
        <Method c={L.method} />
        <UseCases c={L.usecases} />
        <Team c={L.team} />
        <Disqualify c={L.disqualify} cta={L.cta} />
        <FAQ c={L.faq} />
        <Final c={L.final} cta={L.cta} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default RedesignLanding;
