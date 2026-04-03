import React from "react";
import { Skeleton } from "../ui/Skeleton";

const InvestorMetricsSkeleton: React.FC = () => {
  return (
    <section className="py-6 md:py-12 lg:py-18 xl:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center">
          {/* Left Column skeleton */}
          <div className="md:col-span-7 lg:col-span-7 space-y-2 md:space-y-3 lg:space-y-4">
            <Skeleton
              variant="text"
              height={40}
              width="60%"
              aria-label="Loading investor snapshot title"
            />
            <Skeleton
              variant="text"
              height={20}
              width="80%"
              aria-label="Loading investor data line 1"
            />
            <Skeleton
              variant="text"
              height={20}
              width="70%"
              aria-label="Loading investor data line 2"
            />
            <Skeleton
              variant="text"
              height={20}
              width="40%"
              aria-label="Loading investor relations link"
            />
          </div>

          {/* Right Column skeleton */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="flex justify-center md:justify-end items-center min-h-[100px] md:min-h-[200px] lg:min-h-[300px]">
              <Skeleton
                variant="text"
                height={120}
                width="200px"
                aria-label="Loading metric display"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorMetricsSkeleton;
