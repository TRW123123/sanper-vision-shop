import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Lightbulb, Wind, Sun, Shield } from "lucide-react";

interface StepExtrasProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const EXTRAS = [
    {
        id: "led",
        label: "LED Beleuchtung",
        description: "Integrierte Dimmbare LED-Stripes",
        icon: <Lightbulb className="w-6 h-6" />
    },
    {
        id: "heizung",
        label: "Infrarot-Heizung",
        description: "Für kühle Abende",
        icon: <Sun className="w-6 h-6" />
    },
    {
        id: "seiten",
        label: "Seitenelemente",
        description: "Glas oder Zip-Screen als Windschutz",
        icon: <Wind className="w-6 h-6" />
    },
    {
        id: "montage",
        label: "Montage gewünscht",
        description: "Inkl. Aufmaß durch unsere Profis",
        icon: <Shield className="w-6 h-6" />
    }
];

export const StepExtras = ({ value, onChange }: StepExtrasProps) => {
    const toggleExtra = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Besondere Wünsche?</h2>
                <p className="text-muted-foreground">Wählen Sie optionale Extras für Ihr Projekt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXTRAS.map((extra) => {
                    const isSelected = value.includes(extra.id);
                    return (
                        <div
                            key={extra.id}
                            className={cn(
                                "flex items-start space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50",
                                isSelected ? "border-primary bg-primary/5" : "border-border"
                            )}
                            onClick={() => toggleExtra(extra.id)}
                        >
                            <div className={cn(
                                "p-2 rounded-lg",
                                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {extra.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{extra.label}</h3>
                                    <Checkbox checked={isSelected} className="pointer-events-none" />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{extra.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
