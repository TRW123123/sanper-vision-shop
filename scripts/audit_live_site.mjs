import fs from 'fs';

const BASE_URL = "https://www.apexx-bau.de";
const CSV_PATH = "./src/data/task_input.csv";
const REPORT_PATH = "./verify_output.txt";

// Stream setup
const stream = fs.createWriteStream(REPORT_PATH, { flags: 'w' });

function log(msg) {
    console.log(msg);
    stream.write(msg + "\n");
}

// Simple CSV parser
function parseCSV(csvText) {
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i];
        const row = {};
        let insideQuote = false;
        let start = 0;
        let fieldIndex = 0;

        for (let j = 0; j < currentLine.length; j++) {
            if (currentLine[j] === '"') {
                insideQuote = !insideQuote;
            } else if (currentLine[j] === ',' && !insideQuote) {
                let value = currentLine.substring(start, j).trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1).replace(/""/g, '"');
                }
                row[headers[fieldIndex]] = value;
                fieldIndex++;
                start = j + 1;
            }
        }
        let value = currentLine.substring(start).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1).replace(/""/g, '"');
        }
        row[headers[fieldIndex]] = value;

        if (row.slug) {
            data.push(row);
        }
    }
    return data;
}

function cleanText(text) {
    // Normalize newlines and multiple spaces to single space
    return text.replace(/\s+/g, ' ').trim();
}

async function runAudit() {
    try {
        const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
        const records = parseCSV(csvContent);

        log(`| slug | block_1_ok | block_2_ok | placement_ok | cta_ok | faq_ok | index_ok | render_ok | page_status | notes |`);
        log(`|---|---|---|---|---|---|---|---|---|---|`);

        let total_pages = 0;
        let pages_ok = 0;
        let pages_with_deviation = 0;

        for (const record of records) {
            if (!record.slug) continue;
            total_pages++;

            const slug = record.slug;
            const targetUrl = slug === '/' ? BASE_URL : BASE_URL + slug;

            // Expected Content (Cleaned)
            const b1 = cleanText(record.block_1_content || "");
            const b2 = cleanText(record.block_2_content || "");
            const ctaPri = cleanText(record.cta_primary_text || "");
            // FAQ Assumption: 1
            const EXPECTED_FAQ_COUNT = 1;

            let html = "";
            let statusCode = 0;
            try {
                const res = await fetch(targetUrl);
                statusCode = res.status;
                html = await res.text();
                html = cleanText(html);
            } catch (e) {
                statusCode = 500;
                html = "";
            }

            // Checks
            const is200 = statusCode === 200;
            const index_ok = is200 ? "YES" : "NO";

            // Content Checks (Using strict inclusion)
            const hasB1 = b1 && html.includes(b1);
            const hasB2 = b2 && html.includes(b2);

            const block_1_ok = hasB1 ? "YES" : "NO";
            const block_2_ok = hasB2 ? "YES" : "NO";
            const placement_ok = (hasB1 && hasB2) ? "YES" : "NO";

            // CTA
            const hasCtaPri = ctaPri && html.includes(ctaPri);
            // Ignore secondary for simplified check unless primary fails
            const cta_ok = hasCtaPri ? "YES" : "NO";

            // FAQ Check - Updated for live site DOM (h3 with specific classes)
            // Class observed: "font-semibold text-lg mb-2 flex items-center gap-3"
            const faqMatches = html.match(/font-semibold text-lg mb-2 flex items-center gap-3/g) || [];
            const summaryCount = faqMatches.length;
            const faq_ok = (summaryCount === EXPECTED_FAQ_COUNT) ? "YES" : `NO (${summaryCount})`;

            // Rendering
            const render_ok = html.length > 5000 ? "YES" : "NO";

            const status = (index_ok === "YES" && block_1_ok === "YES" && block_2_ok === "YES" && cta_ok === "YES" && faq_ok === "YES") ? "OK" : "DEVIATION";

            if (status === "OK") pages_ok++;
            else pages_with_deviation++;

            let notes = "";
            if (!is200) notes += `HTTP ${statusCode}. `;
            if (!hasB1) notes += "Missing Block 1. ";
            if (!hasB2) notes += "Missing Block 2. ";
            if (!hasCtaPri) notes += "Missing Pri CTA. ";
            if (summaryCount !== EXPECTED_FAQ_COUNT) notes += `FAQ=${summaryCount}. `;

            log(`| ${slug} | ${block_1_ok} | ${block_2_ok} | ${placement_ok} | ${cta_ok} | ${faq_ok} | ${index_ok} | ${render_ok} | ${status} | ${notes} |`);
        }

        log("\nSUMMARY");
        log(`total_pages: ${total_pages}`);
        log(`pages_ok: ${pages_ok}`);
        log(`pages_with_deviation: ${pages_with_deviation}`);

    } catch (err) {
        log("FATAL ERROR: " + err.message);
    } finally {
        stream.end();
    }
}

runAudit();
