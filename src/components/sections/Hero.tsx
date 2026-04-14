import NetworkBackground from "../NetworkBackground";
import { ArrowRight } from "lucide-react";
import { openContactModal } from "../ContactModal";
import { useI18n } from "../../i18n/LanguageContext";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Network Background */}
      <div className="absolute inset-0 -z-10">
        <NetworkBackground
          nodeCount={70}
          connectionDistance={140}
          speed={0.25}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-paper/30 via-transparent to-paper" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1>
          <span className="block font-display text-4xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.1]">
            {t.hero.h1a}
          </span>
          <span className="block font-display text-4xl md:text-6xl lg:text-7xl text-accent tracking-tight leading-[1.1] mt-2">
            {t.hero.h1b}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-ink-light leading-relaxed">
          {t.hero.sub}
        </p>

        <div className="mt-10">
          <button
            onClick={openContactModal}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 text-base font-semibold tracking-wide transition-colors cursor-pointer rounded-md"
          >
            {t.hero.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Social Proof Bar – wider container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-12 mt-16 border-t border-border flex flex-col md:flex-row justify-center items-center gap-6 text-center md:text-left">
          <p className="text-xs text-muted font-semibold uppercase tracking-[0.2em] shrink-0">
            {t.hero.proofLabel}
          </p>

          <div className="hidden md:block w-px h-12 bg-border" />

          <img
            src="HMD.jpeg"
            alt={t.hero.hmdAlt}
            className="hidden md:block h-10 w-auto object-contain shrink-0"
          />

          <div className="hidden md:block w-px h-12 bg-border" />

          <a
            href="https://link.springer.com/epdf/10.1365/s40702-025-01234-z?sharing_token=2GcSA2NwyHc5ZFVHNLOokX2kjFioqY_JoFJDVSa1602aUYkWxEZ0qDiq0nqKya3TVcFpFlMJ-w6U_3aV089ye1tk2LK8kCB7LXf3vW4rNlkuQzP6Iv71lk5qIUaz2KuVMlxU-loa0RJZ4qvO6c6UaS6fnPhQeXqYPV8neYP5xbM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 flex flex-col items-center md:items-start hover:bg-surface p-3 rounded-lg transition-colors"
          >
            <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
              {t.hero.studyTitle}
            </span>
            <span className="text-xs text-muted flex items-center gap-1.5 mt-1">
              <span className="bg-accent-light text-accent font-bold px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                {t.hero.studyBadge}
              </span>
              {t.hero.studyAction}
              <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </a>

          <div className="hidden md:block w-px h-12 bg-border" />
          <div className="block md:hidden w-16 h-px bg-border" />

          <a
            href="Pre-Read Narrative To Action.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-1 flex flex-col items-center md:items-start hover:bg-surface p-3 rounded-lg transition-colors"
          >
            <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
              {t.hero.prereadTitle}
            </span>
            <span className="text-xs text-muted flex items-center gap-1.5 mt-1">
              <span className="bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                {t.hero.prereadBadge}
              </span>
              {t.hero.prereadAction}
              <ArrowRight className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
