import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Using our existing product images (relative paths from public)
const PRODUCTS = [
    {
        id: "pergola",
        name: "Bioklimatische Pergola",
        image: "/images/products/bioclimatic-pergola.png",
        description: "Lamellendach mit maximaler Flexibilität"
    },
    {
        id: "wintergarten",
        name: "Wintergarten System",
        image: "/images/products/guillotine-glass.png", // Using Glass as proxy for Wintergarten context
        description: "Ganzjähriger Wetterschutz"
    },
    {
        id: "markise",
        name: "Zip-Markise",
        image: "/images/products/zip-screen.png",
        description: "Sonnenschutz und Privatsphäre"
    }
];

interface StepTypeProps {
    value: string;
    onChange: (value: string) => void;
}

export const StepType = ({ value, onChange }: StepTypeProps) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Was möchten Sie konfigurieren?</h2>
                <p className="text-muted-foreground">Wählen Sie Ihr Wunschsystem für Garten oder Terrasse.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRODUCTS.map((product) => (
                    <div
                        key={product.id}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 transition-all duration-200 overflow-hidden hover:border-primary/50 relative group",
                            value === product.id ? "border-primary ring-2 ring-primary/20" : "border-border shadow-sm"
                        )}
                        onClick={() => onChange(product.id)}
                    >
                        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    // Fallback if image not found to avoid broken UI
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Produktbild';
                                }}
                            />
                            {value === product.id && (
                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-primary text-white rounded-full p-2">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-card">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
