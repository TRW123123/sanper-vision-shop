import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      title: "Bioclimatic Pergolen: Intelligente Klimasteuerung für Außenbereiche",
      excerpt:
        "Wie drehbare Lamellensysteme für optimale Beschattung und Belüftung sorgen. Ein Überblick über Technik und Einsatzmöglichkeiten.",
      category: "Produktwissen",
      date: "2024-01-15",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    },
    {
      title: "Ganzjährige Terrassennutzung: Verglasung und Beschattung kombinieren",
      excerpt:
        "Strategien zur Gestaltung von Außenbereichen, die bei jedem Wetter genutzt werden können. Fallbeispiele aus der Gastronomie.",
      category: "Planung",
      date: "2024-01-08",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    },
    {
      title: "ZIP-Screen vs. klassische Markise: Vor- und Nachteile im Vergleich",
      excerpt:
        "Welches System eignet sich für welchen Einsatz? Eine detaillierte Gegenüberstellung der textilen Beschattungslösungen.",
      category: "Vergleich",
      date: "2024-01-02",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    },
    {
      title: "Wartung und Pflege von Pergola-Systemen",
      excerpt:
        "Tipps zur Reinigung und Instandhaltung für maximale Lebensdauer. Was ist zu beachten und wann sollte ein Fachmann ran?",
      category: "Wartung",
      date: "2023-12-20",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="mb-6">Blog</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Wissenswertes rund um Beschattung, Verglasung und Außenraumgestaltung. 
                Produktinfos, Planungstipps und Branchennews.
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-section-lg">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-medium transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <Link
                      to="#"
                      className="inline-block text-accent hover:underline"
                    >
                      Weiterlesen →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
