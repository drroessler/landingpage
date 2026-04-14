import { useState, useEffect, useRef, type FormEvent } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext";

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
  const { t } = useI18n();

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
      `${t.contact.firstName}: ${form.vorname}`,
      `${t.contact.lastName}: ${form.nachname}`,
      `${t.contact.email}: ${form.email}`,
      `${t.contact.profession}: ${form.beruf}`,
      `${t.contact.company}: ${form.unternehmen}`,
      `${t.contact.country}: ${form.land}`,
      ``,
      `${t.contact.message}:`,
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
        aria-label={t.contact.heading}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors cursor-pointer z-10"
          aria-label={t.contact.close}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header with photo */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-border">
              <img
                src="Roessler.jpeg"
                alt={t.contact.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink leading-snug">
                {t.contact.heading}
                <br />
                {t.contact.name}
              </h2>
            </div>
          </div>

          {sent ? (
            <div className="text-center py-12">
              <p className="text-lg font-semibold text-ink mb-2">
                {t.contact.successTitle}
              </p>
              <p className="text-muted text-sm">
                {t.contact.successText}
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                  setSent(false);
                }}
                className="mt-6 text-sm font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer"
              >
                {t.contact.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Vorname */}
                <FormField
                  label={t.contact.firstName}
                  required
                  value={form.vorname}
                  onChange={(v) => update("vorname", v)}
                  placeholder={t.contact.firstName}
                />

                {/* Nachname */}
                <FormField
                  label={t.contact.lastName}
                  required
                  value={form.nachname}
                  onChange={(v) => update("nachname", v)}
                  placeholder={t.contact.lastName}
                />

                {/* Email */}
                <FormField
                  label={t.contact.email}
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  placeholder={t.contact.email}
                />

                {/* Beruf */}
                <FormField
                  label={t.contact.profession}
                  required
                  value={form.beruf}
                  onChange={(v) => update("beruf", v)}
                  placeholder={t.contact.profession}
                />

                {/* Unternehmen */}
                <FormField
                  label={t.contact.company}
                  required
                  value={form.unternehmen}
                  onChange={(v) => update("unternehmen", v)}
                  placeholder={t.contact.company}
                />

                {/* Land */}
                <div className="flex items-start gap-6">
                  <label className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink pt-3">
                    {t.contact.country}<span className="text-accent ml-0.5">*</span>
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
                      {t.contact.selectPlaceholder}
                    </option>
                    {t.contact.countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nachricht */}
                <div className="flex items-start gap-6">
                  <label className="w-32 shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-ink pt-3">
                    {t.contact.message}<span className="text-accent ml-0.5">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.nachricht}
                    onChange={(e) => update("nachricht", e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="flex-1 border-b border-border bg-transparent py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors resize-y"
                  />
                </div>
              </div>

              {/* Privacy notice */}
              <p className="mt-8 text-xs text-muted leading-relaxed">
                {t.contact.privacyText}{" "}
                <Link
                  to="/datenschutz"
                  className="underline hover:text-ink transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {t.contact.privacyLink}
                </Link>
                .
                <br />
                {t.contact.requiredNote}
              </p>

              {/* Actions */}
              <div className="flex justify-end items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-semibold text-ink uppercase tracking-wide hover:text-muted transition-colors cursor-pointer"
                >
                  {t.contact.reset}
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-surface text-muted hover:bg-accent hover:text-white px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer disabled:opacity-50"
                >
                  {sending ? t.contact.sending : t.contact.send}
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
