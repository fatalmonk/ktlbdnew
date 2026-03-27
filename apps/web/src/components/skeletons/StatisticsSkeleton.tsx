import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const StatisticsSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton
            variant="text"
            height={60}
            width="60%"
            className="mx-auto mb-4"
            aria-label="Loading statistics title"
          />
          <Skeleton
            variant="text"
            height={24}
            width="40%"
            className="mx-auto"
            aria-label="Loading statistics subtitle"
          />
        </div>

        {/* Statistics grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                {/* Icon skeleton */}
                <div className="relative mb-6">
                  <Skeleton
                    variant="circular"
                    width={80}
                    height={80}
                    className="mx-auto"
                    aria-label={`Loading statistic ${index} icon`}
                  />
                </div>

                {/* Counter skeleton */}
                <div className="text-center mb-4">
                  <Skeleton
                    variant="text"
                    height={48}
                    width="80%"
                    className="mx-auto"
                    aria-label={`Loading statistic ${index} value`}
                  />
                </div>

                {/* Label skeleton */}
                <div className="text-center mb-2">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="90%"
                    className="mx-auto"
                    aria-label={`Loading statistic ${index} label`}
                  />
                </div>

                {/* Description skeleton */}
                <div className="text-center mb-4">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="70%"
                    className="mx-auto"
                    aria-label={`Loading statistic ${index} description`}
                  />
                </div>

                {/* Progress bar skeleton */}
                <div className="mt-4">
                  <Skeleton
                    variant="rectangular"
                    height={4}
                    width="100%"
                    className="rounded-full"
                    aria-label={`Loading statistic ${index} progress bar`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSkeleton;
