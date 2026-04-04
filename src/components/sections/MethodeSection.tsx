import AnimatedContent from "../react-bits/AnimatedContent";
import SpotlightCard from "../react-bits/SpotlightCard";
import {
  UsersRound,
  SearchCheck,
  Handshake,
  Sparkles,
  Route,
} from "lucide-react";

const features = [
  {
    icon: UsersRound,
    title: "Interne Aktivierung",
    text: "Wir liefern das Werkzeug, das es Ihren Experten ermöglicht, ihr Wissen niederschwellig einzubringen und direkt an der Lösung mitzuwirken, statt auf externe Beratung zu hoffen.",
  },
  {
    icon: SearchCheck,
    title: "Tiefe Ursachenanalyse",
    text: "Wir trennen strikt zwischen Problemanalyse und Lösungsentwicklung, um die wahren Root-Causes zu finden und Symptombehandlung zu vermeiden.",
  },
  {
    icon: Handshake,
    title: "Partizipative Entscheidungen",
    text: "Durch gemeinsame Read-outs werden Stakeholder aktiv eingebunden statt nur informiert. Das ebnet den Weg für die gemeinsame Umsetzung.",
  },
  {
    icon: Sparkles,
    title: "KI als Beschleuniger",
    text: "Wir nutzen generative KI, um aus Ihren Daten umgehend konkrete Entwürfe zu generieren, die Ihre Experten direkt veredeln.",
  },
  {
    icon: Route,
    title: "Nahtlose Umsetzung",
    text: "Lösungsbausteine werden in greifbare Arbeitspakete übersetzt. Das bildet die Basis für eine risikoreduzierte und effiziente Budgetverwendung ohne Implementierungslücke.",
    wide: true,
  },
];

export default function MethodeSection() {
  return (
    <section id="methode" className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedContent>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Unser Ansatz
            </span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 text-white">
              Das Narrativ:{" "}
              <br className="hidden md:block" />
              Fakten statt Bauchgefühl.
            </h2>
            <p className="text-navy-muted text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              Ein Narrativ im Sinne von NarraTec ist ein strukturiertes
              Analysedokument, das Ursachen, Entscheidungslogik und Maßnahmen in
              einem gemeinsam erarbeiteten, nachvollziehbaren Dokument
              verbindet – als Grundlage für Entscheidungen, die intern getragen
              werden.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <AnimatedContent
              key={f.title}
              delay={i * 0.1}
              className={f.wide ? "lg:col-span-2" : ""}
            >
              <SpotlightCard
                className="rounded-xl border border-white/10 bg-white/5 p-6 h-full"
                spotlightColor="rgba(185, 28, 28, 0.15)"
              >
                <div className="relative z-10">
                  <f.icon className="w-6 h-6 text-accent mb-4" />
                  <h4 className="font-semibold text-lg mb-2 text-white">
                    {f.title}
                  </h4>
                  <p className="text-navy-muted text-sm leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
