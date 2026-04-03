import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CertificationsSkeleton: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-neutral-50">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-24">
          <Skeleton
            variant="text"
            height={72}
            width="60%"
            className="mx-auto max-w-2xl"
            aria-label="Loading certifications title"
          />
        </div>

        {/* Certifications grid skeleton */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-8 xl:gap-x-8 xl:gap-y-10 2xl:gap-x-10 2xl:gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div
              key={index}
              className="flex items-center justify-center px-2 py-2 sm:py-3 md:px-3 md:py-4 lg:px-4 lg:py-5"
            >
              <Skeleton
                variant="rectangular"
                height={144}
                width="100%"
                className="mx-auto max-w-[160px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-none"
                aria-label={`Loading certification ${index} logo`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSkeleton;
