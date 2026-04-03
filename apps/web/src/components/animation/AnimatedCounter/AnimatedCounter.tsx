import React, { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  // Legacy API (from animation/AnimatedCounter)
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;

  // New API (from metrics/AnimatedCounter)
  value?: number;
  format?: 'number' | 'currency' | 'percentage';
  unit?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  // Legacy API
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  onComplete,
  // New API
  value,
  format,
  unit,
}) => {
  // Support both APIs: use 'value' if provided, otherwise use 'to'
  // If using new API (value is provided), format is used; otherwise use prefix/suffix
  const isNewAPI = value !== undefined;
  // For legacy API, 'to' is required, but we'll default to 0 if neither is provided
  const targetValue = isNewAPI ? value : to !== undefined ? to : 0;
  const startValue = from;
  const actualFormat = isNewAPI ? (format ?? 'number') : undefined;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
  });

  const motionValue = useMotionValue(startValue);

  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
    restDelta: 0.001,
  });

  // Format value based on format prop (new API) or use prefix/suffix (legacy API)
  const formatValue = (num: number): string => {
    // New API: use format prop
    if (actualFormat === 'currency') {
      const rounded = Math.floor(num);
      return `$${rounded.toLocaleString()}${unit ? ` ${unit}` : ''}`;
    }

    if (actualFormat === 'percentage') {
      return `${num.toFixed(decimals)}%`;
    }

    if (actualFormat === 'number') {
      const rounded = Math.floor(num);
      if (rounded >= 1000000) {
        return `${(rounded / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ''}`;
      }
      if (rounded >= 1000) {
        return `${(rounded / 1000).toFixed(1)}K${unit ? ` ${unit}` : ''}`;
      }
      return `${rounded.toLocaleString()}${unit ? ` ${unit}` : ''}`;
    }

    // Legacy API: use prefix/suffix
    const formatted = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  };

  // Transform the motion value into formatted text
  const display = useTransform(springValue, (latest) => {
    return formatValue(latest);
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        motionValue.set(targetValue);

        if (onComplete) {
          const completeTimer = setTimeout(onComplete, duration * 1000);
          return () => clearTimeout(completeTimer);
        }
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, targetValue, delay, duration, motionValue, onComplete]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
};

export default AnimatedCounter;
