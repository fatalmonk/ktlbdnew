import { useState, useEffect } from 'react';
import { Metric, ChartData } from '../../types/metrics';
import { metricsService } from '../services/metrics.service';

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
