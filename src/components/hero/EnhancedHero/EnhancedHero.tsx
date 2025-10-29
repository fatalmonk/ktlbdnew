import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import ParallaxLayer from './ParallaxLayer';
import HeroContent from './HeroContent';
import VideoBackground from './VideoBackground';

interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  mobileSrc?: string;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: { label: string; href: string; icon?: React.ReactNode };
    secondary?: { label: string; href: string; icon?: React.ReactNode };
  };
}

const EnhancedHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const slides: HeroSlide[] = [
    {
      id: 'excellence',
      type: 'image',
      src: '/assets/hero.jpg',
      mobileSrc: '/assets/hero.jpg',
      title: 'Excellence in Textile Manufacturing',
      subtitle: 'Since 2002',
      description: 'Leading Bangladesh\'s garment industry with innovation, quality, and sustainable practices',
      cta: {
        primary: {
          label: 'Explore Products',
          href: '/products',
          icon: <ArrowRight className="w-5 h-5" />
        },
        secondary: {
          label: 'Watch Video',
          href: '#video',
          icon: <Play className="w-5 h-5" />
        }
      }
    },
    {
      id: 'sustainability',
      type: 'image',
      src: '/assets/designer-1.jpg',
      mobileSrc: '/assets/designer-1.jpg',
      title: 'Sustainable Fashion Forward',
      subtitle: 'Green Certified',
      description: 'Committed to eco-friendly manufacturing and ethical business practices',
      cta: {
        primary: {
          label: 'Learn More',
          href: '/company/sustainability'
        }
      }
    },
    {
      id: 'global',
      type: 'image',
      src: '/assets/designer-2.jpg',
      title: 'Global Reach, Local Excellence',
      subtitle: 'Trusted Worldwide',
      description: 'Serving international brands with premium quality textiles from Chittagong',
      cta: {
        primary: {
          label: 'Contact Us',
          href: '/contact'
        }
      }
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Parallax Background Layers */}
      <ParallaxLayer
        className="absolute inset-0"
        offset={y}
        scale={scale}
        opacity={opacity}
      >
        <AnimatePresence mode="wait">
          {slides[currentSlide].type === 'video' ? (
            <VideoBackground
              key={slides[currentSlide].id}
              src={slides[currentSlide].src}
              mobileSrc={slides[currentSlide].mobileSrc}
              isMuted={isVideoMuted}
              isPaused={isVideoPaused}
            />
          ) : (
            <motion.picture
              key={slides[currentSlide].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <source
                media="(max-width: 768px)"
                srcSet={slides[currentSlide].mobileSrc || slides[currentSlide].src}
              />
              <img
                src={slides[currentSlide].src}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </motion.picture>
          )}
        </AnimatePresence>
      </ParallaxLayer>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />

      {/* Hero Content */}
      <HeroContent
        slide={slides[currentSlide]}
        opacity={opacity}
      />

      {/* Slide Controls */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative h-1 overflow-hidden bg-white/30 rounded-full w-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary-500 h-1"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: index === currentSlide ? 1 : 0,
                  width: index === currentSlide ? 40 : 8
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          ))}
        </div>

        {/* Video Controls */}
        {slides[currentSlide].type === 'video' && (
          <div className="flex gap-2 ml-4">
            <motion.button
              onClick={() => setIsVideoPaused(!isVideoPaused)}
              className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoPaused ?
                <Play className="w-4 h-4 text-white" /> :
                <Pause className="w-4 h-4 text-white" />
              }
            </motion.button>
            <motion.button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoMuted ?
                <VolumeX className="w-4 h-4 text-white" /> :
                <Volume2 className="w-4 h-4 text-white" />
              }
            </motion.button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
