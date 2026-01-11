const fs = require('fs');
const path = require('path');

// Configuration
const LANDING_PAGES_PATH = path.join(process.cwd(), 'src', 'data', 'landing_pages.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const MIN_IMAGES = 3;
const MAX_IMAGES = 5;

// Load Data
const data = JSON.parse(fs.readFileSync(LANDING_PAGES_PATH, 'utf8'));
const files = fs.readdirSync(IMAGES_DIR);
const validFiles = new Set(files.map(f => f.toLowerCase()));

// New Shared Assets
const COMMON_ASSETS = [
    'showroom_consultation_germany.jpg'
];

const CATEGORY_ASSETS = {
    'pergola-systeme': [
        'pergola_bioclimatic_detail_rain.jpg'
    ],
    'wintergarten-systeme': [
        'wintergarten_modern_night.jpg',
        'wintergarten_interior_living_room.jpg'
    ],
    'zip-screen': [
        'zip_screen_sun_protection.jpg',
        'zip_screen_privacy_evening_modern.jpg'
    ]
};

// Helper to validate file existence
const checkExists = (baseName) => {
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    if (validFiles.has(baseName.toLowerCase())) return baseName; // if extension already in data

    for (const ext of extensions) {
        if (validFiles.has((baseName + ext).toLowerCase())) {
            return baseName + ext;
        }
    }
    return null;
};

// Helper: Get all valid images for a product ID (to use as pool)
const getImagePool = (productId) => {
    const pool = new Set();
    data.forEach(p => {
        if (p.product_id === productId && p.images) {
            p.images.forEach(img => {
                const valid = checkExists(img);
                if (valid) pool.add(valid.replace(/\.[^/.]+$/, "")); // Store base name
            });
        }
    });
    return Array.from(pool);
};

// Main Logic
data.forEach(page => {
    const isChild = page.template !== 'hub' || page.slug.includes('/');

    // We process ALL pages to clean broken links, but apply smart fill emphasis on children
    let currentImages = page.images || [];
    let validImages = [];

    // 1. Filter Valid
    currentImages.forEach(img => {
        const validName = checkExists(img);
        if (validName) {
            // Store base name to keep JSON consistent (template adds extension)
            validImages.push(validName.replace(/\.[^/.]+$/, ""));
        }
    });

    // 2. Inject Common Assets (Showroom) - if not present
    COMMON_ASSETS.forEach(asset => {
        const base = asset.replace(/\.[^/.]+$/, "");
        if (!validImages.includes(base)) {
            validImages.push(base);
        }
    });

    // 3. Inject Category Assets - if not present
    if (CATEGORY_ASSETS[page.product_id]) {
        CATEGORY_ASSETS[page.product_id].forEach(asset => {
            const base = asset.replace(/\.[^/.]+$/, "");
            if (!validImages.includes(base) && validImages.length < MAX_IMAGES) {
                validImages.push(base);
            }
        });
    }

    // 4. Backfill from Sibling Pool if < MIN_IMAGES (Only for Child Pages)
    if (isChild && validImages.length < MIN_IMAGES) {
        const pool = getImagePool(page.product_id);
        for (const poolImg of pool) {
            if (!validImages.includes(poolImg) && validImages.length < MIN_IMAGES) {
                validImages.push(poolImg);
            }
        }
    }

    // 5. Cap at MAX_IMAGES
    page.images = validImages.slice(0, MAX_IMAGES);
});

// Save
fs.writeFileSync(LANDING_PAGES_PATH, JSON.stringify(data, null, 4));
console.log("Updated landing_pages.json with smart image distribution.");
