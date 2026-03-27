import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useScrollTrigger } from '../../../hooks/animations/useScrollTrigger';
import {
  fadeInUpTransition,
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '../animations';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ValuesSectionContentProps {
  values: ValueItem[];
}

const ValuesSectionContent = ({ values }: ValuesSectionContentProps) => {
  const valuesHeadingRef = useScrollTrigger({ threshold: 0.2 });
  const valuesRef = useScrollTrigger({ threshold: 0.2 });

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
      <motion.div
        ref={valuesHeadingRef.ref}
        animate={valuesHeadingRef.controls}
        initial="hidden"
        variants={fadeInUpVariants}
        transition={fadeInUpTransition}
        className="text-center mb-8 md:mb-12 max-w-ktl mx-auto px-4 md:px-6"
      >
        <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold mb-2 md:mb-4 leading-tight">
          Our <span className="text-primary-500">Values</span>
        </h2>
        <p className="text-sm md:text-base lg:text-xl text-neutral-600 mb-2 md:mb-4 leading-relaxed">
          What drives us forward
        </p>
        <p className="text-xs md:text-sm lg:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed px-2">
          As a leading{' '}
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700 font-medium underline min-h-[44px] inline-flex items-center"
          >
            woven garment supplier in Bangladesh
          </Link>
          , we combine innovation with ethical practices. Our commitment to{' '}
          <Link
            to="/company/sustainability"
            className="text-primary-600 hover:text-primary-700 font-medium underline min-h-[44px] inline-flex items-center"
          >
            sustainable textile manufacturing
          </Link>{' '}
          ensures quality products from our{' '}
          <Link
            to="/facilities/rmg"
            className="text-primary-600 hover:text-primary-700 font-medium underline min-h-[44px] inline-flex items-center"
          >
            modern garment manufacturing facility
          </Link>{' '}
          in Chittagong.
        </p>
      </motion.div>

      <motion.div
        ref={valuesRef.ref}
        animate={valuesRef.controls}
        initial="hidden"
        variants={staggerContainerVariants}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-4 md:px-6"
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            variants={staggerItemVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4">
              <value.icon className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h3 className="text-xs md:text-lg lg:text-xl font-semibold text-neutral-800 mb-1 md:mb-2 leading-snug">
              {value.title}
            </h3>
            <p className="text-xs md:text-sm lg:text-base text-neutral-600 leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ValuesSectionContent;

