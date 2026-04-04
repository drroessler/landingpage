import AnimatedContent from "../react-bits/AnimatedContent";
import { GitBranch, Bot, Factory, FlaskConical } from "lucide-react";

const useCases = [
  {
    icon: GitBranch,
    tag: "Fall 1 · Governance",
    title: "Open-Source-Freigabeprozess",
    headerBg: "bg-blue-50",
    headerBorder: "border-blue-100",
    tagColor: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    ausgangslage:
      "Ein träges Freigabeverfahren bei der Verwendung von Open-Source-Software verzögerte die Lieferung von Softwareprodukten in einem Industriekonzern. Drei Stakeholdergruppen – Rechtswesen, Softwareentwicklung und Open Source Office – arbeiteten ohne gemeinsames Problemverständnis an jeweils lokalen Optimierungen.",
    vorgehen:
      "Strukturiertes Narrativ mit gleichberechtigtem Einbezug aller drei Stakeholdergruppen. Die Analyse deckte neben technischen auch organisatorische und menschliche Ursachen auf – die bei isolierter Betrachtung unsichtbar geblieben wären.",
    ergebnis:
      "Ganzheitliches Zielbild. Agile Umsetzung der Lösungsbausteine führte zu gemeinschaftlich getragener Lösung und erheblicher Beschleunigung der Freigabedauern.",
  },
  {
    icon: Bot,
    tag: "Fall 2 · Strategische IT",
    title: "KI-Liefermodell",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-100",
    tagColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    ausgangslage:
      "Ein Konzern benötigte ein einheitliches Modell für die Lieferung von KI-Softwareprodukten – unter Einbindung zentraler IT, mehrerer Markendomänen und des Business Partner Managements auf verschiedenen Hierarchieebenen.",
    vorgehen:
      "Das Narrativ wurde ergänzend entlang der Phasen des Produktlebenszyklus strukturiert. Bewusste Steuerung des Zielkonflikts zwischen vollständiger Problemanalyse und Geschwindigkeit bei hoher Stakeholderanzahl. Komplexität der Aufgabenstellung führte zu thematisch heterogenen Lösungsbausteinen (u.a. Technische Implementierungen vs. Community Aufbau).",
    ergebnis:
      "Transparenz über erforderliche Handlungsfelder bei hoher Organisationskomplexität. Konsensfähiges Zielmodell. Priorisierte Umsetzung der heterogenen Lösungsbausteine.",
  },
  {
    icon: Factory,
    tag: "Fall 3 · Transformation",
    title: "Reorganisation Shopfloor-IT",
    headerBg: "bg-violet-50",
    headerBorder: "border-violet-100",
    tagColor: "text-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    ausgangslage:
      "Strategische Neuordnung der IT-Architektur im Produktionsumfeld einer Konzernmarke – mit Perspektiven aus Werks-IT, Marken-IT, Konzern-IT und Fachdomänen, die harmonisiert werden mussten.",
    vorgehen:
      "Konsequente Ursachenanalyse nach menschlicher, organisatorischer und technischer Perspektive. Strikte Trennung von Problemanalyse und Lösungskonzeption verhinderte vorschnelle Fixierung auf isolierte Lösungsansätze. Systematische Erarbeitung eines Nordstern-Narrativs und abgeleiteter Fokus-Narrative. Anpassung des Narrativs nach ersten Feedbackschleifen aus der iterativen Umsetzung.",
    ergebnis:
      "Umsetzung der Lösungsbausteine in agiler Produktorganisation. Zweistellige Anzahl an Umsetzungsteams. Risikoreduzierte, phasenweise Budgetierung der Umsetzung.",
  },
];

export default function PraxisSection() {
  return (
    <section id="praxis" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Aus der Praxis
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Drei echte Anwendungsfälle.
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              Die Methode wurde bereits mehrfach erfolgreich im
              Unternehmensumfeld eingesetzt.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted bg-white border border-border rounded-full px-4 py-2">
              <FlaskConical className="w-3.5 h-3.5 text-accent" />
              Dokumentiert in: Rößler & Wieland (2026), HMD Praxis der
              Wirtschaftsinformatik
            </div>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <AnimatedContent key={uc.title} delay={i * 0.15}>
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col h-full">
                <div
                  className={`${uc.headerBg} px-6 pt-6 pb-4 border-b ${uc.headerBorder}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`${uc.iconBg} rounded-lg w-10 h-10 flex items-center justify-center shrink-0`}
                    >
                      <uc.icon className={`w-4 h-4 ${uc.iconColor}`} />
                    </div>
                    <span
                      className={`text-xs font-bold ${uc.tagColor} uppercase tracking-wide`}
                    >
                      {uc.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink leading-tight">
                    {uc.title}
                  </h3>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                      Ausgangslage
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">
                      {uc.ausgangslage}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                      Vorgehen
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">
                      {uc.vorgehen}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                      Ergebnis
                    </p>
                    <p className="text-sm font-medium text-ink">
                      {uc.ergebnis}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
