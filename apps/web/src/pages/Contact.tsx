import { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';

const ChevronUp = createLazyIcon('ChevronUp');
import ContactForm from '../components/features/ContactForm';
import GoogleMapsLocator from '../components/features/GoogleMapsLocator';
import GoogleBusinessWidget from '../components/features/GoogleBusinessWidget';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import { createBreadcrumbSchema, createContactSchema, createFAQSchema } from '../modules/seo/templates';
import { COMPANY_PHONE, COMPANY_EMAIL, GOOGLE_BUSINESS } from '../lib/constants';

const Contact = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      title: 'Head Office',
      details: [
        GOOGLE_BUSINESS.headOffice.address.split(', ')[0],
        GOOGLE_BUSINESS.headOffice.address.split(', ').slice(1).join(', ')
      ],
    },
    {
      title: 'Production Facility',
      details: [GOOGLE_BUSINESS.production.address],
    },
    {
      title: 'Phone',
      details: [COMPANY_PHONE],
      links: [`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`],
    },
    {
      title: 'Email',
      details: [COMPANY_EMAIL],
      links: [`mailto:${COMPANY_EMAIL}`],
    },
    {
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 9:00 AM - 2:00 PM',
        'Sunday: Closed',
      ],
    },
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  // FAQs for Contact/GBP Q&A
  const faqs = [
    {
      question: 'What products does Kattali Textile Limited manufacture?',
      answer:
        "Kattali Textile Limited is a leading Bangladesh garment manufacturer specializing in woven garments, denim products, and children's wear. We produce high-quality apparel for international fashion brands, including shirts, trousers, denim jeans, outerwear, and kidswear. Our production facility in Chittagong handles everything from design to delivery.",
    },
    {
      question: 'Where is Kattali Textile Limited located?',
      answer:
        'Head Office: BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad, Chittagong, Bangladesh. Production Facility: North Kattali Industrial Area, Chittagong, Bangladesh. We are a textile exporter in Chittagong serving global markets from our Bangladesh-based facilities.',
    },
    {
      question: 'What is your minimum order quantity (MOQ)?',
      answer:
        'Our minimum order quantity is typically 5,000 units per style. However, MOQ may vary depending on the product type and customization requirements. Contact our sales team at sales@ktlbd.com or +8801734855403 for specific MOQ details and custom pricing.',
    },
    {
      question: 'Do you have certifications for sustainable manufacturing?',
      answer:
        'Yes. Kattali Textile Limited is committed to sustainable textile production and holds multiple certifications including Accord Fire & Building Safety, Sedex (ethical sourcing), Nirapon, and ISO. We follow eco-friendly practices and ethical manufacturing standards in all operations.',
    },
    {
      question: 'What markets do you serve?',
      answer:
        'As a premier textile exporter in Chittagong, we serve global markets including North America, Europe, and the Middle East. We work with international fashion brands and retailers, delivering high-quality garments manufactured in our Bangladesh facilities.',
    },
    {
      question: 'Do you manufacture denim products?',
      answer:
        "Yes. Kattali Textile Limited is a leading denim manufacturer in Bangladesh, producing premium denim jeans, jackets, and denim apparel. Our North Kattali facility specializes in denim production with eco-friendly washing processes and quality assurance.",
    },
    {
      question: 'Can you handle custom designs?',
      answer:
        'Absolutely. As a full-service woven garment supplier, we offer custom design services including design development, sample creation, and mass production. Contact our design team to discuss your custom requirements.',
    },
    {
      question: 'What are your business hours?',
      answer:
        'Monday - Friday: 9:00 AM - 6:00 PM; Saturday: 9:00 AM - 2:00 PM; Sunday: Closed. For international clients, we are available via email 24/7 and respond within 24 hours.',
    },
  ];

  return (
    <>
      <SEO
        title="Contact Kattali Textile Ltd | Investor Relations & Corporate Office"
        description="Get in touch with Kattali Textile Ltd (KTL). Visit our corporate office in Chittagong or connect with our Investor Relations team for business inquiries."
        canonical="/contact"
        keywords={['KTL contact', 'textile manufacturer contact', 'Bangladesh garment inquiry', 'investor relations', 'chittagong exporter list']}
      />
      <StructuredData data={[createBreadcrumbSchema(breadcrumbs), createContactSchema(), createFAQSchema(faqs)]} />
      <div className="min-h-screen bg-black text-white">
      {/* Full-bleed Background with Dark Overlay */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat contact-bg">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Vertical Contact Label */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="text-white font-heading font-semibold text-base tracking-[0.1em] contact-vertical-text">
            contact us
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 lg:px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column */}
            <div className="space-y-6">
              {contactInfo.slice(0, 3).map((info, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-heading font-semibold text-base text-white mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      info.links && info.links[detailIndex] ? (
                        <a
                          key={detailIndex}
                          href={info.links[detailIndex]}
                          className="block text-[15px] leading-[1.6] text-[#CCCCCC] hover:text-white hover:underline transition-colors duration-200"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={detailIndex} className="text-[15px] leading-[1.6] text-[#CCCCCC]">
                          {detail}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {contactInfo.slice(3).map((info, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-heading font-semibold text-base text-white mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      info.links && info.links[detailIndex] ? (
                        <a
                          key={detailIndex}
                          href={info.links[detailIndex]}
                          className="block text-[15px] leading-[1.6] text-[#CCCCCC] hover:text-white hover:underline transition-colors duration-200"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={detailIndex} className="text-[15px] leading-[1.6] text-[#CCCCCC]">
                          {detail}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative bg-black py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-neutral-300 text-lg max-w-3xl mx-auto">
              Whether you're interested in our <Link to="/products" className="text-primary-400 hover:text-primary-300 font-medium underline">textile manufacturing services</Link>, 
              want to learn more about our <Link to="/facilities/rmg" className="text-primary-400 hover:text-primary-300 font-medium underline">state-of-the-art facilities</Link>, 
              or wish to explore our <Link to="/company/sustainability" className="text-primary-400 hover:text-primary-300 font-medium underline">sustainable practices</Link>, 
              we're here to help. Get in touch with us today.
            </p>
          </div>
          <div className="flex justify-center">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Google Maps and Business Profile Section */}
      <section className="relative bg-neutral-900 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Find Us
            </h2>
            <p className="text-neutral-300 text-lg">
              Visit our <Link to="/facilities/rmg" className="text-primary-400 hover:text-primary-300 font-medium underline">manufacturing facilities</Link> in Chittagong or connect with us on Google Business Profile
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Google Maps Locator - Spans 2 columns */}
            <div className="lg:col-span-2">
              <GoogleMapsLocator height="500px" />
            </div>

            {/* Google Business Widget */}
            <div className="lg:col-span-1">
              <GoogleBusinessWidget
                showMap={true}
                showReviews={true}
                showDirections={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-black py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-300">Find quick answers to common questions about our products and services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-neutral-900 rounded-lg p-6 border border-white/10">
                <h3 className="font-heading text-xl text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <Suspense fallback={<div className="w-5 h-5" />}>
            <ChevronUp size={20} />
          </Suspense>
        </button>
      )}
      </div>
    </>
  );
};

export default Contact;
