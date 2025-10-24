#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts all images in public/assets to WebP format with multiple sizes
 * for responsive images
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, parse, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = join(__dirname, 'public', 'assets');
const OUTPUT_DIR = join(__dirname, 'public', 'assets-optimized');

// Image sizes for responsive images
const SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
};

// WebP quality
const WEBP_QUALITY = 85;

/**
 * Get all image files from a directory
 */
async function getImageFiles(dir) {
  const files = await readdir(dir);
  const imageFiles = [];

  for (const file of files) {
    const filePath = join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      // Recursively get images from subdirectories
      const subFiles = await getImageFiles(filePath);
      imageFiles.push(...subFiles);
    } else if (/\.(jpe?g|png|gif|tiff?)$/i.test(file)) {
      imageFiles.push(filePath);
    }
  }

  return imageFiles;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
  const { name, ext } = parse(inputPath);
  const relativePath = inputPath.replace(INPUT_DIR, '').replace(/^\//, '');
  const relativeDir = dirname(relativePath);

  console.log(`\n📸 Processing: ${name}${ext}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Create output directory
    const outputDir = join(OUTPUT_DIR, relativeDir);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Generate original WebP (full size)
    const originalWebP = join(outputDir, `${name}.webp`);
    await image
      .webp({ quality: WEBP_QUALITY })
      .toFile(originalWebP);

    const originalStats = await stat(originalWebP);
    console.log(`   ✓ Full size WebP: ${Math.round(originalStats.size / 1024)}KB`);

    // Generate responsive sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      if (metadata.width > width) {
        const outputPath = join(outputDir, `${name}-${sizeName}.webp`);
        await sharp(inputPath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .webp({ quality: WEBP_QUALITY })
          .toFile(outputPath);

        const stats = await stat(outputPath);
        console.log(`   ✓ ${sizeName} (${width}px): ${Math.round(stats.size / 1024)}KB`);
      }
    }

    // Keep original as fallback (optimized)
    const fallbackPath = join(outputDir, `${name}${ext}`);
    await sharp(inputPath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(fallbackPath);

    console.log(`   ✓ Fallback JPEG created`);

  } catch (error) {
    console.error(`   ✗ Error processing ${name}${ext}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Image Optimization Started\n');
  console.log(`📂 Input directory: ${INPUT_DIR}`);
  console.log(`📂 Output directory: ${OUTPUT_DIR}\n`);

  try {
    // Get all images
    const imageFiles = await getImageFiles(INPUT_DIR);
    console.log(`Found ${imageFiles.length} images to process\n`);

    if (imageFiles.length === 0) {
      console.log('⚠️  No images found to optimize');
      return;
    }

    // Process all images
    for (const imagePath of imageFiles) {
      await optimizeImage(imagePath);
    }

    console.log('\n✅ Image optimization complete!');
    console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
