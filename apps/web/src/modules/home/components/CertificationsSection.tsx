import { Suspense } from "react";
import { CertificationsSkeleton } from "../../../components/skeletons";
import { createIdleLazy } from "../../../hooks/useIdleLoader";
import type { HomeCertification } from "../../../data/home/certifications";

interface CertificationsSectionProps {
  certifications: HomeCertification[];
}

const CertificationsSectionContent = createIdleLazy(
  () => import("./CertificationsSectionContent"),
);

const CertificationsSection = ({
  certifications,
}: CertificationsSectionProps) => (
  <Suspense fallback={<CertificationsSkeleton />}>
    <CertificationsSectionContent certifications={certifications} />
  </Suspense>
);

export default CertificationsSection;
