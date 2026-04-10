import AnimatedContent from "../react-bits/AnimatedContent";
import { GitBranch, Bot, Factory, FlaskConical, TrendingUp } from "lucide-react";

const useCases = [
  {
    icon: Factory,
    tag: "Fall 1 · Transformation",
    title: "Reorganisation Shopfloor-IT",
    headerBg: "bg-violet-50",
    headerBorder: "border-violet-100",
    tagColor: "text-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    ausgangslage:
      "Teams aus Werks-IT, Marken-IT, zentraler IT und Fachbereichen sollten IT-Architektur und IT-Organisation im Produktionsumfeld gemeinsam neu ausrichten – arbeiteten aber mit unterschiedlichen Prioritäten, Zeithorizonten und Fachsprachen.",
    vorgehen:
      "Die Methode erzwang eine konsequente Ursachenanalyse aus menschlicher, organisatorischer und technischer Perspektive. Strikte Trennung von Problem und Lösung verhinderte vorschnelle Fixierung auf isolierte Ansätze. Ein Nordstern-Narrativ schuf teamübergreifende Orientierung, abgeleitete Fokus-Narrative machten die Arbeit in den einzelnen Bereichen steuerbar. Die Umstellung auf das Scaled Agile Framework (SAFe) führte zur Neuformation von Teams und geänderten Arbeitsweisen. Das Narrativ wurde nach ersten Feedbackschleifen iterativ angepasst.",
    ergebnis:
      "Gemeinsam getragene Zielarchitektur. Umsetzung in agiler Produktorganisation mit zweistelliger Anzahl an Teams. Risikoreduzierte, phasenweise Budgetierung.",
    outcome: "Risikoreduzierte Budgetierung",
  },
  {
    icon: GitBranch,
    tag: "Fall 2 · Governance",
    title: "Open-Source-Freigabeprozess",
    headerBg: "bg-blue-50",
    headerBorder: "border-blue-100",
    tagColor: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    ausgangslage:
      "Ein träges Open-Source-Freigabeverfahren bremste die Softwarelieferung. Drei Teams – Rechtswesen, Entwicklung und Open Source Office – optimierten jeweils lokal, ohne ein gemeinsames Problemverständnis zu entwickeln.",
    vorgehen:
      "Die Methode brachte alle drei Gruppen gleichberechtigt an einen Tisch. Das strukturierte Narrativ deckte neben technischen auch organisatorische und menschliche Ursachen auf – Zusammenhänge, die bei isolierter Betrachtung unsichtbar geblieben wären.",
    ergebnis:
      "Ganzheitliches Zielbild statt Insellösungen. Die gemeinschaftlich getragene Lösung führte zu erheblicher Beschleunigung der Freigabedauern.",
    outcome: "Erhebliche Beschleunigung",
  },
  {
    icon: Bot,
    tag: "Fall 3 · Strategische IT",
    title: "KI-Liefermodell",
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-100",
    tagColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    ausgangslage:
      "Zentrale IT, mehrere Markendomänen und Business Partner Management sollten gemeinsam ein Liefermodell für KI-Softwareprodukte entwickeln – über Hierarchieebenen hinweg, mit teils widersprüchlichen Anforderungen.",
    vorgehen:
      "Die Methode strukturierte das Narrativ entlang der Phasen des Produktlebenszyklus und machte den Zielkonflikt zwischen Gründlichkeit und Geschwindigkeit bei hoher Stakeholderanzahl steuerbar. Die Komplexität führte zu thematisch heterogenen Lösungsbausteinen – von technischen Implementierungen bis zum Community-Aufbau.",
    ergebnis:
      "Transparenz über erforderliche Handlungsfelder bei hoher Organisationskomplexität. Modulare Umsetzung der heterogenen Lösungsbausteine.",
    outcome: "Konsensfähiges Zielmodell",
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
              Die Methode wird regelmäßig in anspruchsvollen Unternehmenssettings eingesetzt.
            </p>
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
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                        Ergebnis
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        <TrendingUp className="w-3 h-3" />
                        {uc.outcome}
                      </span>
                    </div>
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
