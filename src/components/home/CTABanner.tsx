import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-section bg-gradient-to-br from-accent to-accent-2 text-white">
      <div className="container">
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
              <Link to="/kontakt?type=beratung">
                Beratung anfragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-accent hover-scale"
            >
              <a href="tel:+4900000000">
                <Phone className="mr-2 h-4 w-4" />
                +49 (0) 000 000000
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
