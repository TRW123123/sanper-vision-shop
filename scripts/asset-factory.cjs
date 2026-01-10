const fs = require('fs');
const path = require('path');

// Configuration
const taxonomyPath = path.join(__dirname, 'taxonomy.json');
const locationsPath = path.join(__dirname, 'locations.json');
const outputDir = path.join(__dirname, '../public/assets/generated_placeholders');

// Load Data
const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
const locations = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

// Prompt Template Function
function generatePrompt(productKey, product, location) {
    const basePrompt = `Professional architectural photography of a ${product.technical_term}`;
    const productDetails = `featuring ${product.keywords.join(', ')}`;
    const locationContext = `installed in a ${location.context} in ${location.city} style`;
    const architecture = `surrounded by ${location.architecture}`;
    const lighting = `lighting is ${location.vibe}, photorealistic, 8k resolution, architectural digest style`;

    return `${basePrompt}, ${productDetails}, ${locationContext}, ${architecture}. ${lighting}`;
}

// Main Execution
async function main() {
    console.log("🏭 Starting Asset Factory - Sanper Vision");
    console.log("=========================================");

    const generatedPrompts = [];

    // Iterate Products
    for (const [key, product] of Object.entries(taxonomy)) {
        console.log(`\nProcessing Product: ${product.name} (${key})`);

        // Iterate Locations
        for (const location of locations) {
            const prompt = generatePrompt(key, product, location);
            const filename = `${key}-${location.city.toLowerCase().replace('ü', 'ue').replace('ö', 'oe')}.jpg`;

            console.log(`  📍 ${location.city}: "${prompt.substring(0, 60)}..."`);

            generatedPrompts.push({
                filename,
                product: product.name,
                location: location.city,
                prompt: prompt
            });
        }
    }

    // Save Prompts Verification File
    const promptLogPath = path.join(__dirname, 'generated_prompts_log.json');
    fs.writeFileSync(promptLogPath, JSON.stringify(generatedPrompts, null, 2));
    console.log(`\n✅ Generated ${generatedPrompts.length} prompts.`);
    console.log(`📁 Log saved to: ${promptLogPath}`);
}

main().catch(console.error);
