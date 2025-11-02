import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Kontakt = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    firma: "",
    email: "",
    telefon: "",
    nachricht: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Anfrage gesendet",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
    setFormData({ name: "", firma: "", email: "", telefon: "", nachricht: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="mb-6">Kontakt</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Wir beraten Sie gerne zu allen Fragen rund um Beschattung, Verglasung 
                und Außenraumgestaltung. Unser Team steht Ihnen zur Verfügung.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                    <a
                      href="tel:+4900000000"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      +49 (0) 000 000000
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">E-Mail</h3>
                    <a
                      href="mailto:info@sanper.de"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      info@sanper.de
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                    <p className="text-muted-foreground">
                      Musterstraße 123
                      <br />
                      12345 Musterstadt
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">
                    {type === "katalog"
                      ? "Katalog anfordern"
                      : type === "beratung"
                      ? "Beratung anfragen"
                      : "Nachricht senden"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firma">Firma</Label>
                      <Input
                        id="firma"
                        value={formData.firma}
                        onChange={(e) =>
                          setFormData({ ...formData, firma: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefon">Telefon</Label>
                      <Input
                        id="telefon"
                        type="tel"
                        value={formData.telefon}
                        onChange={(e) =>
                          setFormData({ ...formData, telefon: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nachricht">Nachricht *</Label>
                      <Textarea
                        id="nachricht"
                        required
                        rows={6}
                        value={formData.nachricht}
                        onChange={(e) =>
                          setFormData({ ...formData, nachricht: e.target.value })
                        }
                      />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Ihre Daten werden gemäß unserer{" "}
                      <a href="/datenschutz" className="underline hover:text-foreground">
                        Datenschutzerklärung
                      </a>{" "}
                      verarbeitet.
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Anfrage senden
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-section bg-muted/30">
          <div className="container">
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Kartenansicht Platzhalter</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
