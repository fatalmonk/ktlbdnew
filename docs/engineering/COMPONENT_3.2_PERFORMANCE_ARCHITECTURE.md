# Component 3.2: Performance Architecture

**Component ID:** 3.2  
**Layer:** Frontend Architecture  
**Phase:** Performance Optimization (Week 6)  
**Priority:** High  
**Dependencies:** Component 3.1 (Frontend API Integration)

---

## Component Overview

**Purpose:** Implement comprehensive performance optimization infrastructure for the Kattali Textile Limited website

**Scope:** Bundle optimization, Core Web Vitals, performance monitoring, asset optimization

**Architecture Type:** Performance Optimization Infrastructure

---

## Technical Specifications

### Performance Architecture

```
Performance Optimization Infrastructure
├── Bundle Optimization
│   ├── Code Splitting
│   │   ├── Route-based splitting
│   │   ├── Component-based splitting
│   │   └── Vendor chunk optimization
│   ├── Tree Shaking
│   │   ├── Unused code elimination
│   │   ├── Import optimization
│   │   └── Dead code removal
│   └── Bundle Analysis
│       ├── Webpack Bundle Analyzer
│       ├── Vite Bundle Analyzer
│       └── Performance monitoring
├── Core Web Vitals Optimization
│   ├── Largest Contentful Paint (LCP)
│   │   ├── Image optimization
│   │   ├── Critical resource prioritization
│   │   └── Server response optimization
│   ├── First Input Delay (FID)
│   │   ├── JavaScript execution optimization
│   │   ├── Event handler optimization
│   │   └── Main thread blocking reduction
│   └── Cumulative Layout Shift (CLS)
│       ├── Image dimension specification
│       ├── Font loading optimization
│       └── Layout stability
├── Asset Optimization
│   ├── Image Optimization
│   │   ├── WebP conversion
│   │   ├── Responsive images
│   │   └── Lazy loading
│   ├── Font Optimization
│   │   ├── Font display optimization
│   │   ├── Font preloading
│   │   └── Font subsetting
│   └── CSS Optimization
│       ├── Critical CSS extraction
│       ├── CSS minification
│       └── Unused CSS removal
└── Performance Monitoring
    ├── Real User Monitoring (RUM)
    ├── Core Web Vitals tracking
    ├── Performance alerts
    └── Performance dashboard
```

### Performance Targets

| Metric           | Current | Target   | Improvement     |
| ---------------- | ------- | -------- | --------------- |
| Bundle Size      | 211 KB  | < 180 KB | 15% reduction   |
| LCP              | 3.2s    | < 2.5s   | 22% improvement |
| FID              | 150ms   | < 100ms  | 33% improvement |
| CLS              | 0.15    | < 0.1    | 33% improvement |
| Lighthouse Score | 85      | 95+      | 12% improvement |

---

## Implementation Requirements

### Bundle Optimization Strategy

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 180,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

### Code Splitting Implementation

```typescript
// Route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Component-based code splitting
const ImageGallery = lazy(() => import('./components/ImageGallery'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const NewsletterForm = lazy(() => import('./components/NewsletterForm'));

// App.tsx
function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### Image Optimization

```typescript
// Image optimization component
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const img = document.querySelector(`[data-src="${src}"]`);
    if (img) observer.observe(img);

    return () => observer.disconnect();
  }, [src, priority]);

  return (
    <div className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
};
```

---

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP) Optimization

```typescript
// Critical resource prioritization
const criticalResources = [
  '/assets/critical.css',
  '/assets/hero-image.webp',
  '/assets/fonts/main.woff2',
];

// Preload critical resources
criticalResources.forEach((resource) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource;
  link.as = resource.endsWith('.css') ? 'style' : 'image';
  document.head.appendChild(link);
});

// Image optimization for LCP
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  heroImage.setAttribute('fetchpriority', 'high');
  heroImage.setAttribute('loading', 'eager');
}
```

### First Input Delay (FID) Optimization

```typescript
// JavaScript execution optimization
const optimizeJavaScript = () => {
  // Defer non-critical JavaScript
  const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
  nonCriticalScripts.forEach((script) => {
    script.defer = true;
  });

  // Optimize event handlers
  const optimizeEventHandlers = () => {
    // Use passive event listeners where possible
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchstart', handleTouch, { passive: true });
  };

  // Reduce main thread blocking
  const scheduleWork = (work: () => void) => {
    if ('scheduler' in window) {
      (window as any).scheduler.postTask(work, { priority: 'user-blocking' });
    } else {
      requestIdleCallback(work, { timeout: 100 });
    }
  };
};
```

### Cumulative Layout Shift (CLS) Optimization

```typescript
// Layout stability optimization
const optimizeLayoutStability = () => {
  // Set image dimensions
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.width || !img.height) {
      img.style.aspectRatio = '16/9'; // Default aspect ratio
    }
  });

  // Font loading optimization
  const fontDisplay = 'swap';
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = '/assets/fonts/main.woff2';
  fontPreload.as = 'font';
  fontPreload.type = 'font/woff2';
  fontPreload.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreload);

  // Prevent layout shifts from dynamic content
  const dynamicElements = document.querySelectorAll('[data-dynamic]');
  dynamicElements.forEach((element) => {
    element.style.minHeight = '200px'; // Reserve space
  });
};
```

---

## Performance Monitoring

### Real User Monitoring (RUM)

```typescript
// Performance monitoring implementation
class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    // Core Web Vitals monitoring
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorTTFB();
  }

  private monitorLCP() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private monitorFID() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.set('FID', entry.processingStart - entry.startTime);
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  private monitorCLS() {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.set('CLS', clsValue);
          this.reportMetric('CLS', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private monitorTTFB() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const navigationEntry = entries[0];
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.metrics.set('TTFB', ttfb);
        this.reportMetric('TTFB', ttfb);
      }
    }).observe({ entryTypes: ['navigation'] });
  }

  private reportMetric(name: string, value: number) {
    // Send to analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name,
        value: Math.round(value),
        event_category: 'Performance',
      });
    }
  }

  public getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();
```

---

## Asset Optimization

### Image Optimization Pipeline

```typescript
// Image optimization configuration
const imageOptimization = {
  formats: ['webp', 'avif', 'jpg'],
  qualities: {
    webp: 80,
    avif: 70,
    jpg: 85,
  },
  sizes: [320, 640, 768, 1024, 1280, 1920],
  lazyLoading: true,
  placeholder: 'blur',
};

// Responsive image component
export const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}> = ({ src, alt, sizes = '100vw', className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <picture>
      <source
        srcSet={`${src}.avif`}
        type="image/avif"
        sizes={sizes}
      />
      <source
        srcSet={`${src}.webp`}
        type="image/webp"
        sizes={sizes}
      />
      <img
        src={`${src}.jpg`}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </picture>
  );
};
```

### Font Optimization

```css
/* Font optimization */
@font-face {
  font-family: 'Main Font';
  src: url('/assets/fonts/main.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Main Font';
  src: url('/assets/fonts/main-bold.woff2') format('woff2');
  font-display: swap;
  font-weight: 700;
  font-style: normal;
}

/* Critical CSS */
.critical {
  font-family: 'Main Font', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
```

---

## Success Criteria

### Performance Targets

- [ ] Bundle size < 180 KB (currently 211 KB)
- [ ] LCP < 2.5 seconds (currently 3.2s)
- [ ] FID < 100ms (currently 150ms)
- [ ] CLS < 0.1 (currently 0.15)
- [ ] Lighthouse Performance score 95+ (currently 85)

### Technical Success

- [ ] Code splitting implemented and working
- [ ] Tree shaking eliminating unused code
- [ ] Image optimization pipeline working
- [ ] Performance monitoring setup

### Quality Success

- [ ] No functionality regressions
- [ ] Cross-browser compatibility maintained
- [ ] Performance improvements verified
- [ ] Monitoring and alerting working

---

## Risk Assessment

### High Risk

- **Performance Regression:** Optimization may cause functionality issues
- **Bundle Size Increase:** New features may increase bundle size

### Medium Risk

- **Loading Issues:** Code splitting may cause loading problems
- **Image Quality:** Image optimization may reduce quality

### Mitigation Strategies

- Comprehensive testing after each optimization
- Incremental optimization approach
- Performance monitoring throughout
- Rollback plan for each change

---

## Related Components

- **Previous:** Component 3.1 (Frontend API Integration)
- **Next:** Component 4.1 (CMS Integration Architecture)
- **Dependencies:** Component 3.1 must be completed first
- **Blocks:** Component 4.1 (CMS Integration Architecture)

---

**Component Status:** Ready for Implementation  
**Assigned To:** TBD  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025
