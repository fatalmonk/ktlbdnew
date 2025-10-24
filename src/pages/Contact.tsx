import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import GoogleMapsLocator from '../components/GoogleMapsLocator';
import GoogleBusinessWidget from '../components/GoogleBusinessWidget';
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

  return (
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
          <div className="flex justify-center">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Google Maps and Business Profile Section */}
      <section className="relative bg-gray-900 py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Find Us
            </h2>
            <p className="text-gray-300 text-lg">
              Visit our locations or connect with us on Google Business Profile
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Contact;
