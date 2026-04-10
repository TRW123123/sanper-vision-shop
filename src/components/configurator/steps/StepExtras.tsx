import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getExtrasForCategory } from "@/lib/configurator-options";
import { Lightbulb, Flame, Wind, Smartphone, Bug, Wrench, ShieldCheck, Fingerprint, Zap } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
    led: <Lightbulb className="w-5 h-5" />,
    heizung: <Flame className="w-5 h-5" />,
    seiten: <Wind className="w-5 h-5" />,
    smarthome: <Smartphone className="w-5 h-5" />,
    insektenschutz: <Bug className="w-5 h-5" />,
    einbruchschutz: <ShieldCheck className="w-5 h-5" />,
    fingerprint: <Fingerprint className="w-5 h-5" />,
    antrieb: <Zap className="w-5 h-5" />,
    montage: <Wrench className="w-5 h-5" />,
};

interface StepExtrasProps {
    category: string;
    value: string[];
    onChange: (value: string[]) => void;
}

export const StepExtras = ({ category, value, onChange }: StepExtrasProps) => {
    const available = getExtrasForCategory(category);

    const toggle = (id: string) => {
        if (value.includes(id)) onChange(value.filter(v => v !== id));
        else onChange([...value, id]);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Welche Ausstattung wünschen Sie?</h2>
                <p className="text-muted-foreground">
                    Optionale Extras — alles einzeln abwählbar, nichts ist Pflicht.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {available.map(extra => {
                    const selected = value.includes(extra.id);
                    return (
                        <button
                            type="button"
                            key={extra.id}
                            onClick={() => toggle(extra.id)}
                            className={cn(
                                "flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all",
                                selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg shrink-0",
                                selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                                {ICONS[extra.id] ?? <Lightbulb className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm">{extra.label}</h3>
                                    <Checkbox checked={selected} className="pointer-events-none" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {extra.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
