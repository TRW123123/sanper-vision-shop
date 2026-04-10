import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { StepCategory } from "./steps/StepCategory";
import { StepSystem } from "./steps/StepSystem";
import { StepDimensions } from "./steps/StepDimensions";
import { StepColor } from "./steps/StepColor";
import { StepExtras } from "./steps/StepExtras";
import { StepSummary } from "./steps/StepSummary";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadPricing, calculatePrice, formatEUR, type PricingTable } from "@/lib/pricing";

export type ConfiguratorState = {
    step: number;
    category: string;
    productId: string;
    dimensions: { width: number; projection: number; height: number };
    situation: string;
    color: string;
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

const TOTAL_STEPS = 6;

const STEP_LABELS = [
    "Kategorie",
    "System",
    "Maße",
    "Farbe",
    "Extras",
    "Kontakt",
];

const INITIAL_STATE: ConfiguratorState = {
    step: 1,
    category: "",
    productId: "",
    dimensions: { width: 400, projection: 300, height: 250 },
    situation: "",
    color: "",
    extras: [],
    contact: { firstName: "", lastName: "", email: "", phone: "", zip: "", message: "" },
};

export const Configurator = () => {
    const [state, setState] = useState<ConfiguratorState>(INITIAL_STATE);
    const [pricing, setPricing] = useState<PricingTable | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const scrollToTop = useCallback(() => {
        setTimeout(() => {
            containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
    }, []);

    useEffect(() => {
        loadPricing().then(setPricing).catch(err => console.error("Pricing load failed:", err));
    }, []);

    const update = (u: Partial<ConfiguratorState>) => setState(prev => ({ ...prev, ...u }));

    const price = useMemo(() => {
        if (!pricing || !state.productId) return null;
        return calculatePrice(pricing, {
            productType: state.productId,
            widthCm: state.dimensions.width,
            projectionCm: state.dimensions.projection,
            extras: state.extras,
        });
    }, [pricing, state.productId, state.dimensions, state.extras]);

    const canAdvance = (): { ok: boolean; reason?: string } => {
        switch (state.step) {
            case 1: return state.category ? { ok: true } : { ok: false, reason: "Bitte wählen Sie eine Kategorie." };
            case 2: return state.productId ? { ok: true } : { ok: false, reason: "Bitte wählen Sie ein System." };
            case 3: {
                const needsSituation = state.category === "Pergola-Systeme" || state.category === "Verglasungssysteme";
                return (!needsSituation || state.situation) ? { ok: true } : { ok: false, reason: "Bitte wählen Sie die Einbausituation." };
            }
            case 4: return state.color ? { ok: true } : { ok: false, reason: "Bitte wählen Sie eine Farbe." };
            default: return { ok: true };
        }
    };

    const next = () => {
        const check = canAdvance();
        if (!check.ok) {
            toast({ title: check.reason!, variant: "destructive" });
            return;
        }
        setState(prev => ({ ...prev, step: Math.min(prev.step + 1, TOTAL_STEPS) }));
        scrollToTop();
    };

    const prev = () => {
        setState(p => ({ ...p, step: Math.max(p.step - 1, 1) }));
        scrollToTop();
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!state.contact.firstName || !state.contact.lastName || !state.contact.email) {
            toast({ title: "Bitte füllen Sie Vorname, Nachname und E-Mail aus.", variant: "destructive" });
            return;
        }

        const formData = new URLSearchParams();
        formData.append("form-name", "konfigurator");
        formData.append("category", state.category);
        formData.append("productId", state.productId);
        formData.append("width", String(state.dimensions.width));
        formData.append("projection", String(state.dimensions.projection));
        formData.append("height", String(state.dimensions.height));
        formData.append("situation", state.situation);
        formData.append("color", state.color);
        formData.append("extras", state.extras.join(", "));
        formData.append("firstName", state.contact.firstName);
        formData.append("lastName", state.contact.lastName);
        formData.append("email", state.contact.email);
        formData.append("phone", state.contact.phone);
        formData.append("zip", state.contact.zip);
        formData.append("message", state.contact.message);
        if (price) {
            formData.append("priceMin", String(Math.round(price.min)));
            formData.append("priceMax", String(Math.round(price.max)));
        }

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString(),
            });
            toast({
                title: "Anfrage erfolgreich gesendet",
                description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
            });
        } catch {
            toast({ title: "Fehler beim Senden", description: "Bitte versuchen Sie es später erneut.", variant: "destructive" });
        }
    };

    const render = () => {
        switch (state.step) {
            case 1:
                return <StepCategory value={state.category} onChange={(v) => {
                    update({ category: v, productId: "" });
                    // Auto-advance to Step 2 after category selection
                    setTimeout(() => {
                        setState(p => ({ ...p, step: 2 }));
                        scrollToTop();
                    }, 300);
                }} />;
            case 2:
                return <StepSystem category={state.category} value={state.productId} onChange={(v) => update({ productId: v })} />;
            case 3:
                return (
                    <StepDimensions
                        category={state.category}
                        value={state.dimensions}
                        situation={state.situation}
                        onChange={(v) => update({ dimensions: v })}
                        onSituationChange={(v) => update({ situation: v })}
                    />
                );
            case 4:
                return <StepColor value={state.color} onChange={(v) => update({ color: v })} />;
            case 5:
                return <StepExtras category={state.category} value={state.extras} onChange={(v) => update({ extras: v })} />;
            case 6:
                return (
                    <StepSummary
                        category={state.category}
                        productId={state.productId}
                        dimensions={state.dimensions}
                        situation={state.situation}
                        color={state.color}
                        extras={state.extras}
                        contact={state.contact}
                        onContactChange={(c) => update({ contact: c })}
                        onSubmit={submit}
                    />
                );
            default:
                return null;
        }
    };

    const progress = (state.step / TOTAL_STEPS) * 100;

    return (
        <div ref={containerRef} className="w-full max-w-5xl mx-auto p-4">
            {/* Progress Bar */}
            <div className="mb-4 relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="absolute left-0 top-0 h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="mb-4 flex justify-between text-xs sm:text-sm font-medium text-muted-foreground overflow-x-auto">
                {STEP_LABELS.map((label, i) => {
                    const n = i + 1;
                    return (
                        <span
                            key={label}
                            className={state.step >= n ? "text-primary whitespace-nowrap px-1" : "whitespace-nowrap px-1"}
                        >
                            {n}. {label}
                        </span>
                    );
                })}
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
                <CardContent className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state.step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.12 }}
                        >
                            {render()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation inside card so it's always visible */}
                    <div className="mt-6 pt-4 border-t border-border/30 flex justify-between">
                <Button
                    variant="outline"
                    onClick={prev}
                    disabled={state.step === 1}
                    className={state.step === 1 ? "invisible" : ""}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Zurück
                </Button>

                {state.step < TOTAL_STEPS ? (
                    <Button onClick={next}>
                        Weiter
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={submit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Anfrage absenden
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
