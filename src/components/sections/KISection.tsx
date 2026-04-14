import AnimatedContent from "../react-bits/AnimatedContent";
import {
  BrainCircuit,
  PenLine,
  SearchCheck,
  ListChecks,
  Mic,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const phaseIcons = [Mic, PenLine, SearchCheck, BrainCircuit, ListChecks];

export default function KISection() {
  const { t } = useI18n();

  return (
    <section id="ki" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.ki.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.ki.headingA}{" "}
              <br className="hidden md:block" />
              {t.ki.headingB}
            </h2>
            <p className="mt-4 text-lg text-ink-light max-w-2xl mx-auto">
              {t.ki.desc}
            </p>
          </div>
        </AnimatedContent>

        {/* Intensity Indicator */}
        <AnimatedContent>
          <div className="max-w-3xl mx-auto mb-16 bg-surface rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <SlidersHorizontal className="w-5 h-5 text-accent shrink-0" />
              <p className="text-sm font-semibold text-ink">
                {t.ki.intensityTitle}
              </p>
            </div>
            <div className="relative">
              <div className="h-2 rounded-full bg-border" />
              <div className="h-2 rounded-full bg-gradient-to-r from-border via-accent/40 to-accent absolute inset-0" style={{ clipPath: "inset(0 25% 0 0)" }} />
              <div className="flex justify-between mt-3">
                <span className="text-xs text-muted">{t.ki.scaleClassic}</span>
                <span className="text-xs text-muted">{t.ki.scaleHybrid}</span>
                <span className="text-xs text-muted">{t.ki.scaleAI}</span>
              </div>
            </div>
            <p className="text-sm text-ink-light mt-5 leading-relaxed">
              {t.ki.intensityDesc}
            </p>
          </div>
        </AnimatedContent>

        {/* Phase Cards + Human-in-the-Loop as 6th card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.ki.phases.map((p, i) => {
            const Icon = phaseIcons[i];
            return (
              <AnimatedContent key={i} delay={i * 0.1}>
                <div className="bg-paper rounded-xl border border-border p-6 md:p-8 h-full group hover:border-accent/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {p.phase}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink text-lg mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink-light leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </AnimatedContent>
            );
          })}

          {/* 6th card: Human-in-the-Loop */}
          <AnimatedContent delay={t.ki.phases.length * 0.1}>
            <div className="bg-navy rounded-xl p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-4 shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center -ml-3 border-2 border-navy">
                  <BrainCircuit className="w-4 h-4 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold text-white text-lg mb-3">
                {t.ki.humanTitle}
              </h3>
              <p className="text-navy-muted text-sm leading-relaxed">
                {t.ki.humanText}
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
