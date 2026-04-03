# Phase 4.4: Metrics Dashboard Foundation

## Overview

Build the foundation for real-time metrics visualization with animated counters, charts, and data widgets.

---

## 4.4.1 Metrics Type Definitions

**Create metrics data structures:**

```typescript
// types/metrics.ts
export interface Metric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  change?: number; // Percentage change
  changeType?: 'increase' | 'decrease';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  color?: string;
  format?: 'number' | 'currency' | 'percentage';
  description?: string;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface ChartData {
  id: string;
  title: string;
  data: TimeSeriesData[];
  type: 'line' | 'bar' | 'area';
  color?: string;
}

export interface MetricsGroup {
  id: string;
  title: string;
  metrics: Metric[];
  icon?: React.ComponentType<{ size?: number }>;
}

export interface DashboardConfig {
  refreshInterval?: number; // in milliseconds
  animationDuration?: number;
  showTrends?: boolean;
  compactMode?: boolean;
}
```

---

## 4.4.2 Mock Metrics Data

**Create sample metrics:**

```typescript
// data/metrics-mock.ts
import { Metric, MetricsGroup, ChartData } from '@/types/metrics';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Heart,
  Share2,
} from 'lucide-react';

export const mockMetrics: Metric[] = [
  {
    id: 'total-products',
    label: 'Total Products',
    value: 247,
    change: 12.5,
    changeType: 'increase',
    icon: Package,
    color: '#3B82F6',
    format: 'number',
    description: 'Active products in catalog',
  },
  {
    id: 'monthly-revenue',
    label: 'Monthly Revenue',
    value: 1250000,
    unit: 'USD',
    change: 8.3,
    changeType: 'increase',
    icon: DollarSign,
    color: '#10B981',
    format: 'currency',
    description: 'Total revenue this month',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: 15420,
    change: 5.7,
    changeType: 'increase',
    icon: Users,
    color: '#8B5CF6',
    format: 'number',
    description: 'Monthly active users',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    value: 3.42,
    unit: '%',
    change: -1.2,
    changeType: 'decrease',
    icon: TrendingUp,
    color: '#F59E0B',
    format: 'percentage',
    description: 'Average conversion rate',
  },
  {
    id: 'total-orders',
    label: 'Total Orders',
    value: 8934,
    change: 15.8,
    changeType: 'increase',
    icon: ShoppingCart,
    color: '#EF4444',
    format: 'number',
    description: 'Orders processed this month',
  },
  {
    id: 'page-views',
    label: 'Page Views',
    value: 342567,
    change: 22.4,
    changeType: 'increase',
    icon: Eye,
    color: '#06B6D4',
    format: 'number',
    description: 'Total page views this month',
  },
];

export const mockMetricsGroups: MetricsGroup[] = [
  {
    id: 'business',
    title: 'Business Metrics',
    icon: DollarSign,
    metrics: mockMetrics.filter((m) =>
      ['monthly-revenue', 'total-orders', 'conversion-rate'].includes(m.id)
    ),
  },
  {
    id: 'engagement',
    title: 'Engagement Metrics',
    icon: Heart,
    metrics: mockMetrics.filter((m) => ['active-users', 'page-views'].includes(m.id)),
  },
  {
    id: 'products',
    title: 'Product Metrics',
    icon: Package,
    metrics: mockMetrics.filter((m) => ['total-products'].includes(m.id)),
  },
];

// Generate mock time series data
function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number
): ChartData['data'] {
  const data: ChartData['data'] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const randomVariance = (Math.random() - 0.5) * variance;
    const trend = (days - i) * (variance / days); // Upward trend
    const value = baseValue + trend + randomVariance;

    data.push({
      timestamp: date,
      value: Math.max(0, value),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  }

  return data;
}

export const mockChartData: ChartData[] = [
  {
    id: 'revenue-trend',
    title: 'Revenue Trend (30 Days)',
    data: generateTimeSeriesData(30, 40000, 10000),
    type: 'area',
    color: '#10B981',
  },
  {
    id: 'users-trend',
    title: 'Active Users (30 Days)',
    data: generateTimeSeriesData(30, 500, 100),
    type: 'line',
    color: '#8B5CF6',
  },
  {
    id: 'orders-trend',
    title: 'Orders (30 Days)',
    data: generateTimeSeriesData(30, 300, 50),
    type: 'bar',
    color: '#EF4444',
  },
];
```

---

## 4.4.3 Animated Counter Component

**Create counting animation:**

```typescript
// components/metrics/AnimatedCounter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: 'number' | 'currency' | 'percentage';
  unit?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  format = 'number',
  unit,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (latest) => {
    return formatValue(latest, format, unit, decimals);
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {display}
    </motion.span>
  );
}

function formatValue(
  value: number,
  format: 'number' | 'currency' | 'percentage',
  unit?: string,
  decimals: number = 0
): string {
  const rounded = Math.floor(value);

  switch (format) {
    case 'currency':
      return `$${rounded.toLocaleString()}${unit ? ` ${unit}` : ''}`;

    case 'percentage':
      return `${rounded.toFixed(decimals)}%`;

    case 'number':
    default:
      if (rounded >= 1000000) {
        return `${(rounded / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
      }
      if (rounded >= 1000) {
        return `${(rounded / 1000).toFixed(1)}K${unit ? ` ${unit}` : ''}`;
      }
      return `${rounded.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  }
}
```

---

## 4.4.4 Metric Card Component

**Create individual metric display:**

```typescript
// components/metrics/MetricCard.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Metric } from '@/types/metrics';
import AnimatedCounter from './AnimatedCounter';
import { useState } from 'react';

interface MetricCardProps {
  metric: Metric;
  index?: number;
  compact?: boolean;
}

export default function MetricCard({
  metric,
  index = 0,
  compact = false
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl
        transition-all duration-300 overflow-hidden group"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10
          transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${metric.color || '#3B82F6'}40, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: `${metric.color || '#3B82F6'}20`,
                  color: metric.color || '#3B82F6',
                }}
              >
                <Icon size={24} />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-600">
                {metric.label}
              </p>
              {metric.description && !compact && (
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600 mt-1"
                >
                  <Info size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Change Badge */}
          {metric.change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs
                font-bold ${
                  metric.changeType === 'increase'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
            >
              {metric.changeType === 'increase' ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{Math.abs(metric.change).toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-gray-900">
          <AnimatedCounter
            value={metric.value}
            format={metric.format}
            unit={metric.unit}
            decimals={metric.format === 'percentage' ? 2 : 0}
          />
        </div>

        {/* Tooltip */}
        {showTooltip && metric.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-2 px-3 py-2 bg-gray-900
              text-white text-xs rounded-lg shadow-xl z-50 w-full"
          >
            {metric.description}
          </motion.div>
        )}
      </div>

      {/* Decorative Element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full"
        style={{
          backgroundColor: metric.color || '#3B82F6',
        }}
      />
    </motion.div>
  );
}
```

---

## 4.4.5 Metrics Grid Component

**Create responsive metrics grid:**

```typescript
// components/metrics/MetricsGrid.tsx
'use client';

import { Metric } from '@/types/metrics';
import MetricCard from './MetricCard';
import { motion } from 'framer-motion';

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
  compact?: boolean;
  title?: string;
  description?: string;
}

export default function MetricsGrid({
  metrics,
  columns = 3,
  compact = false,
  title,
  description,
}: MetricsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          )}
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </motion.div>
      )}

      {/* Grid */}
      <div className={`grid ${gridCols} gap-6`}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            index={index}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 4.4.6 Metrics Service

**Create data fetching service:**

```typescript
// lib/services/metrics.service.ts
import { Metric, ChartData } from '@/types/metrics';
import { mockMetrics, mockChartData } from '@/data/metrics-mock';

class MetricsService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Fetch all metrics
   */
  async getMetrics(): Promise<Metric[]> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${this.baseUrl}/metrics`);
      // return response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockMetrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw new Error('Failed to fetch metrics');
    }
  }

  /**
   * Fetch specific metric by ID
   */
  async getMetricById(id: string): Promise<Metric | null> {
    try {
      const metrics = await this.getMetrics();
      return metrics.find((m) => m.id === id) || null;
    } catch (error) {
      console.error('Error fetching metric:', error);
      return null;
    }
  }

  /**
   * Fetch chart data
   */
  async getChartData(chartId?: string): Promise<ChartData[]> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(
      //   `${this.baseUrl}/metrics/charts${chartId ? `/${chartId}` : ''}`
      // );
      // return response.json();

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (chartId) {
        const chart = mockChartData.find((c) => c.id === chartId);
        return chart ? [chart] : [];
      }

      return mockChartData;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw new Error('Failed to fetch chart data');
    }
  }

  /**
   * Refresh metrics (for real-time updates)
   */
  async refreshMetrics(): Promise<Metric[]> {
    // In production, this would fetch latest data
    return this.getMetrics();
  }

  /**
   * Subscribe to real-time updates (WebSocket)
   */
  subscribeToUpdates(callback: (metrics: Metric[]) => void): () => void {
    // In production, implement WebSocket connection
    // const ws = new WebSocket(`${this.baseUrl}/metrics/stream`);
    // ws.onmessage = (event) => {
    //   const metrics = JSON.parse(event.data);
    //   callback(metrics);
    // };
    // return () => ws.close();

    // Mock implementation with polling
    const interval = setInterval(async () => {
      const metrics = await this.getMetrics();
      callback(metrics);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }
}

export const metricsService = new MetricsService();
```

---

## 4.4.7 Metrics Hooks

**Create React hooks:**

```typescript
// lib/hooks/useMetrics.ts
'use client';

import { useState, useEffect } from 'react';
import { Metric, ChartData } from '@/types/metrics';
import { metricsService } from '@/lib/services/metrics.service';

export function useMetrics(autoRefresh: boolean = false, interval: number = 30000) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | undefined;

    async function fetchMetrics() {
      try {
        setLoading(true);
        setError(null);
        const data = await metricsService.getMetrics();
        if (mounted) {
          setMetrics(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMetrics();

    if (autoRefresh) {
      unsubscribe = metricsService.subscribeToUpdates((data) => {
        if (mounted) {
          setMetrics(data);
        }
      });
    }

    return () => {
      mounted = false;
      unsubscribe?.();
    };
  }, [autoRefresh, interval]);

  return { metrics, loading, error };
}

export function useChartData(chartId?: string) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const chartData = await metricsService.getChartData(chartId);
        if (mounted) {
          setData(chartData);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [chartId]);

  return { data, loading, error };
}
```

---

## ✅ Phase 4.4 Checklist

- [ ] Type definitions created
- [ ] Mock data generated
- [ ] Animated counter component built
- [ ] Metric card component created
- [ ] Metrics grid layout added
- [ ] Service layer implemented
- [ ] React hooks created
- [ ] Real-time updates ready
- [ ] Error handling added
- [ ] Loading states implemented

---

## 🎯 Next Steps

Move to **Phase 4.5: Data Visualization Charts** to create interactive chart components using Recharts.

**Estimated Time**: 2-3 hours
