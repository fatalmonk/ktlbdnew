import { Suspense } from 'react';
import { ValuesSkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';
import type { LucideIcon } from 'lucide-react';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: ValueItem[];
}

const ValuesSectionContent = createIdleLazy(() => import('./ValuesSectionContent'));

const ValuesSection = ({ values }: ValuesSectionProps) => (
  <Suspense fallback={<ValuesSkeleton />}>
    <ValuesSectionContent values={values} />
  </Suspense>
);

export default ValuesSection;


