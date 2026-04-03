import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "../media/Image";
import { stripPortfolioAltPrefix } from "./portfolioAlt";

export type PortfolioGridItem = { src: string; alt: string };

type PortfolioImageGridProps = {
  items: PortfolioGridItem[];
  /** Suffix so `useId()`-based dialog ids stay unique when multiple grids mount */
  idSuffix?: string;
  /** Optional content below the grid (e.g. “View all products”) */
  footer?: ReactNode;
};

export function PortfolioImageGrid({
  items,
  idSuffix = "portfolio",
  footer,
}: PortfolioImageGridProps) {
  const baseId = useId();
  const dialogTitleId = `${baseId}-${idSuffix}-qv-title`;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const [quickViewIndex, setQuickViewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (quickViewIndex === null) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const focusId = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setQuickViewIndex(null);
        return;
      }
      if (items.length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setQuickViewIndex((i) =>
          i === null || i <= 0 ? items.length - 1 : i - 1,
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setQuickViewIndex((i) =>
          i === null || i >= items.length - 1 ? 0 : i + 1,
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(focusId);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusRef.current?.focus?.();
    };
  }, [quickViewIndex, items.length]);

  const closeQuickView = useCallback(() => setQuickViewIndex(null), []);

  const goQuickView = useCallback(
    (direction: "prev" | "next") => {
      if (quickViewIndex === null || items.length === 0) return;
      if (direction === "prev") {
        setQuickViewIndex(
          quickViewIndex > 0 ? quickViewIndex - 1 : items.length - 1,
        );
      } else {
        setQuickViewIndex(
          quickViewIndex < items.length - 1 ? quickViewIndex + 1 : 0,
        );
      }
    },
    [items.length, quickViewIndex],
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item, index) => (
          <figure
            key={`${idSuffix}-${index}-${item.src}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-200 shadow-sm ring-1 ring-black/5"
          >
            <button
              type="button"
              onClick={() => setQuickViewIndex(index)}
              className="relative block h-full w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label={`Quick view: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt=""
                className="pointer-events-none h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                fit="cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
            <figcaption className="sr-only">{item.alt}</figcaption>
          </figure>
        ))}
      </div>

      {footer ? (
        <div className="mt-10 text-center md:text-left">{footer}</div>
      ) : null}

      {quickViewIndex !== null &&
        items[quickViewIndex] &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
          >
            <button
              type="button"
              className="absolute inset-0 z-0 cursor-default border-0 bg-transparent"
              aria-label="Close preview"
              onClick={closeQuickView}
            />
            <div className="relative z-10 flex max-h-[min(92vh,1080px)] w-full max-w-5xl flex-col">
              <h2 id={dialogTitleId} className="sr-only">
                Portfolio image preview
              </h2>
              <div className="relative flex min-h-0 flex-1 items-center justify-center rounded-xl bg-neutral-950/40 p-2 shadow-2xl ring-1 ring-white/10 md:p-4">
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeQuickView}
                  className="absolute right-2 top-2 z-[2] rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-3 md:top-3"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goQuickView("prev");
                      }}
                      className="absolute left-1 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:left-2"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-7 w-7" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goQuickView("next");
                      }}
                      className="absolute right-1 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:right-2"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-7 w-7" aria-hidden />
                    </button>
                  </>
                ) : null}
                <Image
                  src={items[quickViewIndex].src}
                  alt={items[quickViewIndex].alt}
                  className="max-h-[min(85vh,960px)] max-w-full object-contain"
                  width={1200}
                  height={1200}
                  fit="contain"
                  priority
                  sizes="100vw"
                />
              </div>
              <p className="mt-3 line-clamp-2 px-1 text-center text-sm text-white/90 md:text-base">
                {stripPortfolioAltPrefix(items[quickViewIndex].alt)}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
