import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const GetToKnowUsSkeleton: React.FC = () => (
  <section
    className="bg-black py-20 md:py-28 lg:py-36"
    aria-busy="true"
    aria-label="Loading intro section"
  >
    <div className="mx-auto flex max-w-[1920px] flex-col items-center px-6">
      <div className="mx-auto w-full max-w-lg space-y-3">
        <Skeleton variant="text" height={56} width="75%" className="bg-neutral-700" />
        <Skeleton variant="text" height={24} width="35%" className="bg-neutral-700" />
        <Skeleton variant="text" height={48} width="55%" className="bg-neutral-700" />
        <Skeleton variant="text" height={48} width={160} className="mt-10 bg-neutral-600" />
      </div>
    </div>
  </section>
);

export default GetToKnowUsSkeleton;
