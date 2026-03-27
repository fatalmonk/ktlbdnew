import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Droplets,
  Sun,
  Recycle,
  TreePine,
  Leaf,
  Users,
  Heart,
  Shield,
  ClipboardCheck,
} from 'lucide-react';
import { SustainabilityMetric } from '../../types/sustainability';

interface MetricsWidgetProps {
  metric: SustainabilityMetric;
  index?: number;
}

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Sun,
  Recycle,
  TreePine,
  Leaf,
  Users,
  Heart,
  Shield,
  ClipboardCheck,
  TrendingUp,
};

const MetricsWidget = ({ metric, index = 0 }: MetricsWidgetProps) => {
  const IconComponent = iconMap[metric.icon] || Leaf;

  const getTrendIcon = () => {
    if (metric.trend === 'up') return TrendingUp;
    if (metric.trend === 'down') return TrendingDown;
    return Minus;
  };

  const TrendIcon = getTrendIcon();

  const getTrendColor = () => {
    if (metric.trendIsGood) return 'text-green-600';
    return 'text-red-600';
  };

  const getCategoryColor = () => {
    switch (metric.category) {
      case 'Environmental':
        return 'bg-green-100 text-green-700';
      case 'Social':
        return 'bg-blue-100 text-blue-700';
      case 'Governance':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const progressPercentage = metric.target ? (metric.value / metric.target) * 100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <IconComponent className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">{metric.name}</h3>
            <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${getCategoryColor()}`}>
              {metric.category}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          <TrendIcon size={20} />
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-neutral-900">{metric.value}</span>
          <span className="text-lg text-neutral-600">{metric.unit}</span>
        </div>
        {metric.target && (
          <div className="text-sm text-neutral-500 mt-1">
            Target: {metric.target}{metric.unit}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {metric.target && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
            <span>Progress</span>
            <span>{Math.min(progressPercentage, 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className={`h-full rounded-full ${
                progressPercentage >= 100
                  ? 'bg-green-500'
                  : progressPercentage >= 75
                  ? 'bg-blue-500'
                  : progressPercentage >= 50
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
              }`}
            />
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-neutral-600 leading-relaxed">{metric.description}</p>
    </motion.div>
  );
};

export default MetricsWidget;

