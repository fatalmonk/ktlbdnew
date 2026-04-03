# Phase 4.8: Performance Optimization

## Overview

Optimize news and metrics components for maximum performance, fast loading, and smooth animations.

---

## 4.8.1 Data Prefetching

**Implement prefetching strategies:**

```typescript
// lib/utils/prefetch.ts
export function prefetchNewsData() {
  if (typeof window === 'undefined') return;

  // Prefetch news data on hover or in viewport
  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.href = '/api/news';
  document.head.appendChild(prefetchLink);
}

export function prefetchMetricsData() {
  if (typeof window === 'undefined') return;

  const prefetchLink = document.createElement('link');
  prefetchLink.rel = 'prefetch';
  prefetchLink.href = '/api/metrics';
  document.head.appendChild(prefetchLink);
}

// Hook for automatic prefetching
export function usePrefetch(shouldPrefetch: boolean, type: 'news' | 'metrics') {
  useEffect(() => {
    if (!shouldPrefetch) return;

    const timer = setTimeout(() => {
      if (type === 'news') {
        prefetchNewsData();
      } else {
        prefetchMetricsData();
      }
    }, 2000); // Prefetch after 2 seconds

    return () => clearTimeout(timer);
  }, [shouldPrefetch, type]);
}
```

---

## 4.8.2 Virtual Scrolling

**Implement virtual list for large datasets:**

```typescript
// components/news/VirtualNewsList.tsx
'use client';

import { useVirtual } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { NewsArticle } from '@/types/news';
import CompactNewsCard from './CompactNewsCard';

interface VirtualNewsListProps {
  articles: NewsArticle[];
  itemHeight?: number;
}

export default function VirtualNewsList({
  articles,
  itemHeight = 120,
}: VirtualNewsListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: articles.length,
    parentRef,
    estimateSize: () => itemHeight,
    overscan: 5, // Render 5 extra items outside viewport
  });

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto bg-white rounded-xl shadow-lg"
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => {
          const article = articles[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CompactNewsCard article={article} index={virtualRow.index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Install dependency:**

```bash
npm install @tanstack/react-virtual
```

---

## 4.8.3 Memoization

**Optimize expensive calculations:**

```typescript
// lib/hooks/useMemoizedMetrics.ts
'use client';

import { useMemo } from 'react';
import { Metric } from '@/types/metrics';

export function useMemoizedMetrics(metrics: Metric[]) {
  // Memoize sorted metrics
  const sortedMetrics = useMemo(() => {
    return [...metrics].sort((a, b) => {
      const aChange = a.change || 0;
      const bChange = b.change || 0;
      return bChange - aChange; // Sort by change percentage
    });
  }, [metrics]);

  // Memoize metrics by category
  const metricsByCategory = useMemo(() => {
    return metrics.reduce(
      (acc, metric) => {
        const category = metric.id.split('-')[0];
        if (!acc[category]) acc[category] = [];
        acc[category].push(metric);
        return acc;
      },
      {} as Record<string, Metric[]>
    );
  }, [metrics]);

  // Memoize summary statistics
  const summary = useMemo(() => {
    if (metrics.length === 0) {
      return {
        totalMetrics: 0,
        averageChange: 0,
        totalValue: 0,
      };
    }

    const totalChange = metrics.reduce((sum, m) => sum + (m.change || 0), 0);
    const totalValue = metrics.reduce((sum, m) => sum + m.value, 0);

    return {
      totalMetrics: metrics.length,
      averageChange: totalChange / metrics.length,
      totalValue,
    };
  }, [metrics]);

  return {
    sortedMetrics,
    metricsByCategory,
    summary,
  };
}
```

---

## 4.8.4 Lazy Loading Images

**Optimize image loading:**

```typescript
// components/news/LazyNewsImage.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface LazyNewsImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function LazyNewsImage({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
}: LazyNewsImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className="relative w-full h-full bg-gray-100">
      {isInView && (
        <>
          {/* Blur placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200
              to-gray-300 animate-pulse" />
          )}

          {/* Actual image */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            onLoadingComplete={() => setIsLoaded(true)}
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </div>
  );
}
```

---

## 4.8.5 Request Batching

**Batch multiple API requests:**

```typescript
// lib/services/batch-service.ts
type RequestConfig = {
  endpoint: string;
  params?: Record<string, any>;
};

class BatchService {
  private queue: RequestConfig[] = [];
  private batchTimeout: NodeJS.Timeout | null = null;
  private readonly BATCH_DELAY = 50; // ms

  async addRequest(config: RequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ ...config, resolve, reject } as any);

      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }

      this.batchTimeout = setTimeout(() => {
        this.executeBatch();
      }, this.BATCH_DELAY);
    });
  }

  private async executeBatch() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      // Group requests by endpoint
      const grouped = batch.reduce(
        (acc, req) => {
          if (!acc[req.endpoint]) acc[req.endpoint] = [];
          acc[req.endpoint].push(req);
          return {};
        },
        {} as Record<string, any[]>
      );

      // Execute grouped requests
      for (const [endpoint, requests] of Object.entries(grouped)) {
        const params = requests.map((r) => r.params);
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ batch: params }),
        });

        const results = await response.json();

        requests.forEach((req, index) => {
          req.resolve(results[index]);
        });
      }
    } catch (error) {
      batch.forEach((req) => req.reject(error));
    }
  }
}

export const batchService = new BatchService();
```

---

## 4.8.6 Debounced Updates

**Optimize real-time metric updates:**

```typescript
// lib/hooks/useDebouncedMetrics.ts
'use client';

import { useState, useEffect, useRef } from 'react';
import { Metric } from '@/types/metrics';
import { metricsService } from '@/lib/services/metrics.service';

export function useDebouncedMetrics(delay: number = 1000) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<Metric[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = metricsService.subscribeToUpdates((newMetrics) => {
      setPendingUpdates(newMetrics);
    });

    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pendingUpdates.length === 0) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to batch updates
    timeoutRef.current = setTimeout(() => {
      setMetrics(pendingUpdates);
      setPendingUpdates([]);
    }, delay);
  }, [pendingUpdates, delay]);

  return metrics;
}
```

---

## 4.8.7 Code Splitting

**Split large components:**

```typescript
// app/news/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { NewsCardSkeleton } from '@/components/news/NewsCardSkeleton';

// Dynamically import heavy components
const NewsFilterSystem = dynamic(
  () => import('@/components/news/NewsFilterSystem'),
  {
    loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded-xl" />,
    ssr: false, // Don't render on server if not needed
  }
);

const NewsGrid = dynamic(
  () => import('@/components/news/NewsGrid'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    ),
  }
);

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div>Loading filters...</div>}>
        <NewsFilterSystem
          onFiltersChange={(filters) => {
            // Handle filter changes
          }}
          onSortChange={(sort) => {
            // Handle sort changes
          }}
        />
      </Suspense>

      <Suspense fallback={<div>Loading articles...</div>}>
        <NewsGrid articles={[]} loading={false} />
      </Suspense>
    </div>
  );
}
```

---

## 4.8.8 Performance Monitoring

**Add performance tracking:**

```typescript
// lib/utils/performance-monitor.ts
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();

  static startMeasure(label: string) {
    performance.mark(`${label}-start`);
  }

  static endMeasure(label: string) {
    performance.mark(`${label}-end`);

    try {
      performance.measure(label, `${label}-start`, `${label}-end`);
      const measure = performance.getEntriesByName(label)[0];

      if (measure) {
        const existing = this.metrics.get(label) || [];
        existing.push(measure.duration);
        this.metrics.set(label, existing);

        // Log if duration exceeds threshold
        if (measure.duration > 100) {
          console.warn(`Performance: ${label} took ${measure.duration.toFixed(2)}ms`);
        }
      }

      // Cleanup
      performance.clearMarks(`${label}-start`);
      performance.clearMarks(`${label}-end`);
      performance.clearMeasures(label);
    } catch (error) {
      console.error('Performance measurement failed:', error);
    }
  }

  static getAverageTime(label: string): number {
    const times = this.metrics.get(label) || [];
    if (times.length === 0) return 0;
    return times.reduce((a, b) => a + b, 0) / times.length;
  }

  static clearMetrics() {
    this.metrics.clear();
  }
}

// Usage:
// PerformanceMonitor.startMeasure('news-fetch');
// await fetchNews();
// PerformanceMonitor.endMeasure('news-fetch');
```

---

## 4.8.9 Caching Strategy

**Implement intelligent caching:**

```typescript
// lib/utils/cache-manager.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheManager {
  private static cache = new Map<string, CacheEntry<any>>();
  private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  static set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL) {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    });
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  static invalidate(pattern: string) {
    const keys = Array.from(this.cache.keys());
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    });
  }

  static clear() {
    this.cache.clear();
  }

  static getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: Date.now() - entry.timestamp,
        expiresIn: entry.expiresAt - Date.now(),
      })),
    };
  }
}
```

---

## ✅ Phase 4.8 Checklist

- [ ] Data prefetching implemented
- [ ] Virtual scrolling added for large lists
- [ ] Memoization applied to expensive calculations
- [ ] Lazy loading configured for images
- [ ] Request batching implemented
- [ ] Debounced updates added
- [ ] Code splitting configured
- [ ] Performance monitoring added
- [ ] Caching strategy implemented
- [ ] Performance metrics tracked

---

## 🎯 Next Steps

Move to **Phase 4.9: Testing & Quality Assurance** to ensure everything works perfectly.

**Estimated Time**: 2-3 hours
