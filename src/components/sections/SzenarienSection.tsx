import AnimatedContent from "../react-bits/AnimatedContent";
import SpotlightCard from "../react-bits/SpotlightCard";
import { Crown, Handshake, Ambulance, Check } from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const caseMeta = [
  {
    icon: Crown,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverIconBg: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    icon: Handshake,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverIconBg: "group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    icon: Ambulance,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverIconBg: "group-hover:bg-rose-600 group-hover:text-white",
  },
];

export default function SzenarienSection() {
  const { t } = useI18n();

  return (
    <section id="szenarien" className="py-20 lg:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.szenarien.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.szenarien.heading}
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              {t.szenarien.desc}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6">
          {t.szenarien.cases.map((c, i) => {
            const meta = caseMeta[i];
            const Icon = meta.icon;
            return (
              <AnimatedContent key={c.title} delay={i * 0.15}>
                <SpotlightCard
                  className="rounded-2xl border border-border bg-surface p-8 h-full group"
                  spotlightColor="rgba(185, 28, 28, 0.08)"
                >
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 ${meta.iconBg} ${meta.iconColor} rounded-xl flex items-center justify-center mb-6 transition-colors ${meta.hoverIconBg}`}
                    >
                      <Icon className="w-6 h-6" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
