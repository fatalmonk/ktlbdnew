import { Suspense, lazy, useEffect, useState } from 'react';
import { certifications, newsItems, testimonials, values } from '../data/home';
import { partners } from '../data/partners';
import { featuredProducts } from '../data/products';
import HeroSection from '../modules/home/components/HeroSection';
import HomeSEO from '../modules/home/components/HomeSEO';

import {
  CTASkeleton,
  CaseStudySkeleton,
  CertificationsSkeleton,
  InvestorMetricsSkeleton,
  LogoCarouselSkeleton,
  NewsSkeleton,
  ProductsSkeleton,
  GetToKnowUsSkeleton,
  StatisticsSkeleton,
  TestimonialsSkeleton,
  ValuesSkeleton,
} from '../components/skeletons';

/**
 * True async islands:
 * - We DO NOT import the components directly.
 * - They are dynamically imported using lazy().
 * - Rendering is delayed using requestIdleCallback.
 */

// BELOW-THE-FOLD COMPONENTS (LAZY)
const LazyStatsSection = lazy(() => import('../modules/home/components/StatsSection'));
const LazyGetToKnowUsSection = lazy(() => import('../modules/home/components/GetToKnowUsSection'));
const LazyProductsShowcase = lazy(() => import('../modules/home/components/ProductsShowcase'));
const LazyCaseStudy = lazy(() => import('../modules/home/components/CaseStudyHighlight'));
const LazyLogoCarousel = lazy(() => import('../modules/home/components/LogoCarouselSection'));
const LazyValuesSection = lazy(() => import('../modules/home/components/ValuesSection'));
const LazyTestimonials = lazy(() => import('../modules/home/components/TestimonialsSection'));
const LazyCertifications = lazy(() => import('../modules/home/components/CertificationsSection'));
const LazyNews = lazy(() => import('../modules/home/components/NewsSection'));
const LazyInvestorMetrics = lazy(() => import('../modules/home/components/InvestorMetrics'));
const LazyCTA = lazy(() => import('../modules/home/components/CTASection'));

const Home = () => {
  const [canRenderIslands, setCanRenderIslands] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback to sleep until CPU is free
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setCanRenderIslands(true), { timeout: 300 });
    } else {
      // fallback
      setTimeout(() => setCanRenderIslands(true), 120);
    }
  }, []);

  return (
    <>
      <HomeSEO />
      <div className="overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* ------------------------------
             ABOVE THE FOLD (instant)
           ------------------------------ */}
        <HeroSection />

        {/* ------------------------------
             BELOW THE FOLD (async islands)
           ------------------------------ */}

        {canRenderIslands && (
          <>
            <Suspense fallback={<StatisticsSkeleton />}>
              <LazyStatsSection />
            </Suspense>

            <Suspense fallback={<GetToKnowUsSkeleton />}>
              <LazyGetToKnowUsSection />
            </Suspense>

            <Suspense fallback={<ProductsSkeleton />}>
              <LazyProductsShowcase products={featuredProducts} />
            </Suspense>

            <Suspense fallback={<CaseStudySkeleton />}>
              <LazyCaseStudy />
            </Suspense>

            <Suspense fallback={<LogoCarouselSkeleton />}>
              <LazyLogoCarousel partners={partners} />
            </Suspense>

            <Suspense fallback={<ValuesSkeleton />}>
              <LazyValuesSection values={values} />
            </Suspense>

            <Suspense fallback={<TestimonialsSkeleton />}>
              <LazyTestimonials testimonials={testimonials} />
            </Suspense>

            <Suspense fallback={<CertificationsSkeleton />}>
              <LazyCertifications certifications={certifications} />
            </Suspense>

            <Suspense fallback={<NewsSkeleton />}>
              <LazyNews newsItems={newsItems} />
            </Suspense>

            <Suspense fallback={<InvestorMetricsSkeleton />}>
              <LazyInvestorMetrics />
            </Suspense>

            <Suspense fallback={<CTASkeleton />}>
              <LazyCTA />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
};

export default Home;