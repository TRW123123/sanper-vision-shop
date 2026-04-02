import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import landingPages from './src/data/landing_pages.json' with { type: 'json' };

// Build set of enriched slugs (pages with real content that should be indexed)
const enrichedSlugs = new Set(
  landingPages
    .filter(p => p.block_1_content || (p.faq && p.faq.length > 0))
    .map(p => `/${p.slug}/`.replace('//', '/'))
);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.apexx-bau.de',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;

        // Always exclude legal pages
        const excludedPaths = ['/impressum/', '/datenschutz/', '/agb/'];
        if (excludedPaths.some(p => path.includes(p))) return false;

        // Always include static pages (homepage, produkte, kategorie-seiten, ratgeber, etc.)
        const staticPages = ['/', '/produkte/', '/konfigurator/', '/anfrage/', '/kontakt/', '/ueber-uns/', '/pergola-systeme/', '/wintergarten-systeme/', '/zip-screen-systeme/', '/ratgeber/'];
        if (staticPages.includes(path)) return true;

        // Include ratgeber articles
        if (path.startsWith('/ratgeber/')) return true;

        // For landing pages: only include enriched ones
        if (enrichedSlugs.has(path)) return true;

        // Exclude thin content landing pages from sitemap
        return false;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});