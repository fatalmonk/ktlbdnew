# 🎯 Phase 2: Hero & Statistics Enhancement (Week 2)
*Transform static sections into dynamic, engaging experiences*

## Overview
This phase focuses on creating an immersive hero section with parallax effects, video backgrounds, and advanced count-up animations for the statistics section.

## Tasks Checklist

### Day 1-2: Enhanced Hero Component

#### 2.1 Create Advanced Hero Component
**File:** `src/components/EnhancedHero/EnhancedHero.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useScrollTrigger } from '../../hooks/animations/useScrollTrigger';
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
      type: 'video',
      src: '/videos/factory-tour.mp4',
      mobileSrc: '/videos/factory-tour-mobile.mp4',
      title: 'Excellence in Textile Manufacturing',
      subtitle: 'Since 2002',
      description: 'Leading Bangladesh's garment industry with innovation, quality, and sustainable practices',
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
      src: '/assets-optimized/hero-sustainability.webp',
      mobileSrc: '/assets-optimized/hero-sustainability-mobile.webp',
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
      src: '/assets-optimized/hero-global.webp',
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

      {/* Animated Particles */}
      <ParticleField />

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
              className="relative h-1 overflow-hidden bg-white/30 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary-500"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: index === currentSlide ? 1 : 0,
                  width: index === currentSlide ? 40 : 8
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
              <div className={`w-${index === currentSlide ? '10' : '2'} h-1`} />
            </motion.button>
          ))}
        </div>

        {/* Video Controls */}
        {slides[currentSlide].type === 'video' && (
          <div className="flex gap-2 ml-4">
            <motion.button
              onClick={() => setIsVideoPaused(!isVideoPaused)}
              className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoPaused ? 
                <Play className="w-4 h-4 text-white" /> : 
                <Pause className="w-4 h-4 text-white" />
              }
            </motion.button>
            <motion.button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
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
```

#### 2.2 Create Hero Content Component
**File:** `src/components/EnhancedHero/HeroContent.tsx`
```typescript
import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from '../animations/SplitText';
import MagneticButton from '../ui/MagneticButton';

interface HeroContentProps {
  slide: any;
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

          {/* Title with Split Text Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <SplitText
              text={slide.title}
              className="leading-tight"
              delay={0.3}
            />
          </h1>

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
            <MagneticButton>
              <Link
                to={slide.cta.primary.href}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-black font-bold rounded-lg overflow-hidden"
              >
                <span className="relative z-10">{slide.cta.primary.label}</span>
                {slide.cta.primary.icon}
                <motion.div
                  className="absolute inset-0 bg-primary-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </MagneticButton>

            {slide.cta.secondary && (
              <MagneticButton>
                <Link
                  to={slide.cta.secondary.href}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-lg overflow-hidden"
                >
                  <span className="relative z-10">{slide.cta.secondary.label}</span>
                  {slide.cta.secondary.icon}
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroContent;
```

### Day 3-4: Advanced Statistics Animation

#### 2.3 Create Animated Counter Component
**File:** `src/components/AnimatedCounter/AnimatedCounter.tsx`
```typescript
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

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
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const animation = motionValue.animate(to, {
        duration,
        delay,
        onComplete
      });

      return animation.stop;
    }
  }, [isInView, hasAnimated, motionValue, to, duration, delay, onComplete]);

  const rounded = useTransform(motionValue, (value) => {
    return decimals > 0 
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
```

#### 2.4 Create Statistics Section with Staggered Animations
**File:** `src/components/StatisticsSection/StatisticsSection.tsx`
```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Settings, Package, Globe, Award } from 'lucide-react';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import { useScrollTrigger } from '../../hooks/animations/useScrollTrigger';

const StatisticsSection: React.FC = () => {
  const { ref, controls } = useScrollTrigger({ threshold: 0.2 });

  const stats = [
    {
      icon: Calendar,
      value: 20,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Established since 2002',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      value: 1200,
      suffix: '+',
      label: 'Skilled Employees',
      description: 'Dedicated professionals',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Settings,
      value: 680,
      suffix: '+',
      label: 'Advanced Machines',
      description: 'State-of-the-art equipment',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Package,
      value: 360,
      suffix: 'K+',
      label: 'Annual Production',
      description: 'Dozen capacity',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Globe,
      title: 'Global',
      label: 'Market Presence',
      description: 'Worldwide reach',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Certified',
      label: 'Quality Standards',
      description: 'International compliance',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary-500">Kattali Textile</span>
          </h2>
          <p className="text-xl text-gray-600">
            Numbers that speak for our excellence
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  backgroundImage: `linear-gradient(to right, ${stat.color})`
                }}
              />
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  {/* Floating particles around icon */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full"
                    animate={{ 
                      y: [-5, 5, -5],
                      x: [-5, 5, -5],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Animated Counter or Title */}
                <div className="text-center mb-4">
                  {stat.value !== undefined ? (
                    <div className="text-4xl font-bold text-gray-800">
                      <AnimatedCounter
                        to={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                        delay={index * 0.1}
                      />
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-800">
                      {stat.title}
                    </div>
                  )}
                </div>

                {/* Label and Description */}
                <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                  {stat.label}
                </h3>
                <p className="text-gray-500 text-center">
                  {stat.description}
                </p>

                {/* Progress bar animation */}
                {stat.value && (
                  <motion.div
                    className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.5,
                      duration: 1
                    }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.7,
                        duration: 1.5
                      }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
```

### Day 5: Integration and Polish

#### 2.5 Update Home.tsx with Enhanced Components
**File:** Update `src/pages/Home.tsx`
```typescript
import React, { Suspense, lazy } from 'react';
// ... other imports
import { HeroSkeleton } from '../components/skeletons/HeroSkeleton';

// Lazy load enhanced components
const EnhancedHero = lazy(() => import('../components/EnhancedHero/EnhancedHero'));
const StatisticsSection = lazy(() => import('../components/StatisticsSection/StatisticsSection'));

const Home: React.FC = () => {
  return (
    <>
      <SEO {/* ... existing SEO props */} />
      
      {/* Enhanced Hero with Suspense */}
      <Suspense fallback={<HeroSkeleton />}>
        <EnhancedHero />
      </Suspense>

      {/* Enhanced Statistics Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50" />}>
        <StatisticsSection />
      </Suspense>

      {/* Rest of the existing sections */}
    </>
  );
};

export default Home;
```

## Testing Checklist

- [ ] Hero video loads and plays smoothly
- [ ] Parallax scrolling works without jank
- [ ] Slide transitions are smooth
- [ ] Video controls work properly
- [ ] Statistics counters animate on scroll
- [ ] All animations run at 60fps
- [ ] Mobile responsiveness maintained
- [ ] Fallback images load for mobile

## Performance Metrics

Target metrics after Phase 2:
- **FCP**: < 2s
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Hero animation FPS**: 60fps consistent

## Next Phase

Ready for Phase 3: Products & Partners Enhancement

---

**Phase 2 Complete! ✅**

---