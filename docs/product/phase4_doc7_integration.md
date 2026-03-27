# Phase 4.7: News & Metrics Integration

## Overview
Integrate news and metrics components into the homepage with cohesive layouts and transitions.

---

## 4.7.1 Homepage News Section

**Create news section for homepage:**
```typescript
// components/home/NewsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Newspaper } from 'lucide-react';
import Link from 'next/link';
import NewsGrid from '@/components/news/NewsGrid';
import { useFeaturedArticles } from '@/lib/hooks/useNews';

export default function NewsSection() {
  const { articles, loading } = useFeaturedArticles(3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 
            text-blue-600 rounded-full mb-4">
            <Newspaper size={18} />
            <span className="text-sm font-semibold">Latest Updates</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            News & Insights
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest announcements, product launches, 
            and industry insights
          </p>
        </motion.div>

        {/* News Grid */}
        <NewsGrid 
          articles={articles} 
          loading={loading}
          showFeatured={false}
        />

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 
                text-white font-semibold rounded-full hover:bg-blue-700 
                transition-colors shadow-lg hover:shadow-xl"
            >
              View All News
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4.7.2 Homepage Metrics Section

**Create metrics preview for homepage:**
```typescript
// components/home/MetricsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import MetricsGrid from '@/components/metrics/MetricsGrid';
import { useMetrics } from '@/lib/hooks/useMetrics';

export default function MetricsSection() {
  const { metrics, loading } = useMetrics();

  // Show only first 3 metrics on homepage
  const featuredMetrics = metrics.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 
            text-green-600 rounded-full mb-4">
            <TrendingUp size={18} />
            <span className="text-sm font-semibold">Live Metrics</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Performance At A Glance
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time metrics tracking our growth, impact, and success
          </p>
        </motion.div>

        {/* Metrics Grid */}
        {!loading && (
          <MetricsGrid 
            metrics={featuredMetrics}
            columns={3}
          />
        )}

        {/* View Dashboard Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 
                bg-gray-900 text-white font-semibold rounded-full 
                hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              <BarChart3 size={20} />
              View Full Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4.7.3 Combined Section Layout

**Create alternating news/metrics layout:**
```typescript
// components/home/NewsMetricsCombo.tsx
'use client';

import { motion } from 'framer-motion';
import NewsSection from './NewsSection';
import MetricsSection from './MetricsSection';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function NewsMetricsCombo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600 
            rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-600 
            rounded-full blur-3xl"
        />
      </div>

      {/* Sections */}
      <div className="relative">
        <MetricsSection />
        <NewsSection />
      </div>
    </div>
  );
}
```

---

## 4.7.4 Update Homepage

**Integrate into main homepage:**
```typescript
// app/page.tsx
import Hero from '@/components/Hero';
import Statistics from '@/components/Statistics';
import ProductsSection from '@/components/ProductsSection';
import PartnersSection from '@/components/PartnersSection';
import NewsMetricsCombo from '@/components/home/NewsMetricsCombo';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Statistics />
      <ProductsSection />
      <NewsMetricsCombo />
      <PartnersSection />
    </main>
  );
}
```

---

## 4.7.5 Responsive Behavior

**Create mobile-optimized layouts:**
```typescript
// components/home/ResponsiveNewsMetrics.tsx
'use client';

import { useBreakpoint } from '@/lib/hooks/useResponsive';
import NewsSection from './NewsSection';
import MetricsSection from './MetricsSection';
import CompactNewsMetrics from './CompactNewsMetrics';

export default function ResponsiveNewsMetrics() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  if (isMobile) {
    return <CompactNewsMetrics />;
  }

  return (
    <>
      <MetricsSection />
      <NewsSection />
    </>
  );
}
```

**Create compact mobile version:**
```typescript
// components/home/CompactNewsMetrics.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Newspaper, BarChart3 } from 'lucide-react';
import MetricsSection from './MetricsSection';
import NewsSection from './NewsSection';

export default function CompactNewsMetrics() {
  const [activeView, setActiveView] = useState<'metrics' | 'news'>('metrics');

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveView('metrics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 
              rounded-lg font-semibold transition-all ${
                activeView === 'metrics'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700'
              }`}
          >
            <BarChart3 size={18} />
            Metrics
          </button>
          <button
            onClick={() => setActiveView('news')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 
              rounded-lg font-semibold transition-all ${
                activeView === 'news'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700'
              }`}
          >
            <Newspaper size={18} />
            News
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'metrics' ? <MetricsSection /> : <NewsSection />}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 4.7.6 Scroll Animations

**Add scroll-triggered animations:**
```typescript
// components/home/AnimatedSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  className = '' 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Usage:
// <AnimatedSection>
//   <NewsSection />
// </AnimatedSection>
```

---

## 4.7.7 Section Transition Effects

**Create smooth section transitions:**
```typescript
// components/home/SectionTransition.tsx
'use client';

import { motion } from 'framer-motion';

export default function SectionTransition() {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Wave Transition */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="currentColor"
          className="text-white"
        />
      </svg>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
    </div>
  );
}
```

---

## ✅ Phase 4.7 Checklist

- [ ] Homepage news section created
- [ ] Homepage metrics section created
- [ ] Combined layout implemented
- [ ] Mobile-optimized versions added
- [ ] Scroll animations configured
- [ ] Section transitions added
- [ ] Responsive behavior tested
- [ ] CTA buttons functional
- [ ] Links working correctly

---

## 🎯 Next Steps

Move to **Phase 4.8: Performance Optimization** to optimize news and metrics loading.

**Estimated Time**: 1-2 hours