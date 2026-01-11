const fs = require('fs');
const path = require('path');
const landingPages = require('./src/data/landing_pages.json');

const IMAGES_DIR = path.resolve('./public/images');

// Get all files in images dir
const files = fs.readdirSync(IMAGES_DIR);
const validFiles = new Set(files.map(f => f.toLowerCase()));

const report = {};

// Helper to check extensions
const checkExists = (baseName) => {
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    for (const ext of extensions) {
        if (validFiles.has((baseName + ext).toLowerCase())) {
            return baseName + ext;
        }
    }
    return null;
};

let missingCount = 0;
let totalMissing = [];

landingPages.forEach(page => {
    // Check first 5 images (or however many defined)
    const pageImages = page.images || [];
    const validImages = [];
    const missingContext = [];

    pageImages.forEach((imgBase) => {
        const found = checkExists(imgBase);
        if (found) {
            validImages.push(found);
        } else {
            missingContext.push(imgBase);
            totalMissing.push({ page: page.slug, image: imgBase, h1: page.h1 });
        }
    });

    report[page.slug] = {
        h1: page.h1,
        total_defined: pageImages.length,
        valid_count: validImages.length,
        missing: missingContext,
        valid_files: validImages
    };

    if (validImages.length < 4) {
        console.log(`[LOW MEDIA] ${page.slug}: Found ${validImages.length} images.`);
    }
});

console.log("Audit Complete.");
console.log(JSON.stringify(report, null, 2));
