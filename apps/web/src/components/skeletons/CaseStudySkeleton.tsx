import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const CaseStudySkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <Skeleton
            variant="text"
            height={48}
            width="50%"
            className="mx-auto mb-4"
            aria-label="Loading case study title"
          />
          <Skeleton
            variant="text"
            height={24}
            width="70%"
            className="mx-auto"
            aria-label="Loading case study subtitle"
          />
        </div>

        {/* Content card skeleton */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side content skeleton */}
            <div className="p-8 md:p-12">
              <Skeleton
                variant="rectangular"
                width={120}
                height={28}
                className="mb-4 rounded-full"
                aria-label="Loading badge"
              />
              <Skeleton
                variant="text"
                height={32}
                width="90%"
                className="mb-4"
                aria-label="Loading case study heading"
              />
              <Skeleton
                variant="text"
                height={20}
                width="100%"
                className="mb-2"
                aria-label="Loading paragraph 1"
              />
              <Skeleton
                variant="text"
                height={20}
                width="95%"
                className="mb-2"
                aria-label="Loading paragraph 2"
              />
              <Skeleton
                variant="text"
                height={20}
                width="85%"
                className="mb-6"
                aria-label="Loading paragraph 3"
              />
              
              {/* Stats grid skeleton */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Skeleton
                    variant="text"
                    height={36}
                    width="60%"
                    className="mx-auto mb-2"
                    aria-label="Loading stat 1"
                  />
                  <Skeleton
                    variant="text"
                    height={16}
                    width="80%"
                    className="mx-auto"
                    aria-label="Loading stat label 1"
                  />
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Skeleton
                    variant="text"
                    height={36}
                    width="60%"
                    className="mx-auto mb-2"
                    aria-label="Loading stat 2"
                  />
                  <Skeleton
                    variant="text"
                    height={16}
                    width="80%"
                    className="mx-auto"
                    aria-label="Loading stat label 2"
                  />
                </div>
              </div>
              
              {/* Button skeleton */}
              <Skeleton
                variant="rectangular"
                width={200}
                height={48}
                className="rounded-lg"
                aria-label="Loading button"
              />
            </div>
            
            {/* Right side content skeleton */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center w-full">
                <Skeleton
                  variant="text"
                  height={72}
                  width="40%"
                  className="mx-auto mb-4 bg-white/20"
                  aria-label="Loading large number"
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="60%"
                  className="mx-auto bg-white/20"
                  aria-label="Loading description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySkeleton;

