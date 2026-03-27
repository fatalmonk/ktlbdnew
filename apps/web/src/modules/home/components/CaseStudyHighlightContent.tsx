import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const ArrowRight = createLazyIcon('ArrowRight');

const CaseStudyHighlightContent = () => (
  <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Client <span className="text-blue-600">Success Stories</span>
        </h2>
        <p className="text-lg text-neutral-600">
          See how we've helped global brands achieve their manufacturing goals
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Featured Case Study
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Scaling Production by 320% for Premium European Brand
            </h3>
            <p className="text-neutral-700 mb-6">
              A leading European fashion retailer needed to scale sustainable denim production while
              maintaining strict quality standards and OEKO-TEX certification.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">320%</div>
                <div className="text-sm text-neutral-600">Capacity Increase</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-neutral-600">On-Time Delivery</div>
              </div>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Success Stories
              <Suspense fallback={<div className="w-4 h-4" />}>
                <ArrowRight size={18} />
              </Suspense>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 flex items-center justify-center">
            <div className="text-white">
              <div className="text-6xl font-bold mb-4 text-center">500+</div>
              <div className="text-xl text-center">Successful Projects Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CaseStudyHighlightContent;

