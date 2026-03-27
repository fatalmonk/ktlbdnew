#!/usr/bin/env python3
"""
Download images from the extracted product data
"""

import asyncio
import json
import os
from pathlib import Path
import aiohttp
import aiofiles
import ssl

IMAGES_DIR = Path("celebpink_assets/images")
DATA_DIR = Path("celebpink_assets/data")

async def download_image(image_url, filename):
    """Download an image using aiohttp with SSL verification disabled"""
    try:
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
    print("Loading product data...")
    
    # Load products JSON
    with open(DATA_DIR / "products.json", 'r') as f:
        products = json.load(f)
    
    print(f"Found {len(products)} products")
    
    downloaded_count = 0
    failed_count = 0
    
    for i, product in enumerate(products, 1):
        # Extract product name from URL or title
        product_name = "Unknown"
        if product.get('title'):
            # Clean title
            title = product['title'].replace('<img', '').replace('>', '').strip()
            if title and title != 'Unknown Product':
                product_name = "".join(c for c in title if c.isalnum() or c in (' ', '-', '_')).strip()[:50]
                product_name = product_name.replace(' ', '_') or f"product_{i}"
        else:
            # Extract from URL
            url_parts = product['url'].split('/')
            if 'products' in url_parts:
                product_name = url_parts[url_parts.index('products') + 1].replace('-', '_')[:50]
        
        if not product_name or product_name == 'Unknown':
            product_name = f"product_{i}"
        
        print(f"\n[{i}/{len(products)}] {product_name}")
        print(f"  Found {len(product.get('images', []))} images")
        
        for j, img_data in enumerate(product.get('images', []), 1):
            img_url = img_data['url']
            
            # Determine file extension
            ext = os.path.splitext(img_url.split('?')[0])[1] or '.jpg'
            if ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                ext = '.jpg'
            
            filename = IMAGES_DIR / f"{product_name}_{i}_{j}{ext}"
            
            # Skip if already downloaded
            if filename.exists():
                print(f"    ⊘ Skipped (exists): {filename.name}")
                downloaded_count += 1
                continue
            
            if await download_image(img_url, filename):
                downloaded_count += 1
                print(f"    ✓ Downloaded: {filename.name}")
            else:
                failed_count += 1
            
            await asyncio.sleep(0.3)  # Be respectful
    
    print(f"\n=== Download Complete ===")
    print(f"Successfully downloaded: {downloaded_count}")
    print(f"Failed: {failed_count}")

if __name__ == "__main__":
    asyncio.run(main())

