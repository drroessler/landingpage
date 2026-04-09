import AnimatedContent from "../react-bits/AnimatedContent";
import { Check, CheckCircle } from "lucide-react";
import { openContactModal } from "../ContactModal";

const tiers = [
  {
    name: "Workshop",
    desc: "Methodische Einführung für Teams mit ersten praktischen Anwendungen",
    features: [
      "Methoden-Training mit Fallbeispielen",
      "Templates & Tool-Setup",
      "Review-Begleitung",
    ],
    highlight: false,
    badge: null,
    cta: "Anfragen",
    decisionText:
      "Wenn Sie die Methode kennenlernen und intern erproben wollen – ohne langfristige Verpflichtung. Ideal für erste Pilotvorhaben mit überschaubarer Stakeholder-Anzahl.",
  },
  {
    name: "Advisory",
    desc: "Vollständige Begleitung strategischer Initiativen mit hoher Komplexität",
    features: [
      "Training Ihrer Methoden-Experten",
      "Durchgängige Prozessbegleitung",
      "Initialierung der Umsetzungs-Roadmap",
    ],
    highlight: true,
    badge: "Empfohlen für Erstprojekte",
    cta: "Anfragen",
    decisionText:
      "Wenn ein konkretes, komplexes Vorhaben ansteht und Sie gleichzeitig die Methode dauerhaft im Unternehmen verankern wollen. Die Begleitung endet mit einem handlungsfähigen internen Team.",
  },
  {
    name: "Transformation",
    desc: "Verankerung der evidenzbasierten Kultur im Unternehmen.",
    features: [
      "Organisationsanpassung",
      "Begleitendes Finanzierungskonzept",
      "Langfristige Supervision",
    ],
    highlight: false,
    badge: null,
    cta: "Anfragen",
    decisionText:
      "Wenn evidenzbasierte Entscheidungskultur unternehmensweit etabliert werden soll – über mehrere Bereiche, Hierarchiestufen und einen längeren Zeithorizont hinweg.",
  },
];

export default function AngebotSection() {
  return (
    <section id="angebot" className="py-20 lg:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Angebot
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Skalierbare Formate für Ihren Bedarf
            </h2>
            <p className="mt-4 text-ink-light">
              Von der methodischen Einführung bis zur unternehmensweiten
              Transformation – wir begleiten Sie auf jedem Reifegrad
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((t, i) => (
            <AnimatedContent key={t.name} delay={i * 0.15}>
              <div
                className={`rounded-xl p-8 relative h-full flex flex-col ${
                  t.highlight
                    ? "border-2 border-accent bg-white shadow-xl md:-translate-y-4"
                    : "border border-border bg-white hover:border-accent/30 transition"
                }`}
              >
                {t.badge && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase tracking-wider">
                    {t.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-ink">{t.name}</h3>
                <p className="text-muted text-sm mt-2 mb-6">{t.desc}</p>
                <ul className="space-y-4 mb-8 text-ink-light text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex">
                      <Check
                        className={`w-4 h-4 mt-0.5 mr-3 shrink-0 ${
                          t.highlight ? "text-accent" : "text-emerald-500"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openContactModal}
                  className={`block w-full text-center py-2.5 text-sm font-semibold transition mt-auto cursor-pointer ${
                    t.highlight
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "border border-border text-ink hover:border-ink/30 hover:bg-surface"
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* Decision Matrix */}
        <AnimatedContent>
          <div className="mt-10 max-w-6xl mx-auto border border-border rounded-xl overflow-hidden">
            <div className="bg-surface px-6 py-3 border-b border-border">
              <p className="text-xs font-bold text-muted uppercase tracking-[0.15em]">
                Welches Format passt zu Ihnen?
              </p>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className={`px-6 py-5 flex gap-3 ${
                    t.highlight ? "bg-accent-light/50" : ""
                  }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      t.highlight ? "text-accent" : "text-border"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-ink text-sm mb-1">
                      {t.name}
                    </p>
                    <p className="text-muted text-sm">{t.decisionText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
