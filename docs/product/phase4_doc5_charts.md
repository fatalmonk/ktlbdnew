# Phase 4.5: Data Visualization Charts

## Overview

Create interactive, animated chart components using Recharts for beautiful data visualization.

---

## 4.5.1 Install Recharts

**Install the charting library:**

```bash
npm install recharts
```

---

## 4.5.2 Line Chart Component

**Create animated line chart:**

```typescript
// components/metrics/LineChart.tsx
'use client';

import { motion } from 'framer-motion';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartData } from '@/types/metrics';

interface LineChartProps {
  data: ChartData;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export default function LineChart({
  data,
  height = 300,
  showGrid = true,
  showLegend = false,
}: LineChartProps) {
  const chartData = data.data.map((item) => ({
    name: item.label || item.timestamp.toLocaleDateString(),
    value: item.value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{data.title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={chartData}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          )}

          <XAxis
            dataKey="name"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />

          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            formatter={(value: number) => [
              value.toLocaleString(),
              'Value',
            ]}
          />

          {showLegend && <Legend />}

          <Line
            type="monotone"
            dataKey="value"
            stroke={data.color || '#3B82F6'}
            strokeWidth={3}
            dot={{
              fill: data.color || '#3B82F6',
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              fill: data.color || '#3B82F6',
            }}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

---

## 4.5.3 Area Chart Component

**Create filled area chart:**

```typescript
// components/metrics/AreaChart.tsx
'use client';

import { motion } from 'framer-motion';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '@/types/metrics';

interface AreaChartProps {
  data: ChartData;
  height?: number;
  showGrid?: boolean;
}

export default function AreaChart({
  data,
  height = 300,
  showGrid = true,
}: AreaChartProps) {
  const chartData = data.data.map((item) => ({
    name: item.label || item.timestamp.toLocaleDateString(),
    value: item.value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{data.title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={chartData}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          )}

          <defs>
            <linearGradient id={`gradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={data.color || '#3B82F6'}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={data.color || '#3B82F6'}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />

          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              'Revenue',
            ]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={data.color || '#3B82F6'}
            strokeWidth={2}
            fill={`url(#gradient-${data.id})`}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

---

## 4.5.4 Bar Chart Component

**Create vertical bar chart:**

```typescript
// components/metrics/BarChart.tsx
'use client';

import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChartData } from '@/types/metrics';

interface BarChartProps {
  data: ChartData;
  height?: number;
  showGrid?: boolean;
  gradient?: boolean;
}

export default function BarChart({
  data,
  height = 300,
  showGrid = true,
  gradient = false,
}: BarChartProps) {
  const chartData = data.data.map((item) => ({
    name: item.label || item.timestamp.toLocaleDateString(),
    value: item.value,
  }));

  // Generate colors for gradient effect
  const getBarColor = (index: number) => {
    if (!gradient) return data.color || '#3B82F6';

    const opacity = 0.5 + (index / chartData.length) * 0.5;
    return `${data.color || '#3B82F6'}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{data.title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={chartData}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          )}

          <XAxis
            dataKey="name"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />

          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            formatter={(value: number) => [
              value.toLocaleString(),
              'Orders',
            ]}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
            animationEasing="ease-in-out"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

---

## 4.5.5 Pie Chart Component

**Create donut/pie chart:**

```typescript
// components/metrics/PieChart.tsx
'use client';

import { motion } from 'framer-motion';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  title: string;
  data: PieChartData[];
  height?: number;
  donut?: boolean;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function PieChart({
  title,
  data,
  height = 300,
  donut = true,
}: PieChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            innerRadius={donut ? 50 : 0}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            formatter={(value: number) => [
              value.toLocaleString(),
              'Value',
            ]}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

---

## 4.5.6 Chart Container Component

**Create unified chart wrapper:**

```typescript
// components/metrics/ChartContainer.tsx
'use client';

import { ChartData } from '@/types/metrics';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import BarChart from './BarChart';

interface ChartContainerProps {
  data: ChartData;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export default function ChartContainer({
  data,
  height = 300,
  showGrid = true,
  showLegend = false,
}: ChartContainerProps) {
  switch (data.type) {
    case 'line':
      return (
        <LineChart
          data={data}
          height={height}
          showGrid={showGrid}
          showLegend={showLegend}
        />
      );

    case 'area':
      return (
        <AreaChart
          data={data}
          height={height}
          showGrid={showGrid}
        />
      );

    case 'bar':
      return (
        <BarChart
          data={data}
          height={height}
          showGrid={showGrid}
        />
      );

    default:
      return null;
  }
}
```

---

## 4.5.7 Charts Grid Layout

**Create responsive chart grid:**

```typescript
// components/metrics/ChartsGrid.tsx
'use client';

import { ChartData } from '@/types/metrics';
import ChartContainer from './ChartContainer';
import { motion } from 'framer-motion';

interface ChartsGridProps {
  charts: ChartData[];
  columns?: 1 | 2 | 3;
}

export default function ChartsGrid({
  charts,
  columns = 2
}: ChartsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {charts.map((chart, index) => (
        <motion.div
          key={chart.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <ChartContainer data={chart} />
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 4.5.8 Interactive Chart Features

**Add zoom and pan capabilities:**

```typescript
// components/metrics/InteractiveLineChart.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from 'recharts';
import { ChartData } from '@/types/metrics';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InteractiveLineChartProps {
  data: ChartData;
  height?: number;
}

export default function InteractiveLineChart({
  data,
  height = 400,
}: InteractiveLineChartProps) {
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);
  const [showBrush, setShowBrush] = useState(false);

  const chartData = data.data.map((item) => ({
    name: item.label || item.timestamp.toLocaleDateString(),
    value: item.value,
  }));

  const handleZoomIn = () => {
    setShowBrush(true);
  };

  const handleZoomOut = () => {
    setZoomDomain(null);
    setShowBrush(false);
  };

  const handleResetZoom = () => {
    setZoomDomain(null);
    setShowBrush(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      {/* Header with Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{data.title}</h3>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Enable zoom"
          >
            <ZoomIn size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom out"
          >
            <ZoomOut size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset view"
          >
            <Maximize2 size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          <XAxis
            dataKey="name"
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            domain={zoomDomain || undefined}
          />

          <YAxis
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
              return value.toString();
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
          />

          {showBrush && (
            <Brush
              dataKey="name"
              height={30}
              stroke={data.color || '#3B82F6'}
              fill="transparent"
              onChange={(domain: any) => {
                if (domain && domain.startIndex !== undefined && domain.endIndex !== undefined) {
                  setZoomDomain([domain.startIndex, domain.endIndex]);
                }
              }}
            />
          )}

          <Line
            type="monotone"
            dataKey="value"
            stroke={data.color || '#3B82F6'}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
```

---

## ✅ Phase 4.5 Checklist

- [ ] Recharts installed
- [ ] Line chart component created
- [ ] Area chart component created
- [ ] Bar chart component created
- [ ] Pie chart component created
- [ ] Chart container wrapper added
- [ ] Charts grid layout built
- [ ] Interactive features added
- [ ] Tooltips styled
- [ ] Animations configured
- [ ] Responsive behavior tested

---

## 🎯 Next Steps

Move to **Phase 4.6: Live Metrics Dashboard** to combine everything into a real-time dashboard.

**Estimated Time**: 2-3 hours
