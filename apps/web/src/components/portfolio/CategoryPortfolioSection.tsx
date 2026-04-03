import { useId, type ReactNode } from "react";
import {
  PortfolioImageGrid,
  type PortfolioGridItem,
} from "./PortfolioImageGrid";

const defaultTitle = (
  <>
    Sample <span className="text-primary-500">styles</span>
  </>
);

type CategoryPortfolioSectionProps = {
  items: PortfolioGridItem[];
  /** Unique id fragment for accessibility and dialog ids */
  gridIdSuffix: string;
  description: string;
  title?: ReactNode;
};

export function CategoryPortfolioSection({
  items,
  gridIdSuffix,
  description,
  title = defaultTitle,
}: CategoryPortfolioSectionProps) {
  const headingId = `${useId()}-${gridIdSuffix}-portfolio`;

  return (
    <section
      className="bg-neutral-50 py-16 md:py-24 lg:py-28"
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12 md:text-left">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 md:text-xs">
            Portfolio
          </p>
          <h2
            id={headingId}
            className="font-heading text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-600 md:mt-5 md:text-lg">
            {description}
          </p>
        </div>
        <PortfolioImageGrid items={items} idSuffix={gridIdSuffix} />
      </div>
    </section>
  );
}

/** Horizontal rhythm aligned with home portfolio section */
export const CATEGORY_PAGE_SHELL =
  "mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8";

/** Inline links — matches home “View all products” treatment */
export const CATEGORY_INLINE_LINK =
  "font-semibold text-primary-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40";

export const CATEGORY_FEATURE_GRID =
  "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8";

export const CATEGORY_FEATURE_CARD =
  "rounded-xl bg-neutral-50 p-6 shadow-sm ring-1 ring-black/5 md:p-8";
