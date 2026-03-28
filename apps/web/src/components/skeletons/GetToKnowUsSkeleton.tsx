import React from 'react';
import { Skeleton } from '../ui/Skeleton';

const GetToKnowUsSkeleton: React.FC = () => (
  <section className="bg-white pt-24 pb-16 md:pt-[200px] md:pb-[120px]" aria-busy="true" aria-label="Loading intro section">
    <div className="mx-auto max-w-[1440px] px-5">
      <Skeleton variant="text" height={35} width={240} className="mb-12" aria-label="Loading heading" />
      <div className="relative min-h-[7.5rem] md:min-h-[120px]">
        <Skeleton variant="text" height={36} width="100%" className="mb-3 md:hidden" />
        <Skeleton variant="text" height={48} width="95%" className="hidden md:block mb-3" />
        <Skeleton variant="text" height={48} width="88%" className="hidden md:block" />
      </div>
    </div>
  </section>
);

export default GetToKnowUsSkeleton;
