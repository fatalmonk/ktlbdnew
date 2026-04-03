import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const LogoCarouselSkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-6 md:mb-12">
          <Skeleton
            variant="text"
            height={52}
            width="70%"
            className="mx-auto"
            aria-label="Loading logo carousel title"
          />
        </div>

        {/* Carousel container skeleton */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
          <div className="flex gap-8 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={140}
                height={80}
                className="flex-shrink-0"
                aria-label={`Loading logo ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSkeleton;
