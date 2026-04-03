/**
 * Performance measurement utilities
 * Improved to avoid invalid negative timing results.
 */

// Track if measurement has already been started to prevent multiple calls
let loadTimeStart: number | null = null;
let hasMeasured = false;

/**
 * Resets the load time measurement (useful for testing or remeasuring)
 */
export const resetLoadTimeMeasurement = (): void => {
  loadTimeStart = null;
  hasMeasured = false;
};

/**
 * Measures the initial page load time using double requestAnimationFrame
 * This ensures measurement happens after the first paint
 * Uses performance.now() for reliable timing instead of marks/measures
 */
export const measureLoadTime = (): void => {
  if (typeof window === "undefined" || !window.performance) return;

  // Prevent multiple measurements
  if (hasMeasured) return;

  // Record start time immediately
  loadTimeStart = performance.now();

  // Use double requestAnimationFrame to measure after first paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Prevent duplicate measurements
      if (hasMeasured || loadTimeStart === null) return;

      const loadTimeEnd = performance.now();
      const loadTime = Math.round(loadTimeEnd - loadTimeStart);

      // Validate the measurement
      if (isNaN(loadTime) || loadTime < 0 || loadTime > 60000) {
        console.warn("Invalid load time measurement:", loadTime);
        return;
      }

      hasMeasured = true;
      console.log("Load:", loadTime, "ms");

      // Send to analytics if available
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "page_load_time", {
          event_category: "Performance",
          value: loadTime,
          event_label: "Initial Load",
          non_interaction: true,
        });
      }
    });
  });
};

export const measurePerformance = (
  name: string,
  startMark: string,
  endMark: string,
): number | null => {
  if (typeof window === "undefined" || !window.performance) return null;

  try {
    const start = performance.getEntriesByName(startMark)[0];
    const end = performance.getEntriesByName(endMark)[0];

    if (!start || !end || isNaN(start.startTime) || isNaN(end.startTime)) {
      console.warn("Invalid marks for:", name, { start, end });
      return null;
    }

    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];

    if (!measure || isNaN(measure.duration) || measure.duration < 0) {
      console.warn("Invalid measure:", name, measure);
      return null;
    }

    return Math.round(measure.duration);
  } catch (error) {
    console.warn(`Failed to measure performance: ${name}`, error);
    return null;
  }
};

export const markPerformance = (name: string): void => {
  if (typeof window !== "undefined" && window.performance) {
    performance.mark(name);
  }
};

export const getPerformanceMeasures = (name: string): PerformanceEntry[] => {
  if (typeof window === "undefined" || !window.performance) return [];
  return performance.getEntriesByName(name);
};

export const clearPerformanceMarks = (): void => {
  if (typeof window !== "undefined" && window.performance) {
    performance.clearMarks();
    performance.clearMeasures();
  }
};
