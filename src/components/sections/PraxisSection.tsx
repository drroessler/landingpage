import AnimatedContent from "../react-bits/AnimatedContent";
import { GitBranch, Bot, Factory, TrendingUp } from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const caseIcons = [Factory, GitBranch, Bot];
const caseMeta = [
  {
    headerBg: "bg-violet-50",
    headerBorder: "border-violet-100",
    tagColor: "text-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    headerBg: "bg-blue-50",
    headerBorder: "border-blue-100",
    tagColor: "text-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-100",
    tagColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

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
            const meta = caseMeta[i];
            const Icon = caseIcons[i];
            return (
              <AnimatedContent key={uc.title} delay={i * 0.15}>
                <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col h-full">
                  <div
                    className={`${meta.headerBg} px-6 pt-6 pb-4 border-b ${meta.headerBorder}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`${meta.iconBg} rounded-lg w-10 h-10 flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-4 h-4 ${meta.iconColor}`} />
                      </div>
                      <span
                        className={`text-xs font-bold ${meta.tagColor} uppercase tracking-wide`}
                      >
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-ink leading-tight">
                      {uc.title}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                        {t.praxis.ausgangslageLabel}
                      </p>
                      <p className="text-sm text-ink-light leading-relaxed">
                        {uc.ausgangslage}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                        {t.praxis.vorgehenLabel}
                      </p>
                      <p className="text-sm text-ink-light leading-relaxed">
                        {uc.vorgehen}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                          {t.praxis.ergebnisLabel}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                          <TrendingUp className="w-3 h-3" />
                          {uc.outcome}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-ink">
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
