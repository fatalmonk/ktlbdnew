import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  announce?: boolean;
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for adaptive thresholds
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const threshold = options.threshold || (isMobile ? 0.05 : 0.1);
  const rootMargin = options.rootMargin || (isMobile ? '50px' : '100px');

  const [ref, inView] = useInView({
    threshold,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      if (options.announce) {
        // Screen reader announcement handled by ARIA live regions
      }
    } else if (!options.triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, options.triggerOnce, options.announce]);

  return { ref, controls, inView };
};
