import { MessageSquare, PenTool, Factory, CheckCircle } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Beratung",
      description:
        "Individuelle Analyse Ihrer Anforderungen und architektonischen Gegebenheiten. Wir entwickeln gemeinsam die optimale Lösung.",
    },
    {
      icon: PenTool,
      title: "Planung",
      description:
        "Detaillierte technische Planung mit 3D-Visualisierung. Berücksichtigung aller statischen und bauphysikalischen Anforderungen.",
    },
    {
      icon: Factory,
      title: "Fertigung",
      description:
        "Maßgenaue Produktion in unseren Fertigungsstätten. Qualitätskontrolle nach höchsten Standards für langlebige Systeme.",
    },
    {
      icon: CheckCircle,
      title: "Montage",
      description:
        "Professionelle Installation durch geschulte Fachpartner. Einweisung in Bedienung und Wartung sowie umfassende Dokumentation.",
    },
  ];

  return (
    <section className="py-section-lg bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="mb-4">Ihr Weg zum perfekten System</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von der ersten Idee bis zur finalen Installation begleiten wir Sie professionell
            durch jeden Schritt Ihres Projekts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="pt-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-accent/20 text-accent">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
