import React from "react";

// Type declaration for requestIdleCallback
interface IdleRequestOptions {
  timeout?: number;
}

interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}

declare global {
  interface Window {
    requestIdleCallback?(
      callback: (deadline: IdleDeadline) => void,
      options?: IdleRequestOptions,
    ): number;
    cancelIdleCallback?(handle: number): void;
  }
}

/**
 * Creates a lazy-loaded component that loads on idle using requestIdleCallback
 * Falls back to setTimeout for browsers without requestIdleCallback support
 */
export const createIdleLazy = <T extends React.ComponentType<object>>(
  importFn: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> => {
  return React.lazy(() => {
    return new Promise<{ default: T }>((resolve) => {
      const load = async () => {
        const module = await importFn();
        resolve(module);
      };

      if (typeof window !== "undefined" && window.requestIdleCallback) {
        window.requestIdleCallback(load, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(load, 100);
      }
    });
  });
};
