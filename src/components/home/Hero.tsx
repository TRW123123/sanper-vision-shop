import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop"
          alt="Moderne Pergola-Architektur"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6 animate-fade-in">
            Intelligente Beschattung und Verglasung für jede Architektur
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Maßgefertigte Pergola-Systeme, Verglasungen und textile Beschattungslösungen. 
            Premium-Qualität mit deutscher Ingenieurskunst für Wohn- und Gewerbeprojekte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground hover-scale">
              <Link to="/kontakt?type=beratung">
                Beratung anfragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="hero" asChild className="hover-scale">
              <Link to="/produkte">
                Produkte entdecken
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
