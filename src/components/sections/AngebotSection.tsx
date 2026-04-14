import AnimatedContent from "../react-bits/AnimatedContent";
import { Check, CheckCircle } from "lucide-react";
import { openContactModal } from "../ContactModal";
import { useI18n } from "../../i18n/LanguageContext";

const tierMeta = [
  { highlight: false },
  { highlight: true },
  { highlight: false },
];

export default function AngebotSection() {
  const { t } = useI18n();

  return (
    <section id="angebot" className="py-20 lg:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.angebot.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.angebot.heading}
            </h2>
            <p className="mt-4 text-ink-light">
              {t.angebot.desc}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {t.angebot.tiers.map((tier, i) => {
            const meta = tierMeta[i];
            return (
              <AnimatedContent key={tier.name} delay={i * 0.15}>
                <div
                  className={`rounded-xl p-8 relative h-full flex flex-col ${
                    meta.highlight
                      ? "border-2 border-accent bg-white shadow-xl md:-translate-y-4"
                      : "border border-border bg-white hover:border-accent/30 transition"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                      {tier.badge}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-ink">{tier.name}</h3>
                  <p className="text-muted text-sm mt-2 mb-6">{tier.desc}</p>
                  <ul className="space-y-4 mb-8 text-ink-light text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="flex">
                        <Check
                          className={`w-4 h-4 mt-0.5 mr-3 shrink-0 ${
                            meta.highlight ? "text-accent" : "text-emerald-500"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openContactModal}
                    className={`block w-full text-center py-2.5 text-sm font-semibold transition mt-auto cursor-pointer ${
                      meta.highlight
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "border border-border text-ink hover:border-ink/30 hover:bg-surface"
                    }`}
                  >
                    {t.angebot.cta}
                  </button>
                </div>
              </AnimatedContent>
            );
          })}
        </div>

        {/* Decision Matrix */}
        <AnimatedContent>
          <div className="mt-10 max-w-6xl mx-auto border border-border rounded-xl overflow-hidden">
            <div className="bg-surface px-6 py-3 border-b border-border">
              <p className="text-xs font-bold text-muted uppercase tracking-[0.15em]">
                {t.angebot.decisionHeading}
              </p>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {t.angebot.tiers.map((tier, i) => {
                const meta = tierMeta[i];
                return (
                  <div
                    key={tier.name}
                    className={`px-6 py-5 flex gap-3 ${
                      meta.highlight ? "bg-accent-light/50" : ""
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        meta.highlight ? "text-accent" : "text-border"
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-ink text-sm mb-1">
                        {tier.name}
                      </p>
                      <p className="text-muted text-sm">{tier.decision}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
