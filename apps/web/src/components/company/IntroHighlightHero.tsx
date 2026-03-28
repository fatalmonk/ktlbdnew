import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from '../media/Image';
import { cn } from '@/lib/utils';

export type IntroHighlightBreadcrumbItem = {
  label: string;
  to?: string;
};

export type IntroHighlightSlide = {
  src: string;
  alt: string;
};

export type IntroHighlightHeroProps = {
  breadcrumbItems: IntroHighlightBreadcrumbItem[];
  pageTitle: string;
  /** Plain first line(s), then pairs of highlighted lines (matches multi-line “marker” hero pattern). */
  headlineLines: {
    text: string;
    highlight?: boolean;
  }[];
  slides: IntroHighlightSlide[];
  sliderAriaLabel?: string;
  autoplayMs?: number;
  className?: string;
};

function MarkerText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline px-0.5">
      <span
        className="absolute inset-x-0 bottom-[0.12em] top-[58%] -z-0 bg-primary-300"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function BannerAccent() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 top-0 z-0 hidden w-[33%] min-w-[200px] overflow-hidden lg:block"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 right-0 h-full w-full text-neutral-800/10"
        viewBox="0 0 480 904"
        preserveAspectRatio="xMaxYMid slice"
      >
        <path
          fill="currentColor"
          d="M480 0v904H280c40-120 80-280 100-452C400 280 360 120 320 0h160z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.35"
          d="M480 120v784H360c20-200 60-400 120-600v-184z"
        />
      </svg>
    </div>
  );
}

const IntroHighlightHero = ({
  breadcrumbItems,
  pageTitle,
  headlineLines,
  slides,
  sliderAriaLabel = 'Page introduction images',
  autoplayMs = 5000,
  className,
}: IntroHighlightHeroProps) => {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = slides.length;
  const canNavigate = count > 1;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!canNavigate || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [canNavigate, count, autoplayMs, reducedMotion]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  return (
    <div className={cn('bg-white font-body', className)}>
      <nav
        className="relative z-[1] border-b border-transparent px-4 pb-2 pt-6 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="mx-auto flex max-w-ktl flex-wrap items-center gap-x-2 gap-y-1 text-body-lg text-neutral-600">
          {breadcrumbItems.map((item, i) => {
            const isLast = i === breadcrumbItems.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
                {i > 0 && <span className="text-neutral-400">/</span>}
                {isLast ? (
                  <span className="font-semibold text-neutral-900">{item.label}</span>
                ) : item.to ? (
                  <Link to={item.to} className="hover:text-neutral-900">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="relative px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-ktl">
          <h1 className="font-heading text-h1 font-bold tracking-tight text-neutral-900">{pageTitle}</h1>
        </div>
      </div>

      <section className="relative overflow-hidden px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <BannerAccent />

        <div className="relative z-[1] mx-auto max-w-ktl">
          <h2 className="font-heading relative z-[1] max-w-[31.25rem] pb-8 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-[4.0625rem] md:leading-[0.95] md:tracking-[-0.04em]">
            {headlineLines.map((line, i) => (
              <span key={`${line.text}-${i}`} className="block">
                {line.highlight ? <MarkerText>{line.text}</MarkerText> : line.text}
              </span>
            ))}
          </h2>

          <div
            className="relative w-full overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label={sliderAriaLabel}
          >
            <div className="relative aspect-[1400/544] w-full max-h-[min(70vh,544px)]">
              {slides.map((slide, i) => (
                <div
                  key={slide.src + slide.alt}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500 ease-out',
                    i === index ? 'z-[1] opacity-100' : 'z-0 opacity-0',
                  )}
                  aria-hidden={i !== index}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    fit="cover"
                    priority={i === 0}
                    eager={i === 0}
                    sizes="100vw"
                    width={1400}
                    height={544}
                  />
                </div>
              ))}
            </div>

            {canNavigate && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-40 shadow-md transition-opacity hover:opacity-90 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:left-4"
                  aria-label="Previous slide"
                  onClick={() => go(-1)}
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 opacity-40 shadow-md transition-opacity hover:opacity-90 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:right-4"
                  aria-label="Next slide"
                  onClick={() => go(1)}
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroHighlightHero;
