import AnimatedContent from "../react-bits/AnimatedContent";
import {
  UsersRound,
  PenLine,
  MessageSquare,
  Gavel,
  Rocket,
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: UsersRound,
    title: "Vorbereiten",
    text: "Zu Beginn fixieren wir gemeinsam Motivation, Vision und Rollen. Ein kompaktes Methoden-Training befähigt Ihre Fachexperten zur sofortigen selbstständigen Arbeit.",
    accent: "bg-muted",
  },
  {
    num: 2,
    icon: PenLine,
    title: "Verstehen & Konzipieren",
    text: "Ein kleines Kernteam analysiert das Problem ganzheitlich nach dem Prinzip Mensch-Technik-Organisation. Wir trennen dabei strikt Problem von Lösung, um echte Ursachen zu finden.",
    accent: "bg-ink-light",
  },
  {
    num: 3,
    icon: MessageSquare,
    title: "Validieren & Schärfen",
    text: 'Stakeholder lesen still ("Silent Reads") und geben schriftliches Feedback. Das schafft gemeinsames Verständnis und deckt blinde Flecken frühzeitig auf.',
    accent: "bg-accent",
  },
  {
    num: 4,
    icon: Gavel,
    title: "Evidenzbasiert Entscheiden",
    text: "Das Management entscheidet auf Basis einer logisch fundierten und gemeinschaftlich getragenen Vorlage und beauftragt die Umsetzung.",
    accent: "bg-accent-hover",
  },
  {
    num: 5,
    icon: Rocket,
    title: "Systematisch Umsetzen",
    text: "Lösungsbausteine werden in messbare Arbeitsaufgaben übersetzt. Ein strukturiertes Vorgehen sichert die Integrität bei der Übergabe an die Teams.",
    accent: "bg-emerald-600",
    highlight: true,
  },
];

export default function FrameworkSection() {
  return (
    <section id="framework" className="py-20 lg:py-28 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Der Prozess
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Das Narrative to Action Framework
            </h2>
            <p className="text-lg text-ink-light mt-4">
              Vom diffusen Problem zur klaren Umsetzung. Ein wissenschaftlich
              fundiertes Vorgehensmodell in fünf Schritten.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <AnimatedContent key={s.num} delay={i * 0.12}>
              <div
                className={`relative p-6 rounded-xl border transition group h-full ${
                  s.highlight
                    ? "bg-emerald-50 border-emerald-200 hover:shadow-md"
                    : "bg-white border-border hover:shadow-md"
                }`}
              >
                <div
                  className={`absolute -top-3.5 left-6 ${s.accent} text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold`}
                >
                  {s.num}
                </div>
                <div className="mt-3">
                  <s.icon
                    className={`w-6 h-6 mb-4 ${
                      s.highlight ? "text-emerald-600" : "text-muted"
                    }`}
                  />
                  <h3 className="text-base font-bold text-ink mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-light leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
