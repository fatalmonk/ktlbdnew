# Phase 4.6: Live Metrics Dashboard

## Overview
Create a comprehensive, real-time metrics dashboard combining all components with auto-refresh capabilities.

---

## 4.6.1 Dashboard Layout Component

**Create main dashboard structure:**
```typescript
// components/metrics/MetricsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, TrendingUp, Calendar, Download } from 'lucide-react';
import MetricsGrid from './MetricsGrid';
import ChartsGrid from './ChartsGrid';
import { useMetrics, useChartData } from '@/lib/hooks/useMetrics';
import { DashboardConfig } from '@/types/metrics';

interface MetricsDashboardProps {
  config?: DashboardConfig;
  title?: string;
  subtitle?: string;
}

export default function MetricsDashboard({
  config = {
    refreshInterval: 30000,
    showTrends: true,
    compactMode: false,
  },
  title = 'Performance Dashboard',
  subtitle = 'Real-time business metrics and analytics',
}: MetricsDashboardProps) {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { metrics, loading: metricsLoading, error: metricsError } = useMetrics(
    true,
    config.refreshInterval
  );
  
  const { data: charts, loading: chartsLoading } = useChartData();

  useEffect(() => {
    if (!metricsLoading) {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }
  }, [metricsLoading]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    // Force refresh by re-fetching data
    window.location.reload();
  };

  const handleExportData = () => {
    // Implementation for exporting dashboard data
    const data = {
      metrics,
      charts,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metrics-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (metricsError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">
            Failed to load dashboard
          </p>
          <p className="text-gray-600 text-sm">{metricsError.message}</p>
          <button
            onClick={handleManualRefresh}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between 
          gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Last Update Info */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar size={16} />
            <span>
              Updated {lastUpdate.toLocaleTimeString()}
            </span>
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 
              hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </motion.button>

          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 
              text-white rounded-lg hover:bg-blue-700 transition-colors 
              disabled:opacity-50"
          >
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{
                duration: 1,
                repeat: isRefreshing ? Infinity : 0,
                ease: 'linear',
              }}
            >
              <RefreshCw size={18} />
            </motion.div>
            <span className="hidden sm:inline">
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {metricsLoading && metrics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50"
          >
            <motion.div
              className="h-full bg-blue-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Grid */}
      <MetricsGrid
        metrics={metrics}
        columns={3}
        compact={config.compactMode}
      />

      {/* Charts Section */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <TrendingUp size={24} className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Trends & Analytics
          </h2>
        </motion.div>

        {!chartsLoading && charts.length > 0 && (
          <ChartsGrid charts={charts} columns={2} />
        )}
      </div>

      {/* Auto-refresh Indicator */}
      {config.refreshInterval && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 bg-white px-4 py-2 rounded-full 
            shadow-lg border border-gray-200 text-sm text-gray-600 flex 
            items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Auto-refresh active</span>
        </motion.div>
      )}
    </div>
  );
}
```

---

## 4.6.2 Dashboard Tabs Component

**Create tabbed dashboard views:**
```typescript
// components/metrics/TabbedDashboard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  BarChart3 
} from 'lucide-react';
import MetricsDashboard from './MetricsDashboard';
import { mockMetricsGroups } from '@/data/metrics-mock';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  content: React.ReactNode;
}

export default function TabbedDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      content: <MetricsDashboard />,
    },
    {
      id: 'business',
      label: 'Business',
      icon: TrendingUp,
      content: (
        <MetricsDashboard
          title="Business Metrics"
          subtitle="Revenue, orders, and conversion tracking"
        />
      ),
    },
    {
      id: 'engagement',
      label: 'Engagement',
      icon: Users,
      content: (
        <MetricsDashboard
          title="User Engagement"
          subtitle="Active users and interaction metrics"
        />
      ),
    },
    {
      id: 'products',
      label: 'Products',
      icon: ShoppingCart,
      content: (
        <MetricsDashboard
          title="Product Performance"
          subtitle="Inventory and product analytics"
        />
      ),
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-6 py-3 rounded-lg 
                  font-medium transition-all duration-300
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span>{tab.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTabData?.content}
      </motion.div>
    </div>
  );
}
```

---

## 4.6.3 Dashboard Widgets

**Create reusable widget components:**
```typescript
// components/metrics/DashboardWidget.tsx
'use client';

import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
  noPadding?: boolean;
}

export default function DashboardWidget({
  title,
  subtitle,
  children,
  actions,
  noPadding = false,
}: DashboardWidgetProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Widget Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center 
        justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>

        {actions && actions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical size={18} className="text-gray-600" />
            </button>

            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowActions(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-lg 
                    shadow-xl border border-gray-100 overflow-hidden z-50 
                    min-w-[150px]"
                >
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.onClick();
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 
                        hover:bg-gray-50 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </motion.div>
  );
}
```

---

## 4.6.4 Real-time Updates Indicator

**Create live data indicator:**
```typescript
// components/metrics/LiveIndicator.tsx
'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface LiveIndicatorProps {
  isLive?: boolean;
  lastUpdate?: Date;
}

export default function LiveIndicator({ 
  isLive = true, 
  lastUpdate 
}: LiveIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 
        rounded-full"
    >
      <div className="relative">
        <Activity size={14} className={isLive ? 'text-green-600' : 'text-gray-400'} />
        {isLive && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Activity size={14} className="text-green-600" />
          </motion.div>
        )}
      </div>
      
      <span className="text-xs font-medium text-gray-700">
        {isLive ? 'Live' : 'Paused'}
      </span>
      
      {lastUpdate && (
        <span className="text-xs text-gray-500">
          • {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </motion.div>
  );
}
```

---

## 4.6.5 Dashboard Controls

**Create control panel:**
```typescript
// components/metrics/DashboardControls.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Download, Filter, Settings } from 'lucide-react';
import { useState } from 'react';

interface DashboardControlsProps {
  onDateRangeChange?: (range: { from: Date; to: Date }) => void;
  onExport?: () => void;
  onFilterChange?: (filters: any) => void;
  onSettingsChange?: (settings: any) => void;
}

export default function DashboardControls({
  onDateRangeChange,
  onExport,
  onFilterChange,
  onSettingsChange,
}: DashboardControlsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Date Range Selector */}
      {onDateRangeChange && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 
              border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
          >
            <Calendar size={18} />
            <span className="text-sm font-medium">Last 30 Days</span>
          </motion.button>

          {/* Date picker dropdown would go here */}
        </div>
      )}

      {/* Filter Button */}
      {onFilterChange && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 
            border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
        >
          <Filter size={18} />
          <span className="text-sm font-medium">Filters</span>
        </motion.button>
      )}

      {/* Export Button */}
      {onExport && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 
            border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
        >
          <Download size={18} />
          <span className="text-sm font-medium">Export</span>
        </motion.button>
      )}

      {/* Settings Button */}
      {onSettingsChange && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 
            border-gray-200 rounded-lg hover:border-gray-900 transition-colors"
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </motion.button>
      )}
    </div>
  );
}
```

---

## 4.6.6 Complete Dashboard Page

**Create full dashboard page:**
```typescript
// app/dashboard/page.tsx
import MetricsDashboard from '@/components/metrics/MetricsDashboard';
import TabbedDashboard from '@/components/metrics/TabbedDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <TabbedDashboard />
      </div>
    </div>
  );
}
```

---

## ✅ Phase 4.6 Checklist

- [ ] Main dashboard layout created
- [ ] Tabbed dashboard views added
- [ ] Dashboard widgets implemented
- [ ] Live indicator created
- [ ] Dashboard controls added
- [ ] Auto-refresh configured
- [ ] Export functionality added
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Mobile responsive

---

## 🎯 Next Steps

Move to **Phase 4.7: News & Metrics Integration** to combine news and metrics into homepage sections.

**Estimated Time**: 2 hours