import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const NewsSkeleton: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-ktl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-8 md:mb-16">
          <Skeleton
            variant="text"
            height={48}
            width="30%"
            className="mx-auto"
            aria-label="Loading news title"
          />
        </div>

        {/* News cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Image skeleton */}
              <div className="aspect-video">
                <Skeleton
                  variant="rectangular"
                  height="100%"
                  width="100%"
                  aria-label={`Loading news ${index} image`}
                />
              </div>
              
              {/* Content skeleton */}
              <div className="p-4 md:p-6">
                {/* Date skeleton */}
                <div className="mb-2 md:mb-3">
                  <Skeleton
                    variant="rectangular"
                    height={16}
                    width={120}
                    className="rounded"
                    aria-label={`Loading news ${index} date`}
                  />
                </div>
                
                {/* Title skeleton */}
                <div className="mb-2 md:mb-3">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="100%"
                    aria-label={`Loading news ${index} title`}
                  />
                </div>
                <div className="mb-3 md:mb-4">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="80%"
                    aria-label={`Loading news ${index} title continuation`}
                  />
                </div>
                
                {/* Excerpt skeleton */}
                <div className="mb-2">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="100%"
                    aria-label={`Loading news ${index} excerpt`}
                  />
                </div>
                <div className="mb-2">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="90%"
                    aria-label={`Loading news ${index} excerpt`}
                  />
                </div>
                <div className="mb-3 md:mb-4">
                  <Skeleton
                    variant="text"
                    height={16}
                    width="70%"
                    aria-label={`Loading news ${index} excerpt`}
                  />
                </div>
                
                {/* Read more link skeleton */}
                <Skeleton
                  variant="rectangular"
                  height={20}
                  width={100}
                  className="rounded"
                  aria-label={`Loading news ${index} read more link`}
                />
              </div>
            </article>
          ))}
        </div>

        {/* View all button skeleton */}
        <div className="text-center mt-12">
          <Skeleton
            variant="rectangular"
            height={48}
            width={160}
            className="mx-auto rounded-lg"
            aria-label="Loading view all news button"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsSkeleton;

