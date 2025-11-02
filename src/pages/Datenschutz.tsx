import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 lg:py-32">
          <div className="container max-w-3xl">
            <h1 className="mb-8">Datenschutzerklärung</h1>

            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Allgemeine Hinweise
                </h3>
                <p className="leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
                  Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                  Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
                  identifiziert werden können.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Datenerfassung auf dieser Website
                </h3>
                <p className="leading-relaxed mb-3">
                  <strong className="text-foreground">
                    Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                  </strong>
                </p>
                <p className="leading-relaxed mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den
                  Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
                  Website entnehmen.
                </p>
                <p className="leading-relaxed mb-3">
                  <strong className="text-foreground">Wie erfassen wir Ihre Daten?</strong>
                </p>
                <p className="leading-relaxed mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                  mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein
                  Kontaktformular eingeben.
                </p>
                <p className="leading-relaxed">
                  Andere Daten werden automatisch beim Besuch der Website durch unsere
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z. B.
                  Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Hosting
                </h2>
                <p className="leading-relaxed">
                  Wir hosten die Inhalte unserer Website bei folgendem Anbieter: [Provider
                  Name und Details hier einfügen]
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Datenschutz
                </h3>
                <p className="leading-relaxed">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
                  sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
                  entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklärung.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Datenerfassung auf dieser Website
                </h2>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Kontaktformular
                </h3>
                <p className="leading-relaxed">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
                  Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                  Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                  Anschlussfragen bei uns gespeichert.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Ihre Rechte
                </h2>
                <p className="leading-relaxed">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
                  Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Zudem
                  haben Sie ein Widerspruchsrecht gegen die Verarbeitung sowie ein Recht
                  auf Datenübertragbarkeit.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm">
                  Stand: {new Date().toLocaleDateString("de-DE")}
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

export default Datenschutz;
