import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Target,
  TrendingUp,
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  Calendar,
} from 'lucide-react';
import MetricsWidget from '../../components/sustainability/MetricsWidget';
import SEO from '../../components/seo/SEO';
import SubpageHeader from '../../components/shared/SubpageHeader';
import { SustainabilityMetric, SustainabilityGoal, SustainabilityInitiative } from '../../types/sustainability';
import sustainabilityData from '@/data/sustainability/index.json';

interface SustainabilityData {
  currentMetrics: SustainabilityMetric[];
  goals: SustainabilityGoal[];
  initiatives: SustainabilityInitiative[];
}

const SustainabilityDashboard = () => {
  const { currentMetrics, goals, initiatives } = sustainabilityData as SustainabilityData;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Environmental', 'Social', 'Governance'];

  const filteredMetrics =
    selectedCategory === 'All'
      ? currentMetrics
      : currentMetrics.filter((m) => m.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Planned':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <TrendingUp size={16} />;
      case 'Completed':
        return <CheckCircle size={16} />;
      case 'Planned':
        return <Clock size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <>
      <SEO
        title="Sustainability & ESG Dashboard | KTL"
        description="Track KTL's environmental, social, and governance (ESG) performance. See our progress on water conservation, renewable energy, worker welfare, and sustainability goals."
        keywords={[
          'ESG reporting',
          'sustainability metrics',
          'environmental impact',
          'social responsibility',
          'governance',
          'textile sustainability',
        ]}
      />

      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Sustainability' },
        ]}
        pageTitle="Sustainability"
      />
      <div className="bg-neutral-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-900 to-green-700 pb-20 pt-10 text-white lg:pt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Leaf size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sustainability & ESG Dashboard
              </h2>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                Transparency in action. Track our environmental, social, and governance performance in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-white shadow-md -mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">45%</div>
                <div className="text-neutral-600 mt-1">Renewable Energy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">78%</div>
                <div className="text-neutral-600 mt-1">Waste Recycled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">62%</div>
                <div className="text-neutral-600 mt-1">Sustainable Materials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">68%</div>
                <div className="text-neutral-600 mt-1">Women in Workforce</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-green-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Current Metrics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Current Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMetrics.map((metric, index) => (
              <MetricsWidget key={metric.id} metric={metric} index={index} />
            ))}
          </div>
        </section>

        {/* Goals & Targets */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Target size={32} className="text-green-600" />
              <h2 className="text-3xl font-bold text-neutral-900">2030 Goals & Targets</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-neutral-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">{goal.title}</h3>
                      <p className="text-sm text-neutral-600 mt-1">Target: {goal.targetYear}</p>
                    </div>
                    {goal.sdgAlignment && goal.sdgAlignment.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {goal.sdgAlignment.map((sdg) => (
                          <span
                            key={sdg}
                            className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded font-semibold"
                            title={`UN SDG ${sdg}`}
                          >
                            SDG {sdg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-neutral-700 mb-4">{goal.description}</p>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{goal.currentProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.currentProgress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Sustainability Initiatives</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                {initiative.image && (
                  <div className="h-48 bg-neutral-200 overflow-hidden">
                    <img
                      src={initiative.image}
                      alt={initiative.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full">
                      {initiative.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(initiative.status)}`}>
                      {getStatusIcon(initiative.status)}
                      {initiative.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-neutral-900 mb-2">{initiative.title}</h3>
                  <p className="text-sm text-neutral-700 mb-3 line-clamp-3">{initiative.description}</p>

                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex items-start gap-2">
                      <TrendingUp size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-600">{initiative.impact}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-neutral-500">
                    Started: {new Date(initiative.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Downloads & Reports */}
        <section className="bg-neutral-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Download size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Sustainability Reports & Documentation</h2>
            <p className="text-xl text-neutral-300 mb-8">
              Access our comprehensive sustainability reports, audits, and performance data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/downloads/sustainability-report-2024.pdf"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
              >
                <Download size={20} />
                2024 ESG Report
              </a>
              <a
                href="/downloads/environmental-audit-2024.pdf"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
              >
                <Download size={20} />
                Environmental Audit
              </a>
              <a
                href="/downloads/social-impact-2024.pdf"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-neutral-900 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
              >
                <Download size={20} />
                Social Impact Report
              </a>
            </div>
            <div className="mt-8">
              <a
                href="https://www.unglobalcompact.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <ExternalLink size={18} />
                View our UN Global Compact Profile
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Leaf size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Partner with a Sustainable Manufacturer</h2>
            <p className="text-xl text-green-100 mb-8">
              Choose a partner committed to environmental responsibility and social impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-900 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                View Sustainable Products
              </a>
              <a
                href="/rfq"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-900 transition-colors"
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

export default SustainabilityDashboard;

