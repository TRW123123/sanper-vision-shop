import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const ReferenzenView = () => {
    const [filter, setFilter] = useState<string>("alle");

    const references = [
        {
            title: "Hotel Panorama Terrace",
            category: "Hotel",
            location: "München",
            year: "2023",
            image: "/images/stock/referenz-hotel.jpg",
            description: "Bioclimatic Pergola-System für 200m² Außenterrasse",
            products: ["Bioclimatic Pergola", "ZIP-Screen"],
        },
        {
            title: "Restaurant Riverside",
            category: "Gastronomie",
            location: "Hamburg",
            year: "2023",
            image: "/images/stock/referenz-restaurant.jpg",
            description: "Ganzjährige Nutzung durch Verglasung und Pergola",
            products: ["Giyotin-Glas", "Rolling Roof"],
        },
        {
            title: "Villa Sonnenhang",
            category: "Wohnbau",
            location: "Stuttgart",
            year: "2022",
            image: "/images/stock/referenz-villa.jpg",
            description: "Private Terrassenüberdachung mit Beleuchtung",
            products: ["Pergola Arc", "ZIP-Tavan"],
        },
        {
            title: "Bürokomplex TechPark",
            category: "Büro/Gewerbe",
            location: "Frankfurt",
            year: "2022",
            image: "/images/stock/referenz-buero.jpg",
            description: "Schallschutz und Raumtrennung für Open Space",
            products: ["Schallvorhänge", "Raumtrennvorhänge"],
        },
        {
            title: "Shopping Mall Entrance",
            category: "Retail",
            location: "Berlin",
            year: "2021",
            image: "/images/stock/referenz-retail.jpg",
            description: "Transparenter Windschutz für Eingangsbereich",
            products: ["Transparente ZIP-Screens", "Transparente Rolltore"],
        },
        {
            title: "Öffentliches Schwimmbad",
            category: "Public",
            location: "Köln",
            year: "2021",
            image: "/images/stock/referenz-wellness.jpg",
            description: "Großflächige Beschattung für Liegewiese",
            products: ["Kassettenmarkisen", "Wintent"],
        },
    ];

    const categories = ["alle", "Hotel", "Gastronomie", "Wohnbau", "Büro/Gewerbe", "Retail", "Public"];

    const filteredReferences =
        filter === "alle"
            ? references
            : references.filter((ref) => ref.category === filter);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 lg:py-32 bg-muted/30">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="mb-6">Referenzen</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Ausgewählte Projekte aus Hotel, Gastronomie, Wohnbau und Gewerbe.
                            Individuelle Lösungen für unterschiedlichste Anforderungen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-8 border-b border-border">
                <div className="container">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={filter === category ? "default" : "outline"}
                                onClick={() => setFilter(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* References Grid */}
            <section className="py-section-lg">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredReferences.map((reference, index) => (
                            <Card key={index} className="group overflow-hidden hover:shadow-medium transition-all duration-300">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={reference.image}
                                        alt={reference.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Badge>{reference.category}</Badge>
                                        <span className="text-sm text-muted-foreground">{reference.year}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold">{reference.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {reference.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {reference.location}
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {reference.products.map((product, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {product}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReferenzenView;
