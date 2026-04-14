import AnimatedContent from "../react-bits/AnimatedContent";
import { useI18n } from "../../i18n/LanguageContext";

export default function PullQuote() {
  const { t } = useI18n();

  return (
    <section className="py-16 lg:py-24 bg-paper relative overflow-hidden">
      {/* Decorative oversized quote mark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-border/40 font-display text-[12rem] leading-none select-none pointer-events-none" aria-hidden="true">
        {"\u201E"}
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedContent>
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-snug">
            {t.pullquote.text}
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {t.pullquote.attribution}
            </span>
            <div className="w-8 h-px bg-accent" />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
