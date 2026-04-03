/* eslint-disable react-refresh/only-export-components -- factory helpers export alongside lazy icon components */
import React, { Suspense, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Creates a lazy-loaded Lucide icon component
 * @param iconName - The name of the Lucide icon (e.g., 'Menu', 'X', 'ArrowRight')
 * @returns A React lazy component for the icon
 */
export function createLazyIcon(iconName: string): React.LazyExoticComponent<LucideIcon> {
  return React.lazy(() =>
    import('lucide-react').then((module) => ({
      default: (module as Record<string, LucideIcon>)[iconName] as LucideIcon,
    }))
  );
}

/**
 * Creates a lazy icon component that can be used as a component (for passing as props)
 * This is useful when you need to pass icons to other components
 */
export function createLazyIconComponent(iconName: string): React.LazyExoticComponent<LucideIcon> {
  return createLazyIcon(iconName);
}

/**
 * Props for the LazyIcon component
 */
interface LazyIconProps {
  iconName: string;
  className?: string;
  size?: number | string;
  [key: string]: unknown; // Allow other props to be passed through
}

/**
 * A component that lazy-loads a Lucide icon only when it becomes visible
 * Uses IntersectionObserver to detect visibility
 */
export const LazyIcon: React.FC<LazyIconProps> = ({ iconName, className, size, ...props }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const IconComponent = React.useMemo(() => createLazyIcon(iconName), [iconName]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            // Once loaded, we can stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the icon enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fallback placeholder to maintain layout
  const placeholder = (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof size === 'number' ? size : size || 24,
        height: typeof size === 'number' ? size : size || 24,
        display: 'inline-block',
      }}
      aria-hidden="true"
    />
  );

  if (!shouldLoad) {
    return placeholder;
  }

  return (
    <div ref={containerRef} className="inline-block">
      <Suspense
        fallback={
          <div
            className={className}
            style={{
              width: typeof size === 'number' ? size : size || 24,
              height: typeof size === 'number' ? size : size || 24,
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
        }
      >
        <IconComponent className={className} size={size} {...props} />
      </Suspense>
    </div>
  );
};

/**
 * Hook to get a lazy-loaded icon component
 * Use this when you need the icon component itself (not just rendering)
 * @param iconName - The name of the Lucide icon
 * @returns A lazy-loaded icon component
 */
export function useLazyIcon(iconName: string): React.LazyExoticComponent<LucideIcon> {
  return React.useMemo(() => createLazyIcon(iconName), [iconName]);
}

/**
 * Creates a lazy icon component that can be used in data structures
 * This component loads the icon when it's first rendered (no IntersectionObserver)
 * Use this for icons in data arrays that are passed as component props
 */
export function createLazyIconWrapper(
  iconName: string
): React.FC<React.ComponentProps<LucideIcon>> {
  const LazyIcon = createLazyIcon(iconName);

  return (props: React.ComponentProps<LucideIcon>) => (
    <Suspense
      fallback={
        <div
          className={props.className}
          style={{
            width: typeof props.size === 'number' ? props.size : props.size || 24,
            height: typeof props.size === 'number' ? props.size : props.size || 24,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      }
    >
      <LazyIcon {...props} />
    </Suspense>
  );
}

/**
 * Preload an icon (useful for critical icons that should load immediately)
 * @param iconName - The name of the Lucide icon to preload
 */
export async function preloadIcon(iconName: string): Promise<void> {
  try {
    const module = await import('lucide-react');
    // Access the icon to ensure it's loaded
    (module as Record<string, LucideIcon>)[iconName];
  } catch (error) {
    console.warn(`Failed to preload icon: ${iconName}`, error);
  }
}
