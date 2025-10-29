import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

interface HeroContentProps {
  slide: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: { label: string; href: string; icon?: React.ReactNode };
      secondary?: { label: string; href: string; icon?: React.ReactNode };
    };
  };
  opacity: MotionValue<number>;
}

const HeroContent: React.FC<HeroContentProps> = ({ slide, opacity }) => {
  return (
    <motion.div
      className="relative z-20 h-full flex items-center"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 bg-primary-500/20 backdrop-blur-sm rounded-full">
              <span className="text-primary-400 font-medium">
                {slide.subtitle}
              </span>
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {slide.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {slide.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              to={slide.cta.primary.href}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-black font-bold rounded-lg overflow-hidden hover:bg-primary-600 transition-colors duration-200"
            >
              <span className="relative z-10">{slide.cta.primary.label}</span>
              {slide.cta.primary.icon || <ArrowRight className="w-5 h-5" />}
            </Link>

            {slide.cta.secondary && (
              <Link
                to={slide.cta.secondary.href}
                className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-200"
              >
                <span className="relative z-10">{slide.cta.secondary.label}</span>
                {slide.cta.secondary.icon || <Play className="w-5 h-5" />}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
