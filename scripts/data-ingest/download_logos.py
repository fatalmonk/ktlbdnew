#!/usr/bin/env python3
"""
Download Celebrity Pink Jeans logos
"""

import asyncio
import aiohttp
import aiofiles
import ssl
from pathlib import Path

IMAGES_DIR = Path("celebpink_assets/logos")
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

LOGOS = [
    {
        "name": "logo_header",
        "url": "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28.png",
        "original_url": "https://www.celebpink.com/cdn/shop/files/logo_header_6c11a221-2f86-40ff-9b40-504860e1fd28_400x.png?v=1614333253",
        "sizes": ["400x", "800x", "1200x", "master"]
    },
    {
        "name": "logo_footer",
        "url": "https://www.celebpink.com/cdn/shop/files/footer_logo1.png",
        "original_url": "https://www.celebpink.com/cdn/shop/files/footer_logo1_x200.png?v=1614333349",
        "sizes": ["x200", "x400", "x800", "master"]
    }
]

async def download_logo(base_url, size, filename):
    """Download a logo with specific size"""
    try:
        # Construct URL based on size format
        if size == "master":
            url = base_url
        elif "x" in size and size.startswith("x"):
            # Footer format: footer_logo1_x200.png
            url = base_url.replace("_x200.png", f"_{size}.png")
        else:
            # Header format: logo_header_xxx_400x.png
            url = base_url.replace(".png", f"_{size}.png")
        
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
                    return True, url
                elif response.status == 404:
                    return False, f"404 Not Found: {url}"
                else:
                    return False, f"HTTP {response.status}: {url}"
    except Exception as e:
        return False, str(e)

async def main():
    print("Downloading Celebrity Pink Jeans logos...\n")
    
    for logo_info in LOGOS:
        print(f"Processing {logo_info['name']}...")
        base_url = logo_info['url']
        
        # Try each size
        downloaded = False
        for size in logo_info['sizes']:
            ext = ".png"
            filename = IMAGES_DIR / f"{logo_info['name']}_{size}{ext}"
            
            success, message = await download_logo(base_url, size, filename)
            
            if success:
                file_size = filename.stat().st_size / 1024  # KB
                print(f"  ✓ Downloaded: {filename.name} ({file_size:.1f} KB) from {message}")
                downloaded = True
                break
            else:
                print(f"  ⊘ Failed {size}: {message}")
        
        if not downloaded:
            print(f"  ⚠️  Could not download {logo_info['name']} in any size")
        
        print()
    
    print("=== Logo Download Complete ===")

if __name__ == "__main__":
    asyncio.run(main())

