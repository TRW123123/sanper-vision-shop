import { ShieldCheck, Award, ThumbsUp, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TrustBadges = () => {
    const badges = [
        {
            icon: <ShieldCheck className="h-8 w-8 text-accent" />,
            title: "5 Jahre Garantie",
            description: "Auf alle Systeme & Motoren"
        },
        {
            icon: <Award className="h-8 w-8 text-accent" />,
            title: "Premium Qualität",
            description: "Zertifizierte Standards"
        },
        {
            icon: <ThumbsUp className="h-8 w-8 text-accent" />,
            title: "Profimontage",
            description: "Durch geschultes Fachpersonal"
        },
        {
            icon: <Truck className="h-8 w-8 text-accent" />,
            title: "Bundesweit",
            description: "Lieferung & Montage"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {badges.map((badge, index) => (
                <Card key={index} className="border-none shadow-sm bg-background/50">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                        <div className="p-2 bg-accent/5 rounded-full">
                            {badge.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">{badge.title}</h3>
                            <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
