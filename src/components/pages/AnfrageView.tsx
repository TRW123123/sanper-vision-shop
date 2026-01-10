import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Send, ShieldCheck, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const AnfrageView = () => {
    const { toast } = useToast();
    const [selectedProductSlug, setSelectedProductSlug] = useState<string>("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telefon: "",
        plz: "",
        stadt: "",
        produkt: "",
        masse: "",
        montage: "ja", // ja, nein, unsicher
        nachricht: ""
    });

    // Load product from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const productSlug = searchParams.get("produkt");
        if (productSlug) {
            setSelectedProductSlug(productSlug);
            const foundProduct = products.find(p => p.slug === productSlug);
            if (foundProduct) {
                setFormData(prev => ({ ...prev, produkt: foundProduct.produktname }));
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to an API/backend
        console.log("Form Data Submitted:", formData);

        toast({
            title: "Anfrage erfolgreich gesendet!",
            description: "Vielen Dank. Einer unserer Experten wird sich innerhalb von 24 Stunden bei Ihnen melden.",
            variant: "default",
        });

        // Optional: Reset form or redirect
    };

    const selectedProduct = products.find(p => p.slug === selectedProductSlug);

    return (
        <div className="min-h-screen bg-muted/30">
            <section className="py-12 lg:py-20">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* LEFT COLUMN: Trust & Context */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="mb-4 text-3xl lg:text-4xl font-bold">Angebot anfordern</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Erhalten Sie Ihr maßgeschneidertes Angebot für Premium-Lösungen.
                                    Kostenlos, unverbindlich und innerhalb von 24 Stunden.
                                </p>
                            </div>

                            {/* Trust Elements */}
                            <div className="grid gap-6">
                                <Card className="border-none shadow-none bg-background/50">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="rounded-full bg-accent/10 p-3 text-accent">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Qualitätsgarantie</h3>
                                            <p className="text-sm text-muted-foreground">
                                                5 Jahre Garantie auf alle Systeme und Motoren. Zertifizierte Qualität nach EU-Normen.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-none bg-background/50">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="rounded-full bg-accent/10 p-3 text-accent">
                                            <Star className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Expertenberatung</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Persönliche Projektbetreuung von der Planung bis zur Montage durch unsere Fachpartner.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Product Preview (if selected) */}
                            {selectedProduct && (
                                <Card className="overflow-hidden border-accent/20">
                                    <div className="aspect-video bg-muted relative">
                                        <img
                                            src={selectedProduct.bilder[0]}
                                            alt={selectedProduct.produktname}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <p className="text-sm font-medium opacity-90">Ihre Auswahl</p>
                                                <p className="text-xl font-bold">{selectedProduct.produktname}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-4 bg-accent/5">
                                        <ul className="text-sm space-y-1">
                                            <li className="flex items-center gap-2">
                                                <Check className="h-3 w-3 text-accent" />
                                                <span className="text-muted-foreground">Kategorie: {selectedProduct.kategorie}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="h-3 w-3 text-accent" />
                                                <span className="text-muted-foreground">System: {selectedProduct.systemtyp}</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* RIGHT COLUMN: The Form */}
                        <Card className="shadow-lg border-t-4 border-t-accent">
                            <CardHeader>
                                <CardTitle>Projektdetails</CardTitle>
                                <CardDescription>
                                    Bitte füllen Sie das Formular möglichst vollständig aus, damit wir Ihnen ein präzises Angebot erstellen können.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                            <span className="bg-accent/10 text-accent w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                            Kontaktdaten
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name *</Label>
                                                <Input
                                                    id="name"
                                                    required
                                                    placeholder="Max Mustermann"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="telefon">Telefon</Label>
                                                <Input
                                                    id="telefon"
                                                    type="tel"
                                                    placeholder="+49 ..."
                                                    value={formData.telefon}
                                                    onChange={e => setFormData({ ...formData, telefon: e.target.value })}
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
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="plz">PLZ *</Label>
                                                <Input
                                                    id="plz"
                                                    required
                                                    placeholder="12345"
                                                    value={formData.plz}
                                                    onChange={e => setFormData({ ...formData, plz: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label htmlFor="stadt">Ort</Label>
                                                <Input
                                                    id="stadt"
                                                    placeholder="Musterstadt"
                                                    value={formData.stadt}
                                                    onChange={e => setFormData({ ...formData, stadt: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t my-6"></div>

                                    {/* Project Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
                                            <span className="bg-accent/10 text-accent w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                            Projektinformationen
                                        </h3>

                                        <div className="space-y-2">
                                            <Label>Gewünschtes Produkt</Label>
                                            {selectedProduct ? (
                                                <div className="p-3 bg-muted rounded-md text-sm font-medium flex justify-between items-center">
                                                    {selectedProduct.produktname}
                                                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground" onClick={() => {
                                                        setSelectedProductSlug("");
                                                        setFormData({ ...formData, produkt: "" });
                                                    }}>
                                                        Ändern
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Select onValueChange={(val) => setFormData({ ...formData, produkt: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Bitte wählen..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {products.map(p => (
                                                            <SelectItem key={p.id} value={p.produktname}>{p.produktname}</SelectItem>
                                                        ))}
                                                        <SelectItem value="Sonstiges">Anderes / Beratung gewünscht</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="masse">Ungefähre Maße (BxT in m)</Label>
                                                <Input
                                                    id="masse"
                                                    placeholder="z.B. 4x3m"
                                                    value={formData.masse}
                                                    onChange={e => setFormData({ ...formData, masse: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="montage">Montage gewünscht?</Label>
                                                <Select defaultValue="ja" onValueChange={(val) => setFormData({ ...formData, montage: val })}>
                                                    <SelectTrigger id="montage">
                                                        <SelectValue placeholder="Wählen..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ja">Ja, Montage durch Profi</SelectItem>
                                                        <SelectItem value="nein">Nein, nur Lieferung</SelectItem>
                                                        <SelectItem value="unsicher">Unsicher / Beratung nötig</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nachricht">Ihre Nachricht / Besonderheiten</Label>
                                            <Textarea
                                                id="nachricht"
                                                placeholder="Beschreiben Sie Ihr Projekt kurz..."
                                                className="min-h-[100px]"
                                                value={formData.nachricht}
                                                onChange={e => setFormData({ ...formData, nachricht: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                                        <Send className="mr-2 h-5 w-5" />
                                        Kostenloses Angebot anfordern
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer <a href="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</a> zu.
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
