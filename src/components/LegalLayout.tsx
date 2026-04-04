import { Layers, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Minimal Header */}
      <nav className="border-b border-border bg-paper/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Layers className="w-6 h-6 text-accent" strokeWidth={2.5} />
            <span className="font-display text-xl text-ink tracking-tight">
              NarraTec
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight mb-12">
          {title}
        </h1>
        <div className="prose-legal space-y-8 text-ink-light leading-relaxed">
          {children}
        </div>
      </article>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <span>&copy; {new Date().getFullYear()} NarraTec. Alle Rechte vorbehalten.</span>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-ink transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-ink transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-ink transition-colors">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
