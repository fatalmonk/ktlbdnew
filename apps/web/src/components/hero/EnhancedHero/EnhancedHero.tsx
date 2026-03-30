import { stockHero } from '@/data/stockImages';
import { createLazyIcon } from '@/lib/lucide-icons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from '../../media/Image';

const Play = createLazyIcon('Play');
const Pause = createLazyIcon('Pause');

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  brand: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Crossfade between hero photos (sync = incoming/outgoing overlap). */
const HERO_IMAGE_FADE = {
  duration: 0.75,
  ease: [0.4, 0, 0.2, 1] as const,
};

const SLIDES: HeroSlide[] = [
  {
    id: 'excellence',
    src: stockHero.manufacturing,
    alt: 'Kattali Textile Limited manufacturing team and operations',
    brand: 'Kattali Textile Limited',
    headline: 'Celebrate Quality Craftsmanship at KTL',
    ctaLabel: 'Learn More',
    ctaHref: '/company/our-story',
  },
  {
    id: 'sustainability',
    src: stockHero.fabric,
    alt: 'Sustainable apparel initiatives and production at KTL',
    brand: 'Kattali Textile Limited',
    headline: 'Sustainable Apparel Built for Global Brands',
    ctaLabel: 'Explore Sustainability',
    ctaHref: '/sustainability',
  },
  {
    id: 'global',
    src: stockHero.logistics,
    alt: 'Global textile partnerships and high-volume production capabilities',
    brand: 'Kattali Textile Limited',
    headline: 'Global Reach with Trusted Bangladesh Production',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  },
];

const EnhancedHero: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  // Track the live region announcement text separately so screen readers
  // pick up every change, even between identical headline strings.
  const [announcement, setAnnouncement] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  // FIXED: Static array — no dependencies, so useMemo adds no value.
  // Moved to module-level constant instead.
  const slides = SLIDES;

  const goToSlide = useCallback(
    (index: number, pauseAutoPlay = false) => {
      setCurrentSlide(index);
      setAnnouncement(`Slide ${index + 1} of ${slides.length}: ${slides[index].headline}`);
      if (pauseAutoPlay) setIsAutoPlay(false);
    },
    [slides]
  );

  const goToPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length, true);
  }, [currentSlide, goToSlide, slides.length]);

  const goToNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length, true);
  }, [currentSlide, goToSlide, slides.length]);

  // Keyboard navigation: left/right arrows when focus is inside the hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    section.addEventListener('keydown', handleKeyDown);
    return () => section.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        setAnnouncement(`Slide ${next + 1} of ${slides.length}: ${slides[next].headline}`);
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay, slides]);

  const activeSlide = slides[currentSlide];

  return (
    // tabIndex makes the section focusable so keyboard listeners fire reliably
    <section
      ref={sectionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Kattali Textile Limited highlights"
      className={
        isHome
          ? 'bg-white pb-6 pt-[calc(var(--site-header-height-mobile-with-ticker)+var(--home-hero-ticker-gap))] lg:pt-[var(--site-header-height-desktop-with-ticker)]'
          : 'bg-white pb-6 pt-[var(--site-header-height-mobile)] lg:pt-[var(--site-header-height-desktop)]'
      }
    >
      {/* Live region: announces slide changes to screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className="mx-auto w-full max-w-[1920px]">
        <div className="relative bg-white">

          {/*
            ─── MOBILE / TABLET (< lg) ───────────────────────────────────────────
            Full-bleed image that fills the viewport width and a fixed tall height.
            Text is overlaid directly on top of the image (no card, no white panel).
          */}
          <div className="relative px-5 sm:px-6 md:px-8 lg:hidden">
            {/* Inset image frame — horizontal margin from viewport edges on small screens */}
            <div
              className="relative w-full overflow-hidden rounded-br-2xl sm:rounded-br-3xl"
              style={{
                minHeight: '360px',
                height:
                  'calc((100svh - var(--site-header-height-mobile-with-ticker, 0px)) * 0.97)',
              }}
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={HERO_IMAGE_FADE}
                  className="absolute inset-0 z-10"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${currentSlide + 1} of ${slides.length}: ${activeSlide.headline}`}
                >
                  {/* Omit width/height so Image does not wrap in aspect-[16/9] — that shrinks the photo in tall mobile viewports */}
                  <Image
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    priority={currentSlide === 0}
                    eager={currentSlide === 0}
                    sizes="(max-width: 1023px) calc(100vw - 2.5rem), 100vw"
                    className="h-full w-full object-cover object-center opacity-80"
                    fit="cover"
                  />
                  {/* Gradient scrim so white text remains legible */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Text overlay — sits above the bottom edge so it reads higher on the hero */}
              <div className="absolute inset-x-0 bottom-[min(52vh,20rem)] z-20 px-7 pb-6 pt-2 sm:bottom-[min(50vh,22rem)] sm:px-8 sm:pb-7 md:bottom-[min(48vh,24rem)] md:px-10 md:pb-8">
                <span className="font-heading block w-fit text-[2.3rem] font-semibold leading-none tracking-tight text-[#0a1218] lowercase sm:text-[2.5rem]">
                  {activeSlide.brand}
                </span>

                {isHome ? (
                  <h1 className="mt-8 max-w-[14ch] text-[clamp(2.6rem,10vw,4.3rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white sm:mt-10">
                    {activeSlide.headline}
                  </h1>
                ) : (
                  <h2 className="mt-8 max-w-[14ch] text-[clamp(2.6rem,10vw,4.3rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white sm:mt-10">
                    {activeSlide.headline}
                  </h2>
                )}

                <Link
                  to={activeSlide.ctaHref}
                  className="mt-11 inline-flex w-fit items-center border-b border-black pb-0.5 text-[1.8rem] font-semibold text-black transition-colors hover:border-neutral-800 hover:text-neutral-800 sm:mt-12"
                >
                  {activeSlide.ctaLabel}
                </Link>
              </div>
            </div>
          </div>

          {/*
            ─── DESKTOP (≥ lg) ───────────────────────────────────────────────────
            Centered contained image (with rounded-br cutout) sitting inside a
            white canvas. White text panel overlaps from the left. Decorative
            wave pattern fills the exposed white area to the right of the image.
          */}
          <div className="relative hidden lg:block">
            <div className="relative px-6">
              <div className="relative min-h-[clamp(500px,50vw,700px)] min-w-0">
                {/* Contained image — narrower than full row, centered; text panel overlaps from left */}
                <div className="absolute inset-y-0 left-1/2 w-[68%] max-w-[1180px] min-w-0 -translate-x-1/2 bg-[#f7e9e3]">
                  <div className="absolute inset-0 min-h-0 overflow-hidden rounded-br-[220px]">
                    <AnimatePresence mode="sync" initial={false}>
                      <motion.div
                        key={activeSlide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={HERO_IMAGE_FADE}
                        className="absolute inset-0 z-10 min-h-0 min-w-0"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${currentSlide + 1} of ${slides.length}: ${activeSlide.headline}`}
                      >
                        <Image
                          src={activeSlide.src}
                          alt={activeSlide.alt}
                          priority={currentSlide === 0}
                          eager={currentSlide === 0}
                          sizes="(min-width: 1536px) min(68vw, 1180px), (min-width: 1024px) 68vw, 100vw"
                          className="h-full w-full object-cover object-center opacity-80"
                          fit="cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* White text panel — overlaps the left edge of the image */}
                <div className="absolute inset-y-0 left-0 z-20 flex w-[42%] flex-col justify-center bg-white px-8 py-10 xl:w-[38%] xl:px-10">
                  <span className="font-heading block w-fit text-[2.25rem] font-semibold leading-none tracking-tight text-[#0a1218] lowercase xl:text-[2.65rem]">
                    {activeSlide.brand}
                  </span>

                  {isHome ? (
                    <h1 className="mt-12 max-w-[10.8ch] text-[6.85rem] font-extrabold leading-[0.92] tracking-[-0.035em] text-black xl:mt-14 xl:text-[7.65rem]">
                      {activeSlide.headline}
                    </h1>
                  ) : (
                    <h2 className="mt-12 max-w-[10.8ch] text-[6.85rem] font-extrabold leading-[0.92] tracking-[-0.035em] text-black xl:mt-14 xl:text-[7.65rem]">
                      {activeSlide.headline}
                    </h2>
                  )}

                  <Link
                    to={activeSlide.ctaHref}
                    className="mt-20 inline-flex w-fit items-center border-b border-[#243a4f] pb-1 text-[1.6rem] font-semibold text-[#243a4f] transition-colors hover:border-primary-600 hover:text-primary-600 xl:mt-24"
                  >
                    {activeSlide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative diagonal stripe in the exposed white area bottom-right */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[36%]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(25deg, transparent 0 26px, rgba(243,212,90,0.92) 26px 30px, transparent 30px 58px), repeating-linear-gradient(155deg, transparent 0 24px, rgba(243,212,90,0.62) 24px 27px, transparent 27px 54px)',
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 px-5 pb-2 pt-6 sm:px-6 md:px-8 md:pt-7 lg:px-0">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#243a4f]"
            aria-label={isAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
          >
            <Suspense fallback={<span className="inline-block h-7 w-7" aria-hidden="true" />}>
              {isAutoPlay ? (
                <Pause className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Play className="h-7 w-7" aria-hidden="true" />
              )}
            </Suspense>
          </button>

          {/* Slide picker dots */}
          {/*
            FIXED: aria-current is for navigation landmarks (e.g. the current page link).
            For a selected tab/button state, aria-pressed is the correct attribute.
          */}
          <div role="group" aria-label="Slide controls" className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                aria-pressed={index === currentSlide}
                onClick={() => goToSlide(index, true)}
                className={`h-3.5 w-3.5 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#243a4f]' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;