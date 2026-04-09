import { useState, useEffect, useRef, type FormEvent } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const countries = [
  "Deutschland",
  "Österreich",
  "Schweiz",
  "Belgien",
  "Dänemark",
  "Finnland",
  "Frankreich",
  "Griechenland",
  "Irland",
  "Italien",
  "Luxemburg",
  "Niederlande",
  "Norwegen",
  "Polen",
  "Portugal",
  "Schweden",
  "Spanien",
  "Tschechien",
  "Ungarn",
  "Vereinigtes Königreich",
  "USA",
  "Kanada",
  "Andere",
];

const initialForm = {
  vorname: "",
  nachname: "",
  email: "",
  beruf: "",
  unternehmen: "",
  land: "",
  nachricht: "",
};

export function openContactModal() {
  window.dispatchEvent(new CustomEvent("open-contact-modal"));
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSent(false);
    };
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function reset() {
    setForm(initialForm);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);

    const body = [
      `Vorname: ${form.vorname}`,
      `Nachname: ${form.nachname}`,
      `Email: ${form.email}`,
      `Beruf: ${form.beruf}`,
      `Unternehmen: ${form.unternehmen}`,
      `Land: ${form.land}`,
      ``,
      `Nachricht:`,
      form.nachricht,
    ].join("\n");

    const subject = `Kontaktanfrage von ${form.vorname} ${form.nachname}`;
    const mailto = `mailto:contact@narratec.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    // Brief delay so the user sees the transition
    await new Promise((r) => setTimeout(r, 500));
    setSending(false);
    setSent(true);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        className="relative bg-white w-full max-w-2xl mx-4 mt-12 mb-12 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl shadow-2xl animate-[reveal-in_0.3s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-label="Kontaktformular"
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors cursor-pointer z-10"
          aria-label="Schließen"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header with photo */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-border">
              <img
                src="Roessler.jpeg"
                alt="Dr. Richard Rößler"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink leading-snug">
                Senden Sie eine Nachricht an
                <br />
                Dr. Richard Rößler
              </h2>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-12">
              <p className="text-lg font-semibold text-ink mb-2">
                Ihr E-Mail-Programm wurde geöffnet.
              </p>
              <p className="text-muted text-sm">
                Bitte senden Sie die vorausgefüllte E-Mail ab. Wir melden uns schnellstmöglich bei Ihnen.
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                  setSent(false);
                }}
                className="mt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer"
              >
                Schließen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Vorname */}
                <FormField
                  label="Vorname"
                  required
                  value={form.vorname}
                  onChange={(v) => update("vorname", v)}
                  placeholder="Vorname"
                />

                {/* Nachname */}
                <FormField
                  label="Nachname"
                  required
                  value={form.nachname}
                  onChange={(v) => update("nachname", v)}
                  placeholder="Nachname"
                />

                {/* Email */}
                <FormField
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder="Email"
                />

                {/* Beruf */}
                <FormField
                  label="Beruf"
                  required
                  value={form.beruf}
                  onChange={(v) => update("beruf", v)}
                  placeholder="Beruf"
                />

                {/* Unternehmen */}
                <FormField
                  label="Unternehmen"
                  required
                  value={form.unternehmen}
                  onChange={(v) => update("unternehmen", v)}
                  placeholder="Unternehmen"
                />

                {/* Land */}
                <div className="flex items-start gap-6">
                  <label className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink pt-3">
                    Land<span className="text-accent ml-0.5">*</span>
                  </label>
                  <select
                    required
                    value={form.land}
                    onChange={(e) => update("land", e.target.value)}
                    className={`flex-1 border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-ink transition-colors appearance-none cursor-pointer ${
                      form.land ? "text-ink" : "text-muted"
                    }`}
                  >
                    <option value="" disabled>
                      Bitte auswählen
                    </option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nachricht */}
                <div className="flex items-start gap-6">
                  <label className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink pt-3">
                    Nachricht<span className="text-accent ml-0.5">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.nachricht}
                    onChange={(e) => update("nachricht", e.target.value)}
                    placeholder="Ihre Nachricht hier …"
                    className="flex-1 border-b border-border bg-transparent py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Privacy notice */}
              <p className="mt-8 text-xs text-muted leading-relaxed">
                Mit dem Absenden des Kontaktformulars erklären Sie sich damit
                einverstanden, dass Ihre Daten zur Bearbeitung Ihres Anliegens
                verwendet werden. Weitere Informationen und Widerrufshinweise
                finden Sie in unserer{" "}
                <Link
                  to="/datenschutz"
                  className="underline hover:text-ink transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Datenschutzerklärung
                </Link>
                .
                <br />
                Mit einem Sternchen (*) markierte Felder sind Pflichtangaben.
              </p>

              {/* Actions */}
              <div className="flex justify-end items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-semibold text-ink uppercase tracking-wide hover:text-muted transition-colors cursor-pointer"
                >
                  Zurücksetzen
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-surface text-muted hover:bg-accent hover:text-white px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer disabled:opacity-50"
                >
                  {sending ? "Wird gesendet…" : "Senden"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-start gap-6">
      <label className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink pt-3">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-b border-border bg-transparent py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
