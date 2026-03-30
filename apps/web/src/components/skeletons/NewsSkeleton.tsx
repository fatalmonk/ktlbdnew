import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const NewsSkeleton: React.FC = () => {
  return (
    <section className="bg-neutral-50 py-16 md:py-24" aria-busy="true" aria-label="Loading news">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-neutral-300 pb-4 md:pb-6">
          <Skeleton variant="text" height={64} width={320} className="rounded" />
          <Skeleton variant="text" height={32} width={96} className="rounded" />
        </div>

        <div className="mt-6 grid grid-cols-1 border border-neutral-200 bg-white md:grid-cols-2 md:mt-8">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 border-neutral-200 p-5 sm:flex-row sm:gap-6 sm:p-6 md:p-8 ${
                index < 3 ? 'border-b' : ''
              } ${index % 2 === 0 ? 'md:border-r' : ''} ${index < 2 ? 'md:border-b' : ''}`}
            >
              <Skeleton
                variant="rectangular"
                className="h-[180px] w-full shrink-0 sm:h-auto sm:w-[220px] sm:max-w-[280px]"
                aria-hidden
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <Skeleton variant="rectangular" height={30} width={88} className="rounded" />
                  <Skeleton variant="rectangular" height={30} width={112} className="rounded" />
                </div>
                <Skeleton variant="text" height={36} width="100%" />
                <Skeleton variant="text" height={36} width="92%" />
                <Skeleton variant="text" height={24} width={180} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSkeleton;
