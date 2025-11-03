import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter } from "lucide-react";
import { categories, getProductsByCategory, getCategoryIdFromName, products } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProduktKategorie = () => {
  const { kategorie } = useParams<{ kategorie: string }>();
  const [motorisierungFilter, setMotorisierungFilter] = useState<string>("all");
  const [windschutzFilter, setWindschutzFilter] = useState<string>("all");
  
  const category = categories.find((cat) => cat.id === kategorie);
  const categoryProducts = category 
    ? getProductsByCategory(category.name)
    : [];

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (motorisierungFilter !== "all") {
        const hasMotor = motorisierungFilter === "ja";
        if (product.motorisierung !== hasMotor) return false;
      }
      
      if (windschutzFilter !== "all") {
        if (windschutzFilter === "hoch" && !product.windschutz.toLowerCase().includes("hoch") && !product.windschutz.toLowerCase().includes("sehr")) {
          return false;
        }
        if (windschutzFilter === "mittel" && !product.windschutz.toLowerCase().includes("mittel")) {
          return false;
        }
      }
      
      return true;
    });
  }, [categoryProducts, motorisierungFilter, windschutzFilter]);

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">Kategorie nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">
              Die gesuchte Produktkategorie existiert nicht.
            </p>
            <Button asChild>
              <Link to="/produkte">Zurück zur Übersicht</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} – Sanper Gölgelendirme Systeme</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} – Sanper Gölgelendirme Systeme`} />
        <meta property="og:description" content={category.description} />
        <link rel="canonical" href={`https://sanper.de/produkte/${category.id}`} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b bg-background">
          <div className="container py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Startseite</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/produkte">Produkte</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          <div className="container relative">
            <div className="max-w-3xl">
              <h1 className="mb-6">{category.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="border-b bg-muted/30">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filter</span>
              </div>
              
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <Select value={motorisierungFilter} onValueChange={setMotorisierungFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Motorisierung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="ja">Mit Motor</SelectItem>
                    <SelectItem value="nein">Ohne Motor</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={windschutzFilter} onValueChange={setWindschutzFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Windschutz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="hoch">Hoch</SelectItem>
                    <SelectItem value="mittel">Mittel</SelectItem>
                  </SelectContent>
                </Select>

                {(motorisierungFilter !== "all" || windschutzFilter !== "all") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMotorisierungFilter("all");
                      setWindschutzFilter("all");
                    }}
                  >
                    Filter zurücksetzen
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-section-lg">
          <div className="container">
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Produkt" : "Produkte"} gefunden
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link to={`/produkt/${product.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.bilder[0]}
                        alt={product.produktname}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Link to={`/produkt/${product.slug}`}>
                        <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                          {product.produktname}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.kurzbeschreibung}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.motorisierung && (
                        <Badge variant="secondary">Motorisiert</Badge>
                      )}
                      {product.wasserschutz === "Ja" && (
                        <Badge variant="secondary">Wasserschutz</Badge>
                      )}
                    </div>

                    <Button variant="link" asChild className="p-0 h-auto text-accent">
                      <Link to={`/produkt/${product.slug}`} className="flex items-center gap-2">
                        Details ansehen
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Keine Produkte gefunden. Versuchen Sie andere Filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-lg bg-gradient-to-br from-accent to-accent-secondary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="mb-6 text-white">Fragen zu unseren Produkten?</h2>
              <p className="text-lg mb-8 opacity-90">
                Unsere Experten beraten Sie gerne zu den passenden Lösungen für Ihr Projekt.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/kontakt?type=beratung">Jetzt Beratung anfragen</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProduktKategorie;
