import AnimatedContent from "../react-bits/AnimatedContent";
import {
  UsersRound,
  PenLine,
  MessageSquare,
  Gavel,
  Rocket,
} from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const stepMeta = [
  { icon: UsersRound, accent: "bg-muted", highlight: false },
  { icon: PenLine, accent: "bg-ink-light", highlight: false },
  { icon: MessageSquare, accent: "bg-accent", highlight: false },
  { icon: Gavel, accent: "bg-accent-hover", highlight: false },
  { icon: Rocket, accent: "bg-emerald-600", highlight: true },
];

export default function FrameworkSection() {
  const { t } = useI18n();

  return (
    <section id="framework" className="py-20 lg:py-28 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.framework.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.framework.heading}
            </h2>
            <p className="text-lg text-ink-light mt-4">
              {t.framework.desc}
            </p>
          </div>
        </AnimatedContent>

        {/* Progress track */}
        <div className="hidden md:flex items-center max-w-5xl mx-auto mb-8 px-8">
          {stepMeta.map((s, i) => (
            <div key={`track-${i}`} className="contents">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${s.accent}`} />
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                  {t.framework.stepLabel} {i + 1}
                </span>
              </div>
              {i < stepMeta.length - 1 && (
                <div className="flex-1 h-px bg-gradient-to-r from-border to-border mx-1 mt-[-10px]" />
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {t.framework.steps.map((step, i) => {
            const meta = stepMeta[i];
            const Icon = meta.icon;
            return (
              <AnimatedContent key={i} delay={i * 0.12}>
                <div
                  className={`relative p-6 rounded-xl border transition group h-full ${
                    meta.highlight
                      ? "bg-emerald-50 border-emerald-200 hover:shadow-md"
                      : "bg-white border-border hover:shadow-md"
                  }`}
                >
                  <div
                    className={`absolute -top-3.5 left-6 ${meta.accent} text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold`}
                  >
                    {i + 1}
                  </div>
                  <div className="mt-3">
                    <Icon
                      className={`w-6 h-6 mb-4 ${
                        meta.highlight ? "text-emerald-600" : "text-muted"
                      }`}
                    />
                    <h3 className="text-base font-bold text-ink mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-ink-light leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
