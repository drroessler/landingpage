import AnimatedContent from "../react-bits/AnimatedContent";
import SpotlightCard from "../react-bits/SpotlightCard";
import {
  UsersRound,
  SearchCheck,
  Handshake,
  Sparkles,
  Route,
} from "lucide-react";
import { useI18n } from "../../i18n/LanguageContext";

const icons = [UsersRound, SearchCheck, Handshake, Sparkles, Route];

export default function MethodeSection() {
  const { t } = useI18n();

  return (
    <section id="methode" className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedContent>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.methode.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 text-white">
              {t.methode.headingA}{" "}
              <br className="hidden md:block" />
              {t.methode.headingB}
            </h2>
            <p className="text-navy-muted text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
              {t.methode.desc}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.methode.features.map((f, i) => {
            const Icon = icons[i];
            const wide = i === 4;
            return (
              <AnimatedContent
                key={f.title}
                delay={i * 0.1}
                className={wide ? "lg:col-span-2" : ""}
              >
                <SpotlightCard
                  className="rounded-xl border border-white/10 bg-white/5 p-6 h-full"
                  spotlightColor="rgba(185, 28, 28, 0.15)"
                >
                  <div className="relative z-10">
                    <Icon className="w-6 h-6 text-accent mb-4" />
                    <h4 className="font-semibold text-lg mb-2 text-white">
                      {f.title}
                    </h4>
                    <p className="text-navy-muted text-sm leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
