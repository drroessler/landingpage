import AnimatedContent from "../react-bits/AnimatedContent";
import SpotlightCard from "../react-bits/SpotlightCard";
import { Crown, Handshake, Ambulance, Check } from "lucide-react";

const cases = [
  {
    icon: Crown,
    title: "Strategische Transformation",
    text: "Große Veränderungen scheitern oft an unklaren Zielen. Nutzen Sie die Methode, um komplexe Vorhaben (z.B. Reorganisationen, neue Geschäftsmodelle) wasserdicht zu planen.",
    checks: [
      "Stakeholder-Alignment vor Projektstart",
      "Sicherung von Budget & Ressourcen",
    ],
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverIconBg: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    icon: Handshake,
    title: "Technical Sales",
    text: "Ersetzen Sie Standard-Pitches durch Co-Creation. Erarbeiten Sie gemeinsam mit dem Kunden ein Narrativ, das dessen Problem besser beschreibt, als er es selbst könnte.",
    checks: [
      "Vertrauen durch tiefes Verständnis",
      "Maßgeschneiderte Lösungsbausteine",
    ],
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverIconBg: "group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    icon: Ambulance,
    title: "Task-Forces & Krisen",
    text: "Wenn es brennt, hilft kein Aktionismus, sondern kühle Analyse. Das Format zwingt das Krisenteam, einen Schritt zurückzutreten und die wahre Root-Cause zu finden.",
    checks: [
      "Systematische Ursachenforschung",
      "Fokussierung auf wirksame Maßnahmen",
    ],
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverIconBg: "group-hover:bg-rose-600 group-hover:text-white",
  },
];

export default function SzenarienSection() {
  return (
    <section id="szenarien" className="py-20 lg:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Einsatzgebiete
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Wo die Methode wirkt
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              Nicht jedes Problem braucht ein Narrativ. Aber dort, wo Komplexität
              auf Umsetzungsdruck trifft, ist unser Vorgehen unschlagbar.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <AnimatedContent key={c.title} delay={i * 0.15}>
              <SpotlightCard
                className="rounded-2xl border border-border bg-surface p-8 h-full group"
                spotlightColor="rgba(185, 28, 28, 0.08)"
              >
                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 ${c.iconBg} ${c.iconColor} rounded-xl flex items-center justify-center mb-6 transition-colors ${c.hoverIconBg}`}
                  >
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3">{c.title}</h3>
                  <p className="text-ink-light text-sm leading-relaxed mb-4">
                    {c.text}
                  </p>
                  <ul className="text-sm text-muted space-y-2">
                    {c.checks.map((ch) => (
                      <li key={ch} className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
