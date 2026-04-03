import { Suspense } from "react";
import { InvestorMetricsSkeleton } from "../../../components/skeletons";
import { createIdleLazy } from "../../../hooks/useIdleLoader";

const InvestorMetricsContent = createIdleLazy(
  () => import("./InvestorMetricsContent"),
);

const InvestorMetrics = () => (
  <Suspense fallback={<InvestorMetricsSkeleton />}>
    <InvestorMetricsContent />
  </Suspense>
);

export default InvestorMetrics;
