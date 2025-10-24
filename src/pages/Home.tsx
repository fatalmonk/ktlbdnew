import { Link } from 'react-router-dom';
import { ArrowRight, Users, Settings, Calendar, Award, Shirt, Package, Globe } from 'lucide-react';
import KTLHero from '../components/KTLHero';
import LogoLoop from '../components/LogoLoop';

const Home = () => {
  const stats = [
    {
      icon: Calendar,
      title: '20+',
      subtitle: 'Years of Excellence',
      description:
        'Established since 2002, leading the textile industry with innovation and quality',
    },
    {
      icon: Users,
      title: '1,200+',
      subtitle: 'Skilled Employees',
      description: 'Our greatest asset - dedicated professionals driving our success',
    },
    {
      icon: Settings,
      title: '680+',
      subtitle: 'Advanced Machines',
      description: 'State-of-the-art equipment ensuring premium quality production',
    },
    {
      icon: Package,
      title: '360K+',
      subtitle: 'Annual Production',
      description: 'Dozen capacity - meeting global demand with efficiency',
    },
    {
      icon: Globe,
      title: 'Global',
      subtitle: 'Market Presence',
      description: 'Serving international brands across multiple continents',
    },
    {
      icon: Award,
      title: 'Certified',
      subtitle: 'Quality Standards',
      description: 'Sedex, Green Certified, BGMEA compliant operations',
    },
  ];

  const products = [
    {
      name: 'Denims',
      icon: Shirt,
      description: 'Premium denim products including jeans, jackets, and shirts for all ages',
      category: 'Casual Wear',
    },
    {
      name: 'T-Shirts',
      icon: Shirt,
      description: 'High-quality cotton and blended t-shirts for everyday comfort',
      category: 'Casual Wear',
    },
    {
      name: 'Polo Shirts',
      icon: Shirt,
      description: 'Professional polo shirts perfect for business and casual occasions',
      category: 'Business Wear',
    },
    {
      name: 'Activewear',
      icon: Package,
      description: 'Performance-driven athletic wear for sports and fitness',
      category: 'Sports Wear',
    },
    {
      name: 'Outerwear',
      icon: Package,
      description: 'Stylish jackets, coats, and outerwear for all seasons',
      category: 'Seasonal Wear',
    },
    {
      name: 'Dresses',
      icon: Shirt,
      description: 'Elegant dresses for women and children in contemporary styles',
      category: "Women's Wear",
    },
    {
      name: 'Bottoms',
      icon: Package,
      description: 'Comfortable pants, shorts, and trousers for all occasions',
      category: 'Casual Wear',
    },
    {
      name: 'Swimwear',
      icon: Package,
      description: 'High-quality swim trunks and swimwear for active lifestyles',
      category: 'Sports Wear',
    },
  ];

  const certifications = [
    { name: 'Sedex', description: 'Ethical trade certification' },
    { name: 'Green Certified', description: 'Environmental compliance' },
    { name: 'BGMEA', description: 'Bangladesh Garment Manufacturers' },
  ];

  const brandLogos = [
    {
      src: '/logos/CalvinKlein_Jeans_logo_black-002.png',
      alt: 'Calvin Klein Jeans',
      width: 120,
      height: 56,
    },
    {
      src: '/logos/gap.png',
      alt: 'GAP',
      width: 100,
      height: 56,
    },
    {
      src: '/logos/H&M.png',
      alt: 'H&M',
      width: 80,
      height: 56,
    },
    {
      src: '/logos/Old_Navy_Logo.png',
      alt: 'Old Navy',
      width: 120,
      height: 56,
    },
    {
      src: '/logos/tommy-hilfiger-logo.png',
      alt: 'Tommy Hilfiger',
      width: 120,
      height: 56,
    },
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

  return (
    <div>
      {/* Hero Section */}
      <KTLHero
        title={
          <>
            Fashionably Sustaining
            <br />
            Apparel Industry Innovation
            <br />
            and Design
          </>
        }
        subtitle={
          "Designing, developing and manufacturing private-label apparel products for the world's leading brands and retailers."
        }
        cta={{
          label: 'Explore Our Products',
          href: '/products'
        }}
      />

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-ananta mx-auto px-4 md:px-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-neutral-900">
                    Why Choose <span className="text-primary-500">Kattali Textile</span>
                  </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="card-ananta text-center p-4 md:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                </div>
                <h3 className="font-heading text-xl md:text-h3 font-bold text-neutral-600 mb-1 md:mb-2 text-numeric">
                  {stat.title}
                </h3>
                <p className="text-primary-600 font-semibold mb-1 md:mb-2 text-sm md:text-base">{stat.subtitle}</p>
                <p className="text-neutral-500 text-xs md:text-sm hidden md:block">{stat.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-600 flex items-center justify-center space-x-4">
              <span className="flex items-center">
                <Award className="w-5 h-5 text-primary mr-2" />
                Sedex Certified
              </span>
              <span className="flex items-center">
                <Globe className="w-5 h-5 text-primary mr-2" />
                Green Factory Initiatives
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-ananta mx-auto px-4 md:px-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-neutral-900">
                    Our <span className="text-primary-500">Products</span>
                  </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div key={index} className="card-ananta hover-lift p-4 md:p-6 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-primary-200 transition-colors">
                  <product.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-600" />
                </div>
                <div className="text-center mb-2 md:mb-3">
                  <span className="chip bg-primary-100 text-primary-700 mb-2 text-xs md:text-sm">{product.category}</span>
                  <h3 className="font-heading text-base md:text-h4 font-semibold text-neutral-600">
                    {product.name}
                  </h3>
                </div>
                <p className="text-neutral-500 text-center text-xs md:text-sm hidden md:block">{product.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center group">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Loop Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="max-w-ananta mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-black">
            Partnering with <span className="text-primary-500">global brands</span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <LogoLoop logos={brandLogos} speed={15} direction="left" logoHeight={56} />
          </div>
          <p className="text-center text-sm text-gray-800 mt-8">
            Trusted by <span className="font-semibold" style={{ color: '#fdd336' }}>leading global brands</span>
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-ananta mx-auto px-4 md:px-6">
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
        <div className="max-w-ananta mx-auto px-4 md:px-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-neutral-900">
                    Latest <span className="text-primary-500">News</span>
                  </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((news, index) => (
              <article key={index} className="card-ananta card-image-top group">
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
        <div className="max-w-ananta mx-auto px-4 md:px-6 text-center">
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
    </div>
  );
};

export default Home;
