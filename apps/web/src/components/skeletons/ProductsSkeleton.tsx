import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const ProductsSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
      <div className="max-w-ktl mx-auto px-4 md:px-6">
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

        {/* Product cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              <div className="p-4 md:p-6">
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

