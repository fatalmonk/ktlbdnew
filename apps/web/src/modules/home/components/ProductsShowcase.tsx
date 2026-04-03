import {
  useCallback,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { Link } from "react-router-dom";
import { PortfolioImageGrid } from "../../../components/portfolio/PortfolioImageGrid";
import {
  getPortfolioGridImages,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryId,
} from "../../../data/portfolioGallery";

const ProductsShowcase = () => {
  const baseId = useId();
  const [category, setCategory] = useState<PortfolioCategoryId>("denims");
  const items = useMemo(() => getPortfolioGridImages(category), [category]);

  const handleTabListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const len = PORTFOLIO_CATEGORIES.length;
      const i = PORTFOLIO_CATEGORIES.findIndex((c) => c.id === category);
      if (i < 0) return;

      let next = i;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next = (i + 1) % len;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        next = (i - 1 + len) % len;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = len - 1;
      } else {
        return;
      }

      const nextCat = PORTFOLIO_CATEGORIES[next];
      if (!nextCat) return;
      setCategory(nextCat.id);
      document.getElementById(`${baseId}-tab-${nextCat.id}`)?.focus();
    },
    [baseId, category],
  );

  return (
    <section
      className="bg-neutral-50 py-28 md:py-36"
      id="products"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14 md:text-left">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 md:text-xs">
            Portfolio
          </p>
          <h2
            id={`${baseId}-heading`}
            className="font-heading text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
          >
            Our <span className="text-primary-500">Works</span>
          </h2>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-2 md:justify-start"
          role="tablist"
          aria-label="Portfolio categories"
          onKeyDown={handleTabListKeyDown}
        >
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const selected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${cat.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setCategory(cat.id)}
                className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                  selected
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${category}`}
        >
          <PortfolioImageGrid
            key={category}
            items={items}
            idSuffix={category}
            footer={
              <Link
                to="/products"
                className="text-sm font-semibold text-primary-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                View all products
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
