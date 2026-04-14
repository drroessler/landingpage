import LegalLayout from "../components/LegalLayout";
import { useI18n } from "../i18n/LanguageContext";

export default function Impressum() {
  const { t } = useI18n();

  return (
    <LegalLayout title={t.impressum.title}>
      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.tmg}</h2>
        <p>
          {t.impressum.company}<br />
          {t.impressum.street}<br />
          {t.impressum.city}<br />
          {t.impressum.country}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.owner}</h2>
        <p>{t.impressum.ownerName}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.contact}</h2>
        <p>
          {t.impressum.emailLabel}{" "}
          <a href="mailto:contact@narratec.io" className="text-accent hover:underline">
            {t.impressum.emailValue}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.register}</h2>
        <p>{t.impressum.registerText}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.vatTitle}</h2>
        <p>
          {t.impressum.vatDesc}<br />
          {t.impressum.vatId}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.responsible}</h2>
        <p>
          {t.impressum.ownerName}<br />
          {t.impressum.street}<br />
          {t.impressum.city}<br />
          {t.impressum.country}
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.impressum.disclaimer}</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.impressum.contentLiability}</h3>
        <p>{t.impressum.contentLiabilityText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.impressum.linkLiability}</h3>
        <p>{t.impressum.linkLiabilityText}</p>

        <h3 className="font-semibold text-ink mt-6 mb-2">{t.impressum.copyright_}</h3>
        <p>{t.impressum.copyrightText}</p>
      </section>
    </LegalLayout>
  );
}
