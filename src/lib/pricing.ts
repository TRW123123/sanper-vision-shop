// Pricing engine — loads /pricing.csv at runtime and computes a live price range
// for the configurator. Single source of truth: public/pricing.csv

export type PricingRow = {
    type: "product" | "extra" | "config";
    id: string;
    label: string;
    unit: string;
    price: number;
    notes?: string;
};

export type PricingTable = {
    products: Record<string, PricingRow>;
    extras: Record<string, PricingRow>;
    config: Record<string, PricingRow>;
};

export type PriceResult = {
    subtotal: number;
    total: number;
    min: number;
    max: number;
    breakdown: { label: string; amount: number }[];
};

// Tiny CSV parser — no dependency. Assumes no embedded commas/quotes.
export function parseCSV(text: string): PricingRow[] {
    const lines = text.trim().split(/\r?\n/);
    const header = lines[0].split(",").map(h => h.trim());
    return lines.slice(1).map(line => {
        const cols = line.split(",").map(c => c.trim());
        const row: any = {};
        header.forEach((h, i) => { row[h] = cols[i] ?? ""; });
        row.price = Number(row.price) || 0;
        return row as PricingRow;
    });
}

export function indexPricing(rows: PricingRow[]): PricingTable {
    const table: PricingTable = { products: {}, extras: {}, config: {} };
    rows.forEach(r => {
        if (r.type === "product") table.products[r.id] = r;
        else if (r.type === "extra") table.extras[r.id] = r;
        else if (r.type === "config") table.config[r.id] = r;
    });
    return table;
}

export async function loadPricing(url = "/pricing.csv"): Promise<PricingTable> {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Pricing CSV fetch failed: ${res.status}`);
    const text = await res.text();
    return indexPricing(parseCSV(text));
}

export type PriceInput = {
    productType: string;
    widthCm: number;
    projectionCm: number;
    extras: string[];
};

export function calculatePrice(table: PricingTable, input: PriceInput): PriceResult | null {
    const product = table.products[input.productType];
    if (!product) return null;

    const widthM = input.widthCm / 100;
    const projectionM = input.projectionCm / 100;
    const areaM2 = widthM * projectionM;

    const breakdown: { label: string; amount: number }[] = [];

    // Base
    const base = areaM2 * product.price;
    breakdown.push({ label: `${product.label} (${areaM2.toFixed(1)} m²)`, amount: base });

    // Extras (excluding percent_of_subtotal which is applied later)
    let extrasSum = 0;
    const percentExtras: PricingRow[] = [];
    input.extras.forEach(id => {
        const extra = table.extras[id];
        if (!extra) return;
        let amount = 0;
        switch (extra.unit) {
            case "flat":
                amount = extra.price;
                break;
            case "per_m_width":
                amount = extra.price * widthM;
                break;
            case "per_m2":
                amount = extra.price * areaM2;
                break;
            case "percent_of_subtotal":
                percentExtras.push(extra);
                return;
            default:
                amount = extra.price;
        }
        extrasSum += amount;
        breakdown.push({ label: extra.label, amount });
    });

    const subtotal = base + extrasSum;

    // Percent extras (e.g. Montage)
    let percentSum = 0;
    percentExtras.forEach(extra => {
        const amount = subtotal * (extra.price / 100);
        percentSum += amount;
        breakdown.push({ label: `${extra.label} (${extra.price}%)`, amount });
    });

    const total = subtotal + percentSum;

    // Spread for "ab X € bis Y €" range
    const spreadPct = table.config["price_spread_percent"]?.price ?? 20;
    const min = total * (1 - spreadPct / 200);
    const max = total * (1 + spreadPct / 200);

    return { subtotal, total, min, max, breakdown };
}

export function formatEUR(n: number): string {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(Math.round(n));
}
