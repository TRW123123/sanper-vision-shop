
import { Mail, Phone, MapPin } from "lucide-react";
import { company } from "@/data/company";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sanper</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {company.slogan} <br />
              Premium-Qualität made in Deutschland.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Produkte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/pergola-systeme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pergola-Systeme
                </a>
              </li>
              <li>
                <a
                  href="/wintergarten-systeme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Verglasungssysteme
                </a>
              </li>
              <li>
                <a
                  href="/zip-screen-systeme"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Textile Beschattung
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Unternehmen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/ueber-uns"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Über uns
                </a>
              </li>
              <li>
                <a
                  href="/kontakt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontakt
                </a>
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
                  href={`mailto:${company.contact.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <a
                  href={`tel:${company.contact.phone}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {company.address.street}
                  <br />
                  {company.address.zip} {company.address.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {company.name}. Alle Rechte vorbehalten.
            </p>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li>
                <a
                  href="/impressum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="/agb"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
