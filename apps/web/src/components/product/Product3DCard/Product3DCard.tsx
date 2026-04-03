import React, { useRef, useState, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';

const ArrowRight = createLazyIcon('ArrowRight');
const Eye = createLazyIcon('Eye');
const Heart = createLazyIcon('Heart');
const Share2 = createLazyIcon('Share2');
import { Product } from '../../types/product';
import { isMobileDevice, getOptimizedAnimationConfig } from '../../../lib/utils/mobile-performance';
import TouchOptimized from '../../ui/TouchOptimized';
import Image from '../../media/Image';

interface Product3DCardProps {
  product: Product;
  index: number;
}

const Product3DCard: React.FC<Product3DCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Device detection for mobile optimizations
  const isMobile = isMobileDevice();
  const animationConfig = getOptimizedAnimationConfig();

  // Mouse position tracking for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform values for 3D effect
  const rotateX = useTransform(y, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsTouched(false);
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setIsTouched(true);
      setIsHovered(true); // Show actions on touch
    }
  };

  return (
    <motion.div
      initial={!isMobile ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
      whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
      transition={
        !isMobile
          ? {
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.215, 0.61, 0.355, 1],
            }
          : undefined
      }
      viewport={!isMobile ? { once: true, margin: '-100px' } : undefined}
    >
      <Tilt
        tiltMaxAngleX={animationConfig.enableTilt ? 10 : 0}
        tiltMaxAngleY={animationConfig.enableTilt ? 10 : 0}
        perspective={animationConfig.enable3DTransforms ? 1000 : 0}
        scale={animationConfig.enableTilt ? 1.05 : 1}
        transitionSpeed={2000}
        gyroscope={animationConfig.enableTilt}
        disabled={!animationConfig.enableTilt}
      >
        <motion.div
          ref={cardRef}
          className="relative h-full group"
          style={{
            rotateX: !isMobile ? rotateX : 0,
            rotateY: !isMobile ? rotateY : 0,
            transformStyle: animationConfig.enable3DTransforms ? 'preserve-3d' : 'flat',
            willChange: !isMobile ? 'transform' : 'auto',
          }}
          onMouseMove={!isMobile ? handleMouseMove : undefined}
          onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
          onTouchStart={isMobile ? handleTouchStart : undefined}
        >
          {/* Card Container */}
          <div className="relative bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-300">
            {/* Gradient Border Effect - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(
                    600px circle at ${x.get() * 100}% ${y.get() * 100}%,
                    rgba(253, 211, 56, 0.15),
                    transparent 40%
                  )`,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10">
                <span className="px-3 py-1 bg-primary-500 text-black text-sm md:text-base font-bold rounded-full">
                  FEATURED
                </span>
              </div>
            )}

            {/* Quick Actions - Always visible on mobile, hover-only on desktop */}
            <div
              className={`absolute top-2 right-2 md:top-4 md:right-4 z-10 flex flex-col gap-1.5 md:gap-2 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <TouchOptimized
                onTap={() => {
                  /* Handle favorite */
                }}
                touchFeedback={true}
                minTouchTargetSize={44}
              >
                <motion.button
                  className="min-w-[36px] min-h-[36px] md:min-w-[44px] md:min-h-[44px] w-9 h-9 md:w-11 md:h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  initial={!isMobile ? { x: 20, opacity: 0 } : false}
                  animate={
                    !isMobile ? { x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 } : false
                  }
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Add to favorites"
                >
                  <Suspense fallback={<div className="w-4 h-4 md:w-5 md:h-5" />}>
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                  </Suspense>
                </motion.button>
              </TouchOptimized>

              <TouchOptimized
                onTap={() => {
                  /* Handle share */
                }}
                touchFeedback={true}
                minTouchTargetSize={44}
              >
                <motion.button
                  className="min-w-[36px] min-h-[36px] md:min-w-[44px] md:min-h-[44px] w-9 h-9 md:w-11 md:h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  initial={!isMobile ? { x: 20, opacity: 0 } : false}
                  animate={
                    !isMobile ? { x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 } : false
                  }
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share product"
                >
                  <Suspense fallback={<div className="w-4 h-4 md:w-5 md:h-5" />}>
                    <Share2 className="w-4 h-4 md:w-5 md:h-5 text-neutral-700" />
                  </Suspense>
                </motion.button>
              </TouchOptimized>
            </div>

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <motion.div
                className="w-full h-full"
                style={{
                  scale: isMobile
                    ? isTouched && animationConfig.enableComplexAnimations
                      ? 1.05
                      : 1
                    : isHovered && animationConfig.enableComplexAnimations
                      ? 1.1
                      : 1,
                  transition: animationConfig.enableComplexAnimations
                    ? 'scale 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'
                    : 'none',
                  willChange: isHovered || isTouched ? 'transform' : 'auto',
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full"
                  width={400}
                  height={400}
                  fit="cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Hover Overlay - Only on desktop, show on touch for mobile */}
              {(isMobile ? isTouched : isHovered) && (
                <motion.div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 sm:p-8 md:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TouchOptimized
                    onTap={() => {
                      /* Navigate on tap */
                    }}
                    touchFeedback={true}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                    >
                      <Link
                        to={product.link}
                        className="flex items-center justify-center gap-2 min-h-[44px] px-8 py-3.5 sm:px-10 sm:py-4 bg-white text-black font-bold rounded-lg"
                      >
                        <Suspense fallback={<div className="w-5 h-5" />}>
                          <Eye className="w-5 h-5" />
                        </Suspense>
                        Quick View
                      </Link>
                    </motion.div>
                  </TouchOptimized>
                </motion.div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5 md:p-6 lg:p-8">
              {/* Category */}
              <motion.span
                className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-sm md:text-base font-bold rounded-full mb-3 md:mb-4"
                animate={{
                  backgroundColor: isHovered ? 'rgb(253, 211, 56)' : 'rgb(243, 244, 246)',
                  color: isHovered ? 'rgb(0, 0, 0)' : 'rgb(75, 85, 99)',
                }}
                transition={{ duration: 0.3 }}
              >
                {product.category}
              </motion.span>

              {/* Product Name */}
              <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-2 leading-tight line-clamp-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-lg lg:text-xl mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              {product.price && (
                <p className="text-primary-600 font-bold text-xl lg:text-2xl mb-4">
                  {product.price}
                </p>
              )}

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3 lg:mb-4">
                  {product.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 md:px-2 md:py-1 bg-neutral-50 text-neutral-500 text-[10px] md:text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button - Always visible on mobile, hover-only on desktop */}
              <TouchOptimized
                onTap={() => {
                  /* Navigate on tap */
                }}
                touchFeedback={true}
              >
                <motion.div
                  initial={!isMobile ? { opacity: 0, y: 10 } : false}
                  animate={
                    !isMobile
                      ? {
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 10,
                        }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={product.link}
                    className="inline-flex items-center justify-center gap-1.5 md:gap-2 min-h-[40px] md:min-h-[44px] text-primary-600 font-semibold text-xs md:text-sm group/link"
                  >
                    View Details
                    <Suspense fallback={<div className="w-3 h-3 md:w-4 md:h-4" />}>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Suspense>
                  </Link>
                </motion.div>
              </TouchOptimized>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default React.memo(Product3DCard);
