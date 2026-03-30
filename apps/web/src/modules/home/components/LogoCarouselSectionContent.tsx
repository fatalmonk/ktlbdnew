import { motion } from 'framer-motion';
import EnhancedLogoCarousel from '../../../components/product/EnhancedLogoCarousel';
import type { PartnerLogo } from '../../../types/partner';
import { useScrollTrigger } from '../../../hooks/animations/useScrollTrigger';
import { fadeInUpVariants, fadeInUpTransition } from '../animations';

interface LogoCarouselSectionContentProps {
  partners: PartnerLogo[];
}

const LogoCarouselSectionContent = ({ partners }: LogoCarouselSectionContentProps) => {
  const logoRef = useScrollTrigger({ threshold: 0.2 });

  return (
    <section className="bg-white py-12 md:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <motion.div
          ref={logoRef.ref}
          animate={logoRef.controls}
          initial="hidden"
          variants={fadeInUpVariants}
          transition={fadeInUpTransition}
          className="mb-24 text-center"
        >
          <h2 className="font-heading text-5xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
            Partnering with <span className="text-primary-500">global brands</span>
          </h2>
        </motion.div>
        <div className="rounded-xl bg-white p-6 shadow-lg md:rounded-2xl md:p-10 lg:p-12">
          <EnhancedLogoCarousel partners={partners} speed={20} />
        </div>
      </div>
    </section>
  );
};

export default LogoCarouselSectionContent;

