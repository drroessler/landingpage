import AnimatedContent from "../react-bits/AnimatedContent";

const problems = [
  {
    num: "01",
    title: "Vorschnelle Lösungen",
    text: "Teams diskutieren Lösungen, bevor das Problem verstanden ist. Statt echter Ursachenforschung wird Symptombehandlung betrieben.",
    result: "Fehlgeleitete Aktivitäten von Anfang an",
  },
  {
    num: "02",
    title: "Silo-Denken",
    text: "Fachbereiche und Management sprechen unterschiedliche Sprachen. Es fehlt das verbindende Element, das ein gemeinsames Verständnis schafft.",
    result: "Kein Alignment, kein Fortschritt",
  },
  {
    num: "03",
    title: "Death by PowerPoint",
    text: "Meetings verkommen zu Frontalbeschallung. Komplexe Probleme werden durch Stichpunkte trivialisiert, kritisches Denken wird unterdrückt.",
    result: "Scheinentscheidungen statt Klarheit",
  },
  {
    num: "04",
    title: "Implementierungslücke",
    text: "Getroffene Entscheidungen versanden. Es gibt keine klare Übersetzung in operative Maßnahmenlisten oder Finanzierungsmodelle.",
    result: "Investitionen verpuffen wirkungslos",
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

        <div className="grid md:grid-cols-2 gap-px max-w-5xl mx-auto bg-border rounded-2xl overflow-hidden shadow-sm">
          {problems.map((p, i) => (
            <AnimatedContent key={p.title} delay={i * 0.12}>
              <div className="bg-paper p-8 md:p-10 flex flex-col h-full group hover:bg-white transition-colors duration-300">
                <span className="font-display text-5xl text-border group-hover:text-accent/20 transition-colors duration-300 leading-none mb-6">
                  {p.num}
                </span>
                <h3 className="font-semibold text-ink text-lg mb-3">
                  {p.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                  {p.text}
                </p>
                <p className="text-accent text-sm font-medium border-t border-border pt-4">
                  → {p.result}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
