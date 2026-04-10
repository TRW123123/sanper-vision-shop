import { cn } from "@/lib/utils";
import { CONFIGURATOR_CATEGORIES } from "@/lib/configurator-options";

interface StepCategoryProps {
    value: string;
    onChange: (value: string) => void;
}

export const StepCategory = ({ value, onChange }: StepCategoryProps) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welches System interessiert Sie?</h2>
                <p className="text-muted-foreground">
                    Wählen Sie eine Kategorie. Im nächsten Schritt sehen Sie alle verfügbaren Systeme.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CONFIGURATOR_CATEGORIES.map((cat) => (
                    <button
                        type="button"
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        className={cn(
                            "text-left rounded-xl border-2 transition-all duration-200 overflow-hidden group bg-card",
                            value === cat.id
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-border hover:border-primary/50"
                        )}
                    >
                        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                            <img
                                src={cat.image}
                                alt={cat.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                style={cat.imagePosition ? { objectPosition: cat.imagePosition } : undefined}
                            />
                            {value === cat.id && (
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-1">{cat.label}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
