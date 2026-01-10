import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PROJECTS = [
    {
        image: "/images/products/bioclimatic-pergola.png",
        title: "Moderne Villa in Düsseldorf",
        category: "Bioclimatic Pergola"
    },
    {
        image: "/images/products/guillotine-glass.png",
        title: "Penthouse Terrasse",
        category: "Glassysteme"
    },
    {
        image: "/images/products/zip-screen.png",
        title: "Bürogebäude Sonnenschutz",
        category: "Zip-Markisen"
    },
    // Reusing existing images to simulate diverse gallery (in reality we would need more unique images)
    {
        image: "/images/products/bioclimatic-pergola.png",
        title: "Gartenlounge München",
        category: "Bioclimatic Pergola"
    }
];

export const ProjectGallery = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Inspiration & Referenzen</h2>
                    <p className="text-muted-foreground text-lg">Entdecken Sie realisierte Projekte</p>
                </div>

                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>
                        {PROJECTS.map((project, i) => (
                            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-2">
                                    <Card className="overflow-hidden border-none shadow-none group cursor-pointer">
                                        <CardContent className="p-0 relative aspect-[3/4] rounded-xl overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <p className="text-accent text-sm font-medium mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.category}</p>
                                                <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
};
