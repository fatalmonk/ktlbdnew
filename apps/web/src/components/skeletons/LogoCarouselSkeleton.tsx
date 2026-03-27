import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const LogoCarouselSkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-6 md:mb-12">
          <Skeleton
            variant="text"
            height={40}
            width="60%"
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
                width={120}
                height={60}
                className="flex-shrink-0"
                aria-label={`Loading logo ${index}`}
              />
            ))}
          </div>
        </div>
        
        {/* Footer text skeleton */}
        <div className="text-center mt-4 md:mt-8">
          <Skeleton
            variant="text"
            height={16}
            width="40%"
            className="mx-auto"
            aria-label="Loading footer text"
          />
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSkeleton;

