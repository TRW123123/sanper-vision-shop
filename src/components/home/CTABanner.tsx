import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { ArrowRight, Phone } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-section bg-gradient-to-br from-accent to-accent-2 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-white">Bereit für Ihr Projekt?</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Lassen Sie sich von unseren Experten beraten. Wir entwickeln die perfekte
            Beschattungs- oder Verglasungslösung für Ihre Anforderungen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              asChild
              className="bg-white text-accent hover:bg-white/90 hover-scale"
            >
              <a href="/kontakt?type=beratung">
                Beratung anfragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-accent hover-scale"
            >
              <a href={`tel:${company.contact.phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 h-4 w-4" />
                {company.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
