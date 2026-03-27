#!/usr/bin/env python3
"""
Scraper for Celebrity Pink Jeans denim products
Extracts all product images from the website
"""

import requests
from bs4 import BeautifulSoup
import os
import json
from urllib.parse import urljoin, urlparse
import time
from pathlib import Path

BASE_URL = "https://www.celebpink.com"
OUTPUT_DIR = Path("celebpink_assets")
IMAGES_DIR = OUTPUT_DIR / "images"
DATA_DIR = OUTPUT_DIR / "data"

# Create directories
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

def get_session():
    """Create a session with headers"""
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
    })
    return session

def get_all_product_urls(session):
    """Get all product URLs from collections"""
    product_urls = set()
    
    # Collections to check
    collections = [
        "/collections/bottoms",
        "/collections/skinny",
        "/collections/curvy",
        "/collections/shorts",
        "/collections/skirt",
        "/collections/new-arrivals",
    ]
    
    for collection_path in collections:
        page = 1
        while True:
            url = f"{BASE_URL}{collection_path}"
            if page > 1:
                url += f"?page={page}"
            
            try:
                print(f"Fetching: {url}")
                response = session.get(url, timeout=10)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Find all product links
                product_links = soup.find_all('a', href=True)
                found_products = False
                
                for link in product_links:
                    href = link.get('href', '')
                    if '/products/' in href:
                        full_url = urljoin(BASE_URL, href)
                        product_urls.add(full_url)
                        found_products = True
                
                # Check if there's a next page
                next_page = soup.find('a', href=lambda x: x and f'page={page+1}' in x)
                if not next_page or not found_products:
                    break
                
                page += 1
                time.sleep(1)  # Be respectful
                
            except Exception as e:
                print(f"Error fetching {url}: {e}")
                break
    
    return list(product_urls)

def extract_product_images(session, product_url):
    """Extract all images from a product page"""
    try:
        print(f"  Fetching product: {product_url}")
        response = session.get(product_url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Get product title
        title_elem = soup.find('h1') or soup.find('h2') or soup.find(class_='product-title')
        product_title = title_elem.get_text(strip=True) if title_elem else "Unknown"
        
        # Find all product images
        images = []
        
        # Common selectors for product images
        img_selectors = [
            'img[src*="products"]',
            'img[data-src*="products"]',
            '.product-image img',
            '.product-gallery img',
            '.product-photos img',
            '[class*="product"] img',
            '[class*="gallery"] img',
        ]
        
        for selector in img_selectors:
            imgs = soup.select(selector)
            for img in imgs:
                src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
                if src:
                    # Clean up Shopify CDN URLs
                    if '?' in src:
                        src = src.split('?')[0]
                    full_url = urljoin(BASE_URL, src)
                    if full_url not in [img['url'] for img in images]:
                        images.append({
                            'url': full_url,
                            'alt': img.get('alt', ''),
                        })
        
        # Also check for structured data (JSON-LD)
        json_scripts = soup.find_all('script', type='application/ld+json')
        for script in json_scripts:
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and 'image' in data:
                    if isinstance(data['image'], list):
                        for img_url in data['image']:
                            full_url = urljoin(BASE_URL, img_url)
                            if full_url not in [img['url'] for img in images]:
                                images.append({
                                    'url': full_url,
                                    'alt': product_title,
                                })
                    elif isinstance(data['image'], str):
                        full_url = urljoin(BASE_URL, data['image'])
                        if full_url not in [img['url'] for img in images]:
                            images.append({
                                'url': full_url,
                                'alt': product_title,
                            })
            except:
                pass
        
        return {
            'title': product_title,
            'url': product_url,
            'images': images
        }
        
    except Exception as e:
        print(f"  Error extracting images from {product_url}: {e}")
        return None

def download_image(session, image_url, filename):
    """Download an image"""
    try:
        response = session.get(image_url, timeout=30, stream=True)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"    Error downloading {image_url}: {e}")
        return False

def main():
    print("Starting Celebrity Pink Jeans scraper...")
    session = get_session()
    
    # Get all product URLs
    print("\n=== Step 1: Collecting product URLs ===")
    product_urls = get_all_product_urls(session)
    print(f"Found {len(product_urls)} unique product URLs")
    
    # Save product URLs
    with open(DATA_DIR / "product_urls.json", 'w') as f:
        json.dump(product_urls, f, indent=2)
    
    # Extract images from each product
    print("\n=== Step 2: Extracting product images ===")
    all_products = []
    downloaded_count = 0
    
    for i, product_url in enumerate(product_urls, 1):
        print(f"\n[{i}/{len(product_urls)}] Processing product...")
        product_data = extract_product_images(session, product_url)
        
        if product_data and product_data['images']:
            all_products.append(product_data)
            
            # Create safe filename from product title
            safe_title = "".join(c for c in product_data['title'] if c.isalnum() or c in (' ', '-', '_')).strip()
            safe_title = safe_title.replace(' ', '_')[:50]
            
            # Download images
            print(f"  Found {len(product_data['images'])} images")
            for j, img_data in enumerate(product_data['images'], 1):
                img_url = img_data['url']
                
                # Determine file extension
                parsed = urlparse(img_url)
                ext = os.path.splitext(parsed.path)[1] or '.jpg'
                if ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif']:
                    ext = '.jpg'
                
                filename = IMAGES_DIR / f"{safe_title}_{i}_{j}{ext}"
                
                if download_image(session, img_url, filename):
                    downloaded_count += 1
                    print(f"    ✓ Downloaded: {filename.name}")
                
                time.sleep(0.5)  # Be respectful
        
        time.sleep(1)  # Be respectful between products
    
    # Save product data
    print("\n=== Step 3: Saving product data ===")
    with open(DATA_DIR / "products.json", 'w') as f:
        json.dump(all_products, f, indent=2)
    
    # Create summary
    summary = {
        'total_products': len(product_urls),
        'products_with_images': len(all_products),
        'total_images_downloaded': downloaded_count,
        'output_directory': str(OUTPUT_DIR.absolute()),
    }
    
    with open(OUTPUT_DIR / "summary.json", 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"\n=== Scraping Complete ===")
    print(f"Products processed: {len(all_products)}")
    print(f"Images downloaded: {downloaded_count}")
    print(f"Output directory: {OUTPUT_DIR.absolute()}")

if __name__ == "__main__":
    main()

