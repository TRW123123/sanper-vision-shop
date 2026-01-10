import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface StepDimensionsProps {
    value: { width: number; projection: number };
    onChange: (value: { width: number; projection: number }) => void;
}

export const StepDimensions = ({ value, onChange }: StepDimensionsProps) => {
    const handleWidthChange = (v: number[]) => onChange({ ...value, width: v[0] });
    const handleProjectionChange = (v: number[]) => onChange({ ...value, projection: v[0] });

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Wie groß ist Ihre Fläche?</h2>
                <p className="text-muted-foreground">Geben Sie die ungefähren Maße an (in cm).</p>
            </div>

            <div className="space-y-6">
                {/* Width Control */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg">Breite (cm)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={value.width}
                                onChange={(e) => onChange({ ...value, width: Number(e.target.value) })}
                                className="w-24 text-right"
                            />
                            <span className="text-muted-foreground">cm</span>
                        </div>
                    </div>
                    <Slider
                        value={[value.width]}
                        onValueChange={handleWidthChange}
                        min={200}
                        max={800}
                        step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>200 cm</span>
                        <span>800 cm</span>
                    </div>
                </div>

                {/* Projection Control */}
                <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg">Ausfall / Tiefe (cm)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={value.projection}
                                onChange={(e) => onChange({ ...value, projection: Number(e.target.value) })}
                                className="w-24 text-right"
                            />
                            <span className="text-muted-foreground">cm</span>
                        </div>
                    </div>
                    <Slider
                        value={[value.projection]}
                        onValueChange={handleProjectionChange}
                        min={150}
                        max={700}
                        step={10}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>150 cm</span>
                        <span>700 cm</span>
                    </div>
                </div>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-8 text-sm text-muted-foreground text-center">
                <p>Hinweis: Wir fertigen millimetergenau. Dies sind nur Richtwerte für das Angebot.</p>
            </div>
        </div>
    );
};
