import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Layers } from "lucide-react";
import { openContactModal } from "./ContactModal";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { id: "methode", label: "Methode" },
    { id: "framework", label: "Prozess" },
    { id: "szenarien", label: "Cases" },
    { id: "angebot", label: "Angebot" },
    { id: "about", label: "Team" },
  ];

  const handleNav = useCallback(
    (id: string) => {
      setOpen(false);
      if (location.pathname !== "/") {
        // Navigate home first, then scroll after render
        navigate("/");
        setTimeout(() => scrollToId(id), 100);
      } else {
        scrollToId(id);
      }
    },
    [location.pathname, navigate]
  );

  const handleLogoClick = useCallback(() => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-paper/90 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Layers className="w-6 h-6 text-accent" strokeWidth={2.5} />
            <span className="font-display text-xl text-ink tracking-tight">
              NarraTec
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="text-sm font-medium text-muted hover:text-ink transition-colors tracking-wide uppercase"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex">
            <button
              onClick={openContactModal}
              className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Erstgespräch vereinbaren
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-muted hover:text-ink hover:bg-surface rounded transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); openContactModal(); }}
              className="block w-full mt-3 text-center bg-accent text-white px-6 py-2.5 text-sm font-semibold cursor-pointer"
            >
              Erstgespräch vereinbaren
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
