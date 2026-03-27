import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const ArrowRight = createLazyIcon('ArrowRight');

const CTASectionContent = () => (
  <section className="py-8 md:py-16 lg:py-20 bg-primary-500">
    <div className="max-w-ktl mx-auto px-4 md:px-6 text-center">
      <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 lg:mb-6 leading-tight">
        Ready for Global Apparel Sourcing?
      </h2>
      <p className="text-sm md:text-base lg:text-xl text-neutral-700 mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
        Partner with us for premium quality textiles, ethical manufacturing, and reliable global
        delivery.{' '}
        <Link
          to="/contact"
          className="text-primary-600 hover:text-primary-700 font-medium underline min-h-[44px] inline-flex items-center"
        >
          Contact KTL
        </Link>{' '}
        today to discuss your sourcing needs.
      </p>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center min-h-[44px] md:min-h-[48px] bg-secondary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base lg:text-lg hover:bg-secondary-600 active:bg-secondary-700 transition-colors duration-200 group"
      >
        Contact Us Today
        <Suspense fallback={<div className="ml-2 w-4 h-4 md:w-5 md:h-5" />}>
          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </Suspense>
      </Link>
    </div>
  </section>
);

export default CTASectionContent;

