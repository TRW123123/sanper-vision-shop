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
        name: "Michael Weber",
        role: "Hausbesitzer in Köln",
        content: "Die bioclimatische Pergola hat unsere Terrasse komplett verwandelt. Endlich können wir auch bei Regen draußen sitzen. Die Beratung war top!",
        rating: 5
    },
    {
        name: "Sabine Müller",
        role: "Gastronomin",
        content: "Für unser Café brauchten wir eine flexible Lösung. Die Guillotine-Fenster sind ein echter Hingucker und unsere Gäste lieben es.",
        rating: 5
    },
    {
        name: "Thomas Klein",
        role: "Architekt",
        content: "Ich arbeite regelmäßig mit Sanper zusammen. Die Qualität der Systeme und die Zuverlässigkeit bei der Montage überzeugen mich jedes Mal.",
        rating: 5
    },
    {
        name: "Familie Richter",
        role: "Privatkunden",
        content: "Von der Planung bis zur Montage lief alles reibungslos. Das Team war pünktlich, sauber und sehr freundlich. Klare Weiterempfehlung!",
        rating: 5
    }
];

export const SocialProof = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Was unsere Kunden sagen</h2>
                    <p className="text-muted-foreground text-lg">Echte Meinungen zu unseren Projekten</p>
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
