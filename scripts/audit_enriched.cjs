const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'landing_pages.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const countWords = (str) => {
    if (!str) return 0;
    // Strip HTML tags
    const text = str.replace(/<[^>]*>?/gm, ' ');
    return text.trim().split(/\s+/).length;
};

const targets = [
    "pergola-systeme/bioklimatisch",
    "pergola-systeme/terrasse",
    "pergola-systeme/aluminium",
    "pergola-systeme/freistehend",
    "pergola-systeme/preise",
    "wintergarten-systeme/glasschiebewand",
    "zip-screen-systeme/senkrechtmarkise",
    "zip-screen-systeme/terrasse",
    "zip-screen-systeme/wetterfest"
];

console.log("=== ENRICHED CONTENT AUDIT ===");

data.forEach(page => {
    if (targets.includes(page.slug)) {
        let totalWords = 0;

        totalWords += countWords(page.intro_text);
        totalWords += countWords(page.block_1_content);
        totalWords += countWords(page.block_2_content);

        if (page.faq) {
            page.faq.forEach(q => {
                totalWords += countWords(q.question);
                totalWords += countWords(q.answer);
            });
        }

        if (totalWords >= 500) {
            console.log(`✅ OK (${totalWords} words) - ${page.slug}`);
        } else {
            console.log(`❌ THIN (${totalWords} words) - ${page.slug}`);
        }
    }
});
