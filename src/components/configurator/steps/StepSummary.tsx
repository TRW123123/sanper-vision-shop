import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/products";
import {
    CONFIGURATOR_CATEGORIES,
    COLOR_OPTIONS,
    SITUATION_OPTIONS,
    EXTRA_OPTIONS,
} from "@/lib/configurator-options";

type Contact = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zip: string;
    message: string;
};

interface StepSummaryProps {
    category: string;
    productId: string;
    dimensions: { width: number; projection: number; height: number };
    situation: string;
    color: string;
    extras: string[];
    contact: Contact;
    onContactChange: (c: Contact) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const StepSummary = ({
    category, productId, dimensions, situation, color, extras, contact, onContactChange, onSubmit
}: StepSummaryProps) => {
    const cat = CONFIGURATOR_CATEGORIES.find(c => c.id === category);
    const product = products.find(p => `p${p.id}` === productId);
    const col = COLOR_OPTIONS.find(c => c.id === color);
    const sit = SITUATION_OPTIONS.find(s => s.id === situation);
    const extraLabels = extras
        .map(id => EXTRA_OPTIONS.find(e => e.id === id)?.label)
        .filter(Boolean) as string[];

    const handle = (key: keyof Contact, v: string) =>
        onContactChange({ ...contact, [key]: v });

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Zusammenfassung &amp; Kontakt</h2>
                <p className="text-muted-foreground">
                    Prüfen Sie Ihre Auswahl und senden Sie uns die Anfrage. Sie erhalten innerhalb von 24 Stunden eine persönliche Rückmeldung.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Summary */}
                <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3 text-sm">
                    <h3 className="font-semibold text-base mb-2">Ihre Konfiguration</h3>

                    <SummaryRow label="Kategorie" value={cat?.label ?? "—"} />
                    <SummaryRow label="System" value={product?.produktname ?? "—"} />
                    <SummaryRow
                        label="Maße"
                        value={`${dimensions.width} × ${dimensions.projection} × ${dimensions.height} cm`}
                    />
                    <SummaryRow label="Einbausituation" value={sit?.label ?? "—"} />
                    <SummaryRow
                        label="Farbe"
                        value={
                            col ? (
                                <span className="inline-flex items-center gap-2">
                                    <span
                                        className="inline-block w-4 h-4 rounded border border-border"
                                        style={{ backgroundColor: col.hex }}
                                    />
                                    {col.label} ({col.ral})
                                </span>
                            ) : "—"
                        }
                    />
                    <SummaryRow
                        label="Extras"
                        value={extraLabels.length > 0 ? extraLabels.join(", ") : "Keine"}
                    />
                </div>

                {/* Contact Form */}
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="firstName">Vorname *</Label>
                            <Input id="firstName" required value={contact.firstName}
                                onChange={e => handle("firstName", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="lastName">Nachname *</Label>
                            <Input id="lastName" required value={contact.lastName}
                                onChange={e => handle("lastName", e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input id="email" type="email" required value={contact.email}
                            onChange={e => handle("email", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input id="phone" type="tel" value={contact.phone}
                                onChange={e => handle("phone", e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="zip">PLZ</Label>
                            <Input id="zip" value={contact.zip}
                                onChange={e => handle("zip", e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="message">Nachricht (optional)</Label>
                        <Textarea id="message" rows={3} value={contact.message}
                            onChange={e => handle("message", e.target.value)} />
                    </div>
                </form>
            </div>
        </div>
    );
};

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4 py-1 border-b border-border/50 last:border-0">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    );
}
