import React, { useState, useRef } from 'react';
import { motion, useAnimationFrame, AnimatePresence } from 'framer-motion';
import { ExternalLink, Globe, Users } from 'lucide-react';
import { PartnerLogo } from '../../types/partner';

interface EnhancedLogoCarouselProps {
  partners: PartnerLogo[];
  speed?: number;
}

const EnhancedLogoCarousel: React.FC<EnhancedLogoCarouselProps> = ({
  partners,
  speed = 30
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useRef(0);

  useAnimationFrame(() => {
    if (!isPaused && containerRef.current) {
      scrollX.current += speed / 60;
      if (scrollX.current >= containerRef.current.scrollWidth / 2) {
        scrollX.current = 0;
      }
      containerRef.current.style.transform = `translateX(-${scrollX.current}px)`;
    }
  });

  return (
    <div className="relative overflow-hidden py-12">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Logo Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredPartner(null);
        }}
        role="region"
        aria-label="Partner logos carousel"
      >
        {/* Duplicate logos for seamless loop */}
        {[...partners, ...partners].map((partner, index) => (
          <motion.div
            key={`${partner.id}-${index}`}
            className="relative flex-shrink-0 group"
            onMouseEnter={() => setHoveredPartner(partner.id)}
            onMouseLeave={() => setHoveredPartner(null)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* Logo */}
            <div className="px-8 py-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPartner === partner.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-4 bg-white rounded-xl shadow-xl z-20"
                  role="tooltip"
                  aria-labelledby={`partner-${partner.id}-name`}
                  aria-describedby={`partner-${partner.id}-description`}
                >
                  {/* Arrow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />

                  {/* Content */}
                  <div className="relative">
                    <h4
                      id={`partner-${partner.id}-name`}
                      className="font-bold text-lg mb-2"
                    >
                      {partner.name}
                    </h4>
                    <p
                      id={`partner-${partner.id}-description`}
                      className="text-sm text-gray-600 mb-3"
                    >
                      {partner.description}
                    </p>

                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Partnership:</span>
                        {partner.partnership}
                      </div>

                      {partner.employees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {partner.employees} employees
                        </div>
                      )}

                      {partner.location && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {partner.location}
                        </div>
                      )}
                    </div>

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-primary-600 font-medium hover:text-primary-700"
                        aria-label={`Visit ${partner.name} website`}
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedLogoCarousel;
