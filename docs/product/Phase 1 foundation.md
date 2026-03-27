# 📦 Phase 1: Foundation Setup (Week 1)
*Setting up animation libraries and core utilities*

## Overview
This phase establishes the technical foundation for all dynamic enhancements. We'll install essential libraries, create reusable animation utilities, and set up performance monitoring.

## Tasks Checklist

### Day 1-2: Library Installation & Setup

#### 1.1 Install Core Animation Libraries
```bash
cd /Users/mac.alvi/Desktop/KTL Website/Version01/project
npm install framer-motion@11.0.3 
npm install react-intersection-observer@9.5.3
npm install @react-spring/web@9.7.3
npm install clsx@2.1.0
npm install react-use@17.4.2
```

#### 1.2 Install Development Dependencies
```bash
npm install --save-dev @types/react-intersection-observer
npm install --save-dev web-vitals@3.5.0
```

#### 1.3 Create Animation Utilities Directory
```bash
mkdir -p src/utils/animations
mkdir -p src/hooks/animations
mkdir -p src/components/ui
```

### Day 2-3: Create Core Animation Utilities

#### 1.4 Create Animation Constants
**File:** `src/utils/animations/constants.ts`
```typescript
export const ANIMATION_DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  dramatic: 0.7,
  epic: 1.0
} as const;

export const ANIMATION_EASING = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275]
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280
} as const;
```

#### 1.5 Create Scroll Trigger Hook
**File:** `src/hooks/animations/useScrollTrigger.ts`
```typescript
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export const useScrollTrigger = (options: UseScrollTriggerOptions = {}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: options.threshold || 0.1,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin || '0px'
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!options.triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, options.triggerOnce]);

  return { ref, controls, inView };
};
```

### Day 3-4: Skeleton Loading System

#### 1.6 Create Skeleton Component
**File:** `src/components/ui/Skeleton.tsx`
```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  className = '',
  variant = 'text',
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const animationVariants = {
    pulse: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    },
    wave: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
      animate={animation}
      variants={animationVariants}
    />
  );
};
```

#### 1.7 Create Product Card Skeleton
**File:** `src/components/ui/SkeletonProductCard.tsx`
```typescript
import React from 'react';
import { Skeleton } from './Skeleton';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className="card-ktl p-6">
      <Skeleton variant="circular" width={64} height={64} className="mx-auto mb-4" />
      <Skeleton variant="text" height={12} width="60%" className="mx-auto mb-2" />
      <Skeleton variant="text" height={20} width="80%" className="mx-auto mb-3" />
      <Skeleton variant="text" height={14} width="100%" className="mb-1" />
      <Skeleton variant="text" height={14} width="90%" />
    </div>
  );
};
```

### Day 4-5: Performance Monitoring Setup

#### 1.8 Create Performance Monitor Hook
**File:** `src/hooks/usePerformanceMonitor.ts`
```typescript
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  loadTime: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    loadTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      rafId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Measure page load time
    if (window.performance && window.performance.timing) {
      const loadTime = window.performance.timing.loadEventEnd - 
                      window.performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return metrics;
};
```

#### 1.9 Create Debug Panel (Development Only)
**File:** `src/components/ui/DebugPanel.tsx`
```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';

export const DebugPanel: React.FC = () => {
  const metrics = usePerformanceMonitor();
  
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>FPS: {metrics.fps}</div>
      <div>Load: {metrics.loadTime}ms</div>
      {metrics.memory && <div>Memory: {Math.round(metrics.memory / 1048576)}MB</div>}
    </motion.div>
  );
};
```

### Day 5: Integration & Testing

#### 1.10 Update App.tsx with Providers
**File:** Update `src/App.tsx`
```typescript
import { MotionConfig } from 'framer-motion';
import { DebugPanel } from './components/ui/DebugPanel';

// Add to App component
<MotionConfig reducedMotion="user">
  {/* Existing routes */}
  {process.env.NODE_ENV === 'development' && <DebugPanel />}
</MotionConfig>
```

#### 1.11 Create Test Page for Animations
**File:** `src/pages/test/AnimationTest.tsx`
```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../../hooks/animations/useScrollTrigger';
import { Skeleton } from '../../components/ui/Skeleton';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../../utils/animations/constants';

const AnimationTest: React.FC = () => {
  const { ref, controls } = useScrollTrigger();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Animation Test Page</h1>
      
      {/* Skeleton Loading Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Skeleton Loading</h2>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="circular" width={200} height={200} />
          <Skeleton variant="text" />
        </div>
      </section>

      {/* Scroll Trigger Demo */}
      <section className="mb-16 h-screen flex items-center">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: ANIMATION_DURATION.slow,
                ease: ANIMATION_EASING.easeOut
              }
            }
          }}
          className="bg-primary-500 text-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold">Scroll Triggered Animation</h2>
          <p>This appears when you scroll!</p>
        </motion.div>
      </section>
    </div>
  );
};

export default AnimationTest;
```

## Verification Checklist

- [ ] All dependencies installed successfully
- [ ] No TypeScript errors
- [ ] Animation utilities created and exported
- [ ] Skeleton components render correctly
- [ ] Scroll trigger hook works as expected
- [ ] Performance monitor shows FPS
- [ ] Debug panel appears in development
- [ ] Test page animations work smoothly

## Testing Commands

```bash
# Run development server
npm run dev

# Check TypeScript
npm run typecheck

# Check bundle size
npm run build
npm run preview

# Test animations at
# http://localhost:5173/test/animation
```

## Common Issues & Solutions

### Issue: Animations janky on scroll
**Solution:** Use `will-change` CSS property and GPU acceleration
```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

### Issue: Bundle size increased significantly
**Solution:** Use dynamic imports for animation libraries
```typescript
const FramerMotion = lazy(() => import('framer-motion'));
```

### Issue: Animations not triggering on mobile
**Solution:** Adjust intersection observer threshold
```typescript
useInView({
  threshold: 0.01, // Lower threshold for mobile
  rootMargin: '100px' // Larger margin for earlier trigger
});
```

## Next Steps

After completing Phase 1:
1. Verify all components work correctly
2. Test on multiple devices
3. Check performance metrics
4. Proceed to Phase 2: Hero & Statistics Enhancement

---

**Phase 1 Complete! ✅**

Ready to proceed to Phase 2? Run:
```bash
npm run dev
# Navigate to http://localhost:5173/test/animation
# Verify all animations work smoothly
```