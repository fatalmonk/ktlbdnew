import { Suspense } from 'react';
import { CaseStudySkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';

const CaseStudyHighlightContent = createIdleLazy(() => import('./CaseStudyHighlightContent'));

const CaseStudyHighlight = () => (
  <Suspense fallback={<CaseStudySkeleton />}>
    <CaseStudyHighlightContent />
  </Suspense>
);

export default CaseStudyHighlight;


