import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Send, ShieldCheck, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const AnfrageView = () => {
  const { toast } = useToast();
  const [selectedProductSlug, setSelectedProductSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    plz: "",
    stadt: "",
    produkt: "",
    masse: "",
    montage: "ja",
    nachricht: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const productSlug = searchParams.get("produkt");

    if (!productSlug) {
      return;
    }

    setSelectedProductSlug(productSlug);
    const foundProduct = products.find((product) => product.slug === productSlug);
    if (foundProduct) {
      setFormData((prev) => ({ ...prev, produkt: foundProduct.produktname }));
    }
  }, []);

  const selectedProduct = products.find(
    (product) => product.slug === selectedProductSlug,
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      telefon: "",
      plz: "",
      stadt: "",
      produkt: selectedProduct?.produktname ?? "",
      masse: "",
      montage: "ja",
      nachricht: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("form-name", "anfrage");
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("telefon", formData.telefon);
    payload.append("plz", formData.plz);
    payload.append("stadt", formData.stadt);
    payload.append("produkt", formData.produkt);
    payload.append("product_slug", selectedProductSlug);
    payload.append("masse", formData.masse);
    payload.append("montage", formData.montage);
    payload.append("nachricht", formData.nachricht);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload as any).toString(),
      });

      if (!response.ok) {
        throw new Error("Anfrageformular konnte nicht gesendet werden.");
      }

      toast({
        title: "Anfrage gesendet",
        description:
          "Vielen Dank. Wir melden uns schnellstmoglich mit einem passenden Angebot.",
      });
      resetForm();
    } catch (error) {
      toast({
        title: "Senden fehlgeschlagen",
        description:
          "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="py-12 lg:py-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
                  Angebot anfordern
                </h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  Erhalten Sie Ihr massgeschneidertes Angebot fur Pergolen,
                  Verglasungen und Beschattungslosungen. Kostenlos,
                  unverbindlich und schnell bearbeitet.
                </p>
              </div>

              <div className="grid gap-6">
                <Card className="border-none bg-background/50 shadow-none">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-full bg-accent/10 p-3 text-accent">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Qualitatsgarantie</h3>
                      <p className="text-sm text-muted-foreground">
                        Planung, Materialien und Umsetzung sind auf langlebige
                        Premium-Projekte ausgelegt.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none bg-background/50 shadow-none">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-full bg-accent/10 p-3 text-accent">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Expertenberatung</h3>
                      <p className="text-sm text-muted-foreground">
                        Wir melden uns mit einer realistischen Einschatzung zu
                        Produkt, Masse, Montage und Projektablauf.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedProduct && (
                <Card className="overflow-hidden border-accent/20">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={selectedProduct.bilder[0]}
                      alt={selectedProduct.produktname}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                      <div className="text-white">
                        <p className="text-sm font-medium opacity-90">
                          Ihre Auswahl
                        </p>
                        <p className="text-xl font-bold">
                          {selectedProduct.produktname}
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="bg-accent/5 p-4">
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-accent" />
                        <span className="text-muted-foreground">
                          Kategorie: {selectedProduct.kategorie}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-accent" />
                        <span className="text-muted-foreground">
                          System: {selectedProduct.systemtyp}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="border-t-4 border-t-accent shadow-lg">
              <CardHeader>
                <CardTitle>Projektdetails</CardTitle>
                <CardDescription>
                  Je genauer die Angaben sind, desto praziser konnen wir das
                  Angebot vorbereiten.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                        1
                      </span>
                      Kontaktdaten
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          required
                          placeholder="Max Mustermann"
                          value={formData.name}
                          onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefon">Telefon</Label>
                        <Input
                          id="telefon"
                          type="tel"
                          placeholder="+49 ..."
                          value={formData.telefon}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              telefon: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="max@beispiel.de"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData({ ...formData, email: event.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="plz">PLZ *</Label>
                        <Input
                          id="plz"
                          required
                          placeholder="12345"
                          value={formData.plz}
                          onChange={(event) =>
                            setFormData({ ...formData, plz: event.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="stadt">Ort</Label>
                        <Input
                          id="stadt"
                          placeholder="Musterstadt"
                          value={formData.stadt}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              stadt: event.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t" />

                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                        2
                      </span>
                      Projektinformationen
                    </h3>

                    <div className="space-y-2">
                      <Label>Gewunschtes Produkt</Label>
                      {selectedProduct ? (
                        <div className="flex items-center justify-between rounded-md bg-muted p-3 text-sm font-medium">
                          {selectedProduct.produktname}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setSelectedProductSlug("");
                              setFormData({ ...formData, produkt: "" });
                            }}
                          >
                            Andern
                          </Button>
                        </div>
                      ) : (
                        <Select
                          value={formData.produkt || undefined}
                          onValueChange={(value) =>
                            setFormData({ ...formData, produkt: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Bitte wahlen..." />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem
                                key={product.id}
                                value={product.produktname}
                              >
                                {product.produktname}
                              </SelectItem>
                            ))}
                            <SelectItem value="Sonstiges">
                              Anderes / Beratung gewunscht
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="masse">Ungefaehre Masse (BxT in m)</Label>
                        <Input
                          id="masse"
                          placeholder="z. B. 4 x 3 m"
                          value={formData.masse}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              masse: event.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="montage">Montage gewunscht?</Label>
                        <Select
                          value={formData.montage}
                          onValueChange={(value) =>
                            setFormData({ ...formData, montage: value })
                          }
                        >
                          <SelectTrigger id="montage">
                            <SelectValue placeholder="Wahlen..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ja">
                              Ja, Montage durch Profi
                            </SelectItem>
                            <SelectItem value="nein">
                              Nein, nur Lieferung
                            </SelectItem>
                            <SelectItem value="unsicher">
                              Unsicher / Beratung notig
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nachricht">
                        Nachricht / Projektbesonderheiten
                      </Label>
                      <Textarea
                        id="nachricht"
                        placeholder="Beschreiben Sie Ihr Projekt kurz..."
                        className="min-h-[110px]"
                        value={formData.nachricht}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            nachricht: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-semibold shadow-lg transition-all hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting
                      ? "Anfrage wird gesendet..."
                      : "Kostenloses Angebot anfordern"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten
                    gemaess unserer{" "}
                    <a
                      href="/datenschutz"
                      className="underline hover:text-foreground"
                    >
                      Datenschutzerklarung
                    </a>{" "}
                    zu.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnfrageView;
