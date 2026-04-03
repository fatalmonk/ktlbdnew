import React from "react";
import { Skeleton } from "../ui/Skeleton";

const CertificationsSkeleton: React.FC = () => {
  return (
    <section className="w-full bg-neutral-50 py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-ktl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16 lg:mb-20">
          <Skeleton
            variant="text"
            height={56}
            width="55%"
            className="mx-auto max-w-md md:h-16 lg:h-[4.5rem]"
            aria-label="Loading certifications title"
          />
        </div>

        <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-200/90 shadow-sm">
          <div className="grid grid-cols-1 gap-px bg-neutral-200/90 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <div
                key={index}
                className="min-w-0 bg-white p-10 md:p-12 lg:p-14"
              >
                <Skeleton
                  variant="rectangular"
                  height={228}
                  width="100%"
                  className="rounded-xl"
                  aria-label={`Loading certification ${index} logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSkeleton;
