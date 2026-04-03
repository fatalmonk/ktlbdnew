import React from "react";
import { PORTFOLIO_GRID_COUNT } from "../../data/portfolioGallery";
import { Skeleton } from "../ui/Skeleton";

const ProductsSkeleton: React.FC = () => {
  return (
    <section className="bg-neutral-50 py-28 md:py-36" aria-busy="true">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14 md:text-left">
          <Skeleton
            variant="text"
            height={14}
            width={100}
            className="mx-auto mb-3 md:mx-0"
            aria-label="Loading portfolio label"
          />
          <Skeleton
            variant="text"
            height={48}
            width="55%"
            className="mx-auto md:mx-0"
            aria-label="Loading portfolio title"
          />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={44}
              width={112}
              className="rounded-full"
              aria-label={`Loading category ${i}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
          {Array.from({ length: PORTFOLIO_GRID_COUNT }, (_, i) => (
            <div key={i} className="aspect-square">
              <Skeleton
                variant="rectangular"
                className="h-full w-full rounded-xl"
                width="100%"
                height="100%"
                aria-label={`Loading gallery tile ${i + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:text-left">
          <Skeleton
            variant="text"
            height={20}
            width={140}
            className="mx-auto md:mx-0"
            aria-label="Loading view all products link"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSkeleton;
