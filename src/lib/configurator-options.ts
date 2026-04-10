// Single source of truth for configurator options — Kategorien, Farben, Situation.
// Produkte kommen direkt aus src/data/products.ts, hier nur das was dort fehlt.

export type CategoryOption = {
    id: string;
    label: string;
    description: string;
    image: string;
    /** CSS object-position für Bildausschnitt (default: center) */
    imagePosition?: string;
};

export const CONFIGURATOR_CATEGORIES: CategoryOption[] = [
    {
        id: "Pergola-Systeme",
        label: "Pergola-Systeme",
        description: "Bioklimatische Pergolen, Rolling Roof und Pergola Arc für Terrasse und Garten.",
        image: "/images/products/bioclimatic-pergola.png",
        imagePosition: "center 60%",
    },
    {
        id: "Verglasungssysteme",
        label: "Verglasungssysteme",
        description: "Guillotine-Glas, Wintergarten und Schiebesysteme für ganzjährigen Schutz.",
        image: "/images/products/winter-garden.png",
        imagePosition: "center 40%",
    },
    {
        id: "Textile Beschattung",
        label: "Textile Beschattung",
        description: "Zip-Screen, Kassettenmarkisen und Dachmarkisen für flexiblen Sonnenschutz.",
        image: "/images/products/zip-screen.png",
        imagePosition: "center 70%",
    },
    {
        id: "Tür & Tor Systeme",
        label: "Tür & Tor Systeme",
        description: "Haustüren, Garagentore, Schiebetüren und Hoftore aus Aluminium.",
        image: "/images/products/aluminium-door.png",
        imagePosition: "center 50%",
    },
];

export type SituationOption = {
    id: string;
    label: string;
    description: string;
};

export const SITUATION_OPTIONS: SituationOption[] = [
    { id: "angebaut", label: "An Hauswand angebaut", description: "Dach stützt sich an der Fassade ab." },
    { id: "freistehend", label: "Freistehend", description: "Eigenständige Konstruktion im Garten oder auf der Terrasse." },
    { id: "ecklösung", label: "Ecklösung", description: "An zwei angrenzenden Wänden montiert." },
];

export type ColorOption = {
    id: string;
    label: string;
    ral: string;
    hex: string;
};

// RAL-Klassik — 6 Standardfarben, ohne Aufpreis
export const COLOR_OPTIONS: ColorOption[] = [
    { id: "anthrazit", label: "Anthrazit",    ral: "RAL 7016", hex: "#383E42" },
    { id: "schwarz",   label: "Tiefschwarz",  ral: "RAL 9005", hex: "#0A0A0A" },
    { id: "weiss",     label: "Verkehrsweiß", ral: "RAL 9016", hex: "#F1F0EA" },
    { id: "silber",    label: "Silber",       ral: "RAL 9006", hex: "#A5A5A5" },
    { id: "bronze",    label: "Bronze",       ral: "DB 703",   hex: "#504A44" },
    { id: "creme",     label: "Cremeweiß",    ral: "RAL 9001", hex: "#EFE6D2" },
];

export type ExtraOption = {
    id: string;
    label: string;
    description: string;
    // In welchen Kategorien ist dieses Extra verfügbar — leer = überall
    availableIn?: string[];
};

// Extras — IDs müssen mit pricing.csv-Einträgen übereinstimmen
export const EXTRA_OPTIONS: ExtraOption[] = [
    {
        id: "led",
        label: "LED-Beleuchtung",
        description: "Integrierte, dimmbare LED-Profile für Abendstimmung.",
        availableIn: ["Pergola-Systeme", "Verglasungssysteme"],
    },
    {
        id: "heizung",
        label: "Infrarot-Heizung",
        description: "Strahler für kühle Abende, auch im Frühling und Herbst nutzbar.",
        availableIn: ["Pergola-Systeme", "Verglasungssysteme"],
    },
    {
        id: "seiten",
        label: "Seitenelemente",
        description: "Zip-Screen oder Glasschiebewand als Wind- und Sichtschutz.",
        availableIn: ["Pergola-Systeme", "Verglasungssysteme"],
    },
    {
        id: "smarthome",
        label: "Smart-Home-Steuerung",
        description: "Per App, Sprache oder Sensor gesteuert (Wind, Regen, Sonne).",
    },
    {
        id: "insektenschutz",
        label: "Insektenschutz",
        description: "Feinmaschiges Netz, integriert in die Seitenführung.",
        availableIn: ["Textile Beschattung", "Pergola-Systeme"],
    },
    {
        id: "einbruchschutz",
        label: "Einbruchschutz RC2/RC3",
        description: "Zertifizierter Widerstandsschutz gegen Aufhebelversuche.",
        availableIn: ["Tür & Tor Systeme"],
    },
    {
        id: "fingerprint",
        label: "Fingerprint-Zugang",
        description: "Biometrischer Zugang ohne Schlüssel — wetterfest und vandalismussicher.",
        availableIn: ["Tür & Tor Systeme"],
    },
    {
        id: "antrieb",
        label: "Elektrischer Antrieb",
        description: "Motorisierung inkl. Fernbedienung und App-Steuerung.",
        availableIn: ["Tür & Tor Systeme"],
    },
    {
        id: "montage",
        label: "Montage durch Apexx-Bau",
        description: "Inklusive Aufmaß, Statik-Check und professioneller Installation.",
    },
];

export function getExtrasForCategory(category: string): ExtraOption[] {
    return EXTRA_OPTIONS.filter(e => !e.availableIn || e.availableIn.includes(category));
}
