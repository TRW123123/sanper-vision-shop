import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SITUATION_OPTIONS } from "@/lib/configurator-options";

export type Dimensions = {
    width: number;
    projection: number;
    height: number;
};

interface StepDimensionsProps {
    value: Dimensions;
    situation: string;
    onChange: (value: Dimensions) => void;
    onSituationChange: (v: string) => void;
}

export const StepDimensions = ({ value, situation, onChange, onSituationChange }: StepDimensionsProps) => {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Wie groß und wo?</h2>
                <p className="text-muted-foreground">Maße in Zentimetern — wir fertigen später millimetergenau.</p>
            </div>

            {/* Breite */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label className="text-base">Breite</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={value.width}
                            onChange={(e) => onChange({ ...value, width: Number(e.target.value) })}
                            className="w-24 text-right"
                        />
                        <span className="text-muted-foreground text-sm">cm</span>
                    </div>
                </div>
                <Slider
                    value={[value.width]}
                    onValueChange={(v) => onChange({ ...value, width: v[0] })}
                    min={200} max={800} step={10}
                />
            </div>

            {/* Tiefe */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label className="text-base">Tiefe / Ausfall</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={value.projection}
                            onChange={(e) => onChange({ ...value, projection: Number(e.target.value) })}
                            className="w-24 text-right"
                        />
                        <span className="text-muted-foreground text-sm">cm</span>
                    </div>
                </div>
                <Slider
                    value={[value.projection]}
                    onValueChange={(v) => onChange({ ...value, projection: v[0] })}
                    min={150} max={700} step={10}
                />
            </div>

            {/* Höhe */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label className="text-base">Höhe</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={value.height}
                            onChange={(e) => onChange({ ...value, height: Number(e.target.value) })}
                            className="w-24 text-right"
                        />
                        <span className="text-muted-foreground text-sm">cm</span>
                    </div>
                </div>
                <Slider
                    value={[value.height]}
                    onValueChange={(v) => onChange({ ...value, height: v[0] })}
                    min={220} max={400} step={5}
                />
            </div>

            {/* Einbausituation */}
            <div className="space-y-3 pt-4 border-t border-border/50">
                <Label className="text-base">Einbausituation</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SITUATION_OPTIONS.map(opt => (
                        <button
                            type="button"
                            key={opt.id}
                            onClick={() => onSituationChange(opt.id)}
                            className={cn(
                                "text-left p-4 rounded-xl border-2 transition-all",
                                situation === opt.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            <div className="font-semibold text-sm mb-1">{opt.label}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                                {opt.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
