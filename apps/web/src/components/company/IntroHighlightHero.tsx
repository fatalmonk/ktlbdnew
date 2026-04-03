import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "../media/Image";
import SubpageHeader, {
  type SubpageBreadcrumbItem,
} from "../shared/SubpageHeader";
import { cn } from "@/lib/utils";

export type IntroHighlightBreadcrumbItem = SubpageBreadcrumbItem;

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
  /** Replaces default stacked headline below `lg` (e.g. custom line breaks). Desktop still uses `headlineLines`. */
  headlineMobileSlot?: ReactNode;
};

export function MarkerText({ children }: { children: ReactNode }) {
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

/** Yellow interlocking lines — desktop hero, beside headline (reference: editorial / Macy’s-style). */
function HeadlineSideAccent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none hidden shrink-0 self-start lg:flex lg:min-h-[14rem] lg:w-[min(42%,22rem)] lg:max-w-md lg:justify-end lg:ml-auto lg:-translate-y-3 lg:translate-x-10 xl:w-[min(38%,26rem)] xl:-translate-y-4 xl:translate-x-16 2xl:translate-x-24",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 280"
        className="h-auto w-full max-w-[min(100%,320px)] text-primary-300"
        fill="none"
      >
        <path
          d="M20 40 C60 10 100 10 140 40 S220 70 280 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M40 90 C90 50 150 50 200 90 S280 130 300 90"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20 140 C80 100 160 100 220 140 S300 180 300 140"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M60 200 C120 160 200 160 260 200"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M180 60 Q240 20 280 80 T260 160"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M100 220 Q160 180 220 220"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
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
  sliderAriaLabel = "Page introduction images",
  autoplayMs = 5000,
  className,
  headlineMobileSlot,
}: IntroHighlightHeroProps) => {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = slides.length;
  const canNavigate = count > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
    <div className={cn("bg-white font-body", className)}>
      <SubpageHeader breadcrumbItems={breadcrumbItems} pageTitle={pageTitle} />

      <section className="relative overflow-hidden px-4 pb-8 pt-2 sm:px-6 lg:px-8">
        <div className="relative z-[1] mb-14 flex w-full flex-col gap-6 sm:mb-16 lg:mb-24 lg:flex-row lg:items-start lg:gap-8">
          <h2 className="font-heading w-full max-w-none text-left text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl md:text-[4.5rem] md:leading-[0.97] md:tracking-[-0.04em] lg:max-w-[48%] lg:shrink-0 lg:text-[5rem] lg:leading-[0.93] xl:text-[5.5rem] 2xl:text-[6rem]">
            {headlineMobileSlot ? (
              <>
                <span className="lg:hidden">{headlineMobileSlot}</span>
                <span className="hidden lg:contents">
                  {headlineLines.map((line, i) => (
                    <span key={`${line.text}-lg-${i}`} className="block">
                      {line.highlight ? (
                        <MarkerText>{line.text}</MarkerText>
                      ) : (
                        line.text
                      )}
                    </span>
                  ))}
                </span>
              </>
            ) : (
              headlineLines.map((line, i) => (
                <span key={`${line.text}-${i}`} className="block">
                  {line.highlight ? (
                    <MarkerText>{line.text}</MarkerText>
                  ) : (
                    line.text
                  )}
                </span>
              ))
            )}
          </h2>
          <HeadlineSideAccent />
        </div>

        <div className="relative z-[1] mx-auto max-w-ktl">
          <BannerAccent />
          <div
            className="relative w-full overflow-hidden"
            {...(canNavigate
              ? {
                  role: "region" as const,
                  "aria-roledescription": "carousel",
                  "aria-label": sliderAriaLabel,
                }
              : { "aria-label": sliderAriaLabel })}
          >
            <div className="relative aspect-[1400/544] w-full max-h-[min(70vh,544px)]">
              {canNavigate ? (
                slides.map((slide, i) => (
                  <div
                    key={slide.src + slide.alt}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 ease-out",
                      i === index ? "z-[1] opacity-100" : "z-0 opacity-0",
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
                ))
              ) : (
                <Image
                  src={slides[0].src}
                  alt={slides[0].alt}
                  className="h-full w-full object-cover"
                  fit="cover"
                  priority
                  eager
                  sizes="100vw"
                  width={1400}
                  height={544}
                />
              )}
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
