/**
 * Sustainability Type Definitions
 * For showcasing ESG metrics and environmental impact
 */

export interface SustainabilityMetric {
  id: string;
  name: string;
  category: 'Environmental' | 'Social' | 'Governance';
  value: number;
  unit: string;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  trendIsGood: boolean;
  icon: string;
  description: string;
}

export interface YearlyMetric {
  year: number;
  value: number;
}

export interface SustainabilityGoal {
  id: string;
  title: string;
  description: string;
  targetYear: number;
  currentProgress: number;
  metrics: string[];
  sdgAlignment?: number[];
}

export interface SustainabilityInitiative {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  startDate: string;
  status: 'Active' | 'Completed' | 'Planned';
  image?: string;
}

