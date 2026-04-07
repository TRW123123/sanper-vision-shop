import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { StepType } from "./steps/StepType";
import { StepDimensions } from "./steps/StepDimensions";
import { StepExtras } from "./steps/StepExtras";
import { StepContact } from "./steps/StepContact";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadPricing, calculatePrice, formatEUR, type PricingTable } from "@/lib/pricing";

export type ConfiguratorState = {
    step: number;
    productType: string;
    dimensions: { width: number; projection: number };
    extras: string[];
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        zip: string;
        message: string;
    };
};

const INITIAL_STATE: ConfiguratorState = {
    step: 1,
    productType: "",
    dimensions: { width: 300, projection: 250 },
    extras: [],
    contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zip: "",
        message: ""
    }
};

export const Configurator = () => {
    const [state, setState] = useState<ConfiguratorState>(INITIAL_STATE);
    const [pricing, setPricing] = useState<PricingTable | null>(null);
    const { toast } = useToast();

    // Load pricing CSV once on mount
    useEffect(() => {
        loadPricing().then(setPricing).catch(err => {
            console.error("Pricing load failed:", err);
        });
    }, []);

    // Live price calculation
    const price = useMemo(() => {
        if (!pricing || !state.productType) return null;
        return calculatePrice(pricing, {
            productType: state.productType,
            widthCm: state.dimensions.width,
            projectionCm: state.dimensions.projection,
            extras: state.extras,
        });
    }, [pricing, state.productType, state.dimensions, state.extras]);

    const updateState = (updates: Partial<ConfiguratorState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (state.step === 1 && !state.productType) {
            toast({ title: "Bitte wählen Sie einen Produkttyp", variant: "destructive" });
            return;
        }
        // Validation for contact step could go here
        setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
    };

    const prevStep = () => {
        setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("form-name", "konfigurator");
        formData.append("productType", state.productType);
        formData.append("width", state.dimensions.width.toString());
        formData.append("projection", state.dimensions.projection.toString());
        formData.append("extras", state.extras.join(", "));
        formData.append("firstName", state.contact.firstName);
        formData.append("lastName", state.contact.lastName);
        formData.append("email", state.contact.email);
        formData.append("phone", state.contact.phone);
        formData.append("zip", state.contact.zip);
        formData.append("message", state.contact.message);
        if (price) {
            formData.append("priceMin", Math.round(price.min).toString());
            formData.append("priceMax", Math.round(price.max).toString());
        }

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });

            toast({
                title: "Anfrage erfolgreich gesendet!",
                description: "Wir haben Ihre Konfiguration erhalten und melden uns in Kürze.",
            });
        } catch (error) {
            toast({
                title: "Fehler beim Senden",
                description: "Bitte versuchen Sie es später erneut.",
                variant: "destructive"
            });
        }
    };

    const renderStep = () => {
        switch (state.step) {
            case 1:
                return <StepType value={state.productType} onChange={(v) => updateState({ productType: v })} />;
            case 2:
                return <StepDimensions value={state.dimensions} onChange={(v) => updateState({ dimensions: v })} />;
            case 3:
                return <StepExtras value={state.extras} onChange={(v) => updateState({ extras: v })} />;
            case 4:
                return <StepContact value={state.contact} onChange={(v) => updateState({ contact: v })} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    const progress = (state.step / 4) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Progress Bar */}
            <div className="mb-8 relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="absolute left-0 top-0 h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="mb-8 flex justify-between text-sm font-medium text-muted-foreground">
                <span className={state.step >= 1 ? "text-primary" : ""}>1. Typ</span>
                <span className={state.step >= 2 ? "text-primary" : ""}>2. Maße</span>
                <span className={state.step >= 3 ? "text-primary" : ""}>3. Ausstattung</span>
                <span className={state.step >= 4 ? "text-primary" : ""}>4. Kontakt</span>
            </div>

            {/* Live Price Range — driven by /pricing.csv
                Toggle: setze in pricing.csv die Zeile `config,show_live_price,...,bool,1`
                um die Anzeige zu aktivieren. Engine berechnet bereits jetzt im Hintergrund. */}
            {price && pricing?.config["show_live_price"]?.price === 1 && (
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                            Geschätzte Preisspanne
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-primary">
                            {formatEUR(price.min)} – {formatEUR(price.max)}
                        </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground hidden sm:block max-w-[200px]">
                        Unverbindlicher Richtwert. Finaler Preis nach Aufmaß.
                    </div>
                </div>
            )}

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state.step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>

            <div className="mt-8 flex justify-between">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={state.step === 1}
                    className={state.step === 1 ? "invisible" : ""}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Zurück
                </Button>

                {state.step < 4 ? (
                    <Button onClick={nextStep}>
                        Weiter
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Anfrage absenden
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};
