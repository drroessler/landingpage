import LegalLayout from "../components/LegalLayout";

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Angaben gemäß § 5 TMG</h2>
        <p>
          NarraTec GmbH<br />
          Musterstraße 1<br />
          80000 München<br />
          Deutschland
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Vertreten durch</h2>
        <p>Geschäftsführer: [Name eintragen]</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:contact@narratec.io" className="text-accent hover:underline">
            contact@narratec.io
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Registereintrag</h2>
        <p>
          Eintragung im Handelsregister<br />
          Registergericht: Amtsgericht München<br />
          Registernummer: HRB [Nummer eintragen]
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          DE [Nummer eintragen]
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <p>
          [Name eintragen]<br />
          Musterstraße 1<br />
          80000 München
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Haftungsausschluss</h2>

        <h3 className="font-semibold text-ink mt-6 mb-2">Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
          keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG
          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>

        <h3 className="font-semibold text-ink mt-6 mb-2">Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte
          wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
          keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
          jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>

        <h3 className="font-semibold text-ink mt-6 mb-2">Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
          bzw. Erstellers.
        </p>
      </section>
    </LegalLayout>
  );
}
