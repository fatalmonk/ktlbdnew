import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const CertificationsSkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-ktl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-6 md:mb-8 lg:mb-16">
          <Skeleton
            variant="text"
            height={48}
            width="50%"
            className="mx-auto"
            aria-label="Loading certifications title"
          />
        </div>

        {/* Certifications grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg text-center"
            >
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                className="mx-auto mb-2 md:mb-3 lg:mb-4"
                aria-label={`Loading certification ${index} icon`}
              />
              <Skeleton
                variant="text"
                height={24}
                width="60%"
                className="mx-auto mb-1 md:mb-2 lg:mb-3"
                aria-label={`Loading certification ${index} name`}
              />
              <Skeleton
                variant="text"
                height={16}
                width="80%"
                className="mx-auto"
                aria-label={`Loading certification ${index} description`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSkeleton;

