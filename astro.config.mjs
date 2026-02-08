import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sanper.de',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude legal pages from sitemap - they should be noindex
        const excludedPaths = ['/impressum/', '/datenschutz/', '/agb/'];
        return !excludedPaths.some(path => page.includes(path));
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});