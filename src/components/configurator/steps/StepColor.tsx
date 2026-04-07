import { cn } from "@/lib/utils";
import { COLOR_OPTIONS } from "@/lib/configurator-options";
import { Check } from "lucide-react";

interface StepColorProps {
    value: string;
    onChange: (id: string) => void;
}

export const StepColor = ({ value, onChange }: StepColorProps) => {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Welche Farbe soll es sein?</h2>
                <p className="text-muted-foreground">
                    RAL-Klassik ohne Aufpreis. Sonderfarben besprechen wir im persönlichen Angebot.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {COLOR_OPTIONS.map(c => {
                    const selected = value === c.id;
                    return (
                        <button
                            type="button"
                            key={c.id}
                            onClick={() => onChange(c.id)}
                            className={cn(
                                "group rounded-xl border-2 transition-all overflow-hidden bg-card text-left",
                                selected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                            )}
                        >
                            <div
                                className="h-24 w-full relative"
                                style={{ backgroundColor: c.hex }}
                            >
                                {selected && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/90 text-primary rounded-full p-1.5 shadow-lg">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <div className="font-semibold text-sm">{c.label}</div>
                                <div className="text-xs text-muted-foreground">{c.ral}</div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
