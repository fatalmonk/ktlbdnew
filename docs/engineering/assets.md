# Hero Images Download Guide

This guide will help you source professional, high-quality images for each product category in the hero slideshow.

---

## Image Requirements

### Technical Specifications
- **Resolution**: Minimum 1920x1080px (Full HD)
- **Aspect Ratio**: 16:9 or wider (landscape orientation)
- **Format**: JPG (optimized for web)
- **File Size**: 300-800KB after optimization
- **Color Treatment**: Natural colors, slightly desaturated for professional look
- **Composition**: Leave clear space on left/center-left for text overlay

### Quality Guidelines
- High resolution and sharp focus
- Professional lighting
- Minimal distractions in background
- Authentic, realistic representation of products
- Avoid overly saturated or filtered images

---

## Slide 1: Premium Denim

**Current Image**: `/assets/denimcloseup.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "denim texture close up"
   - https://unsplash.com/s/photos/denim-texture
   - Look for: Raw denim fabric, detailed stitching, premium quality feel

2. Search: "jeans manufacturing"
   - https://unsplash.com/s/photos/jeans-manufacturing
   - Look for: Production process, quality craftsmanship

3. Specific recommendations:
   - https://unsplash.com/photos/blue-denim-textile-
   - https://unsplash.com/photos/person-wearing-blue-denim-jeans

**Pexels:**
- https://www.pexels.com/search/denim%20close%20up/
- https://www.pexels.com/search/blue%20jeans%20texture/

**What to Look For:**
- Close-up of premium denim fabric showing texture
- Folded or stacked jeans showing quality
- Denim production/manufacturing scenes
- Avoid: Overly worn/distressed denim, fashion photography with models

---

## Slide 2: Woven Apparel

**Current Image**: `/assets/designer-1.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "dress shirt fabric"
   - https://unsplash.com/s/photos/dress-shirt-fabric
   - Look for: Formal shirt details, tailored pieces

2. Search: "woven textile"
   - https://unsplash.com/s/photos/woven-textile
   - Look for: Fabric texture, weave patterns

3. Search: "tailored clothing"
   - https://unsplash.com/s/photos/tailored-clothing

**Pexels:**
- https://www.pexels.com/search/formal%20shirt/
- https://www.pexels.com/search/woven%20fabric/

**What to Look For:**
- Professional dress shirts on hangers
- Close-up of woven fabric texture
- Tailored pants or formal wear
- Avoid: Casual t-shirts, overly busy patterns

---

## Slide 3: Knitwear & Jerseys

**Current Image**: `/assets/engin-akyurt-ahs1R32GG9Y-unsplash.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "knit fabric texture"
   - https://unsplash.com/s/photos/knit-fabric
   - Look for: Cable knit, jersey material, soft textures

2. Search: "sweater detail"
   - https://unsplash.com/s/photos/sweater-detail

3. Search: "knitwear fashion"
   - https://unsplash.com/s/photos/knitwear

**Pexels:**
- https://www.pexels.com/search/knitted%20fabric/
- https://www.pexels.com/search/sweater%20texture/

**What to Look For:**
- Soft, cozy knit textures
- Folded sweaters or knitwear
- Jersey fabric close-ups
- Avoid: Heavy winter sweaters only, overly chunky knits

---

## Slide 4: Performance Swimwear

**Current Image**: `/assets/aleksandr-prokhortsev-9OIl4fdVPxs-unsplash.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "swimming athlete"
   - https://unsplash.com/s/photos/swimming-athlete
   - Look for: Athletic swimmers, competitive swimming

2. Search: "swimwear"
   - https://unsplash.com/s/photos/swimwear

3. Search: "pool swimming"
   - https://unsplash.com/s/photos/pool-swimming

**Pexels:**
- https://www.pexels.com/search/swimming%20athlete/
- https://www.pexels.com/search/competitive%20swimming/

**What to Look For:**
- Athletic swimmers in action
- Modern, sleek swimwear
- Pool/water environment
- Avoid: Beach/leisure swimming only, bikinis/fashion swimwear

---

## Slide 5: Activewear & Athleisure

**Current Image**: `/assets/collins-lesulie-0nVnbzYxAvA-unsplash.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "athletic wear"
   - https://unsplash.com/s/photos/athletic-wear
   - Look for: Gym clothing, workout gear

2. Search: "sports clothing"
   - https://unsplash.com/s/photos/sports-clothing

3. Search: "athleisure"
   - https://unsplash.com/s/photos/athleisure

**Pexels:**
- https://www.pexels.com/search/workout%20clothes/
- https://www.pexels.com/search/sportswear/

**What to Look For:**
- Modern athletic apparel
- Activewear on models or hangers
- Gym/workout environment
- Avoid: Action shots only, extreme sports focus

---

## Slide 6: Children's Apparel

**Current Image**: `/assets/designer-2.jpg`

### Recommended Sources

**Unsplash:**
1. Search: "kids clothing"
   - https://unsplash.com/s/photos/kids-clothing
   - Look for: Colorful, playful children's wear

2. Search: "children's apparel"
   - https://unsplash.com/s/photos/childrens-apparel

3. Search: "baby clothes"
   - https://unsplash.com/s/photos/baby-clothes

**Pexels:**
- https://www.pexels.com/search/kids%20clothes/
- https://www.pexels.com/search/children%20clothing/

**What to Look For:**
- Colorful, age-appropriate clothing
- Kids in casual wear (happy, active)
- Folded or displayed children's clothing
- Avoid: Too babyish only, overly formal children's wear

---

## Download & Optimization Process

### Step 1: Download Images

1. Visit the recommended URLs above
2. Click on the image you like
3. Click "Download" button (select "Original" or "Large" size)
4. Save to your computer with descriptive name

### Step 2: Optimize Images

**Option A: Online Tool (Easiest)**
1. Visit https://squoosh.app/
2. Upload your downloaded image
3. Settings:
   - Resize: 1920 x 1080 (if larger)
   - Format: MozJPEG
   - Quality: 85
4. Download optimized image

**Option B: TinyPNG**
1. Visit https://tinypng.com/
2. Upload images (max 5MB)
3. Download compressed version

**Option C: Command Line (Advanced)**
```bash
# Install sharp-cli globally
npm install -g sharp-cli

# Resize and optimize
sharp -i input.jpg -o output.jpg resize 1920 1080 --quality 85
```

### Step 3: Name & Save Files

Save optimized images to `/public/assets/` with these names:
- `hero-denim.jpg` - Premium Denim
- `hero-woven.jpg` - Woven Apparel
- `hero-knitwear.jpg` - Knitwear & Jerseys
- `hero-swimwear.jpg` - Performance Swimwear
- `hero-activewear.jpg` - Activewear & Athleisure
- `hero-kids.jpg` - Children's Apparel

### Step 4: Update Component

Edit `/src/components/KTLHero.tsx` and update image paths:

```typescript
const panels: PanelData[] = [
  {
    id: 0,
    image: '/assets/hero-denim.jpg',  // Update this
    title: "premium denim",
    // ...
  },
  // ... update all 6 slides
];
```

---

## Tips for Choosing Images

### Composition
- Leave 40-50% of left side clear for text overlay
- Avoid busy patterns or text in the left portion
- Center of interest should be right of center

### Color Palette
- Natural, realistic colors work best
- Slightly desaturated images look more professional
- Avoid overly bright or neon colors
- Grayscale filter is applied, so contrast is important

### Consistency
- Try to maintain similar lighting across all 6 images
- Keep composition style consistent (all close-ups OR all lifestyle shots)
- Similar color temperature across slides

### Testing
- Preview images at full screen to check quality
- Ensure text is readable over the image
- Check how gradient overlay affects visibility

---

## Alternative Free Image Sources

### Additional Stock Photo Sites

1. **Pixabay** - https://pixabay.com/
   - Free commercial use
   - No attribution required
   - Good for textile/fabric photos

2. **Burst by Shopify** - https://burst.shopify.com/
   - Specifically for e-commerce
   - High-quality apparel images

3. **Kaboompics** - https://kaboompics.com/
   - Curated high-quality images
   - Good color palettes

4. **StockSnap** - https://stocksnap.io/
   - Large variety
   - Updated daily

---

## Need Help?

If you need assistance:
1. Check image quality and resolution before downloading
2. Ensure images are free for commercial use
3. Optimize images to keep page load fast
4. Test on mobile devices after updating

Happy sourcing! 📸
