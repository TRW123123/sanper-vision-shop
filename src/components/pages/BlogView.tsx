import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const BlogView = () => {
    const articles = [
        {
            title: "Aluminium oder Holz: Das richtige Material für Ihre Terrassenüberdachung",
            excerpt:
                "EN AW-6060 vs. Holz vs. Polycarbonat — ein faktenbasierter Materialvergleich für langlebige Terrassenüberdachungen. Wartung, Kosten und Langlebigkeit im Vergleich.",
            category: "Material",
            date: "2026-03-10",
            readTime: "5 min",
            image: "/images/pergola-systeme-terrasse-aluminium-festdach-b2c-hero-01.jpg",
            href: "/ratgeber/aluminium-vs-holz-terrassenueberdachung/",
        },
        {
            title: "Terrassenüberdachung: Kosten pro m² realistisch kalkulieren",
            excerpt:
                "Von Festdach bis bioklimatisches Lamellendach — was kostet eine Terrassenüberdachung wirklich? Preise pro m², versteckte Kosten und Import-Vergleich.",
            category: "Kosten",
            date: "2026-03-10",
            readTime: "7 min",
            image: "/images/pergola-systeme-terrasse-lamellendach-b2c-hero-02.jpg",
            href: "/ratgeber/kosten-preise-terrassenueberdachung/",
        },
        {
            title: "Schneelast, Windlast & Statik bei Lamellendächern",
            excerpt:
                "Schneelastzonen, Windklassen und DIN-Normen: Welche statischen Anforderungen muss ein Premium-Lamellendach erfüllen? Mit konkreten Werten und Normenverweisen.",
            category: "Technik",
            date: "2026-03-10",
            readTime: "8 min",
            image: "/images/pergola-systeme-garten-aluminium-festdach-b2c-hero-02.jpg",
            href: "/ratgeber/schneelast-windlast-statik-lamellendach/",
        },
        {
            title: "Montage an WDVS-Fassade: Fundamente, Anker und Kältebrücken",
            excerpt:
                "Warum die Montage an gedämmten Fassaden besonderes Know-how erfordert — und wie thermisch getrennte Ankersysteme Schimmel und Bauschäden verhindern.",
            category: "Montage",
            date: "2026-03-10",
            readTime: "6 min",
            image: "/images/pergola-systeme-terrasse-lamellendach-zip-screen-b2c-detail-01.jpg",
            href: "/ratgeber/montage-wdvs-fassade-fundament/",
        },
        {
            title: "Baugenehmigung für Terrassenüberdachungen in NRW",
            excerpt:
                "Wann ist eine Baugenehmigung nötig und wann nicht? Die wichtigsten Regelungen der Landesbauordnung NRW für Pergolen und Wintergärten.",
            category: "Recht",
            date: "2026-03-10",
            readTime: "5 min",
            image: "/images/pergola-systeme-garten-aluminium-festdach-b2c-hero-03.jpg",
            href: "/ratgeber/baugenehmigung-terrassenueberdachung-nrw/",
        },
        {
            title: "Glasschiebewand & Giyotin-Systeme für den Wintergarten",
            excerpt:
                "ESG-Sicherheitsglas, Laufschienen und motorisierte Guillotine-Verglasung: Technik und Einsatz moderner Verglasungssysteme erklärt.",
            category: "Verglasung",
            date: "2026-03-10",
            readTime: "7 min",
            image: "/images/pergola-systeme-gewerbe-glas-schiebesystem-b2b-hero-03.jpg",
            href: "/ratgeber/glasschiebewand-giyotin-wintergarten/",
        },
        {
            title: "Smart Home Steuerung für Lamellendächer",
            excerpt:
                "Somfy, Tahoma und Sensorsteuerung: Wie sich Lamellendächer intelligent in Ihr Smart Home integrieren lassen.",
            category: "Smart Home",
            date: "2026-03-10",
            readTime: "5 min",
            image: "/images/pergola-systeme-garten-lamellendach-led-b2c-hero-03.jpg",
            href: "/ratgeber/steuerung-smart-home-lamellendach/",
        },
        {
            title: "ZIP-Screen Technik: Windfestigkeit & Energieeffizienz",
            excerpt:
                "z-LOCK Reißverschlusstechnik, Windklasse 6 und g_tot-Werte: Warum ZIP-Screens klassische Markisen technisch überlegen sind.",
            category: "Beschattung",
            date: "2026-03-10",
            readTime: "6 min",
            image: "/images/pergola-systeme-terrasse-tavan-zip-screen-b2c-hero-01.jpg",
            href: "/ratgeber/zip-screen-technik-energieeffizienz/",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="py-20 lg:py-32 bg-muted/30">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="mb-6">Ratgeber & Fachwissen</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Faktenbasierte Ratgeber zu Technik, Material, Kosten und Planung.
                            Damit Sie fundiert entscheiden können — bevor Sie Angebote vergleichen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles */}
            <section className="py-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {articles.map((article, index) => (
                            <a
                                key={index}
                                href={article.href}
                                className="group block"
                            >
                                <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge>{article.category}</Badge>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(article.date).toLocaleDateString("de-DE")}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {article.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        <span className="inline-block text-accent group-hover:underline">
                                            Weiterlesen →
                                        </span>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogView;
