import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getProductBySlug } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { FileText, Send } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Anfrage = () => {
  const [searchParams] = useSearchParams();
  const produktSlug = searchParams.get("produkt");
  const product = produktSlug ? getProductBySlug(produktSlug) : undefined;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    firma: "",
    email: "",
    telefon: "",
    projekt: "",
    datenschutz: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.datenschutz) {
      toast({
        title: "Datenschutz erforderlich",
        description: "Bitte akzeptieren Sie die Datenschutzerklärung.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    
    setSubmitted(true);
    toast({
      title: "Anfrage gesendet",
      description: "Vielen Dank! Wir melden uns in Kürze bei Ihnen.",
    });
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Anfrage gesendet – Sanper Gölgelendirme Systeme</title>
        </Helmet>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center py-section-lg">
          <div className="container">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="h-8 w-8 text-accent" />
                </div>
                <h1 className="mb-4">Vielen Dank für Ihre Anfrage!</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/">Zur Startseite</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/produkte">Weitere Produkte ansehen</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Angebot anfordern – Sanper Gölgelendirme Systeme</title>
        <meta
          name="description"
          content="Fordern Sie jetzt ein individuelles Angebot für Ihr Projekt an. Unsere Experten beraten Sie gerne."
        />
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
                  <BreadcrumbPage>Anfrage</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <section className="py-section-lg">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="mb-4">Angebot anfordern</h1>
                <p className="text-lg text-muted-foreground">
                  Füllen Sie das Formular aus und wir erstellen Ihnen ein maßgeschneidertes Angebot für Ihr Projekt.
                </p>
              </div>

              {product && (
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.bilder[0]}
                        alt={product.produktname}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground">Ausgewähltes Produkt</p>
                        <p className="font-semibold">{product.produktname}</p>
                        <p className="text-sm text-muted-foreground">{product.kategorie}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="firma">Firma</Label>
                        <Input
                          id="firma"
                          value={formData.firma}
                          onChange={(e) => setFormData({ ...formData, firma: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          E-Mail <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefon">Telefon</Label>
                        <Input
                          id="telefon"
                          type="tel"
                          value={formData.telefon}
                          onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projekt">
                        Projektbeschreibung <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="projekt"
                        required
                        rows={6}
                        placeholder="Beschreiben Sie Ihr Projekt, gewünschte Maße, Einsatzbereich und besondere Anforderungen..."
                        value={formData.projekt}
                        onChange={(e) => setFormData({ ...formData, projekt: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Datei hochladen (optional)</Label>
                      <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          PDF oder DWG hochladen
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Sie können Pläne, Skizzen oder Referenzbilder hochladen (max. 10 MB)
                      </p>
                    </div>

                    <div className="flex items-start gap-3 pt-4">
                      <Checkbox
                        id="datenschutz"
                        checked={formData.datenschutz}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, datenschutz: checked as boolean })
                        }
                      />
                      <Label htmlFor="datenschutz" className="text-sm leading-relaxed cursor-pointer">
                        Ich habe die{" "}
                        <Link to="/datenschutz" className="text-accent hover:underline">
                          Datenschutzerklärung
                        </Link>{" "}
                        gelesen und akzeptiere die Verarbeitung meiner Daten zum Zweck der Angebotsbearbeitung.
                        <span className="text-destructive"> *</span>
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="h-5 w-5 mr-2" />
                      Anfrage absenden
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      <span className="text-destructive">*</span> Pflichtfelder
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Anfrage;
