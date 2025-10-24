#!/usr/bin/env node

/**
 * Sitemap Generation Script
 * Generates a sitemap.xml file with all routes from the application
 */

import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://ktlbd.com';
const OUTPUT_PATH = join(__dirname, 'public', 'sitemap.xml');

// Define all routes with their properties
const routes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/products', priority: 0.9, changefreq: 'weekly' },
  { path: '/products/denims', priority: 0.8, changefreq: 'weekly' },
  { path: '/products/knitwear', priority: 0.8, changefreq: 'weekly' },
  { path: '/products/swimwear', priority: 0.8, changefreq: 'weekly' },
  { path: '/products/kids', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.9, changefreq: 'monthly' },
  { path: '/investors', priority: 0.9, changefreq: 'weekly' },
  { path: '/investors/overview', priority: 0.8, changefreq: 'weekly' },
  { path: '/investors/stock', priority: 0.8, changefreq: 'daily' },
  { path: '/investors/reports/quarterly', priority: 0.8, changefreq: 'weekly' },
  { path: '/investors/reports/annual', priority: 0.8, changefreq: 'monthly' },
  { path: '/investors/reports/psi', priority: 0.8, changefreq: 'weekly' },
  { path: '/investors/contacts', priority: 0.7, changefreq: 'monthly' },
  { path: '/company/our-story', priority: 0.7, changefreq: 'monthly' },
  { path: '/company/leadership', priority: 0.7, changefreq: 'monthly' },
  { path: '/company/governance', priority: 0.7, changefreq: 'monthly' },
  { path: '/company/sustainability', priority: 0.8, changefreq: 'monthly' },
  { path: '/facilities/rmg', priority: 0.7, changefreq: 'monthly' },
  { path: '/facilities/washing', priority: 0.7, changefreq: 'monthly' },
  { path: '/facilities/tech', priority: 0.7, changefreq: 'monthly' },
  { path: '/facilities/agro', priority: 0.7, changefreq: 'monthly' },
  { path: '/facilities/shipping', priority: 0.7, changefreq: 'monthly' },
  { path: '/work-with-us/buyers', priority: 0.7, changefreq: 'monthly' },
  { path: '/work-with-us/vendors', priority: 0.7, changefreq: 'monthly' },
  { path: '/work-with-us/careers', priority: 0.8, changefreq: 'weekly' },
  { path: '/newsroom/press', priority: 0.7, changefreq: 'weekly' },
  { path: '/newsroom/stories', priority: 0.7, changefreq: 'weekly' },
  { path: '/newsroom/psi', priority: 0.7, changefreq: 'weekly' },
  { path: '/newsroom/media-kit', priority: 0.6, changefreq: 'monthly' },
];

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const urlEntries = routes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

  return sitemap;
}

/**
 * Main function
 */
async function main() {
  console.log('🗺️  Generating sitemap.xml...\n');

  try {
    const sitemap = generateSitemap();
    await writeFile(OUTPUT_PATH, sitemap, 'utf-8');

    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${routes.length}`);
    console.log(`\nSitemap includes:`);
    console.log(`  - Homepage`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/products')).length} Product pages`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/company')).length} Company pages`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/facilities')).length} Facility pages`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/investors')).length} Investor pages`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/work-with-us')).length} Work With Us pages`);
    console.log(`  - ${routes.filter((r) => r.path.startsWith('/newsroom')).length} Newsroom pages`);
    console.log(`  - Contact page`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

main();
