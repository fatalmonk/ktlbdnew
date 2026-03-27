import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Product3DCard from '../components/product/Product3DCard';
import ProductFilter from '../components/product/ProductFilter';
import EnhancedLogoCarousel from '../components/product/EnhancedLogoCarousel';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import { createBreadcrumbSchema } from '../modules/seo/templates';
import { products as productData } from '../data/products';
import { partners } from '../data/partners';
import { getUniqueCategories, getUniqueTags, filterProducts } from '../utils/filterHelpers';
import { ProductFilterState } from '../types/product';
import { useScrollTrigger } from '../hooks/animations/useScrollTrigger';

const Products = () => {
  // Animation triggers
  const productsRef = useScrollTrigger({ threshold: 0.1 });
  const carouselRef = useScrollTrigger({ threshold: 0.2 });

  // Filter state (instead of filtered products state)
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    tags: []
  });

  // Memoized filtered products - only recalculates when filters change
  const filteredProducts = useMemo(
    () => filterProducts(productData, filters),
    [filters]
  );

  // Get filter options (memoized for performance)
  const categories = useMemo(() => getUniqueCategories(productData), []);
  const tags = useMemo(() => getUniqueTags(productData), []);

  // Handle filter changes - just update filters state
  const handleFilterChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
  };

  const features = [
    'Premium Quality Fabrics',
    'Custom Design Services',
    'Bulk Order Capabilities',
    'International Standards',
    'Competitive Pricing',
    'Timely Delivery',
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
  ];

  return (
    <>
      <SEO
        title="Woven Garments, Denim, and Kidswear | Kattali Textile Ltd Manufacturing"
        description="Explore KTL's world-class manufacturing facilities in Chittagong, producing woven bottoms, denim, and children's wear for leading fashion brands worldwide."
        canonical="/products"
        keywords={['woven garment supplier bangladesh', 'woven apparel', 'woven clothing manufacturer', 'textile products', 'garment manufacturing', 'woven textile company in chittagong']}
      />
      <StructuredData data={createBreadcrumbSchema(breadcrumbs)} />
      <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-r from-black/70 to-black/50 flex items-center bg-cover bg-center bg-hero-products">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Woven Garment Supplier <span className="text-primary">Bangladesh</span>
            </h1>
            <p className="text-sm md:text-base lg:text-xl text-white/90 leading-relaxed">
              Premium quality woven apparel, denim, and children's wear manufactured in Bangladesh for global fashion brands
            </p>
          </div>
        </div>
      </section>

      {/* Woven Garments Section - P0 Keywords */}
      <section className="py-8 md:py-12 lg:py-16 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="font-heading text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-neutral-900 leading-tight">
              Premium Woven Garment Manufacturing
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-neutral-600 mb-6 md:mb-8 leading-relaxed">
              As a leading <strong>woven garment supplier in Bangladesh</strong>, KTL specializes in manufacturing
              high-quality woven apparel for global fashion brands. Our state-of-the-art facilities in Chittagong
              produce a wide range of woven clothing including ladies shirts, chino pants, dresses, and outerwear. Explore our
              specialized product categories including <Link to="/products/denims" className="text-primary-600 hover:text-primary-700 font-medium underline">denim products</Link>, 
              <Link to="/products/knitwear" className="text-primary-600 hover:text-primary-700 font-medium underline">premium knitwear</Link>, 
              <Link to="/products/swimwear" className="text-primary-600 hover:text-primary-700 font-medium underline">swimwear collections</Link>, and
              our <Link to="/products/kids" className="text-primary-600 hover:text-primary-700 font-medium underline">kidswear manufacturer</Link> lines.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Woven Apparel Capabilities</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• Men's and women's woven shirts</li>
                  <li>• Formal and casual pants</li>
                  <li>• Dresses and blouses</li>
                  <li>• Jackets and outerwear</li>
                  <li>• Custom woven clothing</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Quality Standards</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• AQL 2.5 quality inspection</li>
                  <li>• OEKO-TEX certified materials</li>
                  <li>• ISO 9001:2015 certified</li>
                  <li>• <Link to="/company/sustainability" className="text-primary-600 hover:text-primary-700 font-medium underline">Certified sustainable manufacturing</Link> practices</li>
                  <li>• On-time delivery guarantee</li>
                </ul>
                <p className="mt-4 text-neutral-600">
                  Learn more about our <Link to="/facilities/rmg" className="text-primary-600 hover:text-primary-700 font-medium underline">production facilities</Link> and manufacturing capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery with 3D Cards */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={productsRef.ref}
            animate={productsRef.controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold mb-6 text-neutral-900">
              Our <span className="text-primary">Products</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We specialize in manufacturing a wide range of textile products for men, women, and
              children across various categories.
            </p>
          </motion.div>

          {/* 3D Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <Product3DCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-neutral-900">
            Why Choose Our <span className="text-primary">Products</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <h3 className="font-semibold text-neutral-900">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Logo Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={carouselRef.ref}
            animate={carouselRef.controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-4">
              Trusted by <span className="text-primary-500">Global Brands</span>
            </h2>
          </motion.div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <EnhancedLogoCarousel partners={partners} speed={20} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-6">
            Ready to Source Premium Textiles?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a customized quote for your
            textile sourcing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
              Request Catalog
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Get Quote
            </button>
          </div>
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

export default Products;
