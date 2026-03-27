import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroContentProps {
  slide: {
    title: string;
    subtitle?: string;
    description: string;
    cta: {
      primary: { label: string; href: string; icon?: React.ReactNode };
      secondary?: { label: string; href: string; icon?: React.ReactNode };
    };
  };
  opacity: MotionValue<number>;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 }
});

const HeroButton = ({
  href,
  label,
  icon,
  variant = 'primary'
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3 font-bold rounded-lg min-h-[48px] transition-colors duration-200 text-sm md:text-base';

  const styles =
    variant === 'primary'
      ? 'bg-primary-500 text-black hover:bg-primary-600'
      : 'border-2 border-white text-white hover:bg-white/10';

  return (
    <Link to={href} aria-label={label} className={`${base} ${styles}`}>
      {label}
      {icon}
    </Link>
  );
};

const HeroContent: React.FC<HeroContentProps> = ({ slide, opacity }) => {
  return (
    <motion.div className="relative z-20 flex h-full items-center" style={{ opacity }}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl">

        {slide.subtitle && (
          <motion.div className="mb-4 flex justify-start" {...fadeUp(0.1)}>
            <span className="rounded-full bg-primary-500/20 px-4 py-2 backdrop-blur-sm">
              <span className="text-primary-400 text-sm font-medium">
                {slide.subtitle}
              </span>
            </span>
          </motion.div>
        )}

        <motion.h1
          {...fadeUp(0.2)}
          className="mb-5 text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight text-left"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mb-8 max-w-2xl text-lg text-neutral-200 leading-relaxed text-left"
        >
          {slide.description}
        </motion.p>

        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-col gap-4 sm:flex-row sm:items-start"
        >
          <HeroButton
            href={slide.cta.primary.href}
            label={slide.cta.primary.label}
            icon={slide.cta.primary.icon}
            variant="primary"
          />

          {slide.cta.secondary && (
            <HeroButton
              href={slide.cta.secondary.href}
              label={slide.cta.secondary.label}
              icon={slide.cta.secondary.icon}
              variant="secondary"
            />
          )}
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroContent;