import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Download,
  CheckCircle,
  TrendingUp,
  Award,
  Droplets,
  Users,
  Eye,
  TreePine,
  Leaf,
  Shield,
  Package,
  Star,
  Zap,
  DollarSign,
  Repeat,
  Sparkles,
  Sun,
  Recycle,
} from 'lucide-react';
import SEO from '../../components/seo/SEO';
import { CaseStudy } from '../../types/case-study';
import caseStudiesData from '../../data/case-studies/sample-data.json';

// Icon mapping for results
const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Clock,
  Award,
  Droplets,
  Leaf,
  Users,
  Eye,
  TreePine,
  CheckCircle,
  Star,
  Package,
  Shield,
  Zap,
  DollarSign,
  Repeat,
  Sparkles,
  Sun,
  Recycle,
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudies = caseStudiesData as CaseStudy[];
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: caseStudy.title,
          text: caseStudy.challenge,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy link. Please copy it manually.');
      }
    }
  };

  const handleDownload = () => {
    // In production, this would download a PDF version
    alert('PDF download feature coming soon!');
  };

  return (
    <>
      <SEO
        title={`${caseStudy.title} | Case Study | KTL`}
        description={caseStudy.challenge}
        keywords={[...caseStudy.industry, ...caseStudy.products, 'textile manufacturing case study']}
      />

      <div className="bg-neutral-50 min-h-screen">
        {/* Header/Back Button */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft size={18} />
              Back to Case Studies
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Industry Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {caseStudy.industry.map((industry) => (
                  <span
                    key={industry}
                    className="text-xs px-3 py-1 bg-blue-800 bg-opacity-50 text-blue-100 rounded-full"
                  >
                    {industry}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseStudy.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-blue-100 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {new Date(caseStudy.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{caseStudy.readTime} min read</span>
                </div>
              </div>

              <div className="text-lg text-blue-100">
                <strong>Client:</strong> {caseStudy.client}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">The Challenge</h2>
                <p className="text-neutral-700 text-lg leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Solution</h2>
                <p className="text-neutral-700 text-lg leading-relaxed">{caseStudy.solution}</p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">The Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {caseStudy.results.map((result) => {
                    const IconComponent = iconMap[result.icon] || Award;
                    return (
                      <div
                        key={result.metric}
                        className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-blue-600 mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-neutral-700">{result.metric}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-8 text-white"
                >
                  <div className="text-4xl mb-4 opacity-50">"</div>
                  <p className="text-xl italic mb-6 leading-relaxed">
                    {caseStudy.testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    {caseStudy.testimonial.avatar && (
                      <img
                        src={caseStudy.testimonial.avatar}
                        alt={caseStudy.testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{caseStudy.testimonial.author}</div>
                      <div className="text-blue-200 text-sm">
                        {caseStudy.testimonial.position}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Share & Download */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-6"
              >
                <h3 className="font-semibold text-neutral-900 mb-4">Share This Story</h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>
                </div>

                {/* Products Used */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-3">Products Involved</h4>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.products.map((product) => (
                      <Link
                        key={product}
                        to={`/products?filter=${product.toLowerCase()}`}
                        className="text-sm px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {product}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-3">Interested in Similar Results?</h4>
                  <Link
                    to="/rfq"
                    className="block w-full px-4 py-3 bg-green-600 text-white text-center rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        <section className="bg-white border-t border-neutral-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              More Success Stories
            </h2>
            <div className="flex justify-center">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Case Studies
                <ArrowLeft className="rotate-180" size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudyDetail;

