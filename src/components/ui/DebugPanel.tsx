import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

export const DebugPanel: React.FC = () => {
  const metrics = usePerformanceMonitor();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Screen reader only content */}
      <div className="sr-only">
        Performance metrics: FPS {metrics.fps}, Load time {metrics.loadTime}ms
      </div>

      {/* Visible content */}
      <div className="flex flex-col gap-1">
        <div>FPS: {metrics.fps}</div>
        <div>Load: {metrics.loadTime}ms</div>
        {metrics.memory && <div>Memory: {Math.round(metrics.memory / 1048576)}MB</div>}
      </div>
    </motion.div>
  );
};
