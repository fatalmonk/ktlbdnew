import React from "react";
import { Skeleton } from "../ui/Skeleton";

const ValuesSkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
      <div className="max-w-ktl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <Skeleton
            variant="text"
            height={48}
            width="40%"
            className="mx-auto mb-2 md:mb-4"
            aria-label="Loading values title"
          />
          <Skeleton
            variant="text"
            height={24}
            width="30%"
            className="mx-auto mb-2 md:mb-4"
            aria-label="Loading values subtitle"
          />
          <Skeleton
            variant="text"
            height={20}
            width="80%"
            className="mx-auto"
            aria-label="Loading values description"
          />
        </div>

        {/* Values grid skeleton */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-4 md:px-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-md"
            >
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                className="mx-auto mb-2 md:mb-4"
                aria-label={`Loading value ${index} icon`}
              />
              <Skeleton
                variant="text"
                height={24}
                width="80%"
                className="mx-auto mb-1 md:mb-2"
                aria-label={`Loading value ${index} title`}
              />
              <Skeleton
                variant="text"
                height={16}
                width="90%"
                className="mx-auto"
                aria-label={`Loading value ${index} description`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSkeleton;
