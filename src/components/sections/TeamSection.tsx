import AnimatedContent from "../react-bits/AnimatedContent";
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const team = [
  {
    name: "Dr. Richard Rößler",
    role: "Entwickler der NarraTec-Methodik",
    photo: "Roessler.jpeg",
    bio: "Ich habe die Methodik strukturierter Narrative als Instrument evidenzbasierter Entscheidungsfindung entwickelt, in komplexen Unternehmensvorhaben als Narrative Owner und Methodenexperte erprobt und in wissenschaftlichen Beiträgen publiziert. Mit über 10 Jahren Erfahrung in der Steuerung komplexer IT-Vorhaben liegt meine Arbeit an der Schnittstelle von Managementforschung und konkreter Projektpraxis – mit dem Ziel, Entscheidungsqualität systematisch messbar zu machen.",
    linkedin: "https://www.linkedin.com/in/dr-richard-rößler-b786492a9/",
  },
  {
    name: "Prof. Dr. Uwe Wieland",
    role: "Experte für digitale Transformation & Prozessoptimierung",
    photo: "Wieland.jpeg",
    bio: "Ich verbinde langjährige Führungserfahrung in der digitalen Transformation mit einer Leidenschaft für klare Strukturen in komplexen Vorhaben. Als Mitgründer von NarraTec bringe ich die Perspektive der Entscheidungsverantwortlichen ein – und weiß, was es bedeutet, mit unzureichenden Informationen weitreichende Entscheidungen treffen zu müssen.",
    linkedin: "https://www.linkedin.com/in/praxisprofwieland/",
  },
];

export default function TeamSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Team
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              Wer wir sind
            </h2>
            <p className="mt-4 text-ink-light">
              Experten für faktengestützte und wirksame Entscheidungen.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((t, i) => (
            <AnimatedContent key={t.name} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow h-full">
                <div className="w-36 h-36 mb-6 bg-surface rounded-full overflow-hidden border-4 border-paper shadow-lg">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-display text-ink mb-1">
                  {t.name}
                </h3>
                <p className="text-accent font-medium text-sm mb-4">
                  {t.role}
                </p>
                <p className="text-ink-light leading-relaxed mb-6 text-sm">
                  {t.bio}
                </p>
                <div className="flex gap-4 mt-auto">
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
