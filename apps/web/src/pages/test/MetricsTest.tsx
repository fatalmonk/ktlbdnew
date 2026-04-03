import { Suspense } from 'react';
import { MetricsGrid } from '../../components/metrics';
import { useMetrics, useChartData } from '../../lib/hooks/useMetrics';
import Loading from '../../components/ui/Loading';
import SEO from '../../components/seo/SEO';
import { mockMetrics } from '../../data/metrics-mock';

function MetricsDashboardContent() {
  const { metrics, loading, error } = useMetrics(false);
  const { data: chartData = [] } = useChartData();

  // Fallback to mock data if no metrics loaded
  const displayMetrics = metrics.length > 0 ? metrics : mockMetrics;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Metrics</h2>
          <p className="text-red-700">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Metrics Dashboard</h1>
        <p className="text-neutral-600">Real-time business metrics and performance indicators</p>
      </div>

      <MetricsGrid
        metrics={displayMetrics}
        columns={3}
        title="Key Performance Indicators"
        description="Business metrics tracking revenue, users, orders, and more"
      />

      {chartData.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Chart Data Ready</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chartData.map((chart) => (
              <div
                key={chart.id}
                className="bg-white rounded-lg p-6 shadow-md border border-neutral-200"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">{chart.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{chart.data.length} data points</p>
                <div className="text-xs text-neutral-500">
                  Type: {chart.type} • Color: {chart.color}
                </div>
                <div className="mt-4 text-xs text-neutral-400">
                  Charts will be rendered in Phase 4.5
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MetricsTest() {
  return (
    <>
      <SEO
        title="Metrics Dashboard Test | KTL"
        description="Test page for metrics dashboard components"
        canonical="/test/metrics"
      />
      <Suspense fallback={<Loading />}>
        <MetricsDashboardContent />
      </Suspense>
    </>
  );
}
