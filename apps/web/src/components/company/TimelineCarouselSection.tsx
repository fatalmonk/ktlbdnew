import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from '../media/Image';
import { cn } from '@/lib/utils';

export type TimelineCarouselItem = {
  year: string;
  title: string;
  description: string;
  /** Optional image shown as cover in the lower portion of the card (capture-style). */
  imageSrc?: string;
  imageAlt?: string;
};

export type TimelineCarouselSectionProps = {
  sectionTitle: string;
  subtitle: string;
  items: TimelineCarouselItem[];
  className?: string;
};

function perPageForWidth(width: number): number {
  if (width <= 480) return 1;
  if (width <= 768) return 2;
  if (width <= 1024) return 3;
  return 4;
}

const TimelineCarouselSection = ({
  sectionTitle,
  subtitle,
  items,
  className,
}: TimelineCarouselSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState(4);
  const [pageIndex, setPageIndex] = useState(0);
  const progressId = useId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setPerPage(perPageForWidth(el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, items.length - perPage);

  useEffect(() => {
    setPageIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex, perPage]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setPageIndex((i) => {
        const next = i + dir * perPage;
        if (next < 0) return 0;
        if (next > maxIndex) return maxIndex;
        return next;
      });
    },
    [maxIndex, perPage],
  );

  const progress =
    maxIndex <= 0 ? 100 : Math.min(100, ((pageIndex + 1) / (maxIndex + 1)) * 100);

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < maxIndex;

  if (items.length === 0) return null;

  const trackWidthPercent = (items.length / perPage) * 100;
  const translatePercent = -(pageIndex / items.length) * 100;

  return (
    <section
      className={cn('bg-primary-300 py-16 text-neutral-900 md:py-24 lg:py-[7.5rem]', className)}
      aria-labelledby={`${progressId}-heading`}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
        <h2
          id={`${progressId}-heading`}
          className="font-heading text-[1.5625rem] font-bold leading-tight tracking-tight"
        >
          {sectionTitle}
        </h2>

        <header className="mt-12 max-w-[39rem] px-0 sm:px-1">
          <h3 className="font-heading text-[2.8125rem] font-normal leading-[1.33] tracking-tight text-neutral-900">
            {subtitle}
          </h3>
        </header>

        <div className="relative mt-6" ref={containerRef}>
          <div className="relative overflow-hidden pb-2">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                width: `${trackWidthPercent}%`,
                transform: `translateX(${translatePercent}%)`,
              }}
              role="list"
            >
              {items.map((item, i) => (
                <article
                  key={`${item.year}-${i}`}
                  className="box-border flex shrink-0 flex-col"
                  style={{ width: `${100 / items.length}%` }}
                  role="listitem"
                >
                  <div className="font-heading text-[2.8125rem] font-normal leading-none tracking-tight">
                    {item.year}
                  </div>
                  <div className="mt-4 flex min-h-[20rem] flex-1 flex-col justify-between bg-neutral-900 text-white md:min-h-[28rem] lg:min-h-[32.5rem]">
                    <div className="px-8 pb-6 pt-12 md:px-12">
                      <p className="mb-6 font-heading text-lg font-normal leading-relaxed tracking-tight text-primary-300">
                        {item.title}
                      </p>
                      <p className="text-[1.5625rem] font-normal leading-[1.4] tracking-tight text-white">
                        {item.description}
                      </p>
                    </div>
                    {item.imageSrc ? (
                      <div className="relative min-h-[10rem] w-full flex-1 md:min-h-[12rem]">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt ?? ''}
                          className="absolute inset-0 h-full w-full object-cover"
                          fit="cover"
                          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
                          width={400}
                          height={280}
                        />
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 md:left-4">
            <button
              type="button"
              className={cn(
                'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
                !canPrev && 'cursor-not-allowed opacity-30',
              )}
              aria-label="Previous slides"
              disabled={!canPrev}
              onClick={() => go(-1)}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
          <div className="pointer-events-none absolute right-3 top-1/2 z-[1] -translate-y-1/2 md:right-4">
            <button
              type="button"
              className={cn(
                'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900',
                !canNext && 'cursor-not-allowed opacity-30',
              )}
              aria-label="Next slides"
              disabled={!canNext}
              onClick={() => go(1)}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          className="mx-auto mt-16 h-[3px] max-w-[1440px] bg-neutral-900"
          aria-hidden
        >
          <div
            className="h-full bg-white transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Timeline position"
          />
        </div>
      </div>
    </section>
  );
};

export default TimelineCarouselSection;
