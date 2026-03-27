import { motion } from 'framer-motion';
import EnhancedLogoCarousel from '../../../components/product/EnhancedLogoCarousel';
import type { Partner } from '../../../types/partner';
import { useScrollTrigger } from '../../../hooks/animations/useScrollTrigger';
import { fadeInUpVariants, fadeInUpTransition } from '../animations';

interface LogoCarouselSectionContentProps {
  partners: Partner[];
}

const LogoCarouselSectionContent = ({ partners }: LogoCarouselSectionContentProps) => {
  const logoRef = useScrollTrigger({ threshold: 0.2 });

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          ref={logoRef.ref}
          animate={logoRef.controls}
          initial="hidden"
          variants={fadeInUpVariants}
          transition={fadeInUpTransition}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold text-black leading-tight">
            Partnering with <span className="text-primary-500">global brands</span>
          </h2>
        </motion.div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
          <EnhancedLogoCarousel partners={partners} speed={20} />
        </div>
        <p className="text-center text-xs md:text-sm text-neutral-800 mt-4 md:mt-8">
          Trusted by <span className="font-semibold text-primary-500">leading global brands</span>
        </p>
      </div>
    </section>
  );
};

export default LogoCarouselSectionContent;

