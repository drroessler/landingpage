import AnimatedContent from "../react-bits/AnimatedContent";
import { useI18n } from "../../i18n/LanguageContext";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const teamPhotos = ["Roessler.jpeg", "Wieland.jpeg"];
const teamLinkedIn = [
  "https://www.linkedin.com/in/dr-richard-rößler-b786492a9/",
  "https://www.linkedin.com/in/praxisprofwieland/",
];

export default function TeamSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t.team.label}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-ink mt-3">
              {t.team.heading}
            </h2>
            <p className="mt-4 text-ink-light">
              {t.team.desc}
            </p>
          </div>
        </AnimatedContent>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.team.members.map((member, i) => (
            <AnimatedContent key={member.name} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow h-full">
                <div className="w-36 h-36 mb-6 bg-surface rounded-full overflow-hidden border-4 border-paper shadow-lg">
                  <img
                    src={teamPhotos[i]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-display text-ink mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-ink-light leading-relaxed mb-6 text-sm">
                  {member.bio}
                </p>
                <div className="flex gap-4 mt-auto">
                  <a
                    href={teamLinkedIn[i]}
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
