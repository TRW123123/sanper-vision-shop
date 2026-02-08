import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const TESTIMONIALS = [
    {
        name: "Berkcan Inci",
        role: "Terrassen-Projekt",
        content: "Die Schattenlösung für unsere Terrasse hat unsere Erwartungen weit übertroffen. Material, Motorqualität und Verarbeitung waren erstklassig.",
        rating: 5
    },
    {
        name: "Y.B YSN OTO ELEKTRİK",
        role: "Gewerbekunde",
        content: "Wir haben Zip-Screens für unseren Bürogarten installieren lassen – wirkt drinnen wie eine Klimaanlage. Bei Beschattungssystemen schaue ich nach keiner anderen Firma mehr.",
        rating: 5
    },
    {
        name: "Hüseyin Altan Yildirim",
        role: "Gastronomie",
        content: "Wir haben Pergola und Guillotine-Glas für unseren Betrieb machen lassen. Sie waren sowohl beim Aufmaß als auch bei der Montage sehr engagiert.",
        rating: 5
    },
    {
        name: "Yasemin Saribuga",
        role: "Privatkunde",
        content: "Wir haben eine bioklimatische Pergola und ein Zip-Screen-System installieren lassen. Sowohl die Produktqualität als auch das Montageteam waren perfekt.",
        rating: 5
    },
    {
        name: "Elvan Saka",
        role: "Terrassen-Projekt",
        content: "Bioklimatische Pergola auf unserer Terrasse – das Ergebnis ist großartig! Sowohl ästhetisch als auch funktional. Das Montageteam war sehr professionell.",
        rating: 5
    },
    {
        name: "Selim Yavuz",
        role: "Verglasungssysteme",
        content: "Kundenbeziehungen, Preis-Leistung und Ausführungsqualität sind perfekt. Besonders im Bereich Windschutz-Glassysteme sehr erfolgreich.",
        rating: 5
    }
];

export const SocialProof = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Kundenstimmen zur Sanper Qualität</h2>
                    <p className="text-muted-foreground text-lg">Echtes Feedback zu Sanper Systemen & Produktion</p>
                </div>

                <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {TESTIMONIALS.map((t, i) => (
                            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 p-4">
                                <Card className="h-full border-none shadow-md">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground mb-6 flex-grow italic">"{t.content}"</p>
                                        <div className="flex items-center gap-3 mt-auto">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{t.name}</p>
                                                <p className="text-xs text-muted-foreground">{t.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};
