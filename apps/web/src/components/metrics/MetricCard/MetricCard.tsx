import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { createLazyIcon } from '@/lib/lucide-icons';
import { Metric } from '../../../types/metrics';
import AnimatedCounter from '../../animation/AnimatedCounter';

const TrendingUp = createLazyIcon('TrendingUp');
const TrendingDown = createLazyIcon('TrendingDown');
const Info = createLazyIcon('Info');

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
      className="relative bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl 
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
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            {Icon && (
              <div
                className="p-2 md:p-3 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor: `${metric.color || '#3B82F6'}20`,
                  color: metric.color || '#3B82F6',
                }}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm font-medium text-neutral-600 truncate">
                {metric.label}
              </p>
              {metric.description && !compact && (
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-neutral-400 hover:text-neutral-600 mt-1 min-h-[44px] inline-flex items-center"
                  aria-label="Show metric description"
                >
                  <Suspense fallback={<div className="w-3.5 h-3.5" />}>
                    <Info size={14} />
                  </Suspense>
                </button>
              )}
            </div>
          </div>

          {/* Change Badge */}
          {metric.change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs 
                font-bold flex-shrink-0 ${
                  metric.changeType === 'increase'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
            >
              <Suspense fallback={<div className="w-3 h-3 md:w-3.5 md:h-3.5" />}>
                {metric.changeType === 'increase' ? (
                  <TrendingUp size={12} className="md:w-3.5 md:h-3.5" />
                ) : (
                  <TrendingDown size={12} className="md:w-3.5 md:h-3.5" />
                )}
              </Suspense>
              <span>{Math.abs(metric.change).toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="text-2xl md:text-3xl font-bold text-neutral-900">
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
            className="absolute top-full left-0 mt-2 px-3 py-2 bg-neutral-900 
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
        className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          backgroundColor: metric.color || '#3B82F6',
        }}
      />
    </motion.div>
  );
}




