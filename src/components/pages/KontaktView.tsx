import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { company } from "@/data/company";

const KontaktView = () => {
    const [type, setType] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        firma: "",
        email: "",
        telefon: "",
        nachricht: "",
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setType(searchParams.get("type"));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = new FormData();
        payload.append("form-name", "kontakt");
        payload.append("request_type", type || "allgemein");
        payload.append("name", formData.name);
        payload.append("firma", formData.firma);
        payload.append("email", formData.email);
        payload.append("telefon", formData.telefon);
        payload.append("nachricht", formData.nachricht);

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(payload as any).toString(),
            });

            if (!response.ok) {
                throw new Error("Kontaktformular konnte nicht gesendet werden.");
            }

            toast({
                title: "Anfrage gesendet",
                description: "Wir werden uns in Kürze bei Ihnen melden.",
            });
            setFormData({ name: "", firma: "", email: "", telefon: "", nachricht: "" });
        } catch (error) {
            toast({
                title: "Senden fehlgeschlagen",
                description: "Bitte versuchen Sie es in wenigen Minuten erneut oder schreiben Sie uns direkt per E-Mail.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            <section className="bg-muted/30 py-20 lg:py-32">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="mb-6">Kontakt</h1>
                        <p className="text-xl leading-relaxed text-muted-foreground">
                            Wir beraten Sie gerne zu allen Fragen rund um Beschattung, Verglasung
                            und Außenraumgestaltung. Unser Team steht Ihnen zur Verfügung.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-section">
                <div className="container">
                    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card>
                            <CardContent className="space-y-4 p-6 text-center">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Telefon</h3>
                                    <a
                                        href={`tel:${company.contact.phone}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {company.contact.phone}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="space-y-4 p-6 text-center">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">E-Mail</h3>
                                    <a
                                        href={`mailto:${company.contact.email}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {company.contact.email}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="space-y-4 p-6 text-center">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Adresse</h3>
                                    <p className="text-muted-foreground">
                                        {company.address.street}
                                        <br />
                                        {company.address.zip} {company.address.city}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mx-auto max-w-2xl">
                        <Card>
                            <CardContent className="p-8">
                                <h2 className="mb-6 text-2xl font-semibold">
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

                                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        <Send className="mr-2 h-4 w-4" />
                                        {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KontaktView;
