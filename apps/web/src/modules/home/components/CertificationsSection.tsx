import { Suspense } from 'react';
import { CertificationsSkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';

interface Certification {
  name: string;
  description: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSectionContent = createIdleLazy(() => import('./CertificationsSectionContent'));

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => (
  <Suspense fallback={<CertificationsSkeleton />}>
    <CertificationsSectionContent certifications={certifications} />
  </Suspense>
);

export default CertificationsSection;


