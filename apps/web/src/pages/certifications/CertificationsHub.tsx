import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Award,
  Shield,
  Leaf,
  Users,
  CheckCircle,
  ExternalLink,
  Download,
} from 'lucide-react';
import CertificationBadge from '../../components/certifications/CertificationBadge';
import SEO from '../../components/seo/SEO';
import SubpageHeader from '../../components/shared/SubpageHeader';
import { Certification, CertificationFilterState, CertificationCategory } from '../../types/certification';
import certificationsData from '@/data/certifications/index.json';

const CertificationsHub = () => {
  const certifications = certificationsData as Certification[];

  const [filters, setFilters] = useState<CertificationFilterState>({
    category: '',
    status: '',
    searchQuery: '',
  });

  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  // Get unique categories for filter
  const categories = useMemo(() => {
    return Array.from(new Set(certifications.map((cert) => cert.category))).sort();
  }, [certifications]);

  // Filter certifications
  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory = !filters.category || cert.category === filters.category;
      const matchesStatus = !filters.status || cert.status === filters.status;
      const matchesSearch =
        !filters.searchQuery ||
        cert.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        cert.fullName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [certifications, filters]);

  // Group certifications by category
  const certificationsByCategory = useMemo(() => {
    const grouped: Record<CertificationCategory, Certification[]> = {
      'Quality Management': [],
      'Environmental': [],
      'Social Compliance': [],
      'Product Safety': [],
      'Customer Specific': [],
    };

    filteredCertifications.forEach((cert) => {
      grouped[cert.category].push(cert);
    });

    return grouped;
  }, [filteredCertifications]);

  const handleReset = () => {
    setFilters({
      category: '',
      status: '',
      searchQuery: '',
    });
  };

  const hasActiveFilters = filters.category || filters.status || filters.searchQuery;

  const getCategoryIcon = (category: CertificationCategory) => {
    switch (category) {
      case 'Quality Management':
        return <Award size={24} />;
      case 'Environmental':
        return <Leaf size={24} />;
      case 'Social Compliance':
        return <Users size={24} />;
      case 'Product Safety':
        return <Shield size={24} />;
      case 'Customer Specific':
        return <CheckCircle size={24} />;
      default:
        return <Award size={24} />;
    }
  };

  return (
    <>
      <SEO
        title="Certifications & Compliance | KTL"
        description="View all of KTL's international certifications including ISO 9001, ISO 14001, OEKO-TEX, GOTS, BSCI, WRAP, and customer-specific certifications."
        keywords={[
          'ISO 9001',
          'ISO 14001',
          'OEKO-TEX',
          'GOTS',
          'BSCI',
          'WRAP',
          'textile certifications',
          'compliance',
          'quality management',
        ]}
      />

      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Certifications' },
        ]}
        pageTitle="Certifications"
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
              <Shield size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Certifications & Compliance
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Trusted by global brands. Certified by international standards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{certifications.length}+</div>
                <div className="text-neutral-600 mt-1">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
                <div className="text-neutral-600 mt-1">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-neutral-600 mt-1">Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-neutral-600 mt-1">Years Certified</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-neutral-600" />
              <h2 className="text-lg font-semibold text-neutral-900">Filter Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search certifications..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as CertificationCategory | '' })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="In Renewal">In Renewal</option>
                </select>
              </div>
            </div>

            {/* Active Filters & Reset */}
            {hasActiveFilters && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-neutral-600">
                  Showing {filteredCertifications.length} of {certifications.length} certifications
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

          {/* Certifications by Category */}
          {filteredCertifications.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(certificationsByCategory).map(([category, certs]) => {
                if (certs.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        {getCategoryIcon(category as CertificationCategory)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-900">{category}</h2>
                        <p className="text-neutral-600">{certs.length} certification{certs.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certs.map((cert) => (
                        <CertificationBadge
                          key={cert.id}
                          certification={cert}
                          onClick={() => setSelectedCertification(cert)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Shield size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No certifications found</h3>
              <p className="text-neutral-600 mb-4">Try adjusting your filters to see more results</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter size={18} />
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Certified Quality You Can Trust</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our certifications ensure that every product meets the highest standards of quality, safety, and sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Our Products
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

      {/* Certification Detail Modal */}
      <AnimatePresence>
        {selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertification(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {selectedCertification.badgeImage && (
                    <img
                      src={selectedCertification.badgeImage}
                      alt={selectedCertification.name}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">{selectedCertification.name}</h2>
                    <p className="text-neutral-600 mt-1">{selectedCertification.fullName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCertification(null)}
                  className="text-neutral-400 hover:text-neutral-600 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Issuing Body</div>
                    <div className="font-semibold">{selectedCertification.issuingBody}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Category</div>
                    <div className="font-semibold">{selectedCertification.category}</div>
                  </div>
                  {selectedCertification.certificateNumber && (
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Certificate Number</div>
                      <div className="font-semibold font-mono text-sm">{selectedCertification.certificateNumber}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Status</div>
                    <div className="font-semibold">{selectedCertification.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Issued Date</div>
                    <div className="font-semibold">
                      {new Date(selectedCertification.issuedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Expiry Date</div>
                    <div className="font-semibold">
                      {new Date(selectedCertification.expiryDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-lg mb-2">About This Certification</h3>
                  <p className="text-neutral-700 leading-relaxed">{selectedCertification.description}</p>
                </div>

                {/* Why It Matters */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-bold text-lg mb-2 text-blue-900">Why It Matters</h3>
                  <p className="text-blue-800 leading-relaxed">{selectedCertification.whyItMatters}</p>
                </div>

                {/* Related Products */}
                {selectedCertification.relatedProducts && selectedCertification.relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Applicable Products</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertification.relatedProducts.map((product) => (
                        <span
                          key={product}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-neutral-200">
                  {selectedCertification.verificationUrl && (
                    <a
                      href={selectedCertification.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Verify Certificate
                    </a>
                  )}
                  {selectedCertification.certificatePdfUrl && (
                    <a
                      href={selectedCertification.certificatePdfUrl}
                      download
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      <Download size={18} />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationsHub;

