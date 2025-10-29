import React from 'react';

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 60,
  direction = 'left',
  logoHeight = 56
}) => {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-8">
      <div
        className={`flex items-center gap-8 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              height: `${logoHeight}px`,
              width: `${logo.width}px`,
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-full w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100"
              style={{
                maxHeight: `${logoHeight}px`,
                maxWidth: `${logo.width}px`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
