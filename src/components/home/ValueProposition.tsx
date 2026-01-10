import { Ruler, CloudSun, Wrench } from "lucide-react";

const ValueProposition = () => {
  const values = [
    {
      icon: Ruler,
      title: "Maßfertigung",
      description:
        "Jedes System wird individuell nach Ihren Anforderungen und architektonischen Vorgaben gefertigt. Millimetergenaue Planung für perfekte Integration.",
    },
    {
      icon: CloudSun,
      title: "Wetterbeständigkeit",
      description:
        "Hochwertige Materialien und geprüfte Konstruktionen trotzen Wind, Regen und UV-Strahlung. Langlebigkeit durch deutsche Ingenieurskunst.",
    },
    {
      icon: Wrench,
      title: "Premium-Montage",
      description:
        "Professionelle Installation durch geschulte Fachpartner. Vom ersten Aufmaß bis zur finalen Abnahme – alles aus einer Hand.",
    },
  ];

  return (
    <section className="py-section bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
