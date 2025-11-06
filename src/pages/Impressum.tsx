import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Impressum = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sanper Gölgelendirme Systeme GmbH",
    "url": "https://www.sanper.de",
    "logo": "https://www.sanper.de/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[PLATZHALTER: Musterstraße 123]",
      "postalCode": "[PLATZHALTER: 12345]",
      "addressLocality": "[PLATZHALTER: Musterstadt]",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "[PLATZHALTER: +49 (0) 123 456789]",
      "email": "[PLATZHALTER: info@sanper.de]",
      "contactType": "customer service"
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Impressum - Sanper Beschattungssysteme | Rechtliche Informationen</title>
        <meta 
          name="description" 
          content="Impressum der Sanper Gölgelendirme Systeme GmbH - Ihr Spezialist für Beschattungssysteme, Pergolen und Glassysteme. Rechtliche Angaben gemäß § 5 TMG." 
        />
        <link rel="canonical" href="https://www.sanper.de/impressum" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Impressum - Sanper Beschattungssysteme" />
        <meta property="og:description" content="Rechtliche Informationen und Kontaktdaten der Sanper Gölgelendirme Systeme GmbH." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sanper.de/impressum" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Impressum - Sanper Beschattungssysteme" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main>
        <article className="py-12 lg:py-20">
          <div className="container max-w-3xl">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Impressum</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mb-6 text-4xl font-bold">Impressum</h1>

            <p className="mb-12 text-lg text-muted-foreground leading-relaxed">
              Sanper Gölgelendirme Systeme GmbH ist Ihr Spezialist für hochwertige 
              Beschattungssysteme, Bioklimatische Pergolen, Zip-Markisen und Glassysteme. 
              Transparenz und rechtliche Klarheit sind uns wichtig.
            </p>

            <div className="space-y-12">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <address className="not-italic">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Sanper Gölgelendirme Systeme GmbH</strong>
                    <br />
                    [PLATZHALTER: Musterstraße 123]
                    <br />
                    [PLATZHALTER: 12345 Musterstadt]
                    <br />
                    Deutschland
                  </p>
                </address>
              </section>

              {/* Vertreten durch */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Vertreten durch
                </h2>
                <p className="leading-relaxed">
                  Geschäftsführer: [PLATZHALTER: Max Mustermann]
                </p>
              </section>

              {/* Kontakt */}
              <section className="bg-muted/50 p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Kontakt
                </h2>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Telefon:</strong> [PLATZHALTER: +49 (0) 123 456789]
                  <br />
                  <strong className="text-foreground">E-Mail:</strong>{" "}
                  <a 
                    href="mailto:[PLATZHALTER: info@sanper.de]" 
                    className="text-accent hover:underline"
                  >
                    [PLATZHALTER: info@sanper.de]
                  </a>
                </p>
              </section>

              {/* Registereintrag */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Registereintrag
                </h2>
                <p className="leading-relaxed">
                  Eintragung im Handelsregister
                  <br />
                  <strong className="text-foreground">Registergericht:</strong> [PLATZHALTER: Amtsgericht München]
                  <br />
                  <strong className="text-foreground">Registernummer:</strong> [PLATZHALTER: HRB 12345]
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Umsatzsteuer-ID
                </h2>
                <p className="leading-relaxed">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                  <br />
                  <strong className="text-foreground">[PLATZHALTER: DE123456789]</strong>
                </p>
              </section>

              {/* Verantwortlich für den Inhalt */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <address className="not-italic leading-relaxed">
                  [PLATZHALTER: Max Mustermann]
                  <br />
                  [PLATZHALTER: Musterstraße 123]
                  <br />
                  [PLATZHALTER: 12345 Musterstadt]
                </address>
              </section>

              {/* EU-Streitschlichtung */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  EU-Streitschlichtung
                </h2>
                <p className="leading-relaxed">
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
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              {/* Verbraucherstreitbeilegung */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p className="leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                  vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Haftungsausschluss */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Haftung für Inhalte
                </h2>
                <p className="leading-relaxed mb-4">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf 
                  diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 
                  TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder 
                  gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, 
                  die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="leading-relaxed">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach 
                  den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung 
                  ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung 
                  möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese 
                  Inhalte umgehend entfernen.
                </p>
              </section>

              {/* Haftung für Links */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Haftung für Links
                </h2>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden 
                  zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Urheberrecht
                </h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
                  Gebrauch gestattet.
                </p>
              </section>

              {/* Bildnachweise */}
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Bildnachweise
                </h2>
                <p className="leading-relaxed">
                  [PLATZHALTER: Bildquellen und Urheberrechte für verwendete Fotos und Grafiken]
                </p>
              </section>

              {/* Link zur Datenschutzerklärung */}
              <section className="pt-8 border-t border-border">
                <p className="leading-relaxed">
                  Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in unserer{" "}
                  <Link to="/datenschutz" className="text-accent hover:underline font-medium">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
