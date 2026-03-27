import { Suspense } from 'react';
import { TestimonialsSkeleton } from '../../../components/skeletons';
import { createIdleLazy } from '../../../hooks/useIdleLoader';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSectionContent = createIdleLazy(() => import('./TestimonialsSectionContent'));

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => (
  <Suspense fallback={<TestimonialsSkeleton />}>
    <TestimonialsSectionContent testimonials={testimonials} />
  </Suspense>
);

export default TestimonialsSection;


