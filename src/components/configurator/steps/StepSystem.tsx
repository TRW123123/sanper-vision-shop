import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { Wind, Droplets, Zap } from "lucide-react";

interface StepSystemProps {
    category: string;
    value: string;
    onChange: (productId: string) => void;
}

export const StepSystem = ({ category, value, onChange }: StepSystemProps) => {
    const filtered = products.filter(p => p.kategorie === category);

    if (!category) {
        return (
            <div className="text-center text-muted-foreground py-12">
                Bitte wählen Sie zuerst eine Kategorie.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Welches System passt zu Ihnen?</h2>
                <p className="text-muted-foreground">
                    {filtered.length} Systeme in der Kategorie <strong>{category}</strong>.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => {
                    const selected = value === `p${p.id}`;
                    const img = p.bilder?.[0] ?? "/images/products/bioclimatic-pergola.png";
                    return (
                        <button
                            type="button"
                            key={p.id}
                            onClick={() => onChange(`p${p.id}`)}
                            className={cn(
                                "text-left rounded-xl border-2 transition-all overflow-hidden group bg-card",
                                selected
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                <img
                                    src={img}
                                    alt={p.produktname}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="font-semibold text-sm leading-tight">{p.produktname}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {p.kurzbeschreibung}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-muted-foreground">
                                    {p.motorisierung && (
                                        <span className="inline-flex items-center gap-1">
                                            <Zap className="w-3 h-3" /> Motorisiert
                                        </span>
                                    )}
                                    {p.windschutz && p.windschutz !== "—" && (
                                        <span className="inline-flex items-center gap-1">
                                            <Wind className="w-3 h-3" /> {p.windschutz}
                                        </span>
                                    )}
                                    {p.wasserschutz === "Ja" && (
                                        <span className="inline-flex items-center gap-1">
                                            <Droplets className="w-3 h-3" /> Wasserdicht
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
