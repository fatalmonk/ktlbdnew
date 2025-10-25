import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import OptimizedImage from './OptimizedImage';

type PanelData = {
  id: number;
  image: string;
  ratio: number;
  title: string;
  description: string;
};

type Props = {
  cta?: { label: string; href: string };
};

const KTLHero: React.FC<Props> = ({ cta }) => {
  const [activePanel, setActivePanel] = useState(0);

  const panels: PanelData[] = [
    {
      id: 0,
      image: '/assets/denimcloseup.jpg',
      ratio: 0.19,
      title: "premium denim",
      description: "innovative washes and sustainable manufacturing for timeless denim"
    },
    {
      id: 1,
      image: '/assets/designer-1.jpg',
      ratio: 0.19,
      title: "woven apparel",
      description: "expertly crafted shirts, pants, and tailored pieces for every occasion"
    },
    {
      id: 2,
      image: '/assets/engin-akyurt-ahs1R32GG9Y-unsplash.jpg',
      ratio: 0.22,
      title: "knitwear & jerseys",
      description: "soft, premium knit apparel with superior comfort and contemporary design"
    },
    {
      id: 3,
      image: '/assets/aleksandr-prokhortsev-9OIl4fdVPxs-unsplash.jpg',
      ratio: 0.22,
      title: "performance swimwear",
      description: "technical swimwear combining athletic performance with modern aesthetics"
    },
    {
      id: 4,
      image: '/assets/collins-lesulie-0nVnbzYxAvA-unsplash.jpg',
      ratio: 0.18,
      title: "activewear & athleisure",
      description: "performance-driven sportswear that transitions seamlessly from gym to lifestyle"
    },
    {
      id: 5,
      image: '/assets/designer-2.jpg',
      ratio: 0.19,
      title: "children's apparel",
      description: "safe, durable, and playful designs crafted for growing children"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % panels.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [panels.length]);

  const handlePanelClick = (panelId: number) => setActivePanel(panelId);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              activePanel === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-full h-full overflow-hidden">
              <OptimizedImage
                key={`${panel.id}-${activePanel === index ? 'active' : 'inactive'}`}
                src={panel.image}
                alt={`Hero slide ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0"
                style={{
                  animation: activePanel === index ? 'zoomIn 10s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards' : 'none',
                }}
              />
            </div>
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content - Left Aligned */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-[600px]">
            {panels.map((panel, index) => (
              <div
                key={panel.id}
                className={`transition-all duration-700 ${
                  activePanel === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute'
                }`}
                style={{
                  transitionDelay: activePanel === index ? '300ms' : '0ms',
                }}
              >
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight lowercase"
                    style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  {panel.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-10 leading-relaxed"
                   style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
                  {panel.description}
                </p>
                {cta && index === panels.length - 1 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={cta.href}
                      className="inline-flex items-center justify-center px-8 py-4 bg-[#fdd336] hover:bg-[#ca8a04] text-black font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg hover:-translate-y-1"
                    >
                      {cta.label}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails and Indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col space-y-3">
          {panels.map((panel, index) => (
            <button
              key={panel.id}
              onClick={() => handlePanelClick(panel.id)}
              className={`w-9 h-9 rounded-full border-2 transition-all duration-200 overflow-hidden ${
                activePanel === index
                  ? 'border-white scale-110'
                  : 'border-white/70 hover:border-white/90'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <OptimizedImage
                src={panel.image}
                alt={`Thumbnail for slide ${index + 1}`}
                className="w-full h-full object-cover grayscale"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <div className="flex space-x-3">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePanelClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activePanel === index
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KTLHero;
