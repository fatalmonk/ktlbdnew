import { useState, useEffect, useCallback, useMemo } from 'react';

// Tailwind breakpoints (matching tailwind.config.js)
export const BREAKPOINTS = {
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * useMediaQuery Hook
 * 
 * Reactively tracks a media query and returns whether it matches.
 * Optimized with debouncing and proper cleanup.
 * 
 * @param query - Media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create handler
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * useBreakpoint Hook
 * 
 * Tracks the current viewport breakpoint based on Tailwind breakpoints.
 * Returns the current breakpoint and helper boolean values for each breakpoint.
 * 
 * @returns Object with current breakpoint and boolean flags for each breakpoint
 * 
 * @example
 * const { breakpoint, isXs, isSm, isMd, isLg, isXl, isMobile, isDesktop } = useBreakpoint();
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  const isXs = useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);

  useEffect(() => {
    if (isXl) {
      setBreakpoint('xl');
    } else if (isLg) {
      setBreakpoint('lg');
    } else if (isMd) {
      setBreakpoint('md');
    } else if (isSm) {
      setBreakpoint('sm');
    } else {
      setBreakpoint('xs');
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  const isMobile = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [breakpoint]);
  const isDesktop = useMemo(() => breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl', [breakpoint]);
  const isTablet = useMemo(() => breakpoint === 'md', [breakpoint]);

  return {
    breakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isDesktop,
    isTablet,
  };
}

/**
 * useViewportHeight Hook
 * 
 * Tracks viewport height with support for mobile browser UI (address bar, etc.).
 * Sets CSS custom property `--vh` for accurate mobile viewport height calculations.
 * Handles visual viewport API for better mobile support (iOS Safari, Chrome Mobile).
 * 
 * @param options - Configuration options
 * @param options.includeMobileFix - Whether to set --vh CSS variable (default: true)
 * @param options.debounceMs - Debounce delay in milliseconds (default: 150)
 * @returns Current viewport height in pixels
 * 
 * @example
 * const vh = useViewportHeight();
 * // Use in CSS: height: calc(var(--vh, 1vh) * 100);
 * 
 * @example
 * const vh = useViewportHeight({ includeMobileFix: true });
 */
export function useViewportHeight(options: {
  includeMobileFix?: boolean;
  debounceMs?: number;
} = {}) {
  const { includeMobileFix = true, debounceMs = 150 } = options;
  const [viewportHeight, setViewportHeight] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return window.innerHeight;
  });

  const updateViewportHeight = useCallback(() => {
    if (typeof window === 'undefined') return;

    let height = window.innerHeight;

    // Use Visual Viewport API if available (better for mobile browsers)
    if (window.visualViewport) {
      height = window.visualViewport.height;
    }

    setViewportHeight(height);

    // Set CSS custom property for mobile viewport height fix
    if (includeMobileFix) {
      const vh = height * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [includeMobileFix]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial calculation
    updateViewportHeight();

    // Debounce function
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewportHeight, debounceMs);
    };

    // Listen to resize events
    window.addEventListener('resize', debouncedUpdate, { passive: true });

    // Listen to visual viewport changes (mobile browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedUpdate, { passive: true });
      window.visualViewport.addEventListener('scroll', debouncedUpdate, { passive: true });
    }

    // Listen to orientation changes
    window.addEventListener('orientationchange', updateViewportHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateViewportHeight);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', debouncedUpdate);
        window.visualViewport.removeEventListener('scroll', debouncedUpdate);
      }
      
      clearTimeout(timeoutId);
    };
  }, [updateViewportHeight, debounceMs]);

  return viewportHeight;
}

/**
 * useResponsive Hook (Convenience Hook)
 * 
 * Combines all responsive hooks for convenience.
 * Returns breakpoint info, media query helpers, and viewport height.
 * 
 * @returns Combined responsive information
 * 
 * @example
 * const { breakpoint, isMobile, viewportHeight, matches } = useResponsive();
 * const isLargeScreen = matches('(min-width: 1024px)');
 */
export function useResponsive() {
  const breakpointInfo = useBreakpoint();
  const viewportHeight = useViewportHeight();
  
  // Memoized media query matcher
  const matches = useCallback((query: string) => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  }, []);

  return {
    ...breakpointInfo,
    viewportHeight,
    matches,
  };
}

