import { type MouseEvent, type CSSProperties, type ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layers, Menu, X } from "lucide-react";
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
const numRubric = (num: string, label: string): ReactNode => (
  <><span style={{ color: "var(--accent-ink)" }}>{num}</span> {label}</>
);

// ---------- Bilingual content ----------

const landingDe = {
  cta: {
    book: "Erstgespräch anfragen",
    spar: "30 Min Sparring mit den Gründern",
    seeMethod: "Methode ansehen",
    micro: "30 Min · kostenfrei · kein Vertrieb · NDA auf Wunsch",
    microShort: "30 Min · kostenfrei · NDA auf Wunsch",
    finalMicro: "30 Min · kostenfrei · kein Vertrieb · NDA auf Wunsch",
  },
  nav: [
    { label: "Problem", id: "problem" },
    { label: "Methode", id: "zielbild" },
    { label: "Einsatz", id: "einsatz" },
    { label: "Leistungen", id: "bausteine" },
    { label: "Praxis", id: "case-study" },
    { label: "Team", id: "team" },
  ],
  hero: {
    kicker: numRubric("01", "MOTIVATION & ZIELSETZUNG"),
    headline: (
      <>
        <span className="line">Vom Problem zur <em>Entscheidung.</em></span>
        <span className="line">Von der Entscheidung in die <em>Umsetzung.</em></span>
      </>
    ) as ReactNode,
    lede: "Ihre Fachleute haben die Antworten. NarraTec gibt ihnen die Struktur: einen erprobten Weg von der Fragestellung zur begründeten Entscheidung — und von dort zu Arbeitspaketen und leistungsfähigen Teams.",
    close: "Wir befähigen Ihre Leute, statt sie zu ersetzen.",
  },
  trust: [
    (<>In mehreren Vorhaben im <span style={hl}>DAX-Konzern</span> erprobt.</>) as ReactNode,
    (<>Sie beauftragen uns zum <span style={hl}>Festpreis</span>, ohne Risiko.</>) as ReactNode,
    (<>Ihre sensiblen Informationen geschützt durch ein <span style={hl}>NDA</span>.</>) as ReactNode,
  ],
  problem: {
    rubric: numRubric("02", "IST-ZUSTAND"),
    h2: (<>Strategien scheitern<br />selten an der Konzeption —<br />sondern <em>am Übergang.</em></>) as ReactNode,
    lede: "Zwischen Entscheidung und Umsetzung reißt die Kette: Die Begründung bleibt in den Folien zurück, das Warum erreicht die Teams nicht — und die Arbeitsstrukturen wachsen aus Gewohnheit statt mit Absicht.",
    items: [
      { n: "Befund A", t: "Entscheidungen ohne Tiefe", b: "Teams diskutieren Lösungen, bevor das Problem verstanden ist — Symptombehandlung statt Ursachenforschung. Folien machen schwierige Fragen flacher, als sie sind: Annahmen werden nicht ausgesprochen, Widersprüche bleiben unsichtbar. Am Ende entscheidet Redekunst statt Faktenlage.", cost: "Scheinentscheidungen statt Klarheit" },
      { n: "Befund B", t: "Übergabe ohne System", b: "Der Weg von der Entscheidung zu den Aufgaben der Teams bleibt dem Zufall überlassen. Fachbereiche und Management sprechen unterschiedliche Sprachen; bei der Übergabe gehen die Fakten und das Warum verloren — Teams setzen um, ohne das Problem wirklich zu kennen, und getroffene Entscheidungen versanden.", cost: "Investitionen ohne Wirkung" },
      { n: "Befund C", t: "Strukturen ohne Maß", b: "Wie Teams zusammenarbeiten, ist historisch gewachsen: zu viel Verwaltungsaufwand an einer Stelle, fehlende Abstimmung an der anderen. Ob die Umsetzung vorankommt, lässt sich kaum prüfen.", cost: "Kein Alignment, kein Fortschritt" },
    ],
  },
  zielbild: {
    rubric: numRubric("03", "ZIELBILD · METHODE"),
    h2: (<>Eine Kette, drei Glieder — <em>lückenlos.</em></>) as ReactNode,
    lede: "Die NarraTec-Methode verbindet drei Schritte zu einem durchgängigen, nachvollziehbaren Vorgehen: verstehen, übersetzen, liefern.",
    callout: {
      term: "Narrativ, das",
      tag: "[Kernbegriff der Methode]",
      body: (<>Ein kurzes, sorgfältig aufgebautes <strong>Entscheidungspapier</strong> — meist nur wenige Seiten. Es beschreibt ein Problem mit belegten Fakten, begründet den Lösungsweg und hält fest, wer was bis wann tut. Alle Beteiligten lesen es in Ruhe, <strong>bevor</strong> diskutiert und entschieden wird. <strong>Warum das hilft:</strong> Wer schreibt, muss zu Ende denken. Lücken und Widersprüche fallen auf dem Papier auf — nicht erst Monate später in der Umsetzung.</>) as ReactNode,
    },
    steps: [
      { label: "Verstehen", n: "01", title: "Das Entscheidungspapier", sub: (<>Vom Problem zur begründeten Entscheidung<sup className="zb-fn"><a href={PAPER_PUBLISHED_URL} target="_blank" rel="noopener noreferrer" title="HMD Praxis der Wirtschaftsinformatik">1</a></sup></>) as ReactNode, body: "Ihre Fachleute erarbeiten gemeinsam das Narrativ: erst das Problem sauber verstehen, dann — strikt getrennt — die Lösung entwickeln. Jede Annahme wird ausgesprochen, jeder Widerspruch sichtbar. Ergebnis ist eine Entscheidung, die dem ruhigen, prüfenden Lesen aller Beteiligten standhält." },
      { label: "Übersetzen", n: "02", title: "Vom Papier zum Arbeitspaket", sub: (<>Die Methode „Narrative-to-Action“<sup className="zb-fn"><a href={PAPER_PREREAD_URL} target="_blank" rel="noopener noreferrer" title="Pre-Read: Narrative-to-Action">2</a></sup></>) as ReactNode, body: "Schritt für Schritt wird jeder Baustein der Lösung in konkrete Arbeitspakete übersetzt — mit klaren Zuständigkeiten und Kriterien, an denen sich prüfen lässt, ob ein Paket fertig ist. Eine feste Qualitätsprüfung stellt sicher: Das Warum kommt bei den Teams an, nicht nur das Was." },
      { label: "Liefern", n: "03", title: "Die Arbeitsstruktur", sub: (<>Fester Rhythmus, klare Rollen &amp; Schnittstellen</>) as ReactNode, body: "So viel Struktur wie nötig, so wenig wie möglich: Die Teams entscheiden selbst, wie sie arbeiten — vereinheitlicht wird nur die Abstimmung untereinander. Ein fester Rhythmus aus Planung und Ergebnis-Vorführung macht Fortschritt prüfbar und Abweichungen früh sichtbar." },
    ],
    principle: {
      label: "Grundsatz",
      title: (<>KI &amp;<br />Verantwortung</>) as ReactNode,
      statement1: (<>KI unterstützt bei Verdichtung, Recherche und der Übersetzung in Arbeitspakete. <span style={{ color: "oklch(82% 0.008 85)" }}>Nie bei der Entscheidung.</span></>) as ReactNode,
      statement2: (<>Verantwortung bleibt <span style={{ color: "oklch(72% 0.14 25)" }}>menschlich.</span></>) as ReactNode,
    },
  },
  bausteine: {
    rubric: numRubric("04", "LÖSUNGSBAUSTEINE"),
    h2: (<>Feste Pakete. <em>Feste Preise.</em></>) as ReactNode,
    lede: "Keine Abrechnung nach Tagen, keine offene Beratungsrechnung: klar umrissene Leistungen, klar benannte Ergebnisse, Preise vorab.",
    note: "Alle Preise netto. Der Einstieg beginnt in der Regel mit einem Narrative Sprint.",
    cards: [
      { badge: "Einstieg", title: "Narrative Sprint", body: "Eine echte, anstehende Entscheidung Ihres Hauses wird mit Ihren Fachleuten zum fertigen Entscheidungspapier geführt — in angeleiteten Arbeitsrunden, mit gemeinsamer Lesephase und abschließendem Entscheidungstermin.", price: "ab 15.000 €", meta: "Festpreis · mehrere Wochen · ein Ergebnis" },
      { badge: "Umsetzung", title: "Struktur-Sprint", body: "Bestandsaufnahme, wie Ihre Teams heute zusammenarbeiten, dann ein Bauplan für Rhythmus, Rollen und Schnittstellen — samt Plan, der Ihre eigenen Leute zur Umsetzung befähigt. Sie bauen die Struktur selbst auf, wir zeigen wie.", price: "ab 12.000 €", meta: "Festpreis · Bestandsaufnahme + Bauplan" },
      { badge: "Ausbildung", title: "Anwender-Ausbildung", body: "Ihre Mitarbeitenden lernen die Methode an eigenen, echten Fällen — zunächst das Schreiben und Steuern von Entscheidungspapieren („Narrative Owner“), im Aufbaukurs die Übersetzung in Arbeitspakete („Narrative Steward“). Im eigenen Haus oder in offenen Gruppen.", price: "ab 1.900 €", meta: "pro Teilnehmer:in · Ausbildung im eigenen Haus ab 12.000 €" },
      { badge: "Verstetigung", title: "Lizenz & Begleitung", body: "Das Nutzungsrecht an der Methode für Ihre ausgebildeten Anwender — plus laufende Begleitung mit festen Sprechstunden, Durchsicht Ihrer Entscheidungspapiere und einer vierteljährlichen Überprüfung Ihrer Arbeitsstrukturen.", price: "ab 8.000 €/Jahr", meta: "Lizenz · Begleitung ab 2.500 €/Monat" },
    ],
  },
  nextSteps: {
    rubric: numRubric("05", "NÄCHSTE SCHRITTE"),
    h2: (<>30 Minuten. Ein Partner. <em>Ihre</em> nächste Entscheidung.</>) as ReactNode,
    lede: "Bringen Sie eine offene Frage mit — wir bringen die Methode. Keine Folien, keine Vertriebsschleife. Am Ende wissen Sie, ob eine Zusammenarbeit der richtige nächste Schritt ist.",
  },
  caseStudy: {
    rubric: numRubric("A", "ANHANG · BELEGE AUS DER PRAXIS"),
    h2: (<>Keine Behauptungen. <em>Belegte</em> Praxis.</>) as ReactNode,
    lede: "Drei Vorhaben aus dem Konzernumfeld zeigen die Methode im Einsatz — im Großen, im Kleinen und jenseits der reinen Software-Welt.",
    primary: [
      {
        tag: "Fall 1 · Vollständiger Anwendungsfall",
        title: "Die Digitalisierung einer Konzernmarke",
        lede: "Alle drei Glieder der Kette — von der ersten Analyse bis zur laufenden Lieferung.",
        steps: [
          { t: "Ursachen verstehen", b: "Am Anfang stand keine Lösung, sondern eine gründliche Analyse: Was bremst die Digitalisierung wirklich?" },
          { t: "Ein strategisches Entscheidungspapier", b: "Die Ergebnisse mündeten in ein übergreifendes Papier, das die wichtigsten Handlungsfelder ableitet — von allen Beteiligten gelesen, geprüft und getragen." },
          { t: "Je Handlungsfeld ein vertieftes Papier", b: "Für jedes Handlungsfeld entstand ein eigenes Fokus-Papier mit konkreten Lösungsbausteinen — jeder Baustein begründet durch die Analyse, nichts hängt in der Luft." },
          { t: "Umsetzung im festen Rhythmus", b: "15 Produktteams setzen die Bausteine um. Alle drei Monate wird gemeinsam geplant und werden Ergebnisse vorgeführt, vor über 50 Stakeholdern der Initiative. So bleiben Geldverwendung und Fortschritt jederzeit nachvollziehbar." },
        ],
        result: {
          label: "Das Ergebnis",
          body: "Die Konzernmarke gewinnt durchgängige Transparenz über die Effektivität des eingesetzten Budgets. Digitale Produkte werden kontinuierlich ausgeliefert, Bestandssysteme laufend und agil modernisiert — Planung und Umsetzung folgen einem produktorientierten, agilen Rhythmus statt starrer Jahreszyklen.",
        },
        stats: [
          { v: "15", k: "Produktteams" },
          { v: ">50", k: "involvierte Stakeholder" },
          { v: "3", unit: "Mon.", k: "Planungsrhythmus" },
        ],
      },
      {
        tag: "Fall 2 · Klein, aber vollständig",
        title: "Die Freigabe offener Software-Bausteine",
        lede: "Dieselbe Methode im kleinen Maßstab — vom Papier bis zum laufenden Prozess, umgesetzt von einem einzigen Team.",
        steps: [
          { t: "Ursachen verstehen", b: "Bevor Entwickler frei verfügbare Software-Bausteine (Open Source) einsetzen dürfen, braucht es eine Freigabe. Die lief per E-Mail und dauerte mehrere Wochen — für harmlose Standardfälle genauso wie für rechtlich heikle." },
          { t: "Ein gemeinsames Entscheidungspapier", b: "Rund 20 Beteiligte aus Entwicklung, Rechtsprüfung und Fachstellen klärten auf dem Papier: Wie beheben wir die Schmerzpunkte im Status Quo? Welche Fälle sind Standard, welche brauchen das prüfende Auge der Rechtsexperten? Das Ergebnis: eine klare Vision des organistatorischen und technischen Soll-Zustands mit übergreifend abgestimmte Verfahrensregeln." },
          { t: "Direkt in Arbeitspakete übersetzt", b: "Das Vorhaben war klar umrissen — die Lösungsbausteine ließen sich ohne Zwischenschritt in Arbeitspakete mit Prüfkriterien übersetzen, jedes rückverfolgbar bis zur Anforderung aus der Analyse." },
          { t: "Umsetzung in einem Team", b: "Ein einzelnes Produktteam lieferte die Pakete in einem festen Zwei-Wochen-Rhythmus — Stück für Stück, jederzeit nachvollziehbar." },
        ],
        result: {
          label: "Das Ergebnis",
          body: "Der Prozess läuft heute deutlich schneller: Standardfälle erhalten ihre Freigabe sofort nach festen Regeln, heikle Fälle landen direkt bei den Rechtsexperten, und die Fachleute werden bei ihrer Entscheidung durch das System unterstützt — ohne Umwege über E-Mail und ohne Wechsel zwischen den Systemen.",
        },
        stats: [
          { v: "~20", k: "Beteiligte" },
          { v: "1", k: "Produktteam" },
          { v: "14", unit: "Tage", k: "Lieferrhythmus" },
        ],
      },
    ],
    supplementary: {
      tag: "Fall 3 · Multi-Partner, Hardware & Software",
      title: "Sechs Organisationen, ein gemeinsames Papier",
      body: [
        "Sechs Partnerorganisationen aus Konzern, Forschung und jungen Unternehmen fanden über ein gemeinsam getragenes Entscheidungspapier zu einer Arbeitsweise: Es benennt die Handlungsfelder und leitet die Lösungsbausteine ab.",
        "Weil hier Hardware und Software gemeinsam entstehen, verbindet die Umsetzung agiles Arbeiten mit klassischer, planbasierter Entwicklung — in engen, festen Liefer- und Planungszyklen.",
        "Einzelheiten unterliegen der Vertraulichkeit. Der Fall zeigt vor allem eines: Die Methode trägt auch jenseits der reinen Software-Welt.",
      ],
    },
  },
  usecases: {
    rubric: numRubric("03", "ZIELBILD · EINSATZGEBIETE"),
    h2: (<>Wo die Methode <em>wirkt.</em></>) as ReactNode,
    lede: "Überall dort, wo Komplexität auf Umsetzungsdruck trifft und Entscheidungen breit getragen werden müssen.",
    cases: [
      { t: "Strategische Transformation", b: "Reorganisationen, neue Geschäftsmodelle oder Plattformwechsel scheitern selten an der Technologie — sondern an unklaren Zielen und mangelndem Alignment. Gemeinsam schaffen wir die gemeinsame Entscheidungsgrundlage vor dem ersten Investitionsschritt.", outs: ["Belastbares Stakeholder-Alignment vor Projektstart", "Tragfähige Grundlage für Budget- und Ressourcenfreigaben"] },
      { t: "Technical Sales", b: "Im komplexen Lösungsvertrieb entscheidet die Tiefe des Problemverständnisses über den Abschluss. Statt eines Standard-Pitches entsteht im Co-Creation-Format mit dem Kunden ein Zielbild, das seine Situation präziser beschreibt als jede vorbereitete Präsentation.", outs: ["Vertrauen durch nachweisliches Tiefenverständnis", "Lösungsarchitektur entlang realer Anforderungen"] },
      { t: "Task-Forces & kritische Lagen", b: "In Krisensituationen dominiert oft der Reflex zur sofortigen Maßnahme. Die strukturierte Analyse zwingt das Team, vor der Reaktion die tatsächliche Ursache zu identifizieren und Handlungsoptionen sauber zu bewerten.", outs: ["Belastbare Ursachenanalyse statt Symptombehandlung", "Priorisierte, wirksame Gegenmaßnahmen"] },
    ],
  },
  team: {
    rubric: numRubric("B", "ANHANG · PERSONEN"),
    h2: (<>Zwei Perspektiven. <em>Ein</em> Anspruch.</>) as ReactNode,
    people: [
      { photo: "/Roessler.jpeg", name: "Dr. Richard Rößler", role: "Gründer · Entwicklung der Methode", bio: (<>
        <p style={{ margin: "0 0 12px" }}>Richard ist Entwickler der NarraTec-Methodik und seit über zehn Jahren in der Steuerung komplexer IT-Vorhaben tätig — aktuell als Technical Lead für Data & AI Delivery in einem DAX-Konzern, wo er Entscheidungsnarrative in umsetzbare Anforderungen und Arbeitspakete überführt.</p>
        <p style={{ margin: "0 0 12px" }}>Sein Fokus liegt auf messbarer Entscheidungsqualität: Die Methodik strukturierter Narrative hat er in realen Konzernvorhaben entwickelt, erprobt und wissenschaftlich publiziert — an der Schnittstelle von Managementforschung und Projektpraxis.</p>
        <p style={{ margin: 0 }}>Als technischer Programm-Manager verantwortete er unter anderem eine konzernweite digitale Produktionsplattform (SAFe), die in enger Zusammenarbeit mit Partnern wie Amazon Web Services entstand, sowie Vorhaben zu Open-Source-Compliance und Industrie 4.0 und wirkte an der Neuausrichtung einer Softwareentwicklungsorganisation mit über 500 Mitarbeitenden mit.</p>
      </>) as ReactNode, credentials: ["10+ Jahre IT-Steuerung", "Methodenexperte in komplexen Vorhaben"], linkedin: "https://www.linkedin.com/in/dr-richard-rößler-b786492a9/" },
      { photo: "/Wieland.jpeg", name: "Prof. Dr. Uwe Wieland", role: "Partner · Lehre & Beirat", bio: (<>
        <p style={{ margin: "0 0 12px" }}>Uwe ist ein sehr praxisorientierter Professor für Wirtschaftsinformatik, Gründer der gemeinnützigen Initiative matchIO und Mitentwickler des Decision & Execution Engineering Ansatzes von NarraTec.</p>
        <p style={{ margin: "0 0 12px" }}>Sein Fokus liegt auf der Verwendungsfähigkeit von Technologie und der Frage, wie Unternehmen komplexe Herausforderungen in belastbare Entscheidungen, wirksame Organisationen und nachhaltige Umsetzung überführen können.</p>
        <p style={{ margin: 0 }}>Als Mitglied des acatech Forschungsbeirats Industrie 4.0, Aufsichtsratsmitglied des DFKI sowie Gestalter zahlreicher Industrie- und Transformationsvorhaben verbindet er wissenschaftliche Erkenntnisse mit langjähriger Erfahrung aus Digitalisierung, AI, Plattformökonomie und organisatorischer Transformation.</p>
      </>) as ReactNode, credentials: ["Führungserfahrung Digitale Transformation", "Perspektive der Entscheidungsverantwortlichen"], linkedin: "https://www.linkedin.com/in/praxisprofwieland" },
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
    rubric: numRubric("C", "ANHANG · ABGRENZUNG"),
    h2: (<>Wann wir <em>absagen.</em></>) as ReactNode,
    lede: "Ein präzises Werkzeug erkennt seine Grenzen. Es gibt Konstellationen, in denen NarraTec nicht der richtige Schritt ist. Wenn Sie sich in einem der folgenden Fälle wiederfinden, verweisen wir Sie gerne an Partner aus unserem Netzwerk.",
    items: [
      { n: "01", kicker: "Suche nach Legitimation", t: "Sie haben bereits entschieden und suchen Legitimation.", b: "Unsere Analyse kann zu Ergebnissen führen, die der intern bereits getroffenen Entscheidung widersprechen. Wer ein nachträgliches Argument sucht, ist bei uns falsch." },
      { n: "02", kicker: "Laufende Umsetzung", t: "Die Umsetzung läuft bereits.", b: "Wir arbeiten vor der Investitionsentscheidung, nicht während der Implementierung. Ist der Vertrag mit dem Umsetzungspartner unterschrieben und das Projekt im Lauf, bringen wir keinen Hebel mehr, sondern stiften Reibung." },
      { n: "03", kicker: "Vollständige Fremdvergabe", t: "Sie suchen jemanden, der den Job für Sie macht.", b: "Der Erfolg von NarraTec beruht auf dem Wissen und dem Enablement Ihrer Experten. Wir führen die Analyse, aber die Substanz kommt aus Ihrem Haus — wer eine Bearbeitung ohne eigene Beteiligung erwartet, ist bei uns nicht richtig." },
    ],
  },
  final: {
    rubric: "NÄCHSTER SCHRITT",
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
    microShort: "30 min · free · NDA on request",
    finalMicro: "contact@narratec.io · 30 min · free · no sales · NDA on request",
  },
  nav: [
    { label: "Problem", id: "problem" },
    { label: "Method", id: "zielbild" },
    { label: "Use cases", id: "einsatz" },
    { label: "Packages", id: "bausteine" },
    { label: "Evidence", id: "case-study" },
    { label: "Team", id: "team" },
  ],
  hero: {
    kicker: numRubric("01", "MOTIVATION & OBJECTIVES"),
    headline: (
      <>
        <span className="line">From problem to <em>decision.</em></span>
        <span className="line">From decision to <em>implementation.</em></span>
      </>
    ),
    lede: "Your experts already have the answers. NarraTec gives them the structure: a proven path from the question to a well-founded decision — and from there to work packages and capable teams.",
    close: "We enable your people, not replace them.",
  },
  trust: [
    <>Proven across several initiatives in a <span style={hl}>DAX corporation</span>.</>,
    <>You engage us at a <span style={hl}>fixed price</span>, without risk.</>,
    <>Your sensitive information protected by an <span style={hl}>NDA</span>.</>,
  ],
  problem: {
    rubric: numRubric("02", "CURRENT STATE"),
    h2: <>Strategies rarely fail<br />at the concept stage —<br />they fail <em>at the handover.</em></>,
    lede: "Between decision and implementation, the chain breaks: the reasoning stays behind in the slides, the why never reaches the teams — and working structures grow out of habit rather than intent.",
    items: [
      { n: "Finding A", t: "Decisions without depth", b: "Teams debate solutions before the problem is understood — treating symptoms instead of finding root causes. Slides make hard questions look flatter than they are: assumptions go unspoken, contradictions stay invisible. In the end, rhetoric decides instead of facts.", cost: "Pseudo-decisions instead of clarity" },
      { n: "Finding B", t: "Handover without a system", b: "The path from decision to the teams' actual tasks is left to chance. Business units and management speak different languages; facts and the why get lost in the handover — teams execute without truly knowing the problem, and decisions that were made fizzle out.", cost: "Investments without impact" },
      { n: "Finding C", t: "Structures without measure", b: "How teams work together has grown historically: too much administrative overhead in one place, missing coordination in another. Whether implementation is actually progressing is nearly impossible to verify.", cost: "No alignment, no progress" },
    ],
  },
  zielbild: {
    rubric: numRubric("03", "TARGET STATE"),
    h2: <>One chain, three links — <em>seamless.</em></>,
    lede: "The NarraTec method connects three steps into one coherent, traceable approach: understand, translate, deliver.",
    callout: {
      term: "Narrative, the",
      tag: "[core concept of the method]",
      body: <>A short, carefully built <strong>decision paper</strong> — usually just a few pages. It describes a problem with substantiated facts, justifies the chosen path, and records who does what by when. Everyone reads it calmly, <strong>before</strong> anything is discussed or decided. <strong>Why it helps:</strong> whoever writes has to think things through. Gaps and contradictions surface on paper — not months later during implementation.</>,
    },
    steps: [
      { label: "Understand", n: "01", title: "The decision paper", sub: <>From problem to a justified decision<sup className="zb-fn"><a href={PAPER_PUBLISHED_URL} target="_blank" rel="noopener noreferrer" title="HMD Praxis der Wirtschaftsinformatik">1</a></sup></>, body: "Your experts develop the narrative together: first understand the problem cleanly, then — strictly separated — develop the solution. Every assumption is spoken out loud, every contradiction made visible. The result is a decision that holds up to the calm, scrutinizing reading of everyone involved." },
      { label: "Translate", n: "02", title: "From paper to work package", sub: <>The “Narrative-to-Action” method<sup className="zb-fn"><a href={PAPER_PREREAD_URL} target="_blank" rel="noopener noreferrer" title="Pre-Read: Narrative-to-Action">2</a></sup></>, body: "Step by step, every building block of the solution is translated into concrete work packages — with clear responsibilities and criteria against which you can check whether a package is done. A fixed quality check ensures the why reaches the teams, not just the what." },
      { label: "Deliver", n: "03", title: "The working structure", sub: <>Steady rhythm, clear roles &amp; interfaces</>, body: "As much structure as needed, as little as possible: teams decide for themselves how they work — only the coordination between them is standardized. A steady rhythm of planning and result demos makes progress verifiable and deviations visible early." },
    ],
    principle: {
      label: "Principle",
      title: <>AI &amp;<br />accountability</>,
      statement1: <>AI assists with synthesis, research and translation into work packages. <span style={{ color: "oklch(82% 0.008 85)" }}>Never with the decision.</span></>,
      statement2: <>Accountability stays <span style={{ color: "oklch(72% 0.14 25)" }}>human.</span></>,
    },
  },
  bausteine: {
    rubric: numRubric("04", "SOLUTION BUILDING BLOCKS"),
    h2: <>Fixed packages. <em>Fixed prices.</em></>,
    lede: "No billing by the day, no open-ended consulting invoice: clearly defined services, clearly named outcomes, prices up front.",
    note: "All prices net. Engagements usually begin with a Narrative Sprint.",
    cards: [
      { badge: "Entry", title: "Narrative Sprint", body: "A real, pending decision at your organization is taken to a finished decision paper together with your experts — in guided working rounds, with a shared reading phase and a concluding decision meeting.", price: "from €15,000", meta: "Fixed price · several weeks · one outcome" },
      { badge: "Implementation", title: "Structure Sprint", body: "An assessment of how your teams work together today, then a blueprint for rhythm, roles and interfaces — including a plan that enables your own people to implement it. You build the structure yourselves, we show you how.", price: "from €12,000", meta: "Fixed price · assessment + blueprint" },
      { badge: "Training", title: "Practitioner Training", body: "Your people learn the method on their own, real cases — first writing and steering decision papers (“Narrative Owner”), then translating them into work packages (“Narrative Steward”) in the advanced course. In-house or in open groups.", price: "from €1,900", meta: "per participant · in-house training from €12,000" },
      { badge: "Continuity", title: "License & Support", body: "The right to use the method for your trained practitioners — plus ongoing support with fixed office hours, review of your decision papers and a quarterly review of your working structures.", price: "from €8,000/year", meta: "License · support from €2,500/month" },
    ],
  },
  nextSteps: {
    rubric: numRubric("05", "NEXT STEPS"),
    h2: <>Right fit for your initiative? <em>Let's talk.</em></>,
    lede: "Whether you already have a format in mind or just want to clarify open questions — a no-obligation conversation shows whether and how NarraTec can help.",
  },
  caseStudy: {
    rubric: numRubric("A", "APPENDIX · EVIDENCE FROM PRACTICE"),
    h2: <>No claims. <em>Proven</em> practice.</>,
    lede: "Three initiatives from corporate settings show the method at work — at scale, at a small scale, and beyond the world of pure software.",
    primary: [
      {
        tag: "Case 1 · Full application",
        title: "Digitalizing a corporate brand",
        lede: "All three links of the chain — from the first analysis to ongoing delivery.",
        steps: [
          { t: "Understanding the causes", b: "It didn't start with a solution, but with a thorough analysis: what is actually holding back digitalization?" },
          { t: "A strategic decision paper", b: "The findings converged into an overarching paper that derived the key focus areas — read, reviewed and endorsed by everyone involved." },
          { t: "One in-depth paper per focus area", b: "Each focus area produced its own dedicated paper with concrete solution building blocks — each one grounded in the analysis, nothing left unexplained." },
          { t: "Delivery in a fixed rhythm", b: "15 product teams implement the building blocks — their key roles in product management and architecture were trained for it. Every three months, planning happens together and results are demoed, in front of more than 50 participants. That keeps spend and progress traceable at all times." },
        ],
        result: {
          label: "The outcome",
          body: "The corporate brand gains full transparency into how effectively its budget is being used. Digital products are delivered continuously, legacy systems are modernized on an ongoing, agile basis — planning and delivery follow a product-oriented, agile rhythm instead of rigid annual cycles.",
        },
        stats: [
          { v: "15", k: "Product teams" },
          { v: ">50", k: "Participants per session" },
          { v: "3", unit: "mo.", k: "Planning rhythm" },
        ],
      },
      {
        tag: "Case 2 · Small, but complete",
        title: "Approving open-source building blocks",
        lede: "The same method at a small scale — from paper to a running process, delivered by a single team.",
        steps: [
          { t: "Understanding the causes", b: "Before developers can use freely available software building blocks (open source), an approval is required. It used to run by email and take several weeks — for harmless standard cases just as much as for legally sensitive ones." },
          { t: "A shared decision paper", b: "Around 20 people from development, legal review and specialist departments clarified on paper: which cases are standard, and which need the scrutiny of legal experts? The result: jointly agreed procedural rules." },
          { t: "Translated directly into work packages", b: "The initiative was clearly scoped — the solution building blocks translated directly into work packages with acceptance criteria, each traceable back to the requirement from the analysis." },
          { t: "Delivery by a single team", b: "A single product team delivered the packages on a fixed two-week rhythm — piece by piece, always traceable." },
        ],
        result: {
          label: "The outcome",
          body: "The process now runs noticeably faster: standard cases get approved instantly under fixed rules, sensitive cases go straight to the legal experts, and specialists are supported by the system in their decisions — without detours through email and without switching between systems.",
        },
        stats: [
          { v: "~20", k: "Participants" },
          { v: "1", k: "Product team" },
          { v: "14", unit: "days", k: "Delivery rhythm" },
        ],
      },
    ],
    supplementary: {
      tag: "Case 3 · Supplementary — confidential",
      title: "Six organizations, one shared paper",
      body: [
        "A separate, independent initiative: six partner organizations from industry, research and young companies — more than 70 participants — converged through a jointly owned decision paper on one way of working: it names the focus areas and derives the solution building blocks.",
        "Because hardware and software are being developed together here, delivery combines agile work with classic, plan-based development — in tight, fixed delivery and planning cycles.",
        "Details remain confidential. Above all, this case shows one thing: the method holds up beyond the world of pure software.",
      ],
    },
  },
  usecases: {
    rubric: numRubric("03", "TARGET STATE · WHERE IT APPLIES"),
    h2: <>Where the method <em>works.</em></>,
    lede: "Wherever complexity meets implementation pressure and decisions must be broadly supported.",
    cases: [
      { t: "Strategic transformation", b: "Reorganizations, new business models or platform changes rarely fail on technology — they fail on unclear goals and missing alignment. Together we create the shared decision basis before the first investment step.", outs: ["Robust stakeholder alignment before project start", "Solid basis for budget and resource approvals"] },
      { t: "Technical sales", b: "In complex solution sales, the depth of problem understanding decides the deal. Instead of a standard pitch, a co-creation format with the client produces a target picture that describes their situation more precisely than any prepared presentation.", outs: ["Trust through demonstrable depth of understanding", "Solution architecture along real requirements"] },
      { t: "Task forces & critical situations", b: "In crises, the reflex to act immediately tends to dominate. The structured analysis forces the team to identify the actual root cause before reacting and to assess options cleanly.", outs: ["Robust root-cause analysis instead of treating symptoms", "Prioritized, effective countermeasures"] },
    ],
  },
  team: {
    rubric: numRubric("B", "APPENDIX · PEOPLE"),
    h2: <>Two perspectives. <em>One</em> standard.</>,
    people: [
      { photo: "/Roessler.jpeg", name: "Dr. Richard Rößler", role: "Founder · Method development", bio: (<>
        <p style={{ margin: "0 0 12px" }}>Richard is the creator of the NarraTec method and has spent more than ten years steering complex IT initiatives — currently as Technical Lead for Data & AI Delivery at a DAX corporation, where he translates decision narratives into actionable requirements and work packages.</p>
        <p style={{ margin: "0 0 12px" }}>His focus is on measurable decision quality: he developed the method of structured narratives in real corporate initiatives, proved it in practice, and published it academically — at the intersection of management research and project practice.</p>
        <p style={{ margin: 0 }}>As technical program manager, he was responsible for a group-wide digital production platform (SAFe), built in close partnership with companies such as Amazon Web Services, as well as initiatives on open-source compliance and Industry 4.0, and contributed to the realignment of a software development organization with more than 500 employees.</p>
      </>) as ReactNode, credentials: ["10+ years of IT governance", "Method expert in complex initiatives"], linkedin: "https://www.linkedin.com/in/dr-richard-rößler-b786492a9/" },
      { photo: "/Wieland.jpeg", name: "Prof. Dr. Uwe Wieland", role: "Partner · Teaching & Advisory", bio: (<>
        <p style={{ margin: "0 0 12px" }}>Uwe is a highly practice-oriented professor of business informatics, founder of the non-profit initiative matchIO, and co-developer of the Decision & Execution Engineering approach at NarraTec.</p>
        <p style={{ margin: "0 0 12px" }}>His focus is on the usability of technology and the question of how organizations can translate complex challenges into sound decisions, effective structures, and sustainable implementation.</p>
        <p style={{ margin: 0 }}>As a member of the acatech Research Advisory Board on Industry 4.0, supervisory board member of the DFKI, and shaper of numerous industry and transformation initiatives, he combines academic insight with many years of experience in digitalization, AI, platform economics, and organizational transformation.</p>
      </>) as ReactNode, credentials: ["Leadership in digital transformation", "Decision-maker's perspective"], linkedin: "https://www.linkedin.com/in/praxisprofwieland" },
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
    rubric: numRubric("C", "APPENDIX · BOUNDARIES"),
    h2: <>When we <em>say no.</em></>,
    lede: "A precise tool knows its limits. There are situations where NarraTec is not the right step. If one of the following describes you, we're happy to refer you to partners in our network.",
    items: [
      { n: "01", kicker: "Looking for legitimacy", t: "You've already decided and are looking for legitimacy.", b: "Our analysis can lead to results that contradict the decision already made internally. If you're looking for an after-the-fact argument, we're the wrong choice." },
      { n: "02", kicker: "Already underway", t: "Implementation is already underway.", b: "We work before the investment decision, not during implementation. Once the contract with the delivery partner is signed and the project is running, we add no leverage — only friction." },
      { n: "03", kicker: "Full outsourcing expected", t: "You're looking for someone to do the job for you.", b: "NarraTec's success rests on the knowledge and enablement of your experts. We lead the analysis, but the substance comes from your organization — if you expect delivery without your own involvement, we're not the right fit." },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1040) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const jumpAndClose = (id: string) => (e: MouseEvent) => {
    onJump(id)(e);
    setOpen(false);
  };

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
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="nav-mobile">
          <nav className="nav-mobile-links" aria-label="Mobile Navigation">
            {nav.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={jumpAndClose(l.id)}>{l.label}</a>
            ))}
          </nav>
          <a className="btn btn-primary nav-mobile-cta" href={BOOK_URL} data-meetergo-link={BOOK_URL} onClick={() => setOpen(false)}>
            {cta.book} <span className="btn-arrow" aria-hidden="true"></span>
          </a>
        </div>
      )}
    </header>
  );
}

function RubricRow({ rubric }: { rubric: ReactNode }) {
  return (
    <div className="zb-rubric-row">
      <span className="rubric no-line">{rubric}</span>
      <span className="zb-rule" aria-hidden="true" />
    </div>
  );
}

function SectionHead({ rubric, h2, lede, children }: { rubric: ReactNode; h2: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <div className="zb-head">
      <RubricRow rubric={rubric} />
      <h2 className="display zb-h2">{h2}</h2>
      {lede && <p className="lede zb-lede">{lede}</p>}
      {children}
    </div>
  );
}

function Hero({ c, cta }: { c: LandingCopy["hero"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="hero container" id="top" data-screen-label="01 Hero">
      <RubricRow rubric={c.kicker} />

      <h1 className="display" style={{ fontSize: "clamp(44px, 6.2vw, 78px)", lineHeight: 1.06, marginBottom: 0, marginTop: 16 }}>
        {c.headline}
      </h1>

      <div style={{ borderTop: "1px solid var(--rule)", margin: "28px 0 0" }} />

      <div style={{ paddingTop: 28 }}>
        <p className="lede" style={{ maxWidth: "52ch", marginTop: 0, marginBottom: 0 }}>{c.lede}</p>
        <p className="lede" style={{ maxWidth: "52ch", marginTop: 10, marginBottom: 0 }}>
          {c.close}
        </p>
        <div className="hero-actions" style={{ marginTop: 22 }}>
          <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
            {cta.spar} <span className="btn-arrow" aria-hidden="true"></span>
          </a>
          <a className="btn btn-ghost" href="#zielbild" onClick={onJump("zielbild")}>{cta.seeMethod}</a>
        </div>
        <div style={{ marginTop: 12, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-3)" }}>
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
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />
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

function Zielbild({ c }: { c: LandingCopy["zielbild"] }) {
  return (
    <section className="section" id="zielbild" data-screen-label="03 Zielbild">
      <div className="container">
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />

        <div className="zb-callout">
          <p className="zb-callout-term">
            {c.callout.term} <span className="zb-callout-tag">{c.callout.tag}</span>
          </p>
          <p className="zb-callout-body">{c.callout.body}</p>
        </div>

        <div className="zb-steps">
          {c.steps.map((s) => (
            <article className="zb-step" key={s.n}>
              <div className="zb-step-top">
                <span className="zb-step-label">{s.label}</span>
                <span className="zb-step-num" aria-hidden="true">{s.n}</span>
              </div>
              <h3 className="zb-step-title">{s.title}</h3>
              <p className="zb-step-sub">{s.sub}</p>
              <p className="zb-step-body">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="method-principle" style={{ marginTop: 48, background: "var(--ink)", color: "var(--paper)", borderRadius: 3, padding: "clamp(40px, 5vw, 64px) clamp(32px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 180px) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "start", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "var(--accent)" }} />
          <div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "oklch(72% 0.008 85)", marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 18, height: 1, background: "oklch(72% 0.008 85)" }}></span>
              {c.principle.label}
            </div>
            <div style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.15, color: "oklch(72% 0.14 25)", letterSpacing: "-0.005em" }}>
              {c.principle.title}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "var(--f-display)", fontSize: "clamp(24px, 2.6vw, 36px)", lineHeight: 1.25, color: "oklch(92% 0.008 85)", margin: "0 0 18px", letterSpacing: "-0.01em", maxWidth: "24ch" }}>
              {c.principle.statement1}
            </p>
            <p style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.1, margin: 0, letterSpacing: "-0.015em", color: "var(--paper)" }}>
              {c.principle.statement2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bausteine({ c }: { c: LandingCopy["bausteine"] }) {
  return (
    <section className="section" id="bausteine" data-screen-label="04 Lösungsbausteine">
      <div className="container">
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />

        <div className="lb-grid">
          {c.cards.map((card) => (
            <article className="lb-card" key={card.title}>
              <span className="lb-badge">{card.badge}</span>
              <h3 className="lb-title">{card.title}</h3>
              <p className="lb-body">{card.body}</p>
              <div className="lb-foot">
                <div className="lb-divider" aria-hidden="true" />
                <div className="lb-price">{card.price}</div>
                <div className="lb-meta">{card.meta}</div>
              </div>
            </article>
          ))}
        </div>

        <p className="lb-note"><span className="lb-star" aria-hidden="true">*</span> {c.note}</p>
      </div>
    </section>
  );
}

function NextSteps({ c, cta }: { c: LandingCopy["nextSteps"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="ns" id="naechste-schritte" data-screen-label="05 Nächste Schritte">
      <div className="container">
        <div className="ns-cta">
          <div className="ns-cta-copy">
            <span className="rubric no-line">{c.rubric}</span>
            <h2 className="display ns-cta-h2">{c.h2}</h2>
            <p className="ns-cta-lede">{c.lede}</p>
          </div>
          <div className="ns-cta-action">
            <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
              {cta.book} <span className="btn-arrow" aria-hidden="true"></span>
            </a>
            <div className="ns-cta-micro">{cta.microShort}</div>
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
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />
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
        <SectionHead rubric={c.rubric} h2={c.h2} />

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
              <div className="person-bio">{p.bio}</div>
              <ul className="person-creds">
                {p.credentials.map((cr, j) => <li key={j}>{cr}</li>)}
              </ul>
              {p.linkedin && (
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-3)", textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-ink)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-3)")}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
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

function Disqualify({ c }: { c: LandingCopy["disqualify"] }) {
  return (
    <section className="section" id="abgrenzung" data-screen-label="05 Abgrenzung">
      <div className="container">
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />

        <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--rule)" }}>
          {c.items.map((it) => (
            <article key={it.n} className="dq-item" style={{ display: "grid", gridTemplateColumns: "minmax(0, 200px) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 64px)", padding: "32px 0 32px", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", color: "var(--accent-ink)" }}>{it.n}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{it.kicker}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 32px)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--ink)", margin: "0 0 14px", maxWidth: "32ch" }}>{it.t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: "60ch" }}>{it.b}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ c }: { c: LandingCopy["caseStudy"] }) {
  return (
    <section className="section" id="case-study" data-screen-label="08 Case">
      <div className="container">
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede} />

        <div className="cs-grid">
          <div className="cs-row-top">
            {c.primary.map((cs) => (
              <article className="cs-card" key={cs.title}>
                <div className="cs-tag">{cs.tag}</div>
                <h3 className="cs-title">{cs.title}</h3>
                <p className="cs-card-lede">{cs.lede}</p>

                <div className="cs-steps">
                  {cs.steps.map((s, i) => (
                    <div className="cs-step" key={i}>
                      <div className="cs-step-num" aria-hidden="true">{i + 1}</div>
                      <div>
                        <h4 className="cs-step-title">{s.t}</h4>
                        <p className="cs-step-body">{s.b}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {"result" in cs && cs.result && (
                  <div className="cs-result">
                    <div className="cs-result-label">{cs.result.label}</div>
                    <p className="cs-result-body">{cs.result.body}</p>
                  </div>
                )}

                <div className="cs-stats">
                  {cs.stats.map((s, i) => (
                    <div className="cs-stat" key={i}>
                      <div className="cs-stat-v">{s.v}{"unit" in s && s.unit && <span className="unit"> {s.unit}</span>}</div>
                      <div className="cs-stat-k">{s.k}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <article className="cs-supp cs-supp-full">
            <div className="cs-supp-head">
              <div className="cs-tag">{c.supplementary.tag}</div>
              <h3 className="cs-title">{c.supplementary.title}</h3>
            </div>
            <div className="cs-supp-body">
              {c.supplementary.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Final({ c, cta }: { c: LandingCopy["final"]; cta: LandingCopy["cta"] }) {
  return (
    <section className="final" id="final" data-screen-label="10 Final CTA">
      <div className="container">
        <SectionHead rubric={c.rubric} h2={c.h2} lede={c.lede}>
          <div className="hero-actions" style={{ marginTop: 36 }}>
            <a className="btn btn-primary" href={BOOK_URL} data-meetergo-link={BOOK_URL}>
              {cta.spar} <span className="btn-arrow" aria-hidden="true"></span>
            </a>
            <a className="btn btn-ghost" href="#zielbild" onClick={onJump("zielbild")}>{cta.seeMethod}</a>
          </div>
          <div style={{ marginTop: 22, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "oklch(72% 0.008 85)" }}>
            {cta.finalMicro}
          </div>
        </SectionHead>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>NarraTec — eine Marke der Dr. Richard Rößler Management Advisory, Dresden</div>
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
        <Zielbild c={L.zielbild} />
        <UseCases c={L.usecases} />
        <Bausteine c={L.bausteine} />
        <NextSteps c={L.nextSteps} cta={L.cta} />
        <CaseStudy c={L.caseStudy} />
        <Team c={L.team} />
        <Disqualify c={L.disqualify} />
        <Final c={L.final} cta={L.cta} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default RedesignLanding;
