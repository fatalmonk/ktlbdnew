import React, { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  onComplete
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const motionValue = useMotionValue(from);

  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
    restDelta: 0.001
  });

  // Transform the motion value into formatted text
  const display = useTransform(springValue, (latest) => {
    const formatted = decimals > 0
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        motionValue.set(to);

        if (onComplete) {
          const completeTimer = setTimeout(onComplete, duration * 1000);
          return () => clearTimeout(completeTimer);
        }
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, to, delay, duration, motionValue, onComplete]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
};

export default AnimatedCounter;
