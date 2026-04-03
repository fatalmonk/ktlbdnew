import { Suspense, lazy, useEffect, useState } from "react";
import { newsItems } from "../data/home";
import { partners } from "../data/partners";
import HeroSection from "../modules/home/components/HeroSection";
import HomeSEO from "../modules/home/components/HomeSEO";
import KeyPerformanceMetricsSection from "../modules/home/components/KeyPerformanceMetricsSection";
import ComplianceHighlightsStrip from "../modules/home/components/ComplianceHighlightsStrip";
import OperationHistoryStrip from "../modules/home/components/OperationHistoryStrip";

import {
  CTASkeleton,
  InvestorMetricsSkeleton,
  LogoCarouselSkeleton,
  NewsSkeleton,
  ProductsSkeleton,
  GetToKnowUsSkeleton,
} from "../components/skeletons";

/**
 * True async islands:
 * - We DO NOT import the components directly.
 * - They are dynamically imported using lazy().
 * - Rendering is delayed using requestIdleCallback.
 */

// BELOW-THE-FOLD COMPONENTS (LAZY)
const LazyProductsShowcase = lazy(
  () => import("../modules/home/components/ProductsShowcase"),
);
const LazyLogoCarousel = lazy(
  () => import("../modules/home/components/LogoCarouselSection"),
);
const LazyGetToKnowUsSection = lazy(
  () => import("../modules/home/components/GetToKnowUsSection"),
);
const LazyNews = lazy(() => import("../modules/home/components/NewsSection"));
const LazyCTA = lazy(() => import("../modules/home/components/CTASection"));
const LazyInvestorMetrics = lazy(
  () => import("../modules/home/components/InvestorMetrics"),
);

const Home = () => {
  const [canRenderIslands, setCanRenderIslands] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback to sleep until CPU is free
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setCanRenderIslands(true), { timeout: 300 });
    } else {
      // fallback
      setTimeout(() => setCanRenderIslands(true), 120);
    }
  }, []);

  return (
    <>
      <HomeSEO />
      <div
        className="overflow-x-hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* ------------------------------
             ABOVE THE FOLD (instant)
           ------------------------------ */}
        <HeroSection />
        <KeyPerformanceMetricsSection />
        <ComplianceHighlightsStrip />
        <OperationHistoryStrip />

        {/* ------------------------------
             BELOW THE FOLD (async islands)
           ------------------------------ */}

        {canRenderIslands && (
          <>
            <Suspense fallback={<ProductsSkeleton />}>
              <LazyProductsShowcase />
            </Suspense>

            <Suspense fallback={<LogoCarouselSkeleton />}>
              <LazyLogoCarousel partners={partners} />
            </Suspense>

            <Suspense fallback={<GetToKnowUsSkeleton />}>
              <LazyGetToKnowUsSection />
            </Suspense>

            <Suspense fallback={<NewsSkeleton />}>
              <LazyNews newsItems={newsItems} />
            </Suspense>

            <Suspense fallback={<CTASkeleton />}>
              <LazyCTA />
            </Suspense>

            <Suspense fallback={<InvestorMetricsSkeleton />}>
              <LazyInvestorMetrics />
            </Suspense>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
