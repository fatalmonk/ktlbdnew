import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Target, Leaf, Shield, Factory } from 'lucide-react';
import EnhancedHero from '../components/hero/EnhancedHero';
import StatisticsSection from '../components/shared/StatisticsSection';
import Product3DCard from '../components/product/Product3DCard';
import EnhancedLogoCarousel from '../components/product/EnhancedLogoCarousel';
import ProductFilter from '../components/product/ProductFilter';
import SEO from '../components/seo/SEO';
import { products as productData } from '../data/products';
import { partners } from '../data/partners';
import { getUniqueCategories, getUniqueTags, filterProducts } from '../utils/filterHelpers';
import { ProductFilterState } from '../types/product';
import { useScrollTrigger } from '../hooks/animations/useScrollTrigger';

const Home = () => {
  // Animation triggers
  const productsRef = useScrollTrigger({ threshold: 0.1 });
  const logoRef = useScrollTrigger({ threshold: 0.2 });
  const valuesRef = useScrollTrigger({ threshold: 0.2 });
  const testimonialsRef = useScrollTrigger({ threshold: 0.2 });
  const valuesHeadingRef = useScrollTrigger({ threshold: 0.2 });
  const testimonialsHeadingRef = useScrollTrigger({ threshold: 0.2 });

  // Product filtering state
  const [filteredProducts, setFilteredProducts] = useState(productData);

  // Get filter options
  const categories = getUniqueCategories(productData);
  const tags = getUniqueTags(productData);

  // Handle filter changes
  const handleFilterChange = (filters: ProductFilterState) => {
    const filtered = filterProducts(productData, filters);
    setFilteredProducts(filtered);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const certifications = [
    { name: 'Sedex', description: 'Ethical trade certification' },
    { name: 'Green Certified', description: 'Environmental compliance' },
    { name: 'BGMEA', description: 'Bangladesh Garment Manufacturers' },
  ];

  const newsItems = [
    {
      title: 'Kattali Textile Expands Sustainable Manufacturing',
      excerpt: 'New eco-friendly production lines installed to reduce environmental impact by 40%',
      image: './assets/designer-1.jpg',
      date: 'December 2024',
      slug: 'sustainable-manufacturing-expansion',
    },
    {
      title: 'Partnership with Global Fashion Brands',
      excerpt: 'Strategic alliances established with leading international retailers',
      image: './assets/designer-2.jpg',
      date: 'November 2024',
      slug: 'global-brand-partnerships',
    },
    {
      title: 'Employee Development Program Launch',
      excerpt: 'Comprehensive training initiative to enhance workforce skills and capabilities',
      image: './assets/hero.jpg',
      date: 'October 2024',
      slug: 'employee-development-program',
    },
  ];

  const values = [
    { icon: Target, title: 'Quality Excellence', description: 'Delivering premium quality products' },
    { icon: Leaf, title: 'Sustainability', description: 'Eco-friendly manufacturing practices' },
    { icon: Shield, title: 'Ethical Standards', description: 'Fair labor and ethical production' },
    { icon: Factory, title: 'Innovation', description: 'Cutting-edge manufacturing technology' },
  ];

  const testimonials = [
    {
      quote: 'Outstanding quality and timely delivery. Kattali Textile has been our trusted partner.',
      author: 'John Smith',
      position: 'CEO, Fashion Brand Co.',
      rating: 5
    },
    {
      quote: 'Their sustainable practices and attention to detail make them our preferred supplier.',
      author: 'Sarah Johnson',
      position: 'Product Manager, Retail Chain',
      rating: 5
    },
    {
      quote: 'Exceptional service and quality. We\'ve been working with them for over 5 years.',
      author: 'Michael Chen',
      position: 'Director, Apparel Inc.',
      rating: 5
    },
  ];

  return (
    <>
      <SEO
        title="Bangladesh Garment Manufacturer | Kattali Textile Ltd - Leading Textile Exporter Chittagong"
        description="Kattali Textile Ltd is Bangladesh's premier garment manufacturer and textile exporter from Chittagong. We produce high-quality woven, denim, and children's apparel for global brands with certified sustainable practices."
        canonical="/"
        keywords={['bangladesh garment manufacturer', 'textile exporter chittagong', 'woven apparel', 'denim manufacturing', 'RMG Bangladesh', 'Chittagong textile']}
      />
      <div>
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Featured Products Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
        <div className="max-w-ktl mx-auto px-4 md:px-6">
          <motion.div
            ref={productsRef.ref}
            animate={productsRef.controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary-500">Products</span>
            </h2>
          </motion.div>

          {/* 3D Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <Product3DCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center group">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Strategic Internal Links - P0 Keywords */}
          <div className="mt-8 text-center">
            <p className="text-body text-neutral-600 mb-4">
              Explore our specialized manufacturing capabilities:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products/denims"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Denim Manufacturer Bangladesh
              </Link>
              <span className="text-neutral-400">•</span>
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Woven Garment Supplier Bangladesh
              </Link>
              <span className="text-neutral-400">•</span>
              <Link
                to="/company/sustainability"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sustainable Textile Manufacturer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Logo Carousel Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            ref={logoRef.ref}
            animate={logoRef.controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              Partnering with <span className="text-primary-500">global brands</span>
            </h2>
          </motion.div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <EnhancedLogoCarousel partners={partners} speed={20} />
          </div>
          <p className="text-center text-sm text-gray-800 mt-8">
            Trusted by <span className="font-semibold" style={{ color: '#fdd336' }}>leading global brands</span>
          </p>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-gray-50">
        <motion.div
          ref={valuesHeadingRef.ref}
          animate={valuesHeadingRef.controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-ktl mx-auto px-4 md:px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary-500">Values</span>
          </h2>
          <p className="text-xl text-gray-600">What drives us forward</p>
        </motion.div>

        <motion.div
          ref={valuesRef.ref}
          animate={valuesRef.controls}
          initial="hidden"
          variants={containerVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white">
        <motion.div
          ref={testimonialsHeadingRef.ref}
          animate={testimonialsHeadingRef.controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-ktl mx-auto px-4 md:px-6"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary-500">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600">Trusted by global brands</p>
        </motion.div>

        <motion.div
          ref={testimonialsRef.ref}
          animate={testimonialsRef.controls}
          initial="hidden"
          variants={containerVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Shield key={i} className="w-5 h-5 text-primary-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-ktl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-900">
            Our <span className="text-primary">Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Award className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">{cert.name}</h3>
                <p className="text-gray-600 text-sm md:text-base">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-ktl mx-auto px-4 md:px-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-neutral-900">
                    Latest <span className="text-primary-500">News</span>
                  </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((news, index) => (
              <article key={index} className="card-ktl card-image-top group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-6">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className="text-xs md:text-sm text-primary-600 font-medium">{news.date}</span>
                        </div>
                  <h3 className="font-heading text-base md:text-h4 font-semibold mb-2 md:mb-3 text-neutral-600 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-neutral-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">{news.excerpt}</p>
                  <Link
                    to={`/news/${news.slug}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group/link"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/news" className="btn-primary inline-flex items-center group">
              View All News
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics/Investor Band Section */}
      <section className="metrics-section">
        {/* Top Accent Bar */}
        <div className="metrics-accent-bar" />

        <div className="py-18 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column - Text Content */}
              <div className="md:col-span-7 lg:col-span-7 space-y-4">
                <h2 className="font-heading text-[26px] md:text-[36px] font-bold leading-[1.15] text-[#0B0B0B]">
                  Investor Snapshot
                </h2>

                <div className="space-y-1">
                  <p className="text-[16px] leading-[1.6] text-[#3C3C3C]">
                    DSE: M | as of September 19, 2025 4:00 PM EST
                  </p>
                  <p className="text-[16px] leading-[1.6] text-[#3C3C3C]">
                    Volume: 10,508,014. Change: -0.06 (-0.34%)
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="/investor-relations"
                    className="text-[16px] text-[#0B0B0B] underline hover:opacity-75 transition-opacity duration-200"
                  >
                    Investor Relations
                  </a>
                </div>
              </div>

              {/* Right Column - Metric Display */}
              <div className="md:col-span-5 lg:col-span-5 relative">
                <div className="bg-wave-pattern absolute inset-0 opacity-15 md:opacity-100" />
                <div className="relative z-10 flex justify-end items-center h-full min-h-[200px] md:min-h-[300px]">
                  <div className="text-right">
                    <div className="metric-display text-[64px] md:text-[120px] text-[#0B0B0B]">
                      <span className="metric-prefix">৳</span>45.50
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rule */}
        <div className="metrics-bottom-rule" />
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20" style={{ backgroundColor: '#fdd336' }}>
        <div className="max-w-ktl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-neutral-900 mb-4 md:mb-6">
            Ready for Global Apparel Sourcing?
          </h2>
          <p className="text-base md:text-xl text-neutral-700 mb-6 md:mb-8 max-w-2xl mx-auto">
            Partner with us for premium quality textiles, ethical manufacturing, and reliable global
            delivery.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-secondary-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-600 transition-colors duration-200 group"
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Product Filter Component */}
      <ProductFilter
        categories={categories}
        tags={tags}
        onFilterChange={handleFilterChange}
      />
    </div>
    </>
  );
};

export default Home;
