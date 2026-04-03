import { Metric, MetricsGroup, ChartData } from "../types/metrics";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Heart,
} from "lucide-react";

export const mockMetrics: Metric[] = [
  {
    id: "total-products",
    label: "Total Products",
    value: 247,
    change: 12.5,
    changeType: "increase",
    icon: Package,
    color: "#3B82F6",
    format: "number",
    description: "Active products in catalog",
  },
  {
    id: "monthly-revenue",
    label: "Monthly Revenue",
    value: 1250000,
    unit: "USD",
    change: 8.3,
    changeType: "increase",
    icon: DollarSign,
    color: "#10B981",
    format: "currency",
    description: "Total revenue this month",
  },
  {
    id: "active-users",
    label: "Active Users",
    value: 15420,
    change: 5.7,
    changeType: "increase",
    icon: Users,
    color: "#8B5CF6",
    format: "number",
    description: "Monthly active users",
  },
  {
    id: "conversion-rate",
    label: "Conversion Rate",
    value: 3.42,
    unit: "%",
    change: -1.2,
    changeType: "decrease",
    icon: TrendingUp,
    color: "#F59E0B",
    format: "percentage",
    description: "Average conversion rate",
  },
  {
    id: "total-orders",
    label: "Total Orders",
    value: 8934,
    change: 15.8,
    changeType: "increase",
    icon: ShoppingCart,
    color: "#EF4444",
    format: "number",
    description: "Orders processed this month",
  },
  {
    id: "page-views",
    label: "Page Views",
    value: 342567,
    change: 22.4,
    changeType: "increase",
    icon: Eye,
    color: "#06B6D4",
    format: "number",
    description: "Total page views this month",
  },
];

export const mockMetricsGroups: MetricsGroup[] = [
  {
    id: "business",
    title: "Business Metrics",
    icon: DollarSign,
    metrics: mockMetrics.filter((m) =>
      ["monthly-revenue", "total-orders", "conversion-rate"].includes(m.id),
    ),
  },
  {
    id: "engagement",
    title: "Engagement Metrics",
    icon: Heart,
    metrics: mockMetrics.filter((m) =>
      ["active-users", "page-views"].includes(m.id),
    ),
  },
  {
    id: "products",
    title: "Product Metrics",
    icon: Package,
    metrics: mockMetrics.filter((m) => ["total-products"].includes(m.id)),
  },
];

// Generate mock time series data
function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number,
): ChartData["data"] {
  const data: ChartData["data"] = [];
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
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    });
  }

  return data;
}

export const mockChartData: ChartData[] = [
  {
    id: "revenue-trend",
    title: "Revenue Trend (30 Days)",
    data: generateTimeSeriesData(30, 40000, 10000),
    type: "area",
    color: "#10B981",
  },
  {
    id: "users-trend",
    title: "Active Users (30 Days)",
    data: generateTimeSeriesData(30, 500, 100),
    type: "line",
    color: "#8B5CF6",
  },
  {
    id: "orders-trend",
    title: "Orders (30 Days)",
    data: generateTimeSeriesData(30, 300, 50),
    type: "bar",
    color: "#EF4444",
  },
];
