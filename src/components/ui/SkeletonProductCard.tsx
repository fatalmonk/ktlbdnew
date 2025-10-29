import React from 'react';
import { Skeleton } from './Skeleton';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className="card-ktl p-6" role="article" aria-label="Loading product information">
      <Skeleton variant="circular" width={64} height={64} className="mx-auto mb-4" aria-label="Loading product icon" />
      <Skeleton variant="text" height={12} width="60%" className="mx-auto mb-2" aria-label="Loading category" />
      <Skeleton variant="text" height={20} width="80%" className="mx-auto mb-3" aria-label="Loading product name" />
      <Skeleton variant="text" height={14} width="100%" className="mb-1" aria-label="Loading description" />
      <Skeleton variant="text" height={14} width="90%" aria-label="Loading description" />
    </div>
  );
};
