import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, FileText, ArrowRight, Check, Shield } from "lucide-react";
import { getProductBySlug, products, getCategoryIdFromName } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

const ProduktDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">Produkt nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">
              Das gesuchte Produkt existiert nicht.
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

  const categoryId = getCategoryIdFromName(product.kategorie);
  const relatedProducts = products
    .filter((p) => p.kategorie === product.kategorie && p.id !== product.id)
    .slice(0, 3);

  const technicalData = [
    { label: "Systemtyp", value: product.systemtyp },
    { label: "Material", value: product.material },
    { label: "Maße / Optionen", value: product.masse_optionen },
    { label: "Motorisierung", value: product.motorisierung ? "Ja" : "Optional/Nein" },
    { label: "Windschutz", value: product.windschutz },
    { label: "Wasserschutz", value: product.wasserschutz },
  ];

  const faqs = [
    {
      question: "Wie lange ist die Lieferzeit?",
      answer: "Die Lieferzeit beträgt in der Regel 4-6 Wochen nach Auftragsbestätigung. Bei individuellen Sonderanfertigungen kann die Lieferzeit variieren.",
    },
    {
      question: "Ist eine Montage im Service enthalten?",
      answer: "Ja, wir bieten professionelle Montage durch unser erfahrenes Team. Die Montage ist im Angebot separat ausgewiesen.",
    },
    {
      question: "Welche Garantie gibt es auf das Produkt?",
      answer: "Alle unsere Produkte verfügen über eine Herstellergarantie. Die genauen Garantiebedingungen entnehmen Sie bitte dem Produktdatenblatt oder fragen Sie unsere Berater.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.produktname,
    description: product.kurzbeschreibung,
    brand: {
      "@type": "Brand",
      name: "Sanper Gölgelendirme Systeme",
    },
    category: product.kategorie,
    image: product.bilder,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <Helmet>
        <title>{product.produktname} – Sanper Gölgelendirme Systeme</title>
        <meta name="description" content={product.kurzbeschreibung} />
        <meta property="og:title" content={`${product.produktname} – Sanper Gölgelendirme Systeme`} />
        <meta property="og:description" content={product.kurzbeschreibung} />
        <meta property="og:image" content={product.bilder[0]} />
        <link rel="canonical" href={`https://sanper.de/produkt/${product.slug}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
                  <BreadcrumbLink asChild>
                    <Link to={`/produkte/${categoryId}`}>{product.kategorie}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.produktname}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Product Header */}
        <section className="py-section-lg">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src={product.bilder[selectedImage]}
                    alt={product.produktname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.bilder.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.produktname} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Link
                    to={`/produkte/${categoryId}`}
                    className="text-sm text-accent hover:underline mb-2 inline-block"
                  >
                    {product.kategorie}
                  </Link>
                  <h1 className="mb-4">{product.produktname}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {product.kurzbeschreibung}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.motorisierung && (
                    <Badge variant="secondary" className="text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Motorisiert
                    </Badge>
                  )}
                  {product.wasserschutz === "Ja" && (
                    <Badge variant="secondary" className="text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Wasserschutz
                    </Badge>
                  )}
                  {product.windschutz.toLowerCase().includes("hoch") && (
                    <Badge variant="secondary" className="text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      Windbeständig
                    </Badge>
                  )}
                </div>

                <div className="border-t border-b py-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium">Zertifizierungen</p>
                      <p className="text-sm text-muted-foreground">
                        {product.zertifikate.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/anfrage?produkt=${product.slug}`}>
                      Angebot anfordern
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    <Download className="h-5 w-5 mr-2" />
                    Katalog herunterladen
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  {product.anmerkungen}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-section-lg bg-muted/30">
          <div className="container">
            <Tabs defaultValue="beschreibung" className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="beschreibung">Beschreibung</TabsTrigger>
                <TabsTrigger value="technisch">Technische Daten</TabsTrigger>
                <TabsTrigger value="einsatz">Einsatzbereiche</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="beschreibung" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="mb-4">Produktbeschreibung</h3>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>{product.kurzbeschreibung}</p>
                      <p>{product.systemtyp}</p>
                      <p className="font-medium text-foreground mt-6">Besondere Merkmale:</p>
                      <p>{product.anmerkungen}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technisch" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="mb-6">Technische Daten</h3>
                    <div className="space-y-4">
                      {technicalData.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-start gap-2 pb-4 border-b last:border-0"
                        >
                          <span className="font-medium min-w-[200px]">{item.label}:</span>
                          <span className="text-muted-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="einsatz" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="mb-6">Einsatzbereiche</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.einsatzbereich.map((bereich, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-accent" />
                          <span>{bereich}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="mb-6">Häufig gestellte Fragen</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-section-lg">
            <div className="container">
              <h2 className="mb-12 text-center">Ähnliche Produkte</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="group overflow-hidden hover:shadow-medium transition-all duration-300"
                  >
                    <Link to={`/produkt/${relatedProduct.slug}`}>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={relatedProduct.bilder[0]}
                          alt={relatedProduct.produktname}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-6 space-y-4">
                      <Link to={`/produkt/${relatedProduct.slug}`}>
                        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                          {relatedProduct.produktname}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedProduct.kurzbeschreibung}
                      </p>
                      <Button variant="link" asChild className="p-0 h-auto text-accent">
                        <Link to={`/produkt/${relatedProduct.slug}`} className="flex items-center gap-2">
                          Details ansehen
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProduktDetail;
