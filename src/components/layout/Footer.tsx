import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sanper</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Intelligente Beschattung und Verglasung für jede Architektur.
              Premium-Qualität made in Deutschland.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Produkte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/produkte/pergola-systeme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pergola-Systeme
                </Link>
              </li>
              <li>
                <Link
                  to="/produkte/verglasungssysteme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Verglasungssysteme
                </Link>
              </li>
              <li>
                <Link
                  to="/produkte/textile-beschattung"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Textile Beschattung
                </Link>
              </li>
              <li>
                <Link
                  to="/produkte/transparente-schutzsysteme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Transparente Schutzsysteme
                </Link>
              </li>
              <li>
                <Link
                  to="/produkte/innenraum-akustik"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Innenraum & Akustik
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Unternehmen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/ueber-uns"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  to="/referenzen"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Referenzen
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <a
                  href="mailto:info@sanper.de"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@sanper.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <a
                  href="tel:+4900000000"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  +49 (0) 000 000000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sanper Gölgelendirme Systeme. Alle Rechte vorbehalten.
            </p>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li>
                <Link
                  to="/impressum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  to="/datenschutz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  to="/agb"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
