
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const jsonPath = path.join(rootDir, 'src', 'data', 'landing_pages.json');
const imagesDir = path.join(rootDir, 'public', 'images');

const landingPages = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`Checking ${landingPages.length} landing pages...`);

const missingImages = [];
const foundImages = [];

landingPages.forEach(page => {
    if (page.images && Array.isArray(page.images)) {
        page.images.forEach(imgName => {
            // Check for both .jpg and .png just in case, though data implies structure
            // The code in [...slug].astro appends .jpg: src={`/images/${page.images[0]}.jpg`}
            // But let's check what's actually on disk.

            const jpgPath = path.join(imagesDir, `${imgName}.jpg`);
            const jpegPath = path.join(imagesDir, `${imgName}.jpeg`);
            const pngPath = path.join(imagesDir, `${imgName}.png`);

            if (fs.existsSync(jpgPath)) {
                foundImages.push(imgName);
            } else if (fs.existsSync(jpegPath)) {
                // Component expects .jpg, so this would be a mismatch if code isn't dynamic
                console.warn(`WARNING: ${imgName} found as .jpeg, but component likely expects .jpg`);
                foundImages.push(imgName);
            } else if (fs.existsSync(pngPath)) {
                console.warn(`WARNING: ${imgName} found as .png, but component likely expects .jpg`);
                foundImages.push(imgName);
            } else {
                missingImages.push({
                    page: page.slug,
                    image: imgName
                });
            }
        });
    }
});

console.log('--- Verification Results ---');
console.log(`Verified Images: ${foundImages.length}`);
if (missingImages.length === 0) {
    console.log('SUCCESS: All referenced images found!');
} else {
    console.error(`FAILURE: ${missingImages.length} images missing.`);
    missingImages.forEach(m => console.log(`  - Page: ${m.page}, Image: ${m.image}`));
    process.exit(1);
}
