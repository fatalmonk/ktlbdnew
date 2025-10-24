import React, { useState } from 'react';
import ImageX from '../../../components/ImageX';
import ResponsiveImage from '../../../components/ResponsiveImage';
import { Settings, Users, Package, MapPin, Clock, Award, Shield, Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../../../components/SEO';

const RMGFacility = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Factory Floor', 'Products', 'Workers', 'CSR Activities'];

  const images = [
    {
      id: 1,
      src: 'hero.jpg',
      category: 'Factory Floor',
      title: 'Hero Manufacturing Facility',
      description:
        'Our state-of-the-art production facility showcasing modern manufacturing capabilities',
    },
    {
      id: 2,
      src: 'designer-1.jpg',
      category: 'Products',
      title: 'Premium Textile Products',
      description: 'High-quality garments and textiles ready for international markets',
    },
    {
      id: 3,
      src: 'designer-2.jpg',
      category: 'Factory Floor',
      title: 'Advanced Manufacturing Equipment',
      description: 'Cutting-edge machinery and production lines for efficient manufacturing',
    },
    {
      id: 4,
      src: 'hero.jpg',
      category: 'Products',
      title: 'Textile Excellence',
      description: 'Superior quality textiles and finished products',
    },
    {
      id: 5,
      src: 'designer-1.jpg',
      category: 'Workers',
      title: 'Skilled Workforce',
      description: 'Our experienced team ensuring quality production standards',
    },
    {
      id: 6,
      src: 'designer-2.jpg',
      category: 'Factory Floor',
      title: 'Quality Control Department',
      description: 'Rigorous quality checking processes and standards',
    },
    {
      id: 7,
      src: 'hero.jpg',
      category: 'Products',
      title: 'Sustainable Textiles',
      description: 'Eco-friendly and sustainable textile manufacturing',
    },
    {
      id: 8,
      src: 'designer-1.jpg',
      category: 'Workers',
      title: 'Team Collaboration',
      description: 'Coordinated teamwork for efficient production processes',
    },
    {
      id: 9,
      src: 'designer-2.jpg',
      category: 'CSR Activities',
      title: 'Community Development',
      description: 'Supporting local community and social responsibility initiatives',
    },
    {
      id: 10,
      src: 'hero.jpg',
      category: 'Factory Floor',
      title: 'Production Excellence',
      description: 'Advanced production techniques and quality assurance',
    },
    {
      id: 11,
      src: 'designer-1.jpg',
      category: 'CSR Activities',
      title: 'Environmental Sustainability',
      description: 'Green practices and environmental protection efforts',
    },
    {
      id: 12,
      src: 'designer-2.jpg',
      category: 'Workers',
      title: 'Professional Development',
      description: 'Continuous training and skill development programs',
    },
  ];

  const capabilities = [
    {
      icon: Settings,
      title: '680 Machines',
      description:
        'State-of-the-art manufacturing equipment including cutting-edge sewing machines, cutting tables, and finishing equipment.',
    },
    {
      icon: Users,
      title: '1,200+ Employees',
      description:
        'Skilled workforce including 750+ experienced operators, quality controllers, and technical specialists.',
    },
    {
      icon: Package,
      title: '360,000 Dozen/Year',
      description:
        'Annual production capacity ensuring reliable supply for large-scale international orders.',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description:
        'Efficient production planning and logistics management for on-time delivery to global destinations.',
    },
  ];

  const processes = [
    {
      step: '01',
      title: 'Design & Development',
      description:
        'Collaborative design process with technical specifications and sample development.',
    },
    {
      step: '02',
      title: 'Raw Material Sourcing',
      description:
        'Quality fabric procurement from certified suppliers with strict quality standards.',
    },
    {
      step: '03',
      title: 'Cutting & Preparation',
      description:
        'Precision cutting using computer-aided cutting systems for optimal fabric utilization.',
    },
    {
      step: '04',
      title: 'Manufacturing',
      description:
        'Skilled operators using advanced machinery for high-quality garment production.',
    },
    {
      step: '05',
      title: 'Quality Control',
      description: 'Multi-stage quality inspection ensuring products meet international standards.',
    },
    {
      step: '06',
      title: 'Finishing & Packaging',
      description: 'Professional finishing, pressing, and packaging for global shipment.',
    },
  ];

  const qualityFeatures = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Comprehensive QC at every production stage',
    },
    {
      icon: Award,
      title: 'International Standards',
      description: 'Compliance with global quality certifications',
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Optimized production processes for maximum efficiency',
    },
  ];

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    const currentImages = filteredImages;
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1);
    } else {
      setSelectedImage(selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0);
    }
  };

  return (
    <>
      <SEO
        title="RMG Manufacturing & Gallery"
        description="KTL's comprehensive RMG manufacturing facility featuring advanced production capabilities, quality control systems, and photo gallery showcasing our operations."
        keywords={['RMG manufacturing', 'garment production', 'manufacturing gallery', 'KTL facility', 'textile production', 'quality control']}
      />
      <div>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-r from-black/70 to-black/50 flex items-center bg-cover bg-center bg-hero-manufacturing">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
                RMG Manufacturing <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Advanced facilities, skilled workforce, and proven processes for premium textile production
              </p>
            </div>
          </div>
        </section>

        {/* Factory Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
                Our Manufacturing <span className="text-primary">Capabilities</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                With decades of experience and continuous investment in technology, we deliver
                world-class manufacturing services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <capability.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4 text-gray-900">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
                Our Manufacturing <span className="text-primary">Process</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to delivery, our streamlined process ensures quality, efficiency, and
                customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {process.step}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-gray-900">{process.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Details */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 text-gray-900">
                  Strategic <span className="text-primary">Location</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Factory Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        BM Heights, 8th Floor
                        <br />
                        318 Sk. Mujib Road, Agrabad
                        <br />
                        Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Location Advantages</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Direct access to Chittagong Port - Bangladesh's largest seaport
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Close proximity to fabric suppliers and raw material sources
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Excellent transportation connectivity for efficient logistics
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Access to skilled textile workforce in the region
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative">
                <ImageX
                  src="designer-2.jpg"
                  alt="Manufacturing facility"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
                Quality <span className="text-primary">Commitment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to quality is reflected in every aspect of our manufacturing process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {qualityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-bold mb-8 text-gray-900">
                Discover Our <span className="text-primary">World</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <ResponsiveImage
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    fit="cover"
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                      <p className="text-sm text-white/80">{image.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
                aria-label="Close image modal"
              >
                <X size={32} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image */}
              <ResponsiveImage
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
                fit="contain"
                priority
                sizes="100vw"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/70 p-4 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-white/80">{filteredImages[selectedImage].description}</p>
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2">
                    {filteredImages[selectedImage].category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Ready to Experience Our Manufacturing Excellence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your manufacturing requirements and visit our facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Factory Visit
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Request Manufacturing Quote
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RMGFacility;
