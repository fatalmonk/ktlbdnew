import { Suspense } from "react";
import { LogoCarouselSkeleton } from "../../../components/skeletons";
import { createIdleLazy } from "../../../hooks/useIdleLoader";
import type { Partner } from "../../../types/partner";

interface LogoCarouselSectionProps {
  partners: Partner[];
}

const LogoCarouselSectionContent = createIdleLazy(
  () => import("./LogoCarouselSectionContent"),
);

const LogoCarouselSection = ({ partners }: LogoCarouselSectionProps) => (
  <Suspense fallback={<LogoCarouselSkeleton />}>
    <LogoCarouselSectionContent partners={partners} />
  </Suspense>
);

export default LogoCarouselSection;
