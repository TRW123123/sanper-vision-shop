import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Factory, Shield } from "lucide-react";

const UeberUnsView = () => {
    const milestones = [
        { year: "2005", title: "Gründung", description: "Start als Spezialist für Beschattungssysteme" },
        { year: "2010", title: "Expansion", description: "Erweiterung um Verglasungssysteme" },
        { year: "2015", title: "Zertifizierung", description: "CE-Kennzeichnung und EN-Normen" },
        { year: "2020", title: "Innovation", description: "Einführung bioklimatischer Systeme" },
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
            <section className="bg-muted/30 py-20 lg:py-32">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="mb-6">Über Apexx Bau</h1>
                        <p className="text-xl leading-relaxed text-muted-foreground">
                            Seit über 15 Jahren entwickeln und fertigen wir intelligente Beschattungs-
                            und Verglasungssysteme für anspruchsvolle Architektur. Mit deutscher
                            Ingenieurskunst und maßgeschneiderten Lösungen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-section-lg">
                <div className="container">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6">Unsere Mission</h2>
                            <p className="mb-4 leading-relaxed text-muted-foreground">
                                Wir schaffen Außenräume, die sich perfekt in moderne Architektur integrieren.
                                Durch die Verbindung von Funktion und Ästhetik entstehen Beschattungs- und
                                Verglasungssysteme, die höchsten Ansprüchen gerecht werden.
                            </p>
                            <p className="leading-relaxed text-muted-foreground">
                                Unser Fokus liegt auf maßgefertigten Lösungen für Wohn- und Gewerbeprojekte.
                                Von der ersten Planung bis zur finalen Montage begleiten wir Sie mit Expertise
                                und Qualität made in Germany.
                            </p>
                        </div>
                        <div className="aspect-[4/3] overflow-hidden rounded-lg">
                            <img
                                src="/images/stock/team-office.jpg"
                                alt="Moderne Büroarchitektur"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-section-lg">
                <div className="container">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4">Unsere Werte</h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Was uns auszeichnet und antreibt
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index}>
                                    <CardContent className="space-y-4 p-6">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{value.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-section-lg">
                <div className="container">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4">Unsere Geschichte</h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Kontinuierliche Weiterentwicklung seit 2005
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <Badge className="px-4 py-2 text-lg">{milestone.year}</Badge>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="mb-2 text-xl font-semibold">{milestone.title}</h3>
                                    <p className="text-muted-foreground">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-muted/30 py-section">
                <div className="container">
                    <div className="text-center">
                        <h2 className="mb-6">Zertifikate & Standards</h2>
                        <p className="mb-8 text-muted-foreground">
                            Alle Systeme entsprechen höchsten Qualitäts- und Sicherheitsstandards
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Badge variant="outline" className="px-6 py-3 text-lg">CE</Badge>
                            <Badge variant="outline" className="px-6 py-3 text-lg">EN 13561</Badge>
                            <Badge variant="outline" className="px-6 py-3 text-lg">EN 1090</Badge>
                            <Badge variant="outline" className="px-6 py-3 text-lg">ISO 9001</Badge>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UeberUnsView;
