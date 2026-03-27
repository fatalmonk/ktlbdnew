import { Suspense } from 'react';
import { CTASkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';

const CTASectionContent = createIdleLazy(() => import('./CTASectionContent'));

const CTASection = () => (
  <Suspense fallback={<CTASkeleton />}>
    <CTASectionContent />
  </Suspense>
);

export default CTASection;


