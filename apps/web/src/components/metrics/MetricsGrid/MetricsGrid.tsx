import { Metric } from '../../../types/metrics';
import MetricCard from '../MetricCard';
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
  const gridCols =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 md:mb-6"
        >
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">{description}</p>
          )}
        </motion.div>
      )}

      {/* Grid */}
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {metrics.map((metric, index) => (
          <MetricCard key={metric.id} metric={metric} index={index} compact={compact} />
        ))}
      </div>
    </div>
  );
}
