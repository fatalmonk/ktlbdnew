import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';
import { useScrollTrigger } from '../../../hooks/animations/useScrollTrigger';

const Shield = createLazyIcon('Shield');
import {
  fadeInUpTransition,
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '../animations';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

interface TestimonialsSectionContentProps {
  testimonials: Testimonial[];
}

const TestimonialsSectionContent = ({ testimonials }: TestimonialsSectionContentProps) => {
  const testimonialsHeadingRef = useScrollTrigger({ threshold: 0.2 });
  const testimonialsRef = useScrollTrigger({ threshold: 0.2 });

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <motion.div
        ref={testimonialsHeadingRef.ref}
        animate={testimonialsHeadingRef.controls}
        initial="hidden"
        variants={fadeInUpVariants}
        transition={fadeInUpTransition}
        className="text-center mb-8 md:mb-12 max-w-ktl mx-auto px-4 md:px-6"
      >
        <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold mb-2 md:mb-4 leading-tight">
          What Our <span className="text-primary-500">Clients Say</span>
        </h2>
        <p className="text-sm md:text-base lg:text-xl text-neutral-600 leading-relaxed">
          Trusted by global brands
        </p>
      </motion.div>

      <motion.div
        ref={testimonialsRef.ref}
        animate={testimonialsRef.controls}
        initial="hidden"
        variants={staggerContainerVariants}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 md:px-6"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={`${testimonial.author}-${testimonial.position}`}
            variants={staggerItemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            className="bg-neutral-50 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex gap-1 mb-3 md:mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Suspense key={i} fallback={<div className="w-4 h-4 md:w-5 md:h-5" />}>
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary-500 fill-current" />
                </Suspense>
              ))}
            </div>
            <p className="text-sm md:text-base text-neutral-700 mb-3 md:mb-4 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="border-t pt-3 md:pt-4">
              <p className="font-semibold text-xs md:text-sm lg:text-base text-neutral-800">
                {testimonial.author}
              </p>
              <p className="text-xs md:text-sm text-neutral-600">{testimonial.position}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSectionContent;
