import fs from "node:fs";
import path from "node:path";
import landingPages from "./src/data/landing_pages.json" with { type: "json" };

const imagesDir = path.resolve("./public/images");
const files = fs.readdirSync(imagesDir);
const validFiles = new Set(files.map((file) => file.toLowerCase()));
const report = {};
const totalMissing = [];

const checkExists = (baseName) => {
  const extensions = [".jpg", ".jpeg", ".png", ".webp"];
  for (const ext of extensions) {
    const candidate = (baseName + ext).toLowerCase();
    if (validFiles.has(candidate)) {
      return baseName + ext;
    }
  }
  return null;
};

landingPages.forEach((page) => {
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
    valid_files: validImages,
  };

  if (validImages.length < 4) {
    console.log(`[LOW MEDIA] ${page.slug}: Found ${validImages.length} images.`);
  }
});

console.log("Audit Complete.");
console.log(JSON.stringify(report, null, 2));