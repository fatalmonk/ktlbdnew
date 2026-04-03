import { stockHero } from "@/data/stockImages";
import { createLazyIcon } from "@/lib/lucide-icons";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import Image from "../../media/Image";

const Play = createLazyIcon("Play");
const Pause = createLazyIcon("Pause");

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Soft ease-out — long deceleration for hero crossfades. */
const HERO_EASE = [0.16, 1, 0.28, 1] as const;
/** Horizontal drift (px) for right → left slide change (enter from right, exit to left). */
const HERO_SLIDE_X = 48;

const SLIDES: HeroSlide[] = [
  {
    id: "supply-chain",
    src: stockHero.logistics,
    alt: "Global logistics and garment supply chain operations at Kattali Textile Limited",
    headline: "Power your apparel production.",
    subline:
      "End-to-end garment manufacturing built for the demands of global trade.",
    ctaLabel: "Get in Touch →",
    ctaHref: "/contact",
  },
  {
    id: "trusted-brands",
    src: stockHero.manufacturing,
    alt: "Kattali Textile Limited manufacturing team and operations",
    headline: "Elevating garment manufacturing standards.",
    subline: "From first sample to final shipment, our standards never waver.",
    ctaLabel: "View Our Capabilities →",
    ctaHref: "/products",
  },
  {
    id: "sustainability",
    src: stockHero.fabric,
    alt: "Sustainable textile production and fabric at KTL",
    headline: "Woven with care. For people and planet.",
    subline:
      "Certified sustainable practices, ethical working conditions, and a commitment to a cleaner fashion industry.",
    ctaLabel: "Explore Sustainability →",
    ctaHref: "/sustainability",
  },
];

const EnhancedHero: React.FC = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  // Track the live region announcement text separately so screen readers
  // pick up every change, even between identical headline strings.
  const [announcement, setAnnouncement] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  // FIXED: Static array — no dependencies, so useMemo adds no value.
  // Moved to module-level constant instead.
  const slides = SLIDES;

  const goToSlide = useCallback(
    (index: number, pauseAutoPlay = false) => {
      setCurrentSlide(index);
      setAnnouncement(
        `Slide ${index + 1} of ${slides.length}: ${slides[index].headline}`,
      );
      if (pauseAutoPlay) setIsAutoPlay(false);
    },
    [slides],
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
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    section.addEventListener("keydown", handleKeyDown);
    return () => section.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        setAnnouncement(
          `Slide ${next + 1} of ${slides.length}: ${slides[next].headline}`,
        );
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay, slides]);

  const activeSlide = slides[currentSlide];

  const heroFade = reduceMotion
    ? { duration: 0.2 }
    : { duration: 1.2, ease: HERO_EASE };

  const imageMotionInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: HERO_SLIDE_X, scale: 1.02 };
  const imageMotionAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, scale: 1 };
  const imageMotionExit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: -HERO_SLIDE_X, scale: 1.012 };

  const copyMotionInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: HERO_SLIDE_X * 0.65 };
  const copyMotionAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0 };
  const copyMotionExit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: -HERO_SLIDE_X * 0.65 };

  return (
    // tabIndex makes the section focusable so keyboard listeners fire reliably
    <section
      ref={sectionRef}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Kattali Textile Limited highlights"
      className={
        isHome
          ? "bg-white pb-6 pt-[calc(var(--site-header-height-mobile-with-ticker)+var(--home-hero-ticker-gap))] lg:pt-[var(--site-header-height-desktop-with-ticker)]"
          : "bg-white pb-6 pt-[var(--site-header-height-mobile)] lg:pt-[var(--site-header-height-desktop)]"
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
          <div className="relative px-6 sm:px-8 md:px-10 lg:hidden">
            {/* Inset image frame — horizontal margin from viewport edges on small screens */}
            <div
              className="relative w-full overflow-hidden rounded-br-2xl sm:rounded-br-3xl"
              style={{
                minHeight: "360px",
                height:
                  "calc((100svh - var(--site-header-height-mobile-with-ticker, 0px)) * 0.97)",
              }}
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activeSlide.id}
                  initial={imageMotionInitial}
                  animate={imageMotionAnimate}
                  exit={imageMotionExit}
                  transition={heroFade}
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

              {/* Text overlay — bottom-weighted on the image; min-h headline slot limits vertical shift between slides */}
              <div className="absolute inset-x-0 bottom-[min(50vh,18rem)] z-20 px-8 pb-8 pt-2 sm:bottom-[min(48vh,20rem)] sm:px-10 sm:pb-9 md:bottom-[min(46vh,22rem)] md:px-12">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={activeSlide.id}
                    initial={copyMotionInitial}
                    animate={copyMotionAnimate}
                    exit={copyMotionExit}
                    transition={heroFade}
                    className="flex flex-col items-start text-left"
                  >
                    <div className="min-h-[3lh] max-w-[min(100%,36rem)]">
                      {isHome ? (
                        <h1 className="text-[clamp(2.6rem,10vw,4.3rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white">
                          {activeSlide.headline}
                        </h1>
                      ) : (
                        <h2 className="text-[clamp(2.6rem,10vw,4.3rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-white">
                          {activeSlide.headline}
                        </h2>
                      )}
                    </div>

                    <p className="mt-7 max-w-[min(100%,38rem)] text-[1.45rem] font-medium leading-snug text-white/90 sm:mt-8 sm:text-[1.5rem]">
                      {activeSlide.subline}
                    </p>

                    <Link
                      to={activeSlide.ctaHref}
                      className="mt-10 inline-flex w-fit items-center border-b border-black pb-0.5 text-[1.8rem] font-semibold text-black transition-colors hover:border-neutral-800 hover:text-neutral-800 sm:mt-12"
                    >
                      {activeSlide.ctaLabel}
                    </Link>
                  </motion.div>
                </AnimatePresence>
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
            <div className="relative px-8">
              <div className="relative min-h-[clamp(500px,50vw,700px)] min-w-0">
                {/* Contained image — narrower than full row, centered; text panel overlaps from left */}
                <div className="absolute inset-y-0 left-1/2 w-[68%] max-w-[1180px] min-w-0 -translate-x-1/2 bg-[#f7e9e3]">
                  <div className="absolute inset-0 min-h-0 overflow-hidden rounded-br-[220px]">
                    <AnimatePresence mode="sync" initial={false}>
                      <motion.div
                        key={activeSlide.id}
                        initial={imageMotionInitial}
                        animate={imageMotionAnimate}
                        exit={imageMotionExit}
                        transition={heroFade}
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

                {/* White text panel — top-aligned stack; copy slides right → left each change */}
                <div className="absolute inset-y-0 left-0 z-20 flex w-[42%] flex-col items-start justify-start bg-white px-10 pb-12 pt-24 text-left xl:w-[38%] xl:px-12 xl:pb-14 xl:pt-32">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={activeSlide.id}
                      initial={copyMotionInitial}
                      animate={copyMotionAnimate}
                      exit={copyMotionExit}
                      transition={heroFade}
                      className="flex w-full flex-col items-start text-left"
                    >
                      <div className="min-h-[3lh] max-w-[min(100%,48rem)] xl:min-h-[3.25lh]">
                        {isHome ? (
                          <h1 className="text-[clamp(3.25rem,4.2vw,6.85rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-black xl:text-[6.85rem]">
                            {activeSlide.headline}
                          </h1>
                        ) : (
                          <h2 className="text-[clamp(3.25rem,4.2vw,6.85rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-black xl:text-[6.85rem]">
                            {activeSlide.headline}
                          </h2>
                        )}
                      </div>

                      <p className="mt-10 max-w-[min(100%,40rem)] text-[1.45rem] leading-snug text-neutral-600 xl:mt-11 xl:text-[1.55rem]">
                        {activeSlide.subline}
                      </p>

                      <Link
                        to={activeSlide.ctaHref}
                        className="mt-12 inline-flex w-fit items-center border-b border-[#243a4f] pb-1 text-[1.6rem] font-semibold text-[#243a4f] transition-colors hover:border-primary-600 hover:text-primary-600 xl:mt-14"
                      >
                        {activeSlide.ctaLabel}
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Decorative diagonal stripe in the exposed white area (right of image) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[36%]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(25deg, transparent 0 26px, rgba(243,212,90,0.92) 26px 30px, transparent 30px 58px), repeating-linear-gradient(155deg, transparent 0 24px, rgba(243,212,90,0.62) 24px 27px, transparent 27px 54px)",
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 px-6 pb-3 pt-8 sm:px-8 md:px-10 md:pt-8 lg:px-0">
          {/* Play / Pause */}
          <button
            type="button"
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#243a4f]"
            aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
          >
            <Suspense
              fallback={
                <span className="inline-block h-7 w-7" aria-hidden="true" />
              }
            >
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
          <div
            role="group"
            aria-label="Slide controls"
            className="flex items-center gap-3"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                aria-pressed={index === currentSlide}
                onClick={() => goToSlide(index, true)}
                className={`h-3.5 w-3.5 rounded-full transition-colors ${
                  index === currentSlide ? "bg-[#243a4f]" : "bg-neutral-300"
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
