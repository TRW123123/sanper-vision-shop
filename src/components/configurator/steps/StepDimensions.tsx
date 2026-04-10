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
    category: string;
    value: Dimensions;
    situation: string;
    onChange: (value: Dimensions) => void;
    onSituationChange: (v: string) => void;
}

// Kategorie-spezifische Konfiguration für Maße und Situation
type DimensionField = {
    key: keyof Dimensions;
    label: string;
    min: number;
    max: number;
    step: number;
    unit: string;
};

type CategoryConfig = {
    title: string;
    subtitle: string;
    fields: DimensionField[];
    showSituation: boolean;
    situationLabel?: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    "Pergola-Systeme": {
        title: "Maße und Einbausituation",
        subtitle: "Definieren Sie die Fläche Ihrer Pergola und wo sie stehen soll.",
        fields: [
            { key: "width", label: "Breite", min: 200, max: 800, step: 10, unit: "cm" },
            { key: "projection", label: "Tiefe / Ausfall", min: 150, max: 700, step: 10, unit: "cm" },
            { key: "height", label: "Durchgangshöhe", min: 220, max: 400, step: 5, unit: "cm" },
        ],
        showSituation: true,
    },
    "Verglasungssysteme": {
        title: "Maße und Einbausituation",
        subtitle: "Wie groß soll Ihr Wintergarten oder Ihre Verglasung werden?",
        fields: [
            { key: "width", label: "Breite (Front)", min: 200, max: 1200, step: 10, unit: "cm" },
            { key: "projection", label: "Tiefe", min: 200, max: 800, step: 10, unit: "cm" },
            { key: "height", label: "Höhe (Traufe)", min: 220, max: 400, step: 5, unit: "cm" },
        ],
        showSituation: true,
    },
    "Textile Beschattung": {
        title: "Maße Ihrer Beschattung",
        subtitle: "Breite und Ausfall des zu beschattenden Bereichs.",
        fields: [
            { key: "width", label: "Breite", min: 100, max: 600, step: 10, unit: "cm" },
            { key: "projection", label: "Ausfall / Tuchfläche", min: 100, max: 500, step: 10, unit: "cm" },
        ],
        showSituation: false,
    },
    "Tür & Tor Systeme": {
        title: "Maße Ihrer Tür oder Ihres Tores",
        subtitle: "Lichte Durchgangsbreite und -höhe der Öffnung.",
        fields: [
            { key: "width", label: "Durchgangsbreite", min: 80, max: 800, step: 5, unit: "cm" },
            { key: "height", label: "Durchgangshöhe", min: 200, max: 600, step: 5, unit: "cm" },
        ],
        showSituation: false,
    },
};

const DEFAULT_CONFIG: CategoryConfig = {
    title: "Maße",
    subtitle: "Ungefähre Abmessungen in Zentimetern.",
    fields: [
        { key: "width", label: "Breite", min: 200, max: 800, step: 10, unit: "cm" },
        { key: "projection", label: "Tiefe", min: 150, max: 700, step: 10, unit: "cm" },
        { key: "height", label: "Höhe", min: 220, max: 400, step: 5, unit: "cm" },
    ],
    showSituation: true,
};

export const StepDimensions = ({ category, value, situation, onChange, onSituationChange }: StepDimensionsProps) => {
    const config = CATEGORY_CONFIG[category] ?? DEFAULT_CONFIG;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
                <p className="text-muted-foreground">{config.subtitle}</p>
            </div>

            {/* Dimension Fields */}
            {config.fields.map((field, i) => (
                <div key={field.key} className={cn("space-y-3", i > 0 && "pt-4 border-t border-border/50")}>
                    <div className="flex justify-between items-center">
                        <Label className="text-base">{field.label}</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={value[field.key]}
                                onChange={(e) => onChange({ ...value, [field.key]: Number(e.target.value) })}
                                className="w-24 text-right"
                            />
                            <span className="text-muted-foreground text-sm">{field.unit}</span>
                        </div>
                    </div>
                    <Slider
                        value={[value[field.key]]}
                        onValueChange={(v) => onChange({ ...value, [field.key]: v[0] })}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                    />
                </div>
            ))}

            {/* Einbausituation — nur wenn für diese Kategorie relevant */}
            {config.showSituation && (
                <div className="space-y-3 pt-4 border-t border-border/50">
                    <Label className="text-base">{config.situationLabel ?? "Einbausituation"}</Label>
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
            )}

            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground text-center">
                <p>Wir fertigen millimetergenau. Dies sind Richtwerte für Ihr unverbindliches Angebot.</p>
            </div>
        </div>
    );
};
