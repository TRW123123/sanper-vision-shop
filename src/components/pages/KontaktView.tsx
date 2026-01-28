import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { company } from "@/data/company";

const KontaktView = () => {
    const [type, setType] = useState<string | null>(null);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        firma: "",
        email: "",
        telefon: "",
        nachricht: "",
    });

    useEffect(() => {
        // Client-side only access to URL params
        const searchParams = new URLSearchParams(window.location.search);
        setType(searchParams.get("type"));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            toast({
                title: "Anfrage gesendet",
                description: "Wir werden uns in Kürze bei Ihnen melden.",
            });
            setFormData({ name: "", firma: "", email: "", telefon: "", nachricht: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen">
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
                                        href={`tel:${company.contact.phone}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {company.contact.phone}
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
                                        href={`mailto:${company.contact.email}`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {company.contact.email}
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
                                        {company.address.street}
                                        <br />
                                        {company.address.zip} {company.address.city}
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

                                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="mr-2 h-4 w-4" />
                                        )}
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
