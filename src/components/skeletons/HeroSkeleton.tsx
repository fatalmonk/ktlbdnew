import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      {/* Background skeleton */}
      <div className="absolute inset-0">
        <Skeleton
          variant="rectangular"
          height="100%"
          className="w-full"
          aria-label="Loading hero background"
        />
      </div>

      {/* Gradient overlay skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content skeleton */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Subtitle skeleton */}
            <div className="mb-4">
              <Skeleton
                variant="rectangular"
                height={40}
                width={120}
                className="rounded-full"
                aria-label="Loading subtitle"
              />
            </div>

            {/* Title skeleton */}
            <div className="mb-6">
              <Skeleton
                variant="text"
                height={80}
                width="90%"
                className="mb-2"
                aria-label="Loading title"
              />
              <Skeleton
                variant="text"
                height={80}
                width="70%"
                aria-label="Loading title continuation"
              />
            </div>

            {/* Description skeleton */}
            <div className="mb-8">
              <Skeleton
                variant="text"
                height={24}
                width="100%"
                className="mb-2"
                aria-label="Loading description"
              />
              <Skeleton
                variant="text"
                height={24}
                width="85%"
                className="mb-2"
                aria-label="Loading description"
              />
              <Skeleton
                variant="text"
                height={24}
                width="60%"
                aria-label="Loading description"
              />
            </div>

            {/* CTA buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton
                variant="rectangular"
                height={56}
                width={180}
                className="rounded-lg"
                aria-label="Loading primary button"
              />
              <Skeleton
                variant="rectangular"
                height={56}
                width={160}
                className="rounded-lg"
                aria-label="Loading secondary button"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators skeleton */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={4}
              width={32}
              className="rounded-full"
              aria-label={`Loading slide indicator ${i}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator skeleton */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-2">
          <Skeleton
            variant="text"
            height={12}
            width={40}
            aria-label="Loading scroll text"
          />
          <Skeleton
            variant="rectangular"
            height={24}
            width={24}
            className="rounded"
            aria-label="Loading scroll arrow"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
