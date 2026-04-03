# 🎴 Phase 3: Products & Partners Enhancement (Week 3)

_3D product cards, interactive filtering, and enhanced logo carousel_

## Overview

Transform the static product grid into an interactive 3D showcase with filtering, and enhance the partner logos section with interactive tooltips and hover effects.

## Tasks Checklist

### Day 1-2: 3D Product Cards

#### 3.1 Install 3D Animation Dependencies

```bash
cd /Users/mac.alvi/Desktop/KTL Website/Version01/project
npm install react-parallax-tilt@1.7.175
npm install @react-three/fiber@8.15.12
npm install @react-three/drei@9.88.17
```

#### 3.2 Create 3D Product Card Component

**File:** `src/components/Product3DCard/Product3DCard.tsx`

```typescript
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Heart, Share2 } from 'lucide-react';

interface Product3DCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    icon: React.ComponentType<any>;
    link: string;
    featured?: boolean;
    price?: string;
    tags?: string[];
  };
  index: number;
}

const Product3DCard: React.FC<Product3DCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform values for 3D effect
  const rotateX = useTransform(y, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.05}
        transitionSpeed={2000}
        gyroscope={true}
      >
        <motion.div
          ref={cardRef}
          className="relative h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Gradient Border Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(
                  600px circle at ${x.get() * 100}% ${y.get() * 100}%,
                  rgba(253, 211, 56, 0.15),
                  transparent 40%
                )`
              }}
            />

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-primary-500 text-black text-xs font-bold rounded-full">
                  FEATURED
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <motion.button
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5 text-gray-700" />
              </motion.button>

              <motion.button
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{
                  scale: isHovered ? 1.1 : 1,
                  transition: 'scale 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'
                }}
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                >
                  <Link
                    to={product.link}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg"
                  >
                    <Eye className="w-5 h-5" />
                    Quick View
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              {/* Category */}
              <motion.span
                className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3"
                animate={{
                  backgroundColor: isHovered ? '#fdd338' : '#f3f4f6',
                  color: isHovered ? '#000000' : '#4b5563'
                }}
                transition={{ duration: 0.3 }}
              >
                {product.category}
              </motion.span>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={product.link}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold group/link"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default Product3DCard;
```

### Day 3: Interactive Product Filtering

#### 3.3 Create Product Filter Component

**File:** `src/components/ProductFilter/ProductFilter.tsx`

```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ProductFilterProps {
  categories: FilterOption[];
  tags: FilterOption[];
  onFilterChange: (filters: { categories: string[], tags: string[] }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  tags,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    onFilterChange({ categories: updated, tags: selectedTags });
  };

  const handleTagToggle = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updated);
    onFilterChange({ categories: selectedCategories, tags: updated });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    onFilterChange({ categories: [], tags: [] });
  };

  const activeFilterCount = selectedCategories.length + selectedTags.length;

  return (
    <>
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-primary-500 text-black font-bold rounded-full shadow-lg flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Filter className="w-5 h-5" />
        Filter Products
        {activeFilterCount > 0 && (
          <span className="ml-2 px-2 py-1 bg-black text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Filter Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Filter Products</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-6">
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.value)}
                            onChange={() => handleCategoryToggle(category.value)}
                            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                          />
                          <span className="font-medium">{category.label}</span>
                        </div>
                        {category.count && (
                          <span className="text-sm text-gray-500">
                            ({category.count})
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <motion.button
                        key={tag.value}
                        onClick={() => handleTagToggle(tag.value)}
                        className={`px-4 py-2 rounded-full border-2 transition-colors ${
                          selectedTags.includes(tag.value)
                            ? 'bg-primary-500 border-primary-500 text-black'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <motion.button
                    onClick={clearFilters}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear All Filters ({activeFilterCount})
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilter;
```

### Day 4: Enhanced Logo Carousel

#### 3.4 Create Interactive Logo Carousel

**File:** `src/components/EnhancedLogoCarousel/EnhancedLogoCarousel.tsx`

```typescript
import React, { useState, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { ExternalLink, Globe, Users } from 'lucide-react';

interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  partnership: string;
  employees?: string;
  location?: string;
}

interface EnhancedLogoCarouselProps {
  partners: PartnerLogo[];
  speed?: number;
}

const EnhancedLogoCarousel: React.FC<EnhancedLogoCarouselProps> = ({
  partners,
  speed = 30
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useRef(0);

  useAnimationFrame(() => {
    if (!isPaused && containerRef.current) {
      scrollX.current += speed / 60;
      if (scrollX.current >= containerRef.current.scrollWidth / 2) {
        scrollX.current = 0;
      }
      containerRef.current.style.transform = `translateX(-${scrollX.current}px)`;
    }
  });

  return (
    <div className="relative overflow-hidden py-12">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Logo Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredPartner(null);
        }}
      >
        {/* Duplicate logos for seamless loop */}
        {[...partners, ...partners].map((partner, index) => (
          <motion.div
            key={`${partner.id}-${index}`}
            className="relative flex-shrink-0 group"
            onMouseEnter={() => setHoveredPartner(partner.id)}
            onMouseLeave={() => setHoveredPartner(null)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* Logo */}
            <div className="px-8 py-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPartner === partner.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-4 bg-white rounded-xl shadow-xl z-20"
                >
                  {/* Arrow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />

                  {/* Content */}
                  <div className="relative">
                    <h4 className="font-bold text-lg mb-2">{partner.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {partner.description}
                    </p>

                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Partnership:</span>
                        {partner.partnership}
                      </div>

                      {partner.employees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {partner.employees} employees
                        </div>
                      )}

                      {partner.location && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {partner.location}
                        </div>
                      )}
                    </div>

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-primary-600 font-medium hover:text-primary-700"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedLogoCarousel;
```

### Day 5: Integration

#### 3.5 Update Products Section

**File:** Update relevant section in `Home.tsx`

```typescript
import Product3DCard from '../components/Product3DCard/Product3DCard';
import ProductFilter from '../components/ProductFilter/ProductFilter';
import EnhancedLogoCarousel from '../components/EnhancedLogoCarousel/EnhancedLogoCarousel';

// In component:
const [filteredProducts, setFilteredProducts] = useState(products);

const handleFilterChange = (filters: { categories: string[], tags: string[] }) => {
  let filtered = [...products];

  if (filters.categories.length > 0) {
    filtered = filtered.filter(p =>
      filters.categories.includes(p.category)
    );
  }

  if (filters.tags?.length > 0) {
    filtered = filtered.filter(p =>
      p.tags?.some(tag => filters.tags.includes(tag))
    );
  }

  setFilteredProducts(filtered);
};

// Render:
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">
      Our Products
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredProducts.map((product, index) => (
          <Product3DCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>

    <ProductFilter
      categories={uniqueCategories}
      tags={uniqueTags}
      onFilterChange={handleFilterChange}
    />
  </div>
</section>

// Partner Logos Section
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">
      Trusted Partners
    </h2>
    <EnhancedLogoCarousel partners={partnerData} />
  </div>
</section>
```

## Testing Checklist

- [ ] 3D card tilt effects work smoothly
- [ ] Product hover animations trigger correctly
- [ ] Filter panel opens/closes smoothly
- [ ] Filtering updates products instantly
- [ ] Logo carousel pauses on hover
- [ ] Partner tooltips display correctly
- [ ] All animations maintain 60fps
- [ ] Mobile touch interactions work

## Performance Optimization

```typescript
// Use React.memo for expensive components
export default React.memo(Product3DCard);

// Debounce filter updates
const debouncedFilter = useMemo(() => debounce(handleFilterChange, 300), []);
```

## Next Phase

Ready for Phase 4: News & Metrics Enhancement

---

**Phase 3 Complete! ✅**

---
