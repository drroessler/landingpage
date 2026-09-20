import { docFor, formFor } from "./copy";
import { formatDate } from "./evaluate";
import { EntscheidungsreifeChart, Stufenleiter, UmsetzungsreifeChart } from "./RadarChart";
import type { EvaluatedAnswer, Evaluation } from "./types";

const BOOK_URL = "https://cal.meetergo.com/richard-rossler/narratec";
const MAIL = "contact@narratec.io";

function AnswerItem({ a }: { a: EvaluatedAnswer }) {
  return (
    <article className="rc-item">
      <div className="rc-item-side">
        <div className="rc-item-id">{a.id}</div>
        <div className="rc-item-axis">{a.axis}</div>
        {a.stufe !== undefined && (
          <>
            <div className="rc-item-bars" aria-hidden="true">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`rc-bar${s <= a.stufe! ? " is-on" : ""}`} />
              ))}
            </div>
            <div className={`rc-item-stufe${a.stufe === 1 ? " is-low" : ""}`}>Stufe {a.stufe} / 3</div>
          </>
        )}
      </div>
      <div className="rc-item-main">
        <h3 className="rc-item-prompt">{a.prompt}</h3>
        <p className="rc-item-answer">
          <span className="rc-item-answer-label">Ihre Antwort</span>
          {a.optionLabel}
        </p>
        <p className="rc-item-statement">{a.statement}</p>
      </div>
    </article>
  );
}

export default function ResultView({
  evaluation,
  recipient,
  mailState,
}: {
  evaluation: Evaluation;
  recipient?: string;
  /** Rückmeldung über den Versand — die Auswertung steht unabhängig davon. */
  mailState?: "sent" | "pending" | "failed";
}) {
  const { context, reife, stufen } = evaluation;
  // Das Ergebnis auf der Seite spricht dieselbe Sprache wie das versendete PDF.
  const lang = evaluation.lang;
  const DOC = docFor(lang);
  const FORM = formFor(lang);

  return (
    <div className="rc-doc">
      <header className="rc-doc-head">
        <h1 className="rc-doc-title">{DOC.title}</h1>
        <p className="rc-doc-subtitle">{DOC.subtitle}</p>
        <div className="rc-doc-meta">
          <span>Auswertung vom {formatDate(evaluation.createdAt)}</span>
          <span>{evaluation.reference}</span>
        </div>
      </header>

      {mailState && (
        <div className={`rc-mail-note is-${mailState}`} role="status">
          {mailState === "sent" && recipient && (
            <>
              {FORM.mailState.sentBefore}<strong>{recipient}</strong>{FORM.mailState.sentAfter}
            </>
          )}
          {mailState === "pending" && <>{FORM.mailState.pending}</>}
          {mailState === "failed" && (
            <>
              {FORM.mailState.failedBefore}
              <a href={`mailto:${MAIL}`}>{MAIL}</a>{FORM.mailState.failedAfter}
            </>
          )}
        </div>
      )}

      <section className="rc-vorspann">
        <h2 className="rc-h2">{DOC.vorspann.h2}</h2>
        <div className="rc-two-col">
          <div>
            {DOC.vorspann.left.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            {DOC.vorspann.right.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <p className="rc-vorspann-closing">{DOC.vorspann.closing}</p>
      </section>

      <section className="rc-figure" aria-labelledby="rc-diagram1-title">
        <div className="rc-figure-head">
          <div>
            <div className="rubric">{DOC.diagram1.rubric}</div>
            <div className="rc-figure-title" id="rc-diagram1-title">
              {DOC.diagram1.title}
            </div>
          </div>
          <div className="rc-figure-meta">{DOC.diagram1.meta}</div>
        </div>
        <div className="rc-figure-body">
          <div className="rc-figure-net">
            <EntscheidungsreifeChart stufen={stufen} lang={lang} />
          </div>
          <Stufenleiter stufen={stufen} lang={lang} />
        </div>
      </section>

      <section className="rc-answers">
        <div className="rubric">{DOC.contextSection.rubric}</div>
        <h2 className="rc-h2">{DOC.contextSection.h2}</h2>
        <p className="rc-lede">{DOC.contextSection.lede}</p>
        <div className="rc-item-list">
          {context.map((a) => (
            <AnswerItem key={a.id} a={a} />
          ))}
        </div>
      </section>

      <section className="rc-answers">
        <div className="rubric">{DOC.reifeSection.rubric}</div>
        <h2 className="rc-h2">{DOC.reifeSection.h2}</h2>
        <p className="rc-lede">{DOC.reifeSection.lede}</p>
        <div className="rc-item-list">
          {reife.map((a) => (
            <AnswerItem key={a.id} a={a} />
          ))}
        </div>
      </section>

      <section className="rc-block rc-block-2">
        <div className="rubric">{DOC.diagram2.rubric}</div>
        <h2 className="rc-h2">{DOC.diagram2.h2}</h2>
        <div className="rc-two-col">
          <p>{DOC.diagram2.left}</p>
          <p>{DOC.diagram2.right}</p>
        </div>
        <div className="rc-block-2-body">
          <div className="rc-figure-net rc-figure-net-2">
            <UmsetzungsreifeChart lang={lang} />
          </div>
          <p className="rc-pull">{DOC.diagram2.pull}</p>
        </div>
      </section>

      <section className="rc-block rc-block-next">
        <div className="rubric on-ink">{DOC.uebergang.rubric}</div>
        <h2 className="rc-h2 on-ink">{DOC.uebergang.h2}</h2>
        <div className="rc-two-col">
          <p>{DOC.uebergang.left}</p>
          <p>{DOC.uebergang.right}</p>
        </div>
        <div className="rc-next-actions">
          <a
            className="btn btn-primary"
            href={`${BOOK_URL}?src=reifecheck`}
            data-meetergo-link={`${BOOK_URL}?src=reifecheck`}
            data-umami-event="reifecheck-book"
          >
            {DOC.uebergang.ctaLabel} <span className="btn-arrow" aria-hidden="true" />
          </a>
          <span className="rc-next-micro">
            {DOC.uebergang.ctaMicro}{" "}
            <a href={`mailto:${MAIL}`} data-umami-event="reifecheck-mail">
              {MAIL}
            </a>
          </span>
        </div>
      </section>

      <section className="rc-methode">
        <div className="rubric">{DOC.methode.rubric}</div>
        <h2 className="rc-h2 rc-h2-sm">{DOC.methode.h2}</h2>
        <div className="rc-two-col">
          <p>{DOC.methode.left}</p>
          <p>{DOC.methode.right}</p>
        </div>
        <p className="rc-imprint">{DOC.methode.imprint}</p>
      </section>
    </div>
  );
}
