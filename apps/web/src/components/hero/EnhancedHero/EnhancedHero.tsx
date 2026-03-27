import heroGlobal1x from '@/assets/images/hero/hero-global@1x.webp';
import heroMain1x from '@/assets/images/hero/hero-main@1x.webp';
import heroSustainability1x from '@/assets/images/hero/hero-sustainability@1x.webp';
import { createLazyIcon } from '@/lib/lucide-icons';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import { getOptimizedAnimationConfig } from '../../../lib/utils/mobile-performance';
import DotGrid from '../../DotGrid';
import Image from '../../media/Image';
import HeroContent from './HeroContent';
import ParallaxLayer from './ParallaxLayer';
import VideoBackground from './VideoBackground';

const ChevronDown = createLazyIcon('ChevronDown');
const Play = createLazyIcon('Play');
const Pause = createLazyIcon('Pause');
const Volume2 = createLazyIcon('Volume2');
const VolumeX = createLazyIcon('VolumeX');
const ArrowRight = createLazyIcon('ArrowRight');

interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  mobileSrc?: string;
  alt?: string;
  title: string;
  subtitle?: string;
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

  const animationConfig = getOptimizedAnimationConfig();
  const { scrollY } = useScroll();

  // Disable parallax transforms on mobile for better performance
  // Always create transforms (hooks must be called unconditionally)
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const yStatic = useTransform(scrollY, [0, 500], [0, 0]);
  const scaleParallax = useTransform(scrollY, [0, 500], [1, 1.1]);
  const scaleStatic = useTransform(scrollY, [0, 500], [1, 1]);

  const y = animationConfig.enableParallax ? yParallax : yStatic;
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = animationConfig.enableParallax ? scaleParallax : scaleStatic;

  const slides: HeroSlide[] = [
    {
      id: 'excellence',
      type: 'image',
      src: heroMain1x,
      mobileSrc: heroMain1x,
      title: 'Excellence in Textile Manufacturing',
      subtitle: 'Since 2002',
      description: 'Leading Bangladesh\'s garment industry with innovation, quality, and sustainable practices',
      alt: 'Kattali Textile Limited modern manufacturing facility in Chittagong, Bangladesh producing sustainable woven garments',
      cta: {
        primary: {
          label: 'Explore Products',
          href: '/products',
          icon: <Suspense fallback={<div className="w-5 h-5" />}><ArrowRight className="w-5 h-5" /></Suspense>
        },
        secondary: {
          label: 'Watch Video',
          href: '#video',
          icon: <Suspense fallback={<div className="w-5 h-5" />}><Play className="w-5 h-5" /></Suspense>
        }
      }
    },
    {
      id: 'sustainability',
      type: 'image',
      src: heroSustainability1x,
      mobileSrc: heroSustainability1x,
      title: 'Sustainable Fashion Forward',
      subtitle: 'Green Certified',
      description: 'Committed to eco-friendly manufacturing and ethical business practices',
      alt: 'Sustainable apparel manufacturing process with eco-friendly practices at Kattali Textile Limited',
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
      src: heroGlobal1x,
      mobileSrc: heroGlobal1x,
      title: 'Global Reach, Local Excellence',
      subtitle: 'Trusted Worldwide',
      description: 'Serving international brands with premium quality textiles from Chittagong',
      alt: 'Global apparel export services from Kattali Textile Limited serving international fashion brands',
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
    <section className="relative h-screen md:h-screen overflow-hidden bg-black" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {/* DotGrid Background Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <DotGrid
          dotSize={10}
          gap={36}
          baseColor="#FDD338"
          activeColor="#E11A2B"
          proximity={100}
          speedTrigger={70}
          shockRadius={180}
          shockStrength={3}
          maxSpeed={3500}
          resistance={850}
          returnDuration={1.3}
          className="!p-0"
          style={{ padding: 0, height: '100%', width: '100%' }}
        />
      </div>

      {/* Parallax Background Layers - Disabled on mobile for performance */}
      <ParallaxLayer
        className="absolute inset-0 z-[1]"
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
            <motion.div
              key={slides[currentSlide].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt || slides[currentSlide].title}
                priority={currentSlide === 0}
                eager={currentSlide === 0}
                sizes="100vw"
                className="w-full h-full object-cover"
                fit="cover"
                width={1920}
                height={1080}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ParallaxLayer>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-[2]" />

      {/* Hero Content */}
      <div className="relative z-[3] h-full">
        <HeroContent
          slide={slides[currentSlide]}
          opacity={opacity}
        />
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-3 md:gap-4">
        {/* Slide Indicators */}
        <div className="flex gap-2 md:gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative min-h-[44px] min-w-[44px] h-2 md:h-1 overflow-hidden bg-white/30 rounded-full w-10 md:w-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary-500 h-2 md:h-1"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: index === currentSlide ? 1 : 0,
                  width: index === currentSlide ? '100%' : '20%'
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          ))}
        </div>

        {/* Video Controls */}
        {slides[currentSlide].type === 'video' && (
          <div className="flex gap-3 md:gap-2 ml-3 md:ml-4">
            <motion.button
              onClick={() => setIsVideoPaused(!isVideoPaused)}
              className="min-w-[44px] min-h-[44px] w-11 h-11 md:w-8 md:h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isVideoPaused ? 'Play video' : 'Pause video'}
            >
              <Suspense fallback={<div className="w-5 h-5 md:w-4 md:h-4" />}>
                {isVideoPaused ?
                  <Play className="w-5 h-5 md:w-4 md:h-4 text-white" /> :
                  <Pause className="w-5 h-5 md:w-4 md:h-4 text-white" />
                }
              </Suspense>
            </motion.button>
            <motion.button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="min-w-[44px] min-h-[44px] w-11 h-11 md:w-8 md:h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
            >
              <Suspense fallback={<div className="w-5 h-5 md:w-4 md:h-4" />}>
                {isVideoMuted ?
                  <VolumeX className="w-5 h-5 md:w-4 md:h-4 text-white" /> :
                  <Volume2 className="w-5 h-5 md:w-4 md:h-4 text-white" />
                }
              </Suspense>
            </motion.button>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[4]"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-xs uppercase tracking-wider opacity-75">Scroll</span>
          <Suspense fallback={<div className="w-5 h-5 md:w-6 md:h-6" />}>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
