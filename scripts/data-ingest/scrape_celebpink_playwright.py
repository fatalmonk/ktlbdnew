#!/usr/bin/env python3
"""
Playwright-based scraper for Celebrity Pink Jeans denim products
Extracts all product images from the website
"""

import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright
import aiohttp
import aiofiles

BASE_URL = "https://www.celebpink.com"
OUTPUT_DIR = Path("celebpink_assets")
IMAGES_DIR = OUTPUT_DIR / "images"
DATA_DIR = OUTPUT_DIR / "data"

# Create directories
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

async def get_all_product_urls(page):
    """Get all product URLs from collections"""
    product_urls = set()
    
    collections = [
        "/collections/bottoms",
        "/collections/skinny",
        "/collections/shorts",
        "/collections/skirt",
        "/collections/new-arrivals",
    ]
    
    for collection_path in collections:
        page_num = 1
        while True:
            url = f"{BASE_URL}{collection_path}"
            if page_num > 1:
                url += f"?page={page_num}"
            
            try:
                print(f"Fetching: {url}")
                await page.goto(url, wait_until="networkidle", timeout=30000)
                await page.wait_for_timeout(2000)  # Wait for JS to load
                
                # Extract product URLs
                product_links = await page.evaluate("""
                    () => {
                        const links = Array.from(document.querySelectorAll('a[href*="/products/"]'));
                        return links.map(link => link.href).filter((v, i, a) => a.indexOf(v) === i);
                    }
                """)
                
                if not product_links:
                    break
                
                for link in product_links:
                    # Normalize URL (remove variant params)
                    clean_url = link.split('?')[0] if '?' in link else link
                    product_urls.add(clean_url)
                
                # Check for next page
                next_page_exists = await page.evaluate("""
                    () => {
                        const nextLink = document.querySelector('a[href*="page=' + (parseInt(new URLSearchParams(window.location.search).get('page') || '1') + 1) + '"]');
                        return nextLink !== null;
                    }
                """)
                
                if not next_page_exists:
                    break
                
                page_num += 1
                await asyncio.sleep(1)  # Be respectful
                
            except Exception as e:
                print(f"Error fetching {url}: {e}")
                break
    
    return list(product_urls)

async def extract_product_images(page, product_url):
    """Extract all images from a product page"""
    try:
        print(f"  Fetching product: {product_url}")
        await page.goto(product_url, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)  # Wait for images to load
        
        product_data = await page.evaluate("""
            () => {
                const data = {
                    title: '',
                    url: window.location.href,
                    images: []
                };
                
                // Get product title
                const titleEl = document.querySelector('h1');
                if (titleEl) {
                    // Get text content, not innerHTML
                    let titleText = titleEl.textContent || titleEl.innerText || '';
                    // Remove any image tags or other HTML
                    titleText = titleText.replace(/<[^>]*>/g, '').trim();
                    data.title = titleText || 'Unknown Product';
                } else {
                    data.title = 'Unknown Product';
                }
                
                // Find all product images
                const allImages = Array.from(document.querySelectorAll('img'));
                const seenUrls = new Set();
                
                allImages.forEach(img => {
                    let src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
                    
                    if (src && (src.includes('cdn/shop/products') || src.includes('cdn/shop/files'))) {
                        // Clean up Shopify CDN URLs - get highest resolution
                        if (src.includes('?')) {
                            src = src.split('?')[0];
                        }
                        
                        // Replace size indicators with master (highest quality)
                        src = src.replace(/_\\d+x\\.jpg/i, '_master.jpg')
                                 .replace(/_\\d+x\\.jpeg/i, '_master.jpeg')
                                 .replace(/_\\d+x\\.png/i, '_master.png')
                                 .replace(/_\\d+x\\.webp/i, '_master.webp')
                                 .replace(/\\/\\d+x\\//, '/master/');
                        
                        // Ensure it's https
                        if (src.startsWith('//')) {
                            src = 'https:' + src;
                        }
                        
                        if (!seenUrls.has(src)) {
                            seenUrls.add(src);
                            data.images.push({
                                url: src,
                                alt: img.alt || '',
                                width: img.naturalWidth || 0,
                                height: img.naturalHeight || 0
                            });
                        }
                    }
                });
                
                // Also check JSON-LD structured data
                const jsonScripts = document.querySelectorAll('script[type="application/ld+json"]');
                jsonScripts.forEach(script => {
                    try {
                        const jsonData = JSON.parse(script.textContent);
                        if (jsonData.image) {
                            const imageList = Array.isArray(jsonData.image) ? jsonData.image : [jsonData.image];
                            imageList.forEach(imgUrl => {
                                if (imgUrl && !seenUrls.has(imgUrl)) {
                                    seenUrls.add(imgUrl);
                                    data.images.push({
                                        url: imgUrl.startsWith('//') ? 'https:' + imgUrl : imgUrl,
                                        alt: jsonData.name || '',
                                        width: 0,
                                        height: 0
                                    });
                                }
                            });
                        }
                    } catch (e) {}
                });
                
                // Filter out non-product images (logos, icons, etc.)
                data.images = data.images.filter(img => {
                    const url = img.url.toLowerCase();
                    return url.includes('products/') && 
                           !(url.includes('logo') || url.includes('icon') || url.includes('footer') || url.includes('header'));
                });
                
                return data;
            }
        """)
        
        return product_data
        
    except Exception as e:
        print(f"  Error extracting images from {product_url}: {e}")
        return None

async def download_image(image_url, filename):
    """Download an image using aiohttp with SSL verification disabled"""
    try:
        import ssl
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        connector = aiohttp.TCPConnector(ssl=ssl_context)
        async with aiohttp.ClientSession(connector=connector) as session:
            async with session.get(image_url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                if response.status == 200:
                    async with aiofiles.open(filename, 'wb') as f:
                        async for chunk in response.content.iter_chunked(8192):
                            await f.write(chunk)
                    return True
                else:
                    print(f"    Error: HTTP {response.status} for {image_url}")
                    return False
    except Exception as e:
        print(f"    Error downloading {image_url}: {e}")
        return False

async def main():
    print("Starting Celebrity Pink Jeans scraper with Playwright...")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()
        
        # Step 1: Get all product URLs
        print("\n=== Step 1: Collecting product URLs ===")
        product_urls = await get_all_product_urls(page)
        print(f"Found {len(product_urls)} unique product URLs")
        
        # Save product URLs
        async with aiofiles.open(DATA_DIR / "product_urls.json", 'w') as f:
            await f.write(json.dumps(product_urls, indent=2))
        
        # Step 2: Extract images from each product
        print("\n=== Step 2: Extracting product images ===")
        all_products = []
        downloaded_count = 0
        
        for i, product_url in enumerate(product_urls, 1):
            print(f"\n[{i}/{len(product_urls)}] Processing product...")
            product_data = await extract_product_images(page, product_url)
            
            if product_data and product_data['images']:
                all_products.append(product_data)
                
                # Create safe filename from product title
                safe_title = "".join(c for c in product_data['title'] if c.isalnum() or c in (' ', '-', '_')).strip()
                safe_title = safe_title.replace(' ', '_')[:50] or f"product_{i}"
                
                # Download images
                print(f"  Found {len(product_data['images'])} images")
                for j, img_data in enumerate(product_data['images'], 1):
                    img_url = img_data['url']
                    
                    # Determine file extension
                    ext = os.path.splitext(img_url.split('?')[0])[1] or '.jpg'
                    if ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                        ext = '.jpg'
                    
                    filename = IMAGES_DIR / f"{safe_title}_{i}_{j}{ext}"
                    
                    if await download_image(img_url, filename):
                        downloaded_count += 1
                        print(f"    ✓ Downloaded: {filename.name}")
                    
                    await asyncio.sleep(0.5)  # Be respectful
            
            await asyncio.sleep(1)  # Be respectful between products
        
        await browser.close()
        
        # Step 3: Save product data
        print("\n=== Step 3: Saving product data ===")
        async with aiofiles.open(DATA_DIR / "products.json", 'w') as f:
            await f.write(json.dumps(all_products, indent=2))
        
        # Create summary
        summary = {
            'total_products': len(product_urls),
            'products_with_images': len(all_products),
            'total_images_downloaded': downloaded_count,
            'output_directory': str(OUTPUT_DIR.absolute()),
        }
        
        async with aiofiles.open(OUTPUT_DIR / "summary.json", 'w') as f:
            await f.write(json.dumps(summary, indent=2))
        
        print(f"\n=== Scraping Complete ===")
        print(f"Products processed: {len(all_products)}")
        print(f"Images downloaded: {downloaded_count}")
        print(f"Output directory: {OUTPUT_DIR.absolute()}")

if __name__ == "__main__":
    asyncio.run(main())

