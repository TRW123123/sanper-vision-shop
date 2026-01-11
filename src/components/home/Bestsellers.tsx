
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBestsellerProducts } from "@/data/products";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Bestsellers = () => {
  const bestsellers = getBestsellerProducts();

  // Badge-Varianten für die vier Produkte
  const badgeConfig = [
    { text: "#1 Bestseller", variant: "default" as const },
    { text: "Beliebt bei Hotels", variant: "secondary" as const },
    { text: "Kundenfavorit", variant: "outline" as const },
    { text: "Premium-Wahl", variant: "default" as const },
  ];

  return (
    <section className="py-section bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        {/* Überschrift */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">Unsere Bestseller</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Die beliebtesten Lösungen für anspruchsvolle Architektur
          </p>
        </div>

        {/* Gleichmäßiges 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {bestsellers.slice(0, 4).map((product, index) => {
            return (
              <a
                key={product.id}
                href={`/${product.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                {/* Produktbild */}
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={product.bilder[0] || "/placeholder.svg"}
                    alt={product.produktname}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </AspectRatio>

                {/* Badge oben rechts */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant={badgeConfig[index].variant} className="shadow-soft">
                    {badgeConfig[index].text}
                  </Badge>
                </div>

                {/* Text-Overlay unten links */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-2xl lg:text-3xl font-semibold mb-2 transition-transform duration-300 group-hover:translate-x-1">
                    {product.produktname}
                  </h3>
                  <p className="text-white/90 text-sm lg:text-base font-light leading-relaxed line-clamp-2">
                    {product.kurzbeschreibung}
                  </p>

                  {/* Hover-CTA */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-sm font-medium border border-white/80 px-4 py-2 rounded-md hover:bg-white hover:text-primary transition-colors">
                      Details ansehen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Zentraler CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="hover-scale">
            <a href="/produkte">
              Alle Produkte ansehen
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
