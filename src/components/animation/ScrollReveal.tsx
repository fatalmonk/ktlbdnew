import React from 'react';
import { useScrollAnimation, getAnimationClass } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

/**
 * ScrollReveal component wraps content with scroll-triggered animations
 *
 * Usage:
 * <ScrollReveal animation="slide-up" delay={200}>
 *   <YourContent />
 * </ScrollReveal>
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
    rootMargin: '50px',
  });

  const animationClass = getAnimationClass(isVisible, animation, delay);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animationClass} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
