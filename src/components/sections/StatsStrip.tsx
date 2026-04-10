import AnimatedContent from "../react-bits/AnimatedContent";

const stats = [
  { value: "2", label: "Wissenschaftliche Publikationen", sub: "HMD Praxis der Wirtschaftsinformatik" },
  { value: "5", label: "Prozessschritte", sub: "Vom diffusen Problem zur klaren Umsetzung" },
  { value: "100%", label: "Interne Befähigung", sub: "Ihr Team übernimmt – wir begleiten" },
];

export default function StatsStrip() {
  return (
    <section className="bg-navy py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,28,28,0.08),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((s, i) => (
            <AnimatedContent key={s.label} delay={i * 0.15}>
              <div className="text-center px-8">
                <span className="font-display text-5xl lg:text-6xl text-white block leading-none">
                  {s.value}
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
