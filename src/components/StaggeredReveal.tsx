import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface StaggeredRevealProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  threshold?: number;
}

const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  stagger = 0.1,
  className = '',
  threshold = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -100px 0px',
    amount: threshold
  });

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default StaggeredReveal;
