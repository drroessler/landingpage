import AnimatedContent from "../react-bits/AnimatedContent";
import {
  Boxes,
  Layers,
  ListChecks,
  Link,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Coins,
  GitBranch,
  Puzzle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const blockMeta = [
  {
    icon: Boxes,
    style: "bg-navy text-white",
    labelStyle: "text-accent",
    iconStyle: "bg-white/10 text-white/70",
  },
  {
    icon: Layers,
    style: "bg-white border border-border text-ink",
    labelStyle: "text-blue-600",
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    icon: ListChecks,
    style: "bg-white border border-border text-ink",
    labelStyle: "text-emerald-600",
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Link,
    style: "bg-violet-50 border border-violet-100 text-ink",
    labelStyle: "text-violet-600",
    iconStyle: "bg-violet-100 text-violet-600",
  },
];

const benefitMeta = [
  { icon: ShieldCheck, color: "text-rose-500", borderColor: "border-border" },
  { icon: Coins, color: "text-accent", borderColor: "border-accent/30" },
  { icon: GitBranch, color: "text-violet-500", borderColor: "border-border" },
];

export default function UmsetzungSection() {
  const { t } = useI18n();

  return (
    <section id="umsetzung" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.umsetzung.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.umsetzung.heading}
            </h2>
            <p className="mt-4 text-ink-light max-w-2xl mx-auto">
              {t.umsetzung.desc}
            </p>
          </div>
        </AnimatedContent>

        {/* Mapping Visual */}
        <AnimatedContent>
          <div className="bg-paper rounded-2xl p-8 md:p-12 mb-16 border border-border">
            <p className="text-center text-xs font-semibold text-muted uppercase tracking-[0.15em] mb-10">
              {t.umsetzung.mappingSubtitle}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
              {t.umsetzung.blocks.map((b, i) => {
                const meta = blockMeta[i];
                const Icon = meta.icon;
                return (
                  <div key={b.title} className="contents">
                    <div
                      className={`w-full md:flex-1 md:min-w-0 ${meta.style} rounded-xl p-5 shadow-sm text-center`}
                    >
                      <div
                        className={`${meta.iconStyle} rounded-lg w-10 h-10 flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <p
                        className={`text-xs font-bold uppercase tracking-wide ${meta.labelStyle} mb-1`}
                      >
                        {b.label}
                      </p>
                      <p className="font-bold text-base">{b.title}</p>
                      <p className="text-xs mt-2 opacity-70">{b.desc}</p>
                    </div>
                    {i < t.umsetzung.blocks.length - 1 && (
                      <div className="flex flex-col items-center md:mx-3 shrink-0">
                        <ArrowRight className="w-5 h-5 text-border hidden md:block" />
                        <ArrowDown className="w-5 h-5 text-border md:hidden" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* SAFe Banner */}
            <div className="mt-8 -mx-8 md:-mx-12 -mb-8 md:-mb-12 border-t border-border bg-white rounded-b-2xl px-8 md:px-12 py-5 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center">
                <Puzzle className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-ink text-sm">{t.umsetzung.safeTitle}</p>
                <p className="text-muted text-sm mt-0.5">
                  {t.umsetzung.safeDesc}
                </p>
              </div>
              <a
                href="Pre-Read Narrative To Action.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink bg-surface border border-border px-4 py-2 rounded-lg transition whitespace-nowrap"
              >
                <span className="bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                  {t.umsetzung.prereadBadge}
                </span>
                {t.umsetzung.prereadAction}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* Connector: Process → Benefits */}
        <div className="flex flex-col items-center mt-10 mb-8 text-muted">
          <ChevronDown className="w-8 h-8 -mb-4" />
          <ChevronDown className="w-8 h-8" />
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.umsetzung.benefits.map((b, i) => {
            const meta = benefitMeta[i];
            const Icon = meta.icon;
            return (
              <AnimatedContent key={b.title} delay={i * 0.15}>
                <div
                  className={`rounded-xl border ${meta.borderColor} bg-white p-8 h-full`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-surface rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <h3 className="font-bold text-ink text-lg">{b.title}</h3>
                  </div>
                  <p className="text-ink-light text-sm leading-relaxed">
                    {b.text}
                  </p>
                  <div className="mt-5 pt-4 border-t border-border space-y-1.5">
                    {b.checks.map((c) => (
                      <p
                        key={c}
                        className="text-xs text-muted flex items-center gap-2"
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${meta.color} shrink-0`} />
                        {c}
                      </p>
                    ))}
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
