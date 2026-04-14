import LegalLayout from "../components/LegalLayout";
import { useI18n } from "../i18n/LanguageContext";

export default function AGB() {
  const { t } = useI18n();

  return (
    <LegalLayout title={t.agb.title}>
      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s1}</h2>
        <p>{t.agb.s1_p1}</p>
        <p className="mt-4">{t.agb.s1_p2}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s2}</h2>
        <p>{t.agb.s2_intro}</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          {t.agb.s2_items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4">{t.agb.s2_closing}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s3}</h2>
        <p>{t.agb.s3_text}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s4}</h2>
        <p>{t.agb.s4_p1}</p>
        <p className="mt-4">{t.agb.s4_p2}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s5}</h2>
        <p>{t.agb.s5_text}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s6}</h2>
        <p>{t.agb.s6_text}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s7}</h2>
        <p>{t.agb.s7_p1}</p>
        <p className="mt-4">{t.agb.s7_p2}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s8}</h2>
        <p>{t.agb.s8_p1}</p>
        <p className="mt-4">{t.agb.s8_p2}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s9}</h2>
        <p>{t.agb.s9_p1}</p>
        <p className="mt-4">{t.agb.s9_p2}</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">{t.agb.s10}</h2>
        <p>{t.agb.s10_p1}</p>
        <p className="mt-4">{t.agb.s10_p2}</p>
        <p className="mt-6 text-muted text-sm">{t.agb.date}</p>
      </section>
    </LegalLayout>
  );
}
