import AnimatedContent from "../react-bits/AnimatedContent";
import { Bandage, Users, Presentation, Compass, ChevronRight, ChevronDown } from "lucide-react";

const problems = [
  {
    icon: Bandage,
    title: "Vorschnelle Lösungen",
    text: "Teams diskutieren Lösungen, bevor das Problem verstanden ist. Statt echter Ursachenforschung wird Symptombehandlung betrieben.",
    result: "Fehlgeleitete Aktivitäten von Anfang an",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    icon: Users,
    title: "Silo-Denken",
    text: "Fachbereiche und Management sprechen unterschiedliche Sprachen. Es fehlt das verbindende Element, das ein gemeinsames Verständnis schafft.",
    result: "Kein Alignment, kein Fortschritt",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    icon: Presentation,
    title: "Death by PowerPoint",
    text: "Meetings verkommen zu Frontalbeschallung. Komplexe Probleme werden durch Stichpunkte trivialisiert, kritisches Denken wird unterdrückt.",
    result: "Scheinentscheidungen statt Klarheit",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  {
    icon: Compass,
    title: "Implementierungslücke",
    text: "Getroffene Entscheidungen versanden. Es gibt keine klare Übersetzung in operative Maßnahmenlisten oder Finanzierungsmodelle.",
    result: "Investitionen verpuffen wirkungslos",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Typische Muster des Scheiterns
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              Kennen Sie das?
            </h2>
            <p className="mt-4 text-lg text-ink-light max-w-xl mx-auto">
              Warum komplexe Projekte in Unternehmen häufig scheitern.
            </p>
          </div>
        </AnimatedContent>

        <div className="flex flex-col md:flex-row items-stretch gap-0 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <div key={p.title} className="contents">
              <AnimatedContent delay={i * 0.15} className="flex-1 flex">
                <div
                  className={`flex-1 p-6 border-l-4 ${p.border} ${p.bg} rounded-r-xl flex flex-col`}
                >
                  <p.icon className={`w-5 h-5 ${p.color} mb-3`} />
                  <h3 className="font-semibold text-ink mb-2">{p.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-auto">
                    {p.text}
                  </p>
                  <p className={`${p.color} text-sm font-medium mt-4`}>
                    → {p.result}
                  </p>
                </div>
              </AnimatedContent>

              {i < problems.length - 1 && (
                <div className="flex items-center justify-center px-2 py-4 md:py-0 shrink-0">
                  <ChevronRight className="w-5 h-5 text-border hidden md:block" />
                  <ChevronDown className="w-5 h-5 text-border md:hidden" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
