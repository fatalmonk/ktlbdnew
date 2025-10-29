import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  offset: MotionValue<number>;
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className = '',
  offset,
  scale,
  opacity
}) => {
  return (
    <motion.div
      className={className}
      style={{
        y: offset,
        scale: scale,
        opacity: opacity
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
