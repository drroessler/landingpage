/** Versand der Auswertung über das bestehende Postfach (SMTP).
 *
 *  Keine zusätzlichen Auftragsverarbeiter: die Mail geht denselben Weg wie
 *  jede andere Mail von contact@narratec.io.
 */

import nodemailer from "nodemailer";
import { formatDate } from "../../src/reifecheck/evaluate.js";
import type { Contact, Evaluation } from "../../src/reifecheck/types.js";
import { escapeHtml } from "./document.js";

const FROM_NAME = "NarraTec";

export interface MailEnv {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  /** Blindkopie an das eigene Postfach, damit die Anfrage auch dort auftaucht. */
  bcc?: string;
}

export function readMailEnv(): MailEnv {
  const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"].filter(
    (k) => !process.env[k],
  );
  if (missing.length > 0) {
    throw new Error(`SMTP nicht konfiguriert, es fehlen: ${missing.join(", ")}`);
  }
  return {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT ?? 465),
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
    from: process.env.SMTP_FROM!,
    bcc: process.env.SMTP_BCC || undefined,
  };
}

function firstName(full: string): string {
  const parts = full.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(0, -1).join(" ") : full.trim();
}

/** Die Mail selbst bleibt schlicht. Das Dokument ist der Anhang, nicht die Mail:
 *  die Mail kündigt an, die Auswertung steht im PDF. */
function bodyText(contact: Contact, evaluation: Evaluation): string {
  return `Guten Tag ${firstName(contact.name)},

anbei Ihre Auswertung des Reifechecks vom ${formatDate(evaluation.createdAt)}.

Sie finden darin das Netzdiagramm Ihrer Entscheidungsreife und zu jeder Ihrer
neun Antworten eine kurze Einordnung.

Die Auswertung bewertet Ihr Vorhaben nicht und vergibt keine Punktzahl. Sie
zeigt, wo Ihre Vorbereitung heute steht und welche Fragen sich vor der nächsten
Festlegung stellen könnten.

Wenn Sie an einem der offenen Punkte weiterarbeiten wollen, sprechen wir darüber.
Ein Erstgespräch dauert 30 Minuten:
https://cal.meetergo.com/richard-rossler/narratec?src=reifecheck-mail

Mit freundlichen Grüßen
Dr. Richard Rößler

--
NarraTec — eine Marke der Dr. Richard Rößler Management Advisory
Flensburger Straße 92, 01157 Dresden
contact@narratec.io

Kennung dieser Auswertung: ${evaluation.reference}
Sie erhalten diese Mail, weil Sie den Reifecheck auf narratec.io ausgefüllt und
dem Versand zugestimmt haben. Ihre Einwilligung können Sie jederzeit formlos
widerrufen, eine Mail an contact@narratec.io genügt.`;
}

function bodyHtml(contact: Contact, evaluation: Evaluation): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#1c1a17;max-width:60ch">
${bodyText(contact, evaluation)
  .split("\n\n")
  .map((p) => `<p style="margin:0 0 14px">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
  .join("")}
</div>`;
}

export async function sendEvaluation(
  env: MailEnv,
  contact: Contact,
  evaluation: Evaluation,
  pdf: Buffer,
  filename: string,
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: env.host,
    port: env.port,
    secure: env.port === 465,
    auth: { user: env.user, pass: env.pass },
  });

  await transporter.sendMail({
    from: `${FROM_NAME} <${env.from}>`,
    to: `${contact.name} <${contact.email}>`,
    bcc: env.bcc,
    replyTo: env.from,
    subject: `Ihre Reifecheck-Auswertung (${evaluation.reference})`,
    text: bodyText(contact, evaluation),
    html: bodyHtml(contact, evaluation),
    attachments: [{ filename, content: pdf, contentType: "application/pdf" }],
  });
}
