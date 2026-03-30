import { useState, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { createLazyIcon } from '@/lib/lucide-icons';

const Search = createLazyIcon('Search');
const Filter = createLazyIcon('Filter');
const Award = createLazyIcon('Award');
const TrendingUp = createLazyIcon('TrendingUp');
import CaseStudyCard from '../../components/case-studies/CaseStudyCard';
import SEO from '../../components/seo/SEO';
import SubpageHeader from '../../components/shared/SubpageHeader';
import { CaseStudy, CaseStudyFilterState } from '../../types/case-study';
import caseStudiesData from '../../data/case-studies/sample-data.json';

const CaseStudiesIndex = () => {
  const caseStudies = caseStudiesData as CaseStudy[];

  const [filters, setFilters] = useState<CaseStudyFilterState>({
    industry: '',
    product: '',
    searchQuery: '',
  });

  // Get unique industries and products for filters
  const industries = useMemo(() => {
    const allIndustries = caseStudies.flatMap((cs) => cs.industry);
    return Array.from(new Set(allIndustries)).sort();
  }, [caseStudies]);

  const productCategories = useMemo(() => {
    const allProducts = caseStudies.flatMap((cs) => cs.products);
    return Array.from(new Set(allProducts)).sort();
  }, [caseStudies]);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const matchesIndustry = !filters.industry || cs.industry.includes(filters.industry);
      const matchesProduct = !filters.product || cs.products.includes(filters.product);
      const matchesSearch =
        !filters.searchQuery ||
        cs.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        cs.challenge.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        cs.solution.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesIndustry && matchesProduct && matchesSearch;
    });
  }, [caseStudies, filters]);

  // Sort: featured first, then by date
  const sortedCaseStudies = useMemo(() => {
    return [...filteredCaseStudies].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [filteredCaseStudies]);

  const handleReset = () => {
    setFilters({
      industry: '',
      product: '',
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.industry || filters.product || filters.searchQuery;

  return (
    <>
      <SEO
        title="Success Stories & Case Studies | KTL"
        description="Discover how Kattali Textile Ltd has helped global brands achieve their manufacturing goals with quality, sustainability, and innovation."
        keywords={['textile case studies', 'manufacturing success stories', 'sustainable production', 'quality textile manufacturing']}
      />

      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Case Studies' },
        ]}
        pageTitle="Case Studies"
      />
      <div className="bg-neutral-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 pb-20 pt-10 text-white lg:pt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Client Success Stories
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Real results from real partnerships. See how we've helped global brands achieve their manufacturing goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{caseStudies.length}+</div>
                <div className="text-neutral-600 mt-1">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-neutral-600 mt-1">Global Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-neutral-600 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-neutral-600 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Suspense fallback={<div className="w-5 h-5" />}>
                <Filter size={20} className="text-neutral-600" />
              </Suspense>
              <h2 className="text-lg font-semibold text-neutral-900">Filter Case Studies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Suspense fallback={<div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5" />}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  </Suspense>
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  title="Filter by industry"
                  aria-label="Filter case studies by industry"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Product
                </label>
                <select
                  value={filters.product}
                  onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  title="Filter by product"
                  aria-label="Filter case studies by product"
                >
                  <option value="">All Products</option>
                  {productCategories.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters & Reset */}
            {hasActiveFilters && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  Showing {sortedCaseStudies.length} of {caseStudies.length} case studies
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Case Studies Grid */}
          {sortedCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCaseStudies.map((caseStudy, index) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Suspense fallback={<div className="w-12 h-12 mx-auto mb-4" />}>
                <Award size={48} className="mx-auto text-neutral-400 mb-4" />
              </Suspense>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No case studies found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your filters to see more results</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Suspense fallback={<div className="w-4.5 h-4.5" />}>
                  <Filter size={18} />
                </Suspense>
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Suspense fallback={<div className="w-12 h-12 mx-auto mb-6" />}>
              <TrendingUp size={48} className="mx-auto mb-6" />
            </Suspense>
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can help you achieve your manufacturing goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/rfq"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudiesIndex;

