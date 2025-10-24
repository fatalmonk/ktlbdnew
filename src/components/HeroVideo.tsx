import React from 'react';
import { Link } from 'react-router-dom';

type CTA = { label: string; href: string };

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  ctas?: CTA[];
  height?: string; // tailwind height utility classes
};

const HeroVideo: React.FC<Props> = ({ title, subtitle, ctas = [], height = 'h-screen' }) => {
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return (
    <section
      data-testid="hero"
      className={`relative ${height} flex items-center justify-center overflow-hidden bg-black text-white`}
    >
      {!(reduceMotion || showFallback) ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="./assets/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="./assets/hero.jpg"
          onError={() => setShowFallback(true)}
        />
      ) : (
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="./assets/hero.jpg"
          alt="Hero background"
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-ananta mx-auto px-4 text-center pt-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-heading text-h1-mobile md:text-h1 lg:text-display font-bold mb-8 leading-[0.9] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-body-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/90 font-light">
              {subtitle}
            </p>
          )}
          {ctas.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {ctas.map((cta, index) => (
                <Link
                  key={cta.href}
                  to={cta.href}
                  className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    index === 0
                      ? 'btn-primary bg-white text-black hover:bg-gray-100'
                      : 'btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
