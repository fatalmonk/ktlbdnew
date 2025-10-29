import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  loadTime: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    loadTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));

        setMetrics(prev => ({
          ...prev,
          fps: currentFPS
        }));

        // Warn if FPS drops below threshold
        if (currentFPS < 30 && process.env.NODE_ENV === 'development') {
          console.warn(`Performance degraded: FPS dropped to ${currentFPS}. Consider reducing animations.`);
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Measure page load time
    if (window.performance && window.performance.timing) {
      const loadTime = window.performance.timing.loadEventEnd -
                      window.performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return metrics;
};
