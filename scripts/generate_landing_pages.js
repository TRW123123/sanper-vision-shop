
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

// 2. Read Excel
console.log("Reading Excel file...");
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(sheet);

console.log(`Total rows in Excel: ${rawData.length}`);

// 3. Process Data
const landingPages = [
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
    }
];
const MIN_VOLUME = 100;

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function getRandomImage() {
    return availableImages[Math.floor(Math.random() * availableImages.length)];
}

// Helper to remove extension for the JSON 'images' array (as component adds .jpg)
function stripExtension(filename) {
    return path.parse(filename).name;
}

rawData.forEach(row => {
    // Column Names from Excel: 'Keyword', 'Intent', 'Volume', etc.
    const keyword = row['Keyword'];
    const volume = row['Volume'];
    const intent = row['Intent']; // 'C', 'T', 'I', 'N', etc.

    if (!keyword || !volume) return;

    // Filter by Volume
    if (parseInt(volume) < MIN_VOLUME) return;

    // Determine Template
    let template = 'hub'; // Default to Hub
    // If Intent contains 'C' (Commercial) or 'T' (Transactional), make it a Money page
    if (intent && (intent.includes('C') || intent.includes('T'))) {
        template = 'money';
    }

    // Determine Product ID
    let productId = 'pergola-systeme';
    const k = keyword.toLowerCase();
    if (k.includes('wintergarten') || k.includes('kaltwintergarten') || k.includes('glas') || k.includes('schiebe')) {
        productId = 'wintergarten-systeme';
    } else if (k.includes('screen') || k.includes('markise') || k.includes('rollo')) {
        productId = 'zip-screen-systeme';
    } else if (k.includes('lamellendach') || k.includes('pergola')) {
        productId = 'pergola-systeme';
    }

    // Generate Content
    const keywordSlug = slugify(keyword);
    
    // Canonical Mapping for Enrichment matching
    const canonicalMap = {
        'bioklimatische-pergola': 'bioklimatisch',
        'pergola-terrasse': 'terrasse',
        'pergola-aluminium': 'aluminium',
        'pergola-freistehend': 'freistehend',
        'pergola-preise': 'preise',
        'glasschiebewand': 'glasschiebewand',
        'senkrechtmarkise': 'senkrechtmarkise',
        'zip-screen-terrasse': 'terrasse',
        'zip-screen-wetterfest': 'wetterfest'
    };

    const mappedSlug = canonicalMap[keywordSlug] || keywordSlug;

    // Construct hierarchical slug: productId/keywordSlug (unless they are the same)
    const slug = (productId === mappedSlug) ? productId : `${productId}/${mappedSlug}`;
    const h1 = toTitleCase(keyword);

    // Pick an image
    // Try to find a somewhat relevant image if possible, else random
    let imageFile = availableImages.find(img => img.toLowerCase().includes(keywordSlug.split('-')[0]));
    if (!imageFile) {
        imageFile = getRandomImage();
    }
    const imageName = stripExtension(imageFile);

    const page = {
        slug: slug,
        template: template,
        product_id: productId,
        title: `${h1} | Apexx Bau`,
        meta_description: `Hochwertige ${keyword} direkt vom Hersteller. Konfigurieren Sie jetzt Ihre ${keyword} nach Maß. Premium Qualität & faire Preise.`,
        h1: h1,
        intro_text: `Entdecken Sie unsere Lösungen für "${keyword}". Als Hersteller bieten wir Ihnen maßgefertigte Qualität, langlebige Materialien und professionelle Montage.`,
        features: [
            "Direkt vom Hersteller",
            "Maßanfertigung",
            "5 Jahre Garantie",
            "Montage-Service"
        ],
        images: [imageName],
        faq: [] // Empty for now, could generate generic FAQs
    };

    landingPages.push(page);
});

console.log(`Generated ${landingPages.length} landing pages (Volume >= ${MIN_VOLUME}).`);

// 4. Write to JSON
fs.writeFileSync(outputPath, JSON.stringify(landingPages, null, 4));
console.log(`Successfully wrote to ${outputPath}`);

