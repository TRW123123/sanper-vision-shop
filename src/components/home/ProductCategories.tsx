
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ProductCategories = () => {
  const categories = [
    {
      title: "Pergola-Systeme",
      description:
        "Bioclimatic Pergolen mit drehbaren Lamellen für optimale Klimakontrolle und Rolling Roof Systeme für vollständigen Wetterschutz.",
      image: "/images/products/bioclimatic-pergola.png",
      href: "/produkte/pergola-systeme",
    },
    {
      title: "Verglasungssysteme",
      description:
        "Rahmenlose Giyotin-Glas-Systeme und Wintergärten für transparente Raumabschlüsse mit maximaler Lichtausbeute.",
      image: "/images/products/guillotine-glass.png",
      href: "/produkte/verglasungssysteme",
    },
    {
      title: "Textile Beschattung",
      description:
        "Kassettenmarkisen, ZIP-Screen und Piston-Tavan Systeme für flexible und elegante Sonnenschutzlösungen.",
      image: "/images/products/zip-screen.png",
      href: "/produkte/textile-beschattung",
    },
    {
      title: "Transparente Schutzsysteme",
      description:
        "Durchsichtige ZIP-Screens und Rolltore für Windschutz ohne Sichteinschränkung. Ideal für Gastronomie und Terrassen.",
      image: "/images/products/transparent-zip-blind.png",
      href: "/produkte/transparente-schutzsysteme",
    },
    {
      title: "Innenraum & Akustik",
      description:
        "Schallvorhänge und Raumtrennvorhänge für optimierte Akustik und flexible Raumgestaltung in Büros und öffentlichen Räumen.",
      image: "/images/products/acoustic-curtain.png",
      href: "/produkte/innenraum-akustik",
    },
  ];

  return (
    <section className="py-section-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="mb-4">Unsere Produktkategorien</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von intelligenten Pergola-Systemen bis zu akustischen Innenraumlösungen –
            entdecken Sie unser umfassendes Portfolio für Wohn- und Gewerbeprojekte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-accent">
                  <a href={category.href} className="flex items-center gap-2">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
