import { Metric, ChartData } from '../../types/metrics';
import { mockMetrics, mockChartData } from '../../data/metrics-mock';

class MetricsService {
  private baseUrl = import.meta.env.VITE_API_URL || '/api';

  /**
   * Fetch all metrics
   */
  async getMetrics(): Promise<Metric[]> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${this.baseUrl}/metrics`);
      // return response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
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
      return metrics.find(m => m.id === id) || null;
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

      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (chartId) {
        const chart = mockChartData.find(c => c.id === chartId);
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
  subscribeToUpdates(
    callback: (metrics: Metric[]) => void
  ): () => void {
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

