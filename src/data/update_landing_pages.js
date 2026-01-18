
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, 'landing_pages.json');
const csvPath = path.join(__dirname, 'task_input.csv');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
const pages = JSON.parse(jsonContent);

const lines = csvContent.split('\n');
const headers = lines[0].trim().split(',');

// Helper to handle CSV values with commas inside quotes
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

const csvData = {};
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple split doesn't work for quoted content with commas
    // Use the helper
    const values = parseCSVLine(line);

    // Map strictly to headers
    const row = {};
    headers.forEach((h, idx) => {
        // Remove quotes if present
        let val = values[idx];
        if (val && val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
        }
        row[h] = val;
    });

    if (row.slug !== undefined) {
        // Normalize slug: remove leading slash
        let slug = row.slug;
        if (slug.startsWith('/')) {
            slug = slug.substring(1);
        }
        csvData[slug] = row;
    }
}

// Update JSON
let updatedCount = 0;
const newPages = pages.map(page => {
    const update = csvData[page.slug];
    if (update) {
        updatedCount++;
        // Fields to inject
        return {
            ...page,
            block_1_content: update.block_1_content,
            block_1_placement: update.block_1_placement,
            block_2_content: update.block_2_content,
            block_2_placement: update.block_2_placement,
            faq_theme: update.faq_theme,
            faq_unique_q_count: update.faq_unique_q_count ? parseInt(update.faq_unique_q_count) : 5,
            cta_primary_text: update.cta_primary_text,
            cta_secondary_text: update.cta_secondary_text
            // Not overwriting critical existing data like 'images' or 'product_id'
        };
    }
    return page;
});

fs.writeFileSync(jsonPath, JSON.stringify(newPages, null, 2));

console.log(`Updated ${updatedCount} pages in landing_pages.json`);
