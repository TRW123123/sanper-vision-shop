const fs = require('fs');
const path = require('path');

// Use absolute or relative to CWD with manual read
const LANDING_PAGES_PATH = path.join(process.cwd(), 'src', 'data', 'landing_pages.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

try {
    const data = fs.readFileSync(LANDING_PAGES_PATH, 'utf8');
    const landingPages = JSON.parse(data);

    // Get all files in images dir
    const files = fs.readdirSync(IMAGES_DIR);
    const validFiles = new Set(files.map(f => f.toLowerCase()));

    const report = {};

    // Helper to check extensions
    const checkExists = (baseName) => {
        // Only verify exact baseName match or with extension if data has no extension
        // The data seems to NOT have extension. The template adds .jpg.
        // My list has .jpg, .jpeg, .png.
        // So I should check baseName + .jpg, .jpeg, .png
        const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

        // If the baseName itself has extension (unlikely per my read)
        if (validFiles.has(baseName.toLowerCase())) return baseName;

        for (const ext of extensions) {
            if (validFiles.has((baseName + ext).toLowerCase())) {
                return baseName + ext;
            }
        }
        return null;
    };

    let missingCount = 0;

    landingPages.forEach(page => {
        const pageImages = page.images || [];
        const validImages = [];
        const missingContext = [];

        pageImages.forEach((imgBase) => {
            const found = checkExists(imgBase);
            if (found) {
                validImages.push(found);
            } else {
                missingContext.push(imgBase);
                missingCount++;
            }
        });

        report[page.slug] = {
            valid: validImages.length,
            missing: missingContext
        };

    });

    console.log(JSON.stringify(report, null, 2));

} catch (e) {
    console.error("Error:", e.message);
}
