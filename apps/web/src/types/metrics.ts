import { ComponentType } from "react";

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  change?: number; // Percentage change
  changeType?: "increase" | "decrease";
  icon?: ComponentType<{ size?: number; className?: string }>;
  color?: string;
  format?: "number" | "currency" | "percentage";
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
  type: "line" | "bar" | "area";
  color?: string;
}

export interface MetricsGroup {
  id: string;
  title: string;
  metrics: Metric[];
  icon?: ComponentType<{ size?: number }>;
}

export interface DashboardConfig {
  refreshInterval?: number; // in milliseconds
  animationDuration?: number;
  showTrends?: boolean;
  compactMode?: boolean;
}
