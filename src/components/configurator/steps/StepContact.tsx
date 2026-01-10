import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepContactProps {
    value: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        zip: string;
        message: string;
    };
    onChange: (value: any) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const StepContact = ({ value, onChange, onSubmit }: StepContactProps) => {
    const handleChange = (key: string, v: string) => {
        onChange({ ...value, [key]: v });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Fast geschafft!</h2>
                <p className="text-muted-foreground">Wohin dürfen wir Ihr unverbindliches Angebot schicken?</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname *</Label>
                        <Input
                            id="firstName"
                            placeholder="Max"
                            required
                            value={value.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname *</Label>
                        <Input
                            id="lastName"
                            placeholder="Mustermann"
                            required
                            value={value.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="max@beispiel.de"
                            required
                            value={value.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="0123 456789"
                            value={value.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zip">PLZ (für Montage-Check)</Label>
                    <Input
                        id="zip"
                        placeholder="12345"
                        className="w-1/2"
                        value={value.zip}
                        onChange={(e) => handleChange("zip", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Nachricht / Besonderheiten (Optional)</Label>
                    <Textarea
                        id="message"
                        placeholder="Haben Sie weitere Fragen oder Wünsche?"
                        value={value.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};
