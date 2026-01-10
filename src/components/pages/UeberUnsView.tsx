import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Factory, Shield } from "lucide-react";
import Footer from "@/components/layout/Footer";
// Note: Footer import removed in logic, but wait, the original UeberUns had Footer inside layout? 
// No, the Original had <Navbar/> <main>... <Footer/>.
// In Astro, Layout handles Navbar/Footer. So I should REMOVE Footer/Navbar from this View component 
// if I put it inside Layout.
// Sanper-Astro Layout.astro HAS Navbar and Footer.
// So I must REMOVE Navbar and Footer from these View components.
// I will verify I removed them in previous steps (KontaktView). Yes, I removed Navbar, but let me check Footer in KontaktView.
// Checked KontaktView above: Did I remove Footer?
// I see <div className="min-h-screen"> ... content ... </div>. No Footer import or usage visible in the code text provided in previous tool call text... 
// Wait, I might have missed checking if I removed Footer import in KontaktView above. 
// I will ensure I remove imports of Navbar/Footer in this UeberUnsView.

// RE-WRITING LOGIC:
// I will create UeberUnsView WITHOUT Navbar/Footer.

const UeberUnsView = () => {
    const milestones = [
        { year: "2005", title: "Gründung", description: "Start als Spezialist für Beschattungssysteme" },
        { year: "2010", title: "Expansion", description: "Erweiterung um Verglasungssysteme" },
        { year: "2015", title: "Zertifizierung", description: "CE-Kennzeichnung und EN-Normen" },
        { year: "2020", title: "Innovation", description: "Einführung bioclimatischer Systeme" },
    ];

    const values = [
        {
            icon: Award,
            title: "Qualität",
            description: "Höchste Standards in Fertigung und Material für langlebige Lösungen",
        },
        {
            icon: Users,
            title: "Partnerschaft",
            description: "Enge Zusammenarbeit mit Architekten, Planern und Montagepartnern",
        },
        {
            icon: Factory,
            title: "Fertigung",
            description: "Moderne Produktionsstätten mit deutscher Ingenieurskunst",
        },
        {
            icon: Shield,
            title: "Zuverlässigkeit",
            description: "Geprüfte Systeme mit umfassender Gewährleistung",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 lg:py-32 bg-muted/30">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="mb-6">Über Sanper</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Seit über 15 Jahren entwickeln und fertigen wir intelligente Beschattungs-
                            und Verglasungssysteme für anspruchsvolle Architektur. Mit deutscher
                            Ingenieurskunst und maßgeschneiderten Lösungen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-section-lg">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="mb-6">Unsere Mission</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Wir schaffen Außenräume, die sich perfekt in moderne Architektur integrieren.
                                Durch die Verbindung von Funktion und Ästhetik entstehen Beschattungs- und
                                Verglasungssysteme, die höchsten Ansprüchen gerecht werden.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Unser Fokus liegt auf maßgefertigten Lösungen für Wohn- und Gewerbeprojekte.
                                Von der ersten Planung bis zur finalen Montage begleiten wir Sie mit Expertise
                                und Qualität made in Germany.
                            </p>
                        </div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
                                alt="Moderne Büroarchitektur"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-section-lg bg-muted/30">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Unsere Werte</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Was uns auszeichnet und antreibt
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index}>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-section-lg">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Unsere Geschichte</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Kontinuierliche Weiterentwicklung seit 2005
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <Badge className="text-lg px-4 py-2">{milestone.year}</Badge>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                                    <p className="text-muted-foreground">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-section bg-muted/30">
                <div className="container">
                    <div className="text-center">
                        <h2 className="mb-6">Zertifikate & Standards</h2>
                        <p className="text-muted-foreground mb-8">
                            Alle Systeme entsprechen höchsten Qualitäts- und Sicherheitsstandards
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Badge variant="outline" className="text-lg px-6 py-3">CE</Badge>
                            <Badge variant="outline" className="text-lg px-6 py-3">EN 13561</Badge>
                            <Badge variant="outline" className="text-lg px-6 py-3">EN 1090</Badge>
                            <Badge variant="outline" className="text-lg px-6 py-3">ISO 9001</Badge>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UeberUnsView;
