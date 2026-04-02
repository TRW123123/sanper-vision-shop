
import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const excelPath = path.join(rootDir, 'src', 'data', 'SEO Apexx Magic Tool.xlsx');
const outputPath = path.join(rootDir, 'src', 'data', 'landing_pages.json');
const imagesDir = path.join(rootDir, 'public', 'images');

// 1. Load Images for Assignment
const availableImages = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

if (availableImages.length === 0) {
    console.error("No images found in public/images. Cannot proceed.");
    process.exit(1);
}

// Categorize images for smarter assignment
const imagesByCategory = {
    'pergola-systeme': availableImages.filter(img => img.includes('pergola')),
    'wintergarten-systeme': availableImages.filter(img => img.includes('wintergarten') || img.includes('glas')),
    'zip-screen-systeme': availableImages.filter(img => img.includes('zip') || img.includes('screen') || img.includes('tavan')),
};

// 2. Read ALL Excel Sheets
console.log("Reading Excel file (all sheets)...");
const workbook = XLSX.readFile(excelPath);
console.log(`Found ${workbook.SheetNames.length} sheets: ${workbook.SheetNames.join(', ')}`);

// Sheet → category hint mapping
const sheetCategoryHints = {
    'pergola': 'pergola-systeme',
    'bioklimatische pergola': 'pergola-systeme',
    'pergola preise': 'pergola-systeme',
    'pergola aluminium': 'pergola-systeme',
    'pergola lamellendach': 'pergola-systeme',
    'pergola wetterfest': 'pergola-systeme',
    'wintergarten': 'wintergarten-systeme',
    'wintergarten preise': 'wintergarten-systeme',
    'wintergarten montage': 'wintergarten-systeme',
    'zip screen': 'zip-screen-systeme',
};

// Collect ALL rows from ALL sheets with deduplication
const keywordMap = new Map(); // keyword (lowercase) → best row

for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);
    const categoryHint = sheetCategoryHints[sheetName] || null;

    for (const row of rows) {
        const keyword = row['Keyword'];
        const volume = parseInt(row['Volume']) || 0;
        if (!keyword || volume === 0) continue;

        const key = keyword.toLowerCase().trim();
        const existing = keywordMap.get(key);

        if (!existing || volume > (parseInt(existing.Volume) || 0)) {
            keywordMap.set(key, { ...row, _sheetHint: categoryHint });
        }
    }
}

console.log(`Unique keywords across all sheets: ${keywordMap.size}`);

// 3. Process Data
const MIN_VOLUME = 100;

const landingPages = [
    // === Homepage ===
    {
        slug: "",
        template: "hub",
        product_id: "homepage",
        title: "Apexx Bau | Premium Terrassenüberdachungen & Lamellendächer",
        meta_description: "Apexx Bau ist Ihr Experte für hochwertige Terrassenüberdachungen, Lamellendächer und Kaltwintergärten. Direkt vom Hersteller, maßgefertigt und professionell montiert.",
        h1: "Premium Outdoor-Systeme für Ihr Zuhause",
        intro_text: "Ihr Partner für exklusive Terrassengestaltung in NRW und deutschlandweit.",
        features: ["Hersteller-Direktvertrieb", "Maßanfertigung", "5 Jahre Garantie"],
        images: ["hero-fallback"],
        faq: []
    },
    // === Strategic Hub & Enrichment Pages (must exist for merge_csv + enrich_content) ===
    { slug: "pergola-systeme", template: "hub", product_id: "pergola-systeme", title: "Pergola-Systeme | Apexx Bau", meta_description: "Pergola-Systeme von Apexx Bau: bioklimatische Lamellendächer, Aluminium-Pergolen und modulare Terrassenlösungen direkt vom Hersteller.", h1: "Pergola-Systeme", intro_text: "Bioklimatische Pergolen, Lamellendächer und modulare Außenraum-Systeme für private und gewerbliche Projekte.", features: ["Bioklimatische Lamellen", "Modularer Aufbau", "5 Jahre Garantie", "Eigenmontage"], images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-01"], faq: [] },
    { slug: "pergola-systeme/bioklimatisch", template: "money", product_id: "pergola-systeme", title: "Bioklimatische Pergola | Apexx Bau", meta_description: "Bioklimatische Pergola mit motorisierten Lamellen für optimale Klimakontrolle. Direkt vom Hersteller — konfigurieren Sie jetzt.", h1: "Bioklimatische Pergola", intro_text: "Motorisierte Lamellen für perfekte Klimakontrolle: Licht, Luft und Regenschutz auf Knopfdruck.", features: ["Kamineffekt gegen Hitzestau", "Windlast bis 140 km/h", "Schneelast bis 400 kg/m²", "Sensor-Automatik"], images: ["pergola-systeme-garten-lamellendach-led-b2c-hero-03"], faq: [] },
    { slug: "pergola-systeme/preise", template: "money", product_id: "pergola-systeme", title: "Pergola Preise | Apexx Bau", meta_description: "Pergola Kosten transparent erklärt. Preisfaktoren, Vergleich und Direkt-vom-Hersteller-Vorteil. Jetzt unverbindlich anfragen.", h1: "Pergola Preise", intro_text: "Transparente Preise direkt vom Hersteller — ohne Zwischenhändler-Marge.", features: ["Direkt ab Werk", "Keine Handelsaufschläge", "5 Jahre Garantie inklusive", "Komplettpreis mit Montage"], images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-02"], faq: [] },
    { slug: "pergola-systeme/montage", template: "money", product_id: "pergola-systeme", title: "Pergola Montage | Apexx Bau", meta_description: "Professionelle Pergola-Montage durch hauseigene Teams. Ablauf, Dauer und was Sie erwarten können.", h1: "Pergola Montage", intro_text: "Eigene Montageteams für sichere und termingerechte Installation.", features: ["Hauseigene Monteure", "TÜV-geprüft", "Thermisch getrennte Befestigung", "Einweisung inklusive"], images: ["pergola-systeme-terrasse-lamellendach-b2c-hero-07"], faq: [] },
    { slug: "pergola-systeme/wintergarten-kombination", template: "money", product_id: "pergola-systeme", title: "Pergola Wintergarten Kombination | Apexx Bau", meta_description: "Pergola und Wintergarten kombinieren: Wann macht ein Hybridsystem Sinn? Abgrenzung, Vorteile und Risiken.", h1: "Pergola Wintergarten Kombination", intro_text: "Hybridlösungen aus Pergola und Verglasung für flexible Ganzjahresnutzung.", features: ["Modulare Erweiterung", "Glas nachrüstbar", "Belüftungskonzept", "Kondensat-Vermeidung"], images: ["pergola-systeme-terrasse-lamellendach-glas-schiebesystem-b2c-hero-06"], faq: [] },
    { slug: "wintergarten-systeme", template: "hub", product_id: "wintergarten-systeme", title: "Verglasungssysteme | Apexx Bau", meta_description: "Wintergarten und Verglasungssysteme von Apexx Bau: Glasschiebewände, Giyotin-Systeme und Kaltwintergärten direkt vom Hersteller.", h1: "Verglasungssysteme", intro_text: "Glasschiebewände, Giyotin-Systeme und Wintergärten für transparente Raumabschlüsse.", features: ["Rahmenlose Systeme", "ESG-Sicherheitsglas", "Ganzjahresnutzung", "Modular nachrüstbar"], images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"], faq: [] },
    { slug: "wintergarten-systeme/kaltwintergarten", template: "money", product_id: "wintergarten-systeme", title: "Kaltwintergarten | Apexx Bau", meta_description: "Kaltwintergarten als kosteneffiziente Lösung für Übergangszeiten. Eignung, Grenzen und Preise.", h1: "Kaltwintergarten", intro_text: "Kosteneffiziente Verglasung für die Übergangszeit — ohne aufwändige Wärmedämmung.", features: ["Günstig im Vergleich", "3-Saison-Nutzung", "Nachrüstbar", "Keine Heizung nötig"], images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"], faq: [] },
    { slug: "wintergarten-systeme/glasschiebewand", template: "money", product_id: "wintergarten-systeme", title: "Glasschiebewand | Apexx Bau", meta_description: "Glasschiebewände für Wind- und Wetterschutz. Rahmenlose Systeme mit ESG-Sicherheitsglas.", h1: "Glasschiebewand", intro_text: "Wind- und Wetterschutz mit maximaler Transparenz durch rahmenlose Glasschiebewände.", features: ["ESG 8-10mm", "Mehrspur-Laufschienen", "Automatisches Mitnehmersystem", "EPDM-Dichtungen"], images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"], faq: [] },
    { slug: "wintergarten-systeme/montage", template: "money", product_id: "wintergarten-systeme", title: "Wintergarten Montage | Apexx Bau", meta_description: "Wintergarten-Montage mit Glas-Handling, Anschlussdetails und Sicherheitsstandards.", h1: "Wintergarten Montage", intro_text: "Professionelle Montage mit präzisem Glas-Handling und sauberen Fassadenanschlüssen.", features: ["Erfahrene Glasmonteure", "Sicherheits-Protokoll", "Abdichtung inklusive", "Abnahme vor Ort"], images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"], faq: [] },
    { slug: "wintergarten-systeme/polen-preise", template: "money", product_id: "wintergarten-systeme", title: "Wintergarten aus Polen Preise | Apexx Bau", meta_description: "Wintergarten aus Polen vs. Deutschland: Preisvergleich, Risiken und worauf Sie achten müssen.", h1: "Wintergarten aus Polen Preise", intro_text: "Import vs. Deutschland: Realistischer Preisvergleich mit Risikobewertung.", features: ["Preistransparenz", "Gewährleistungsvergleich", "Break-Even-Analyse", "Servicevergleich"], images: ["wintergarten-systeme-gewerbe-glas-schiebesystem-b2b-hero-02"], faq: [] },
    { slug: "zip-screen-systeme", template: "hub", product_id: "zip-screen-systeme", title: "Textile Beschattung | Apexx Bau", meta_description: "ZIP-Screen-Systeme von Apexx Bau: Senkrechtmarkisen, Zip-Screens und Dachmarkisen für Wind- und Sichtschutz.", h1: "Textile Beschattung", intro_text: "Windstabile Beschattung und Sichtschutz für Pergolen, Fassaden und Terrassen.", features: ["z-LOCK Technologie", "Windklasse 6", "Smart-Home-fähig", "Insektenschutz inklusive"], images: ["zip-screen-systeme-terrasse-dikey-zip-b2c-hero-03"], faq: [] },
    { slug: "zip-screen-systeme/senkrechtmarkise", template: "money", product_id: "zip-screen-systeme", title: "Senkrechtmarkise | Apexx Bau", meta_description: "ZIP-Senkrechtmarkise mit z-LOCK Technologie: Windklasse 6, Hitzeschutz und Sichtschutz in einem System.", h1: "Senkrechtmarkise", intro_text: "Vertikaler Sonnen-, Wind- und Sichtschutz mit Reißverschluss-Führung.", features: ["Windklasse 6 (120 km/h)", "g_tot-Wert bis 0,05", "Mikroperforation", "SOMFY-Motor"], images: ["zip-screen-systeme-terrasse-dikey-zip-b2c-hero-03"], faq: [] },
    { slug: "zip-screen-systeme/terrasse", template: "money", product_id: "zip-screen-systeme", title: "ZIP-Screen Terrasse | Apexx Bau", meta_description: "ZIP-Screens für Terrassen: Wind-, Sicht- und Insektenschutz. Nachrüstbar an bestehende Pergolen.", h1: "ZIP-Screen Terrasse", intro_text: "Seitlicher Wind- und Insektenschutz für Ihre Terrasse — nachrüstbar und smart steuerbar.", features: ["Nachrüstbar", "Insektenschutz", "Somfy-Funkmotor", "Sensor-Automatik"], images: ["pergola-systeme-terrasse-tavan-zip-screen-b2c-hero-01"], faq: [] },
    { slug: "zip-screen-systeme/wetterfest", template: "money", product_id: "zip-screen-systeme", title: "Wetterfeste Außenrollos | Apexx Bau", meta_description: "Wetterfeste ZIP-Screens für extreme Bedingungen: Sturmsicher bis 120 km/h, UV-beständig und energieeffizient.", h1: "Wetterfeste Außenrollos", intro_text: "Sturmfeste Beschattung die Klimaanlagen überflüssig macht.", features: ["120 km/h Windresistenz", "97% Hitzeblocker", "Soltis-Gewebe", "Smart-Home-Integration"], images: ["pergola-systeme-terrasse-tavan-zip-screen-b2c-hero-02"], faq: [] },
];

// Track generated slugs to prevent duplicates (include all pre-defined pages)
const usedSlugs = new Set(landingPages.map(p => p.slug));

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function toTitleCase(str) {
    // Preserve German umlauts and common words
    const lowerWords = new Set(['und', 'oder', 'mit', 'für', 'aus', 'von', 'in', 'am', 'im', 'an', 'auf', 'bei', 'nach', 'zum', 'zur', 'vs', 'pro', 'm2']);
    return str.split(' ').map((word, i) => {
        if (i > 0 && lowerWords.has(word.toLowerCase())) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

function getRandomImage() {
    return availableImages[Math.floor(Math.random() * availableImages.length)];
}

function getCategoryImage(productId) {
    const pool = imagesByCategory[productId];
    if (pool && pool.length > 0) {
        return pool[Math.floor(Math.random() * pool.length)];
    }
    return getRandomImage();
}

function stripExtension(filename) {
    return path.parse(filename).name;
}

// Blacklist: Keywords that should not generate pages (navigational, brand, irrelevant)
const blacklistPatterns = [
    /^la pergola$/i,       // Restaurant name
    /^pergolado pergolado$/i, // Portuguese song
    /^perfolla$/i,         // Misspelling with no intent
    /^pergula$/i,          // Misspelling
    /^pargolla$/i,         // Misspelling
    /^variete$/i,          // Unrelated (variety show)
    /roma /i,              // Brand-navigational (Roma)
    /warema /i,            // Brand-navigational
    /weinor /i,            // Brand-navigational
    /renson /i,            // Brand-navigational
    /markilux /i,          // Brand-navigational
    /somfy /i,             // Brand-navigational
    /obi /i,               // Retailer
    /bauhaus /i,           // Retailer
    /hornbach /i,          // Retailer
    /ikea /i,              // Retailer
    /amazon /i,            // Retailer
    /ebay /i,              // Retailer
];

// Determine product_id from keyword + sheet hint
function determineProductId(keyword, sheetHint) {
    const k = keyword.toLowerCase();

    // Sheet hint takes priority for ambiguous keywords
    if (sheetHint) {
        // But keyword-level signals can override if they're strong
        if (k.includes('wintergarten') || k.includes('kaltwintergarten') || k.includes('glasschiebe')) {
            return 'wintergarten-systeme';
        }
        if (k.includes('zip') || k.includes('screen') || k.includes('markise') || k.includes('rollo') || k.includes('senkrechtmarkise')) {
            return 'zip-screen-systeme';
        }
        return sheetHint;
    }

    // Fallback: keyword-based detection
    if (k.includes('wintergarten') || k.includes('kaltwintergarten') || k.includes('glas') || k.includes('schiebe') || k.includes('giyotin') || k.includes('guillotine')) {
        return 'wintergarten-systeme';
    }
    if (k.includes('screen') || k.includes('markise') || k.includes('rollo') || k.includes('zip') || k.includes('senkrechtmarkise') || k.includes('sonnenschutz')) {
        return 'zip-screen-systeme';
    }
    return 'pergola-systeme';
}

// Canonical slug mapping for enrichment-matched pages
const canonicalMap = {
    'bioklimatische-pergola': 'bioklimatisch',
    'pergola-terrasse': 'terrasse',
    'pergola-aluminium': 'aluminium',
    'pergola-freistehend': 'freistehend',
    'pergola-preise': 'preise',
    'glasschiebewand': 'glasschiebewand',
    'senkrechtmarkise': 'senkrechtmarkise',
    'zip-screen-terrasse': 'terrasse',
    'zip-screen-wetterfest': 'wetterfest',
    'kaltwintergarten': 'kaltwintergarten',
    'wintergarten-preise': 'preise',
    'wintergarten-kosten': 'preise',
    'wintergarten-montage': 'montage',
    'wintergarten-aus-polen-mit-montage': 'polen-preise',
};

let skippedBlacklist = 0;
let skippedVolume = 0;
let skippedDuplicate = 0;

for (const [key, row] of keywordMap) {
    const keyword = row['Keyword'];
    const volume = parseInt(row['Volume']) || 0;
    const intent = row['Intent'] || '';

    // Filter by volume
    if (volume < MIN_VOLUME) {
        skippedVolume++;
        continue;
    }

    // Blacklist check
    if (blacklistPatterns.some(p => p.test(keyword))) {
        skippedBlacklist++;
        continue;
    }

    // Determine template
    let template = 'hub';
    if (intent.includes('C') || intent.includes('T')) {
        template = 'money';
    }

    // Determine product_id
    const productId = determineProductId(keyword, row._sheetHint);

    // Generate slug
    const keywordSlug = slugify(keyword);
    const mappedSlug = canonicalMap[keywordSlug] || keywordSlug;

    // Construct hierarchical slug
    const slug = (productId === mappedSlug) ? productId : `${productId}/${mappedSlug}`;

    // Skip duplicates
    if (usedSlugs.has(slug)) {
        skippedDuplicate++;
        continue;
    }
    usedSlugs.add(slug);

    // Pick category-aware image
    let imageFile = availableImages.find(img => img.toLowerCase().includes(keywordSlug.split('-')[0]));
    if (!imageFile) {
        imageFile = getCategoryImage(productId);
    }
    const imageName = stripExtension(imageFile);

    const h1 = toTitleCase(keyword);

    const page = {
        slug,
        template,
        product_id: productId,
        title: `${h1} | Apexx Bau`,
        meta_description: `Hochwertige ${keyword} direkt vom Hersteller. Konfigurieren Sie jetzt Ihre ${keyword} nach Maß. Premium Qualität & faire Preise.`,
        h1,
        intro_text: `Entdecken Sie unsere Lösungen für "${keyword}". Als Hersteller bieten wir Ihnen maßgefertigte Qualität, langlebige Materialien und professionelle Montage.`,
        features: [
            "Direkt vom Hersteller",
            "Maßanfertigung",
            "5 Jahre Garantie",
            "Montage-Service"
        ],
        images: [imageName],
        faq: []
    };

    landingPages.push(page);
}

// Stats
const stats = {
    total: landingPages.length,
    byCategory: {},
    byTemplate: { hub: 0, money: 0 },
};
landingPages.forEach(p => {
    stats.byCategory[p.product_id] = (stats.byCategory[p.product_id] || 0) + 1;
    if (p.template) stats.byTemplate[p.template]++;
});

console.log(`\n=== Generation Results ===`);
console.log(`Total pages: ${stats.total}`);
console.log(`By category:`, stats.byCategory);
console.log(`By template:`, stats.byTemplate);
console.log(`Skipped - low volume: ${skippedVolume}`);
console.log(`Skipped - blacklisted: ${skippedBlacklist}`);
console.log(`Skipped - duplicate slug: ${skippedDuplicate}`);

// 4. Write to JSON
fs.writeFileSync(outputPath, JSON.stringify(landingPages, null, 4));
console.log(`\nSuccessfully wrote to ${outputPath}`);
