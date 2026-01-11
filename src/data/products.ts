
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export interface Product {
  id: string;
  produktname: string;
  slug: string;
  kategorie: string;
  systemtyp: string;
  material: string;
  einsatzbereich: string[];
  masse_optionen: string;
  motorisierung: boolean;
  windschutz: string;
  wasserschutz: string;
  zertifikate: string[];
  anmerkungen: string;
  kurzbeschreibung: string;
  bilder: string[];
}

export const products: Product[] = [
  {
    id: "1",
    produktname: "Reinigbares Guillotinefenster",
    slug: "wintergarten-systeme/glasschiebewand", // Mapped to closest match or keep generic if no landing page
    kategorie: "Verglasungssysteme",
    systemtyp: "Motorisiertes vertikales Schiebesystem, leicht zu reinigen",
    material: "Aluminiumprofile; gehärtetes Laminatglas",
    einsatzbereich: ["Balkon", "Terrasse", "Café", "Restaurant", "Wintergarten"],
    masse_optionen: "Individuelle Maße; 2–3 Paneele; Reinigungsmodus",
    motorisierung: true,
    windschutz: "Ja",
    wasserschutz: "Ja",
    zertifikate: ["CE", "TSE", "PFB-Tests"],
    anmerkungen: "Patentiert; einfache Reinigung",
    kurzbeschreibung: "Innovatives motorisiertes Guillotinefenster mit einzigartigem Reinigungsmodus für mühelose Wartung und perfekte Transparenz.",
    bilder: ["/images/products/guillotine-cleaning.png"]
  },
  {
    id: "2",
    produktname: "Guillotine-Glassysteme",
    slug: "wintergarten-systeme/glasschiebewand", // Mapped
    kategorie: "Verglasungssysteme",
    systemtyp: "Motorisiertes oder manuelles vertikales Schiebesystem",
    material: "Aluminiumrahmen; gehärtetes Glas; Doppelverglasung",
    einsatzbereich: ["Balkon", "Café", "Restaurant", "Büro", "Wintergarten"],
    masse_optionen: "Projektbezogene Maße; 2–3 Paneele",
    motorisierung: true,
    windschutz: "Ja",
    wasserschutz: "Ja",
    zertifikate: ["CE", "ISO 9001", "EN 13659"],
    anmerkungen: "Panoramablick; Sicherheit",
    kurzbeschreibung: "Elegante Guillotine-Glassysteme mit Doppelverglasung für uneingeschränkten Panoramablick und maximale Sicherheit.",
    bilder: ["/images/products/guillotine-glass.png"]
  },
  {
    id: "3",
    produktname: "Bioklimatische Pergola",
    slug: "pergola-systeme/lamellendach",
    kategorie: "Pergola-Systeme",
    systemtyp: "Motorisierte lamellenbasierte bioklimatische Pergola",
    material: "Extrudiertes Aluminium; Edelstahl; integrierte LED",
    einsatzbereich: ["Terrasse", "Garten", "Pool", "Restaurant", "Café"],
    masse_optionen: "Modular; Spannweite 5–6 m; verstellbarer Lamellenwinkel; LED; Heizungsoption",
    motorisierung: true,
    windschutz: "Sehr hoch (bis 120 km/h)",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561", "Qualicoat"],
    anmerkungen: "Lamellenwinkel 0–135°; hohe Schneelast",
    kurzbeschreibung: "Premium bioklimatische Pergola mit motorisierten Lamellen, integrierter LED-Beleuchtung und extremer Windbeständigkeit bis 120 km/h.",
    bilder: ["/images/products/bioclimatic-pergola.png"]
  },
  {
    id: "4",
    produktname: "Einmotorige bioklimatische Pergola",
    slug: "pergola-systeme/bioklimatisch",
    kategorie: "Pergola-Systeme",
    systemtyp: "Einmotorige lamellenbasierte Pergola mit Dreh- und Einzugsfunktion",
    material: "Aluminiumlamellen; Scherenmechanismus",
    einsatzbereich: ["Villaterrassen", "Café/Restaurant"],
    masse_optionen: "Maximal 4×7 m; Paneele lassen sich vollständig zurückziehen",
    motorisierung: true,
    windschutz: "Hoch",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561"],
    anmerkungen: "Patentiertes Mechanismus; vollständig öffnungsfähiges Dach",
    kurzbeschreibung: "Innovative einmotorige Pergola mit patentiertem Scherenmechanismus für vollständig zurückziehbare Lamellen.",
    bilder: ["/images/products/single-motor-pergola.png"]
  },
  {
    id: "5",
    produktname: "Rolling Roof Pergola (Falt-Dach)",
    slug: "pergola-systeme/aluminium",
    kategorie: "Pergola-Systeme",
    systemtyp: "Motorisiertes faltbares Dachsystem",
    material: "Extrudierte Aluminium-Paneele; langlebiger Motor",
    einsatzbereich: ["Café", "Restaurant", "Garten", "Terrasse"],
    masse_optionen: "Modular; Paneelbreite 21 cm; Spannweite 5–6 m; RAL-Farben",
    motorisierung: true,
    windschutz: "Hoch",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561", "5 Jahre Garantie"],
    anmerkungen: "Paneele drehen sich um 360°; vollständig zu öffnendes Dach",
    kurzbeschreibung: "Flexibles Rolling Roof System mit 360° drehbaren Aluminium-Paneelen und 5 Jahren Garantie.",
    bilder: ["/images/products/rolling-roof.png"]
  },
  {
    id: "6",
    produktname: "Kassettenmarkise",
    slug: "zip-screen-systeme/senkrechtmarkise", // Approximate mapping
    kategorie: "Textile Beschattung",
    systemtyp: "Kassettenmarkise mit Gelenkarmen",
    material: "Aluminiumgehäuse und -arme; Acryl-/PVC-Stoff",
    einsatzbereich: ["Balkon", "Terrasse", "Café", "Geschäft"],
    masse_optionen: "Breite 2–6 m; Ausladung 1,5–3,5 m; optionaler Windsensor",
    motorisierung: false,
    windschutz: "Mittel",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561", "TÜV-zertifizierter Motor"],
    anmerkungen: "Stoff ist im Kassettgehäuse geschützt; ästhetisches Design",
    kurzbeschreibung: "Hochwertige Kassettenmarkise mit vollständigem Stoffschutz und optionalem Windsensor.",
    bilder: ["/images/products/cassette-awning.png"]
  },
  {
    id: "7",
    produktname: "Wintent-Fenstermarkise",
    slug: "zip-screen-systeme/wetterfest", // Approximate mapping
    kategorie: "Textile Beschattung",
    systemtyp: "Fenstermarkise (steiler Winkel)",
    material: "Aluminiumgehäuse; Acrylstoff",
    einsatzbereich: ["Fenster", "Schaufenster", "Terrasse", "Ladengeschäft"],
    masse_optionen: "Breite 1–4 m; Neigung 60–90°; viele Farben",
    motorisierung: false,
    windschutz: "Mittel",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561"],
    anmerkungen: "Schlanke Kassette; hoher Neigungswinkel; dekorativ",
    kurzbeschreibung: "Dekorative Fenstermarkise mit steilem Neigungswinkel ideal für Schaufenster und Ladenfronten.",
    bilder: ["/images/products/wintent-awning.png"]
  },
  {
    id: "8",
    produktname: "Zip-Screen",
    slug: "zip-screen-systeme",
    kategorie: "Textile Beschattung",
    systemtyp: "Motorisierte vertikale Zip-Screen-Markise",
    material: "Aluminium-Seitenkanäle; PVC-beschichtetes Polyestergewebe",
    einsatzbereich: ["Pergola-Seiten", "Veranda", "Balkon", "Büro"],
    masse_optionen: "Maximal 5–6 m Breite; 3–4 m Höhe; mehr als 20 Farben",
    motorisierung: true,
    windschutz: "Sehr hoch (bis 80 km/h)",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561", "EN 60335"],
    anmerkungen: "Ganzjähriger Schutz; fungiert als Insektenschutz; energieeffizient",
    kurzbeschreibung: "Hochleistungs-Zip-Screen mit extremer Windbeständigkeit und Insektenschutzfunktion für ganzjährigen Einsatz.",
    bilder: ["/images/products/zip-screen.png"]
  },
  {
    id: "9",
    produktname: "Zip-Dachmarkise",
    slug: "zip-screen-systeme/terrasse",
    kategorie: "Textile Beschattung",
    systemtyp: "Motorisierte horizontale Zip-Dachmarkise",
    material: "Aluminiumführungen; blickdichter oder perforierter Stoff; Gasdruckfeder",
    einsatzbereich: ["Pergola-Dächer", "Wintergarten", "Veranda", "Oberlicht"],
    masse_optionen: "Breite 4–5 m; Ausladung 5–6 m; multisegment",
    motorisierung: true,
    windschutz: "Hoch",
    wasserschutz: "Ja",
    zertifikate: ["CE", "EN 13561", "IP65-Motor"],
    anmerkungen: "Mit Kolbenspannung; mit Sensoren; vollständig schließend",
    kurzbeschreibung: "Premium Zip-Dachmarkise mit Kolbenspannung und Sensortechnik für perfekte Stoffspannung.",
    bilder: ["/images/products/zip-roof-awning.png"]
  },
  {
    id: "10",
    produktname: "Kolbenunterstützte Zip-Dachmarkise",
    slug: "zip-screen-systeme/terrasse",
    kategorie: "Textile Beschattung",
    systemtyp: "Kolbenunterstützte Dachmarkise",
    material: "Aluminiumgehäuse; Gasdruckzylinder; blickdichtes Gewebe",
    einsatzbereich: ["Große Spannweiten", "große Terrassen", "Dachfenster"],
    masse_optionen: "Fläche über 10 m²; Doppel-Motor; Doppel-Kolben",
    motorisierung: true,
    windschutz: "Hoch",
    wasserschutz: "Ja",
    zertifikate: ["CE", "ISO 9001"],
    anmerkungen: "Hohe Spannung; faltenfrei",
    kurzbeschreibung: "Spezialsystem für große Flächen mit Doppel-Motor und Gasdruckunterstützung für faltenfreie Stoffspannung.",
    bilder: ["/images/products/piston-zip-awning.png"]
  },
  {
    id: "11",
    produktname: "Motorisiertes Deckenrollo",
    slug: "zip-screen-systeme/senkrechtmarkise",
    kategorie: "Textile Beschattung",
    systemtyp: "Motorisiertes Deckenrollo (Rollvorhang)",
    material: "Aluminiumprofil; technisches Textil oder Blackout-Gewebe",
    einsatzbereich: ["Innen-Dächer von Wintergärten", "Atrien in Büros", "Ausstellungshallen"],
    masse_optionen: "Projektabhängig; optional doppellagig",
    motorisierung: true,
    windschutz: "—",
    wasserschutz: "Mittel",
    zertifikate: ["CE", "B1 schwer entflammbar"],
    anmerkungen: "Innenbereich; Gruppensteuerung",
    kurzbeschreibung: "Intelligentes Deckenrollo-System mit Gruppensteuerung ideal für Wintergärten und Atrien.",
    bilder: ["/images/products/ceiling-roller-blind.png"]
  },
  {
    id: "16",
    produktname: "Wintergartensysteme",
    slug: "wintergarten-systeme",
    kategorie: "Verglasungssysteme",
    systemtyp: "Isoliertes Aluminium-Glashaus-System",
    material: "Thermisch getrenntes Aluminium; laminiertes und wärmeschutzverglastes Dach und Fassade",
    einsatzbereich: ["Villagarten", "Café", "Restaurant", "Dachterrasse"],
    masse_optionen: "Projektmaße; modular; öffnungsfähiges Dach; integrierte LED",
    motorisierung: false,
    windschutz: "Hoch",
    wasserschutz: "Hoch",
    zertifikate: ["CE", "Eurocode 9", "EN 1279", "EN 12150"],
    anmerkungen: "Ganzjahresnutzung; vollständige Isolierung",
    kurzbeschreibung: "Premium-Wintergartensystem mit thermischer Trennung für ganzjährigen Komfort und maximale Energieeffizienz.",
    bilder: ["/images/products/winter-garden.png"]
  },
  {
    id: "22",
    produktname: "Pergola Arc",
    slug: "pergola-systeme/terrasse",
    kategorie: "Pergola-Systeme",
    systemtyp: "Pergola mit gebogenem Schienensystem",
    material: "Stahlverstärkte Aluminiumprofile; PVC-Membran",
    einsatzbereich: ["Hotel", "Villaterrasse", "halbrunde Höfe"],
    masse_optionen: "Breite 4 m; Spannweite 6,7 m; modular; Höhe 3,65 m",
    motorisierung: true,
    windschutz: "Hoch",
    wasserschutz: "Hoch",
    zertifikate: ["CE", "EN 13561", "DIN 4102"],
    anmerkungen: "Gewölbtes Design; Smart-Home-kompatibel; LED-Beleuchtung",
    kurzbeschreibung: "Architektonische Pergola Arc mit gewölbtem Design, Smart-Home-Integration und LED-Beleuchtung.",
    bilder: ["/images/products/pergola-arc.png"]
  }
];

export const categories = [
  {
    id: "pergola-systeme",
    name: "Pergola-Systeme",
    description: "Bioclimatic Pergolen mit drehbaren Lamellen für optimale Klimakontrolle und Rolling Roof Systeme für vollständigen Wetterschutz.",
    image: "/images/pergola-systeme-terrasse-lamellendach-b2c-hero-01.jpeg"
  },
  {
    id: "verglasungssysteme",
    name: "Verglasungssysteme",
    description: "Rahmenlose Giyotin-Glas-Systeme und Wintergärten für transparente Raumabschlüsse mit maximaler Lichtausbeute.",
    image: "/images/wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02.jpg"
  },
  {
    id: "textile-beschattung",
    name: "Textile Beschattung",
    description: "Kassettenmarkisen, ZIP-Screen und Piston-Tavan Systeme für flexible und elegante Sonnenschutzlösungen.",
    image: "/images/zip-screen-systeme-terrasse-dikey-zip-b2c-hero-03.jpg"
  }
];

export const getProductsByCategory = (kategorie: string): Product[] => {
  return products.filter(p => p.kategorie === kategorie);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getCategoryIdFromName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Bestseller-Produkte für Homepage
export const getBestsellerProducts = (): Product[] => {
  const bestsellerSlugs = [
    "bioklimatische-pergola",
    "zip-screen",
    "transparente-zip-markise",
    "guillotine-glassysteme"
  ];

  return products.filter(product => bestsellerSlugs.includes(product.slug));
};
