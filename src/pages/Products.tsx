import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Product3DCard from '../components/product/Product3DCard';
import ProductFilter from '../components/product/ProductFilter';
import EnhancedLogoCarousel from '../components/product/EnhancedLogoCarousel';
import SEO from '../components/seo/SEO';
import { products as productData } from '../data/products';
import { partners } from '../data/partners';
import { getUniqueCategories, getUniqueTags, filterProducts } from '../utils/filterHelpers';
import { ProductFilterState } from '../types/product';
import { useScrollTrigger } from '../hooks/animations/useScrollTrigger';

const Products = () => {
  // Animation triggers
  const productsRef = useScrollTrigger({ threshold: 0.1 });
  const carouselRef = useScrollTrigger({ threshold: 0.2 });

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

  const features = [
    'Premium Quality Fabrics',
    'Custom Design Services',
    'Bulk Order Capabilities',
    'International Standards',
    'Competitive Pricing',
    'Timely Delivery',
  ];

  return (
    <>
      <SEO
        title="Woven Garment Supplier Bangladesh | Kattali Textile Ltd Manufacturing"
        description="KTL is Bangladesh's leading woven garment supplier, manufacturing premium woven apparel, denim, and children's wear for global fashion brands from our Chittagong facilities."
        canonical="/products"
        keywords={['woven garment supplier bangladesh', 'woven apparel', 'woven clothing manufacturer', 'textile products', 'garment manufacturing']}
      />
      <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-black/70 to-black/50 flex items-center bg-cover bg-center bg-hero-products">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
              Woven Garment Supplier <span className="text-primary">Bangladesh</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Premium quality woven apparel, denim, and children's wear manufactured in Bangladesh for global fashion brands
            </p>
          </div>
        </div>
      </section>

      {/* Woven Garments Section - P0 Keywords */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
              Premium Woven Garment Manufacturing
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              As a leading <strong>woven garment supplier in Bangladesh</strong>, KTL specializes in manufacturing
              high-quality woven apparel for global fashion brands. Our state-of-the-art facilities in Chittagong
              produce a wide range of woven clothing including shirts, pants, dresses, and outerwear.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Woven Apparel Capabilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Men's and women's woven shirts</li>
                  <li>• Formal and casual pants</li>
                  <li>• Dresses and blouses</li>
                  <li>• Jackets and outerwear</li>
                  <li>• Custom woven clothing</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Quality Standards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• AQL 2.5 quality inspection</li>
                  <li>• OEKO-TEX certified materials</li>
                  <li>• ISO 9001:2015 certified</li>
                  <li>• Sustainable production practices</li>
                  <li>• On-time delivery guarantee</li>
                </ul>
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
            <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
              Our <span className="text-primary">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-gray-900">
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
                <h3 className="font-semibold text-gray-900">{feature}</h3>
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
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
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
