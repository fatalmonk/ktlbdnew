import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const ArrowRight = createLazyIcon('ArrowRight');
const Calendar = createLazyIcon('Calendar');
const Clock = createLazyIcon('Clock');
import { CaseStudy } from '../../types/case-study';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

const CaseStudyCard = ({ caseStudy, index = 0 }: CaseStudyCardProps) => {
  const delay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/case-studies/${caseStudy.slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-neutral-200">
          {caseStudy.images.length > 0 ? (
            <img
              src={caseStudy.images[0]}
              alt={caseStudy.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-4xl font-bold text-blue-200">KTL</div>
            </div>
          )}
          {caseStudy.featured && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Industry Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {caseStudy.industry.slice(0, 3).map((industry) => (
              <span
                key={industry}
                className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full"
              >
                {industry}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {caseStudy.title}
          </h3>

          {/* Client */}
          <p className="text-sm text-neutral-600 mb-3">
            Client: <span className="font-semibold">{caseStudy.client}</span>
          </p>

          {/* Challenge Preview */}
          <p className="text-neutral-700 mb-4 line-clamp-3">
            {caseStudy.challenge}
          </p>

          {/* Key Results */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {caseStudy.results.slice(0, 2).map((result) => (
              <div key={result.metric} className="text-center p-3 bg-neutral-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{result.value}</div>
                <div className="text-xs text-neutral-600 mt-1 line-clamp-2">{result.metric}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <Suspense fallback={<div className="w-3.5 h-3.5" />}>
                  <Calendar size={14} />
                </Suspense>
                <span>{new Date(caseStudy.publishDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Suspense fallback={<div className="w-3.5 h-3.5" />}>
                  <Clock size={14} />
                </Suspense>
                <span>{caseStudy.readTime} min read</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
              <span>Read More</span>
              <Suspense fallback={<div className="w-4 h-4" />}>
                <ArrowRight size={16} />
              </Suspense>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CaseStudyCard;

