import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

interface HeroProps {
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
}

const Hero = ({ ctaPrimaryText, ctaSecondaryText }: HeroProps = {}) => {
  // CSV-driven CTA logic
  const primaryText = ctaPrimaryText || "Beratung starten";
  const secondaryText = ctaSecondaryText;
  const showSecondary = secondaryText && secondaryText !== "—";

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
            <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto group" asChild>
              <a href="/kontakt">
                {primaryText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            {showSecondary && (
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white" asChild>
                <a href="/anfrage">
                  {secondaryText}
                </a>
              </Button>
            )}
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

