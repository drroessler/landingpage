import AnimatedContent from "../react-bits/AnimatedContent";
import {
  BrainCircuit,
  PenLine,
  SearchCheck,
  ListChecks,
  Mic,
  SlidersHorizontal,
  User,
} from "lucide-react";

const phases = [
  {
    icon: Mic,
    phase: "Vorbereiten",
    title: "Workshop-Dokumentation",
    text: "Transkription und Zusammenfassung von Workshops – oder klassische Arbeit am Whiteboard mit Protokoll. Was für das Team und den Anwendungsfall adäquat ist, entscheidet der Narrative Owner.",
  },
  {
    icon: PenLine,
    phase: "Verstehen & Konzipieren",
    title: "Narrativ-Erstellung",
    text: "Überwindung des leeren Blatts: Lose Gedanken werden in stichhaltige Formulierungen überführt, Inhalte gestrafft und Füllsätze eliminiert. KI liefert Entwürfe, die Ihre Experten direkt veredeln.",
  },
  {
    icon: SearchCheck,
    phase: "Validieren & Schärfen",
    title: "Qualitätssicherung",
    text: "Prüfung der Root-Cause-Analyse auf Effektivität, der Argumentationen auf Stichhaltigkeit und der Anforderungsdefinitionen auf Vollständigkeit – als zweite Perspektive neben dem Stakeholder-Review.",
  },
  {
    icon: BrainCircuit,
    phase: "Entscheiden",
    title: "Entscheidungsvorbereitung",
    text: "Konsistenzprüfung der Entscheidungsvorlage über alle Abschnitte hinweg: Passen Zielbild, Lösungsbausteine und Finanzierung zusammen? Gibt es Widersprüche oder Lücken?",
  },
  {
    icon: ListChecks,
    phase: "Umsetzen",
    title: "Ableitung der Arbeitspakete",
    text: "Erstellung von Aufgabenbeschreibungen und Akzeptanzkriterien aus den Analyseergebnissen. Lösungsbausteine werden in strukturierte Epics und User Stories überführt.",
  },
];

export default function KISection() {
  return (
    <section id="ki" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              KI im Prozess
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Intelligente Unterstützung.{" "}
              <br className="hidden md:block" />
              Menschliche Entscheidung.
            </h2>
            <p className="mt-4 text-lg text-ink-light max-w-2xl mx-auto">
              Generative KI beschleunigt jeden Schritt des Frameworks – genau
              dort, wo sie Mehrwert stiftet. Intensität und Einsatz richten sich
              nach Ihrem Anwendungsfall und Ihrem Team.
            </p>
          </div>
        </AnimatedContent>

        {/* Intensity Indicator */}
        <AnimatedContent>
          <div className="max-w-3xl mx-auto mb-16 bg-surface rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <SlidersHorizontal className="w-5 h-5 text-accent shrink-0" />
              <p className="text-sm font-semibold text-ink">
                KI-Intensität nach Bedarf
              </p>
            </div>
            <div className="relative">
              <div className="h-2 rounded-full bg-border" />
              <div className="h-2 rounded-full bg-gradient-to-r from-border via-accent/40 to-accent absolute inset-0" style={{ clipPath: "inset(0 25% 0 0)" }} />
              <div className="flex justify-between mt-3">
                <span className="text-xs text-muted">Klassisch</span>
                <span className="text-xs text-muted">Hybrid</span>
                <span className="text-xs text-muted">KI-gestützt</span>
              </div>
            </div>
            <p className="text-sm text-ink-light mt-5 leading-relaxed">
              Manche Teams arbeiten am liebsten am Whiteboard mit klassischem
              Protokoll. Andere nutzen KI von der ersten Minute an. Der Prozess
              ist bewusst als Teilautomatisierung konzipiert – an definierten
              Quality Gates fließt immer das Feedback und das Wissen Ihrer
              Experten ein.
            </p>
          </div>
        </AnimatedContent>

        {/* Phase Cards + Human-in-the-Loop as 6th card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {phases.map((p, i) => (
            <AnimatedContent key={p.phase} delay={i * 0.1}>
              <div className="bg-paper rounded-xl border border-border p-6 md:p-8 h-full group hover:border-accent/20 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                    <p.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {p.phase}
                  </span>
                </div>
                <h3 className="font-semibold text-ink text-lg mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  {p.text}
                </p>
              </div>
            </AnimatedContent>
          ))}

          {/* 6th card: Human-in-the-Loop */}
          <AnimatedContent delay={phases.length * 0.1}>
            <div className="bg-navy rounded-xl p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-4 shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center -ml-3 border-2 border-navy">
                  <BrainCircuit className="w-4 h-4 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-3">
                Ihre Experten bleiben im Lead.
              </h3>
              <p className="text-navy-muted text-sm leading-relaxed">
                KI generiert Entwürfe, prüft Konsistenz und beschleunigt
                Routineaufgaben. Aber jede inhaltliche Entscheidung, jede
                Priorisierung und jede Freigabe liegt bei Ihren Fachexperten
                und Stakeholdern. Technologie ersetzt kein Urteilsvermögen –
                sie macht es wirksamer.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
