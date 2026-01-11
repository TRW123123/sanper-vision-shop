
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'src', 'data', 'SEO Sanper Magic Tool.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON to analyze structure
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (data.length === 0) {
        console.log("File appears empty.");
        process.exit(1);
    }

    const headers = data[0];
    console.log("--- Excel Headers ---");
    console.log(headers);

    console.log("\n--- First 3 Rows of Data ---");
    data.slice(1, 4).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, row);
    });

} catch (error) {
    console.error("Error reading Excel file:", error.message);
}
