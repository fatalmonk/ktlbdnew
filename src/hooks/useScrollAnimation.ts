import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 *
 * @param options - Configuration options for the Intersection Observer
 * @returns Object containing ref to attach to element and isVisible state
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

/**
 * Get animation class based on animation type and visibility
 */
export const getAnimationClass = (
  isVisible: boolean,
  animationType: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' = 'fade',
  delay: number = 0
): string => {
  const baseClasses = 'transition-all duration-700';
  const delayClass = delay > 0 ? `delay-${delay}` : '';

  if (!isVisible) {
    switch (animationType) {
      case 'fade':
        return `${baseClasses} opacity-0`;
      case 'slide-up':
        return `${baseClasses} opacity-0 translate-y-10`;
      case 'slide-left':
        return `${baseClasses} opacity-0 -translate-x-10`;
      case 'slide-right':
        return `${baseClasses} opacity-0 translate-x-10`;
      case 'scale':
        return `${baseClasses} opacity-0 scale-95`;
      default:
        return `${baseClasses} opacity-0`;
    }
  }

  return `${baseClasses} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
};
