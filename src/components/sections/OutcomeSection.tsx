import AnimatedContent from "../react-bits/AnimatedContent";
import { X, Check, ArrowRight } from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const kpiAccent = [
  "text-rose-500",
  "text-accent",
  "text-emerald-600",
];

export default function OutcomeSection() {
  const { t } = useI18n();
  const o = t.outcome;

  return (
    <section
      id="outcome"
      className="py-16 lg:py-24 bg-paper relative overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -mt-40 w-[900px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedContent>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {o.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3 leading-[1.1]">
              {o.heading}
            </h2>
            <p className="mt-5 text-ink-light text-base md:text-lg leading-relaxed">
              {o.thesis}
            </p>
          </div>
        </AnimatedContent>

        {/* KPI row — large metric glyph + punchy one-liner */}
        <div className="grid md:grid-cols-3 gap-px bg-border mb-14 rounded-xl overflow-hidden border border-border">
          {o.kpis.map((k, i) => (
            <AnimatedContent key={k.title} delay={i * 0.08}>
              <div className="bg-white p-7 md:p-8 h-full flex flex-col">
                <div className="flex items-baseline gap-3 mb-3">
                  {k.metric && (
                    <span
                      className={`font-display text-5xl md:text-6xl leading-none ${kpiAccent[i]}`}
                    >
                      {k.metric}
                    </span>
                  )}
                  <h3 className={`font-display leading-tight ${k.metric ? "font-semibold text-ink text-lg md:text-xl" : `text-2xl md:text-3xl ${kpiAccent[i]}`}`}>
                    {k.title}
                  </h3>
                </div>
                <p className="text-ink-light text-sm md:text-[15px] leading-snug">
                  {k.text}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* Shift header */}
        <AnimatedContent>
          <div className="flex items-center gap-4 max-w-3xl mx-auto mb-6">
            <div className="h-px bg-border flex-1" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {o.shiftLabel}
            </span>
            <div className="h-px bg-border flex-1" />
          </div>
        </AnimatedContent>

        {/* Before / After */}
        <div className="relative grid md:grid-cols-2 gap-3 md:gap-0">
          <AnimatedContent>
            <div className="bg-surface border border-border md:border-r-0 rounded-xl md:rounded-r-none p-6 md:p-8 h-full">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
                {o.beforeLabel}
              </span>
              <h3 className="font-display text-lg md:text-xl text-muted mt-1.5 mb-5 leading-tight">
                {o.beforeSub}
              </h3>
              <ul className="space-y-2.5">
                {o.beforeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink-light/80"
                  >
                    <span className="mt-1 w-4 h-4 rounded-full border border-border bg-paper flex items-center justify-center shrink-0">
                      <X className="w-2.5 h-2.5 text-muted" />
                    </span>
                    <span className="text-sm leading-relaxed line-through decoration-border decoration-1 underline-offset-2">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>

          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <AnimatedContent delay={0.12}>
            <div className="bg-navy text-white rounded-xl md:rounded-l-none p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
                  {o.afterLabel}
                </span>
                <h3 className="font-display text-lg md:text-xl text-white mt-1.5 mb-5 leading-tight">
                  {o.afterSub}
                </h3>
                <ul className="space-y-2.5">
                  {o.afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Check
                          className="w-2.5 h-2.5 text-white"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-sm leading-relaxed text-white">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
