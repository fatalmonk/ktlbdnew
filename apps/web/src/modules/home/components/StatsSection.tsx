import { Suspense } from 'react';
import { StatisticsSkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';

const StatisticsSection = createIdleLazy(() => import('../../../components/shared/StatisticsSection'));

const StatsSection = () => (
  <Suspense fallback={<StatisticsSkeleton />}>
    <StatisticsSection />
  </Suspense>
);

export default StatsSection;
