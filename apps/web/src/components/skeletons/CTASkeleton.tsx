import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const CTASkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-primary-500">
      <div className="max-w-ktl mx-auto px-4 md:px-6 text-center">
        <Skeleton
          variant="text"
          height={48}
          width="70%"
          className="mx-auto mb-3 md:mb-4 lg:mb-6"
          aria-label="Loading CTA title"
        />
        <Skeleton
          variant="text"
          height={24}
          width="90%"
          className="mx-auto mb-2 md:mb-4 lg:mb-6"
          aria-label="Loading CTA description line 1"
        />
        <Skeleton
          variant="text"
          height={24}
          width="85%"
          className="mx-auto mb-4 md:mb-6 lg:mb-8"
          aria-label="Loading CTA description line 2"
        />
        <Skeleton
          variant="rectangular"
          width={200}
          height={48}
          className="mx-auto rounded-lg"
          aria-label="Loading CTA button"
        />
      </div>
    </section>
  );
};

export default CTASkeleton;

