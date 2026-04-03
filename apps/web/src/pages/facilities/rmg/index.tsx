import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/media/Image";
import {
  Settings,
  Users,
  Package,
  MapPin,
  Clock,
  Award,
  Shield,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SEO from "../../../components/seo/SEO";
import StructuredData from "../../../components/seo/StructuredData";
import SubpageHeader from "../../../components/shared/SubpageHeader";
import { createBreadcrumbSchema } from "../../../modules/seo/templates";
import heroMain1x from "@/assets/images/hero/hero-main@1x.webp";
import heroSustainability1x from "@/assets/images/hero/hero-sustainability@1x.webp";
import heroGlobal1x from "@/assets/images/hero/hero-global@1x.webp";

const RMGFacility = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Factory Floor",
    "Products",
    "Workers",
    "CSR Activities",
  ];

  const images = [
    {
      id: 1,
      src: heroMain1x,
      category: "Factory Floor",
      title: "Hero Manufacturing Facility",
      description:
        "Our state-of-the-art production facility showcasing modern manufacturing capabilities",
      alt: "Modern garment manufacturing facility at Kattali Textile Limited in Chittagong, Bangladesh with advanced production lines",
    },
    {
      id: 2,
      src: heroSustainability1x,
      category: "Products",
      title: "Premium Textile Products",
      description:
        "High-quality garments and textiles ready for international markets",
      alt: "Premium quality woven garments and textiles manufactured by Kattali Textile Limited for international fashion brands",
    },
    {
      id: 3,
      src: heroGlobal1x,
      category: "Factory Floor",
      title: "Advanced Manufacturing Equipment",
      description:
        "Cutting-edge machinery and production lines for efficient manufacturing",
      alt: "Advanced textile manufacturing equipment and automated production lines at Kattali Textile Limited facility",
    },
    {
      id: 4,
      src: heroMain1x,
      category: "Products",
      title: "Textile Excellence",
      description: "Superior quality textiles and finished products",
      alt: "High-quality finished textile products ready for export from Kattali Textile Limited",
    },
    {
      id: 5,
      src: heroSustainability1x,
      category: "Workers",
      title: "Skilled Workforce",
      description: "Our experienced team ensuring quality production standards",
      alt: "Skilled textile workers at Kattali Textile Limited ensuring quality manufacturing standards",
    },
    {
      id: 6,
      src: heroGlobal1x,
      category: "Factory Floor",
      title: "Quality Control Department",
      description: "Rigorous quality checking processes and standards",
      alt: "Quality control inspection process at Kattali Textile Limited garment manufacturing facility",
    },
    {
      id: 7,
      src: heroMain1x,
      category: "Products",
      title: "Sustainable Textiles",
      description: "Eco-friendly and sustainable textile manufacturing",
      alt: "Sustainable and eco-friendly textile products manufactured by Kattali Textile Limited",
    },
    {
      id: 8,
      src: heroSustainability1x,
      category: "Workers",
      title: "Team Collaboration",
      description: "Coordinated teamwork for efficient production processes",
      alt: "Collaborative textile production team working together at Kattali Textile Limited",
    },
    {
      id: 9,
      src: heroGlobal1x,
      category: "CSR Activities",
      title: "Community Development",
      description:
        "Supporting local community and social responsibility initiatives",
      alt: "Community development and CSR activities by Kattali Textile Limited in Chittagong, Bangladesh",
    },
    {
      id: 10,
      src: heroMain1x,
      category: "Factory Floor",
      title: "Production Excellence",
      description: "Advanced production techniques and quality assurance",
      alt: "Excellence in garment production at Kattali Textile Limited modern manufacturing facility",
    },
    {
      id: 11,
      src: heroSustainability1x,
      category: "CSR Activities",
      title: "Environmental Sustainability",
      description: "Green practices and environmental protection efforts",
      alt: "Environmental sustainability initiatives and green manufacturing practices at Kattali Textile Limited",
    },
    {
      id: 12,
      src: heroGlobal1x,
      category: "Workers",
      title: "Professional Development",
      description: "Continuous training and skill development programs",
      alt: "Professional development and training programs for textile workers at Kattali Textile Limited",
    },
  ];

  const capabilities = [
    {
      icon: Settings,
      title: "680 Machines",
      description:
        "State-of-the-art manufacturing equipment including cutting-edge sewing machines, cutting tables, and finishing equipment.",
    },
    {
      icon: Users,
      title: "1,200+ Employees",
      description:
        "Skilled workforce including 750+ experienced operators, quality controllers, and technical specialists.",
    },
    {
      icon: Package,
      title: "360,000 Dozen/Year",
      description:
        "Annual production capacity ensuring reliable supply for large-scale international orders.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Efficient production planning and logistics management for on-time delivery to global destinations.",
    },
  ];

  const processes = [
    {
      step: "01",
      title: "Design & Development",
      description:
        "Collaborative design process with technical specifications and sample development.",
    },
    {
      step: "02",
      title: "Raw Material Sourcing",
      description:
        "Quality fabric procurement from certified suppliers with strict quality standards.",
    },
    {
      step: "03",
      title: "Cutting & Preparation",
      description:
        "Precision cutting using computer-aided cutting systems for optimal fabric utilization.",
    },
    {
      step: "04",
      title: "Manufacturing",
      description:
        "Skilled operators using advanced machinery for high-quality garment production.",
    },
    {
      step: "05",
      title: "Quality Control",
      description:
        "Multi-stage quality inspection ensuring products meet international standards.",
    },
    {
      step: "06",
      title: "Finishing & Packaging",
      description:
        "Professional finishing, pressing, and packaging for global shipment.",
    },
  ];

  const qualityFeatures = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Comprehensive QC at every production stage",
    },
    {
      icon: Award,
      title: "International Standards",
      description: "Compliance with global quality certifications",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description: "Optimized production processes for maximum efficiency",
    },
  ];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentImages = filteredImages;
    if (direction === "prev") {
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1,
      );
    } else {
      setSelectedImage(
        selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0,
      );
    }
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Facilities", url: "/facilities" },
    { name: "RMG Manufacturing", url: "/facilities/rmg" },
  ];

  return (
    <>
      <SEO
        title="World-Class Manufacturing Facilities | Kattali Textile Limited (KTL)"
        description="KTL operates state-of-the-art garment manufacturing facilities in Chittagong with certified quality systems, sustainable practices, and capacity to serve global brands."
        canonical="/facilities/rmg"
        keywords={[
          "RMG facility",
          "garment manufacturing",
          "textile production",
          "Bangladesh factory",
          "quality control",
          "chittagong garments factory list",
          "garments factory in chittagong",
        ]}
      />
      <StructuredData data={createBreadcrumbSchema(breadcrumbs)} />
      <SubpageHeader
        breadcrumbItems={[
          { label: "Home", to: "/" },
          { label: "Company", to: "/company/our-story" },
          { label: "RMG" },
        ]}
        pageTitle="RMG"
      />
      <div>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-r from-black/70 to-black/50 flex items-center bg-cover bg-center bg-hero-manufacturing">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
                RMG Manufacturing{" "}
                <span className="text-primary">Excellence</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Advanced facilities, skilled workforce, and proven processes for
                premium textile production
              </p>
            </div>
          </div>
        </section>

        {/* Factory Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-neutral-900">
                Our Manufacturing{" "}
                <span className="text-primary">Capabilities</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                With decades of experience and continuous investment in
                technology, we deliver world-class manufacturing services. Our
                facility produces a wide range of{" "}
                <Link
                  to="/products"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  woven garments
                </Link>
                ,
                <Link
                  to="/products/denims"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  {" "}
                  denim products
                </Link>
                , and
                <Link
                  to="/products/kids"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  {" "}
                  children's wear
                </Link>{" "}
                using
                <Link
                  to="/sustainability"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  {" "}
                  sustainable manufacturing practices
                </Link>
                .
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
                  <h3 className="font-heading text-xl font-bold mb-4 text-neutral-900">
                    {capability.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-neutral-900">
                Our Manufacturing <span className="text-primary">Process</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                From concept to delivery, our streamlined process ensures
                quality, efficiency, and customer satisfaction.
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
                    <h3 className="font-heading text-xl font-bold text-neutral-900">
                      {process.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {process.description}
                  </p>
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
                <h2 className="font-heading text-4xl font-bold mb-8 text-neutral-900">
                  Strategic <span className="text-primary">Location</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                        Factory Address
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        BM Heights, 8th Floor
                        <br />
                        318 Sk. Mujib Road, Agrabad
                        <br />
                        Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-neutral-900 mb-3">
                      Location Advantages
                    </h4>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Direct access to Chittagong Port - Bangladesh's largest
                        seaport
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Close proximity to fabric suppliers and raw material
                        sources
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        Excellent transportation connectivity for efficient
                        logistics
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
                <Image
                  src="designer-2.jpg"
                  alt="Manufacturing facility"
                  className="rounded-2xl shadow-2xl"
                  width={800}
                  height={600}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Features */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-neutral-900">
                Quality <span className="text-primary">Commitment</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our commitment to quality is reflected in every aspect of our
                manufacturing process.
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
                  <h3 className="font-heading text-xl font-bold mb-4 text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
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
              <h2 className="font-heading text-4xl font-bold mb-8 text-neutral-900">
                Discover Our <span className="text-primary">World</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-primary text-white shadow-lg"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
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
                  <Image
                    src={`/assets/${image.src}`}
                    alt={image.alt || image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    fit="cover"
                    width={400}
                    height={256}
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {image.description}
                      </p>
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
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image */}
              <Image
                src={filteredImages[selectedImage].src}
                alt={
                  filteredImages[selectedImage].alt ||
                  filteredImages[selectedImage].title
                }
                className="max-w-full max-h-full object-contain rounded-lg"
                fit="contain"
                priority
                sizes="100vw"
                width={1200}
                height={800}
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/70 p-4 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2">
                    {filteredImages[selectedImage].title}
                  </h3>
                  <p className="text-white/80">
                    {filteredImages[selectedImage].description}
                  </p>
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
              Contact us to discuss your manufacturing requirements and visit
              our facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
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
