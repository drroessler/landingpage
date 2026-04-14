import LegalLayout from "../components/LegalLayout";
import { useI18n } from "../i18n/LanguageContext";

export default function Datenschutz() {
  const { t } = useI18n();

  return (
    <LegalLayout title={t.datenschutz.title}>
      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.datenschutz.s1}</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s1_general}</h3>
        <p>{t.datenschutz.s1_generalText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s1_data}</h3>
        <p>{t.datenschutz.s1_dataText}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.datenschutz.s2}</h2>
        <p>
          {t.datenschutz.s2_text}{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {t.datenschutz.s2_link}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.datenschutz.s3}</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s3_privacy}</h3>
        <p>{t.datenschutz.s3_privacyText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s3_responsible}</h3>
        <p>{t.datenschutz.s3_responsibleIntro}</p>
        <p className="mt-2">
          Dr. Richard Rößler Management Advisory<br />
          Flensburger Straße 92<br />
          01157 Dresden<br />
          Deutschland<br />
          E-Mail:{" "}
          <a href="mailto:contact@narratec.io" className="text-accent hover:underline">
            contact@narratec.io
          </a>
        </p>
        <p className="mt-4">{t.datenschutz.s3_responsibleNote}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s3_storage}</h3>
        <p>{t.datenschutz.s3_storageText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s3_revocation}</h3>
        <p>{t.datenschutz.s3_revocationText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s3_complaint}</h3>
        <p>{t.datenschutz.s3_complaintText}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.datenschutz.s4}</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s4_cookies}</h3>
        <p>{t.datenschutz.s4_cookiesText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s4_email}</h3>
        <p>{t.datenschutz.s4_emailText}</p>
        <p className="mt-4">{t.datenschutz.s4_emailLegal}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.datenschutz.s5}</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.datenschutz.s5_umami}</h3>
        <p>{t.datenschutz.s5_umamiText}</p>
      </section>
    </LegalLayout>
  );
}
