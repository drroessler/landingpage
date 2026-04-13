import AnimatedContent from "../react-bits/AnimatedContent";
import {
  ListChecks,
  Database,
  PieChart,
  MessageCircle,
  Ruler,
} from "lucide-react";

const features = [
  {
    icon: ListChecks,
    title: "Logische Kausalität",
    text: "Kein Springen zwischen Themen. Die Struktur zwingt dazu, das Problem vollständig zu beschreiben, bevor die Lösung präsentiert wird.",
  },
  {
    icon: Database,
    title: "Ort der Wahrheit",
    text: 'Schluss mit veralteten E-Mails und PPT-Versionen "Final_v3". Alle Stakeholder arbeiten im selben, lebenden Dokument.',
  },
  {
    icon: PieChart,
    title: "Informationsdichte",
    text: "Sätze statt Stichpunkte. Daten werden nicht dekorativ, sondern beweisend eingebettet. Jeder Abschnitt bringt Mehrwert.",
  },
  {
    icon: MessageCircle,
    title: "Kontextuelles Feedback",
    text: "Kommentare stehen direkt an der Textstelle. Diskussionen werden präzise geführt und aufgelöst, statt in Meetings zu zerfasern.",
  },
  {
    icon: Ruler,
    title: "Messbare Bausteine",
    text: "Das Ende des Narrativs ist der Anfang der Arbeit. Lösungsbausteine bereiten die Umsetzung und Nachverfolgung vor.",
  },
];

export default function ArtefaktSection() {
  return (
    <section id="artefakt" className="py-20 lg:py-28 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Entscheidungsgrundlage
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Mehr als nur Text: Ein Werkzeug für Klarheit
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              Wir ersetzen statische Folien durch ein lebendes Dokument. Jeder
              Abschnitt erfüllt eine präzise Funktion im Entscheidungsprozess.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature List */}
          <div className="space-y-8">
            {features.map((f, i) => (
              <AnimatedContent key={f.title} delay={i * 0.1}>
                <div className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-paper border border-border flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink text-lg">{f.title}</h4>
                    <p className="text-ink-light text-sm mt-1 leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>

          {/* Right: Document Visualization */}
          <AnimatedContent distance={60} direction="horizontal" reverse>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-surface to-accent-light rounded-full blur-3xl opacity-60 -z-10" />

              <div className="bg-white rounded-lg shadow-2xl border border-border p-8 relative hover:scale-[1.01] transition-transform duration-500">
                {/* Document Header */}
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                  <h3 className="text-lg font-bold text-ink">
                    Performance-Optimierung
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mr-1.5 animate-pulse" />
                    Live Doc
                  </span>
                </div>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <div className="relative">
                    <h5 className="text-[10px] font-bold uppercase text-muted tracking-wider mb-3">
                      1. Status Quo
                    </h5>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-surface rounded" />
                      <div className="h-2 w-4/5 bg-surface rounded" />
                      <div className="h-2 w-11/12 bg-surface rounded" />
                    </div>
                    {/* Comment bubble */}
                    <div className="mt-3 md:mt-0 md:absolute md:-right-14 md:top-1 bg-rose-50 border border-rose-200 shadow-lg p-2.5 rounded-lg md:w-36 z-10 text-xs md:rotate-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center text-[8px] font-bold text-rose-700">
                          CO
                        </div>
                        <span className="font-bold text-[10px] text-rose-800">
                          Controlling
                        </span>
                      </div>
                      <span className="text-[10px] leading-tight block text-ink-light">
                        "Sind die OPEX-Einsparungen für Q3 bereits validiert?"
                      </span>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="relative">
                    <h5 className="text-[10px] font-bold uppercase text-muted tracking-wider mb-3">
                      2. Anforderungen
                    </h5>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-surface rounded" />
                      <div className="h-2 w-5/6 bg-surface rounded" />
                      <div className="mt-3 w-5/6 border border-border rounded-sm overflow-hidden shadow-sm">
                        <div className="bg-surface p-1.5 flex gap-2 border-b border-border">
                          <div className="h-1.5 w-1/4 bg-muted/40 rounded-sm" />
                          <div className="h-1.5 w-1/4 bg-muted/40 rounded-sm" />
                          <div className="h-1.5 w-1/5 bg-muted/40 rounded-sm ml-auto" />
                        </div>
                        <div className="p-1.5 flex gap-2 bg-white">
                          <div className="h-1.5 w-1/3 bg-surface rounded-sm" />
                          <div className="h-1.5 w-1/5 bg-surface rounded-sm" />
                          <div className="h-1.5 w-1/4 bg-accent-light rounded-sm ml-auto" />
                        </div>
                      </div>
                    </div>
                    {/* CTO comment */}
                    <div className="mt-3 md:mt-0 md:absolute md:-right-14 md:top-14 bg-blue-50 border border-blue-200 shadow-lg p-2.5 rounded-lg md:w-36 z-10 text-xs md:-rotate-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center text-[8px] font-bold text-blue-700">
                          IT
                        </div>
                        <span className="font-bold text-[10px] text-blue-800">
                          CTO
                        </span>
                      </div>
                      <span className="text-[10px] leading-tight block text-ink-light">
                        "Synergien zur Cloud-Strategie prüfen."
                      </span>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h5 className="text-[10px] font-bold uppercase text-muted tracking-wider mb-3">
                      3. Lösungsbausteine
                    </h5>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-md shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="h-2.5 w-1/2 bg-emerald-200 rounded" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 border border-emerald-400 rounded-sm" />
                          <div className="h-1.5 w-2/3 bg-emerald-200/50 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 border border-emerald-400 rounded-sm" />
                          <div className="h-1.5 w-1/2 bg-emerald-200/50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-8 text-[10px] text-muted/50">
                  6 Seiten
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 w-full h-full bg-surface rounded-lg -z-20" />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
