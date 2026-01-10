import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { categories } from "@/data/products";

const ProdukteList = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-gradient-to-b from-surface to-background">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="mb-6">Unsere Produktkategorien</h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Von intelligenten Pergola-Systemen bis zu akustischen Innenraumlösungen –
                            entdecken Sie unser umfassendes Portfolio für Wohn- und Gewerbeprojekte.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Produktkategorie suchen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-section-lg">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredCategories.map((category, index) => (
                            <Card
                                key={category.id}
                                className="group overflow-hidden hover:shadow-medium transition-all duration-300 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {category.description}
                                    </p>
                                    <Button variant="link" asChild className="p-0 h-auto text-accent">
                                        <a href={`/produkte/${category.id}`} className="flex items-center gap-2">
                                            Produkte ansehen
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                Keine Kategorien gefunden. Versuchen Sie einen anderen Suchbegriff.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-section-lg bg-gradient-to-br from-accent to-accent-secondary">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="mb-6 text-white">Individuelle Beratung gewünscht?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Unsere Experten helfen Ihnen bei der Auswahl des perfekten Systems für Ihr Projekt.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <a href="/kontakt?type=beratung">Beratungstermin vereinbaren</a>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                <a href="/kontakt?type=katalog">Katalog anfordern</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProdukteList;
