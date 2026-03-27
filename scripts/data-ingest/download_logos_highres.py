#!/usr/bin/env python3
"""
Download Celebrity Pink Jeans logos in multiple sizes
"""

import asyncio
import aiohttp
import aiofiles
import ssl
from pathlib import Path

IMAGES_DIR = Path("celebpink_assets/logos")
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

# Try multiple URL patterns for each logo
LOGO_URLS = [
    # Header logo variations
    "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28_400x.png",
    "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28_800x.png",
    "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28_1200x.png",
    "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28.png",  # Master
    # Footer logo variations
    "https://www.celebpink.com/cdn/shop/files/footer_logo1_x200.png",
    "https://www.celebpink.com/cdn/shop/files/footer_logo1_x400.png",
    "https://www.celebpink.com/cdn/shop/files/footer_logo1_x800.png",
    "https://www.celebpink.com/cdn/shop/files/footer_logo1.png",  # Master
    # Also try with query parameters
    "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28_400x.png?v=1614333253",
    "https://www.celebpink.com/cdn/shop/files/footer_logo1_x200.png?v=1614333349",
]

async def download_image(url, filename):
    """Download an image"""
    try:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        connector = aiohttp.TCPConnector(ssl=ssl_context)
        async with aiohttp.ClientSession(connector=connector) as session:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=30)) as response:
                if response.status == 200:
                    async with aiofiles.open(filename, 'wb') as f:
                        async for chunk in response.content.iter_chunked(8192):
                            await f.write(chunk)
                    return True
                return False
    except Exception as e:
        return False

async def main():
    print("Downloading Celebrity Pink Jeans logos in multiple sizes...\n")
    
    downloaded_count = 0
    
    for url in LOGO_URLS:
        # Extract filename from URL
        url_parts = url.split('/')
        filename_part = url_parts[-1].split('?')[0]  # Remove query params
        filename = IMAGES_DIR / filename_part
        
        # Skip if already exists
        if filename.exists():
            print(f"⊘ Skipped (exists): {filename.name}")
            continue
        
        success = await download_image(url, filename)
        
        if success:
            file_size = filename.stat().st_size / 1024  # KB
            print(f"✓ Downloaded: {filename.name} ({file_size:.1f} KB)")
            downloaded_count += 1
        else:
            print(f"⊘ Failed: {filename.name}")
        
        await asyncio.sleep(0.2)
    
    print(f"\n=== Complete ===")
    print(f"Downloaded {downloaded_count} logo files")

if __name__ == "__main__":
    asyncio.run(main())

