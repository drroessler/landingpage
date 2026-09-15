import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ALL_QUESTIONS } from "./data";
import { FORM } from "./copy";
import { evaluate, isComplete, makeReference } from "./evaluate";
import ResultView from "./ResultView";
import type { Answers, Contact, Evaluation } from "./types";
import "./reifecheck.css";

const ENDPOINT = import.meta.env.VITE_REIFECHECK_ENDPOINT ?? "/api/reifecheck";
const STORAGE_KEY = "narratec-reifecheck";

/** Rahmentexte der Sektion — zweisprachig, weil die Landingpage es ist.
 *  Der Fragebogen selbst ist deutsch; darauf weist `note` im englischen Modus hin. */
export interface SectionCopy {
  rubric: ReactNode;
  h2: ReactNode;
  lede: string;
  /** Nur im englischen Modus: Hinweis, dass der Fragebogen deutsch ist. */
  note?: string;
  start: string;
  resume: string;
  /** Beschriftung und Alternativtext der Dokumentvorschau. */
  previewCaption: string;
  previewAlt: string;
}

type Phase = "intro" | "questions" | "contact" | "result";
type MailState = "sent" | "pending" | "failed";

const EMPTY_CONTACT: Contact = { name: "", email: "", organisation: "", role: "", consent: false };

/** Wiederherstellung eines abgebrochenen Durchlaufs. Nur die Antworten, nie die
 *  Kontaktdaten — die sollen nicht ungefragt im Browser liegen bleiben. */
function loadAnswers(): Answers {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

export default function ReifecheckSection({ c }: { c: SectionCopy }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(loadAnswers);
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [mailState, setMailState] = useState<MailState>("pending");

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  const question = ALL_QUESTIONS[index];
  const selected = answers[question.id];
  const total = ALL_QUESTIONS.length;
  const answeredCount = ALL_QUESTIONS.filter((q) => answers[q.id]).length;

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* privater Modus o. Ä. — der Durchlauf funktioniert auch ohne */
    }
  }, [answers]);

  // Beim Schrittwechsel den Anfang der Sektion in den Blick rücken und den Fokus
  // auf die neue Überschrift setzen. Die Sektion steht mitten in einer langen
  // Seite; ohne das stünde die nächste Frage außerhalb des Sichtfelds.
  useEffect(() => {
    if (!started.current) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [phase, index]);

  const begin = () => {
    started.current = true;
    setPhase("questions");
  };

  const goNext = useCallback(() => {
    if (!selected) return;
    if (index + 1 < total) setIndex(index + 1);
    else setPhase("contact");
  }, [selected, index, total]);

  const goBack = () => {
    if (index === 0) setPhase("intro");
    else setIndex(index - 1);
  };

  const validate = (v: Contact) => {
    const e: Partial<Record<keyof Contact, string>> = {};
    if (!v.name.trim()) e.name = "Bitte tragen Sie Ihren Namen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
      e.email = "Bitte tragen Sie eine gültige E-Mail-Adresse ein.";
    if (!v.organisation.trim()) e.organisation = "Bitte tragen Sie Ihre Organisation ein.";
    if (!v.consent) e.consent = "Ohne diese Einwilligung können wir Ihnen die Auswertung nicht zusenden.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(contact);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    if (!isComplete(answers)) return;

    // Die Auswertung entsteht im Browser und wird sofort angezeigt. Der Server
    // rechnet sie aus denselben Antworten noch einmal aus — Zeitstempel und
    // Kennung gehen mit, damit Bildschirm, PDF und Notion übereinstimmen.
    const createdAt = new Date().toISOString();
    const reference = makeReference();
    setEvaluation(evaluate(answers, { createdAt, reference }));
    setMailState("pending");
    setPhase("result");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            ...contact,
            name: contact.name.trim(),
            email: contact.email.trim(),
            website: honeypot,
          },
          answers,
          createdAt,
          reference,
        }),
      });
      setMailState(res.ok ? "sent" : "failed");
    } catch {
      setMailState("failed");
    } finally {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignorieren */
      }
    }
  };

  return (
    <section className="section rc-section" id="reifecheck" ref={sectionRef} data-screen-label="10 Reifecheck">
      <div className="container">
        {phase === "intro" && (
          <div className="rc-intro">
            <div className="zb-rubric-row">
              <span className="rubric no-line">{c.rubric}</span>
              <span className="zb-rule" aria-hidden="true" />
            </div>
            <div className="rc-intro-top">
              <div className="rc-intro-copy">
                <h2 className="display rc-h2-lead" tabIndex={-1} ref={headingRef}>{c.h2}</h2>
                <p className="lede rc-intro-lede">{c.lede}</p>
                {c.note && <p className="micro rc-intro-note">{c.note}</p>}

                {/* Der Aufruf steht neben der Dokumentvorschau statt unter den
                    drei Punkten: er füllt die Fläche, die der kurze Einleitungstext
                    neben dem hohen Vorschaubild frei lässt. */}
                <div className="rc-intro-actions">
                  <button type="button" className="btn btn-primary" onClick={begin} data-umami-event="reifecheck-start">
                    {answeredCount > 0 ? c.resume : c.start}
                    <span className="btn-arrow" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Die Vorschau ist die echte erste Seite, gerendert aus demselben
                  Dokument, das später verschickt wird (npm run preview:build). */}
              <figure className="rc-preview">
                <img
                  src="/reifecheck-auswertung-seite1.jpg"
                  alt={c.previewAlt}
                  width={760}
                  height={1074}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{c.previewCaption}</figcaption>
              </figure>
            </div>

            <ol className="rc-intro-points">
              {FORM.intro.points.map((p, i) => (
                <li key={p.title}>
                  <span className="rc-intro-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {phase === "questions" && (
          <div className="rc-step">
            <div className="rc-progress">
              <div className="rc-progress-label">{FORM.progress(index + 1, total)}</div>
              <div className="rc-progress-track" role="presentation">
                <div className="rc-progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
              </div>
            </div>

            <fieldset className="rc-fieldset">
              <legend className="rc-legend">
                <span className="rc-legend-id">{question.id}</span>
                <span className="rc-legend-axis">{question.axis}</span>
              </legend>
              <h2 className="rc-question" tabIndex={-1} ref={headingRef}>{question.prompt}</h2>

              <div className="rc-options">
                {question.options.map((o) => (
                  <label key={o.key} className={`rc-option${selected === o.key ? " is-selected" : ""}`}>
                    <input type="radio" name={question.id} value={o.key}
                           checked={selected === o.key}
                           onChange={() => setAnswers((a) => ({ ...a, [question.id]: o.key }))} />
                    <span className="rc-option-key" aria-hidden="true">{o.key}</span>
                    <span className="rc-option-label">{o.label}</span>
                  </label>
                ))}
              </div>

              {question.note && <p className="rc-question-note">{question.note}</p>}
            </fieldset>

            <div className="rc-step-actions">
              <button type="button" className="btn btn-ghost" onClick={goBack}>{FORM.back}</button>
              <button type="button" className="btn btn-primary" onClick={goNext} disabled={!selected}>
                {index + 1 === total ? "Zu den Kontaktdaten" : FORM.next}
                <span className="btn-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {phase === "contact" && (
          <div className="rc-contact">
            <span className="rubric">{FORM.contact.rubric}</span>
            <h2 className="rc-h2-lead rc-h2-sm" tabIndex={-1} ref={headingRef}>{FORM.contact.h2}</h2>
            <p className="lede rc-intro-lede">{FORM.contact.lede}</p>

            <form className="rc-form" onSubmit={submit} noValidate>
              <Field id="rc-name" label={FORM.contact.fields.name} value={contact.name} error={errors.name}
                     autoComplete="name" onChange={(v) => setContact({ ...contact, name: v })} />
              <Field id="rc-email" label={FORM.contact.fields.email} value={contact.email} error={errors.email}
                     type="email" autoComplete="email" onChange={(v) => setContact({ ...contact, email: v })} />
              <Field id="rc-organisation" label={FORM.contact.fields.organisation} value={contact.organisation}
                     error={errors.organisation} autoComplete="organization"
                     onChange={(v) => setContact({ ...contact, organisation: v })} />
              <Field id="rc-role" label={FORM.contact.fields.role} value={contact.role}
                     hint={FORM.contact.fields.roleOptional} autoComplete="organization-title"
                     onChange={(v) => setContact({ ...contact, role: v })} />

              {/* Honigtopf — nicht sichtbar, nicht fokussierbar, nicht vorgelesen.
                  Ausgefüllt wird das Feld nur von Formular-Bots. */}
              <div className="rc-honeypot" aria-hidden="true">
                <label htmlFor="rc-website">Website (bitte frei lassen)</label>
                <input id="rc-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                       value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <label className={`rc-consent${errors.consent ? " has-error" : ""}`}>
                <input type="checkbox" checked={contact.consent}
                       onChange={(e) => setContact({ ...contact, consent: e.target.checked })} />
                <span>
                  {FORM.contact.consent}{" "}
                  <Link to="/datenschutz" target="_blank">{FORM.contact.consentLinkLabel}</Link>
                </span>
              </label>
              {errors.consent && <p className="rc-error">{errors.consent}</p>}

              <div className="rc-step-actions">
                <button type="button" className="btn btn-ghost"
                        onClick={() => { setPhase("questions"); setIndex(total - 1); }}>
                  {FORM.back}
                </button>
                <button type="submit" className="btn btn-primary" data-umami-event="reifecheck-submit">
                  {FORM.contact.submitLabel}
                  <span className="btn-arrow" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        )}

        {phase === "result" && evaluation && (
          <>
            <h2 className="rc-sr-only" tabIndex={-1} ref={headingRef}>Ihre Auswertung</h2>
            <ResultView evaluation={evaluation} recipient={contact.email} mailState={mailState} />
          </>
        )}
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, error, hint, type = "text", autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  error?: string; hint?: string; type?: string; autoComplete?: string;
}) {
  return (
    <div className={`rc-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {hint && <span className="rc-field-hint"> ({hint})</span>}
      </label>
      <input id={id} type={type} value={value} autoComplete={autoComplete}
             aria-invalid={error ? true : undefined}
             aria-describedby={error ? `${id}-error` : undefined}
             onChange={(e) => onChange(e.target.value)} />
      {error && <p className="rc-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
