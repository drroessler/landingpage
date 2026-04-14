import AnimatedContent from "../react-bits/AnimatedContent";
import { useI18n } from "../../i18n/LanguageContext";

const values = ["2", "5", "100%"];

export default function StatsStrip() {
  const { t } = useI18n();

  return (
    <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,28,28,0.08),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {t.stats.items.map((s, i) => (
            <AnimatedContent key={i} delay={i * 0.15}>
              <div className="text-center px-8">
                <span className="font-display text-5xl lg:text-6xl text-white block leading-none">
                  {values[i]}
                </span>
                <p className="text-white font-semibold text-sm mt-3 tracking-wide">
                  {s.label}
                </p>
                <p className="text-navy-muted text-xs mt-1">{s.sub}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
