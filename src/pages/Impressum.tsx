import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 lg:py-32">
          <div className="container max-w-3xl">
            <h1 className="mb-8">Impressum</h1>

            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <p>
                  Sanper Gölgelendirme Systeme GmbH
                  <br />
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Vertreten durch
                </h2>
                <p>Geschäftsführer: Max Mustermann</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Kontakt
                </h2>
                <p>
                  Telefon: +49 (0) 000 000000
                  <br />
                  E-Mail: info@sanper.de
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Registereintrag
                </h2>
                <p>
                  Eintragung im Handelsregister.
                  <br />
                  Registergericht: Amtsgericht Musterstadt
                  <br />
                  Registernummer: HRB 12345
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
                  <br />
                  DE123456789
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p>
                  Max Mustermann
                  <br />
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  EU-Streitschlichtung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  .
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                  vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
