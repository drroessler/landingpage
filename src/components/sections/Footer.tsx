import { Layers, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { openContactModal } from "../ContactModal";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-navy text-navy-muted py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <Layers className="w-6 h-6 text-white" strokeWidth={2.5} />
              <span className="font-display text-xl text-white">NarraTec</span>
            </div>
            <p className="mb-6 max-w-md leading-relaxed">
              Lassen Sie uns darüber sprechen, wie wir Ihre nächste
              Herausforderung strukturiert lösen.
            </p>
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-accent transition-colors cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              contact@narratec.io
            </button>
          </div>
          <div className="md:text-right">
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/impressum" className="hover:text-white transition-colors text-sm">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="hover:text-white transition-colors text-sm">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/agb" className="hover:text-white transition-colors text-sm">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} NarraTec. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
