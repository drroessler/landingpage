import AnimatedContent from "../react-bits/AnimatedContent";
import { GitBranch, Bot, Factory, ArrowUpRight } from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const caseIcons = [Factory, GitBranch, Bot];

export default function PraxisSection() {
  const { t } = useI18n();

  return (
    <section id="praxis" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.praxis.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.praxis.heading}
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              {t.praxis.desc}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6">
          {t.praxis.cases.map((uc, i) => {
            const Icon = caseIcons[i];
            return (
              <AnimatedContent key={uc.title} delay={i * 0.15}>
                <div className="bg-paper rounded-xl border border-border overflow-hidden flex flex-col h-full transition-colors hover:border-accent/40">
                  <div className="px-6 pt-6 pb-5 border-b border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-accent-light text-accent rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-semibold text-accent uppercase tracking-[0.15em]">
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-ink leading-tight">
                      {uc.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.15em] mb-1.5">
                        {t.praxis.ausgangslageLabel}
                      </p>
                      <p className="text-sm text-ink-light leading-relaxed">
                        {uc.ausgangslage}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.15em] mb-1.5">
                        {t.praxis.vorgehenLabel}
                      </p>
                      <p className="text-sm text-ink-light leading-relaxed">
                        {uc.vorgehen}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <p className="text-[11px] font-semibold text-muted uppercase tracking-[0.15em]">
                          {t.praxis.ergebnisLabel}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-full uppercase tracking-[0.1em]">
                          <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                          {uc.outcome}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-ink leading-relaxed">
                        {uc.ergebnis}
                      </p>
                    </div>
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
