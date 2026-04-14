import AnimatedContent from "../react-bits/AnimatedContent";
import { useI18n } from "../../i18n/LanguageContext";

export default function ProblemSection() {
  const { t } = useI18n();

  return (
    <section id="problem" className="py-14 lg:py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.problem.label}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3">
              {t.problem.heading}
            </h2>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {t.problem.items.map((p) => (
            <div
              key={p.title}
              className="group bg-paper h-full flex flex-col border border-border border-l-4 border-l-accent p-5 md:p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display text-xl md:text-2xl text-ink leading-tight">
                  {p.title}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-muted mt-1 shrink-0">
                  {p.num}
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                {p.text}
              </p>
              <p className="text-accent text-sm font-semibold border-t border-border pt-3">
                ↳ {p.result}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
