import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Heart, Share2 } from 'lucide-react';
import { Product } from '../../types/product';

interface Product3DCardProps {
  product: Product;
  index: number;
}

const Product3DCard: React.FC<Product3DCardProps> = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.05}
        transitionSpeed={2000}
        gyroscope={true}
      >
        <motion.div
          ref={cardRef}
          className="relative h-full group"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Gradient Border Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(
                  600px circle at ${x.get() * 100}% ${y.get() * 100}%,
                  rgba(253, 211, 56, 0.15),
                  transparent 40%
                )`
              }}
            />

            {/* Featured Badge */}
            {product.featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-primary-500 text-black text-xs font-bold rounded-full">
                  FEATURED
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <motion.button
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5 text-gray-700" />
              </motion.button>

              <motion.button
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <motion.img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  scale: isHovered ? 1.1 : 1,
                  transition: 'scale 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'
                }}
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                >
                  <Link
                    to={product.link}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg"
                  >
                    <Eye className="w-5 h-5" />
                    Quick View
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              {/* Category */}
              <motion.span
                className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3"
                animate={{
                  backgroundColor: isHovered ? '#fdd338' : '#f3f4f6',
                  color: isHovered ? '#000000' : '#4b5563'
                }}
                transition={{ duration: 0.3 }}
              >
                {product.category}
              </motion.span>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Price */}
              {product.price && (
                <p className="text-primary-600 font-bold text-lg mb-3">
                  {product.price}
                </p>
              )}

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={product.link}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold group/link"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default React.memo(Product3DCard);
