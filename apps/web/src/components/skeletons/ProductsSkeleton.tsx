import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const ProductsSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton
            variant="text"
            height={48}
            width="40%"
            className="mx-auto mb-4"
            aria-label="Loading products title"
          />
        </div>

        {/* Mobile skeleton: horizontal swipe row */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="w-[84vw] max-w-[28rem] shrink-0 rounded-xl bg-white overflow-hidden shadow-lg first:ml-1 last:mr-1"
            >
              <div className="mb-4">
                <Skeleton
                  variant="rectangular"
                  height={200}
                  width="100%"
                  aria-label={`Loading product ${index} image`}
                />
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="90%"
                    aria-label={`Loading product ${index} title`}
                  />
                </div>
                <div className="mb-2">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="100%"
                    aria-label={`Loading product ${index} description`}
                  />
                </div>
                <div className="mb-4">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="80%"
                    aria-label={`Loading product ${index} description`}
                  />
                </div>
                <Skeleton
                  variant="rectangular"
                  height={40}
                  width="100%"
                  className="rounded-lg"
                  aria-label={`Loading product ${index} button`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tablet/Desktop skeleton: existing grid */}
        <div className="hidden gap-10 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-14">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Image skeleton */}
              <div className="mb-4">
                <Skeleton
                  variant="rectangular"
                  height={200}
                  width="100%"
                  aria-label={`Loading product ${index} image`}
                />
              </div>

              {/* Content skeleton */}
              <div className="p-5 md:p-6 lg:p-8">
                {/* Title skeleton */}
                <div className="mb-3">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="90%"
                    aria-label={`Loading product ${index} title`}
                  />
                </div>

                {/* Description skeleton */}
                <div className="mb-2">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="100%"
                    aria-label={`Loading product ${index} description`}
                  />
                </div>
                <div className="mb-4">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="80%"
                    aria-label={`Loading product ${index} description`}
                  />
                </div>

                {/* Button skeleton */}
                <Skeleton
                  variant="rectangular"
                  height={40}
                  width="100%"
                  className="rounded-lg"
                  aria-label={`Loading product ${index} button`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View all button skeleton */}
        <div className="text-center mt-12">
          <Skeleton
            variant="rectangular"
            height={48}
            width={180}
            className="mx-auto rounded-lg"
            aria-label="Loading view all products button"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSkeleton;
