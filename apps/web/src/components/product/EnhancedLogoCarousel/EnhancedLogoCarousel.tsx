import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { createPortal } from "react-dom";
import { motion, useAnimationFrame } from "framer-motion";
import { createLazyIcon } from "@/lib/lucide-icons";

const ExternalLink = createLazyIcon("ExternalLink");
const Globe = createLazyIcon("Globe");
const Users = createLazyIcon("Users");
import { useMediaQuery } from "@/hooks/useResponsive";
import { PartnerLogo } from "@/types/partner";
import Image from "../../media/Image";

interface EnhancedLogoCarouselProps {
  partners: PartnerLogo[];
  speed?: number;
}

/** Wide wordmarks: scale down height so they stay proportionate vs square marks */
const LOGO_IMG_DEFAULT =
  "h-16 w-auto object-contain transition-all duration-300 md:h-24 lg:h-28 xl:h-32 2xl:h-36";
const LOGO_IMG_WIDE =
  "h-12 w-auto max-w-[min(200px,50vw)] object-contain transition-all duration-300 md:h-16 lg:h-20 xl:h-24 2xl:h-28";

type TooltipState = {
  partner: PartnerLogo;
  anchor: HTMLElement;
  anchorKey: string;
};

function tooltipPosition(anchor: HTMLElement) {
  const r = anchor.getBoundingClientRect();
  const margin = 12;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const w = 320; // w-80
  let left = r.left + r.width / 2;
  left = Math.max(margin + w / 2, Math.min(vw - margin - w / 2, left));
  return {
    left,
    top: r.bottom + margin,
    transform: "translateX(-50%)",
  } as const;
}

const MD_UP = "(min-width: 768px)";

const EnhancedLogoCarousel: React.FC<EnhancedLogoCarouselProps> = ({
  partners,
  speed = 30,
}) => {
  const isMdUp = useMediaQuery(MD_UP);
  const effectiveSpeedRef = useRef(speed);
  /** Slower scroll on small viewports — same prop scales down (~44% below md). */
  effectiveSpeedRef.current = isMdUp
    ? speed
    : Math.max(24, Math.round(speed * 0.44));

  const [isPaused, setIsPaused] = useState(false);
  const [tip, setTip] = useState<TooltipState | null>(null);
  const [, bumpPosition] = useReducer((x: number) => x + 1, 0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useRef(0);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setTip(null), 180);
  }, [cancelClose]);

  const openTip = useCallback(
    (partner: PartnerLogo, anchor: HTMLElement, anchorKey: string) => {
      cancelClose();
      setTip({ partner, anchor, anchorKey });
    },
    [cancelClose],
  );

  useAnimationFrame(() => {
    if (!isPaused && containerRef.current) {
      scrollX.current += effectiveSpeedRef.current / 60;
      if (scrollX.current >= containerRef.current.scrollWidth / 2) {
        scrollX.current = 0;
      }
      containerRef.current.style.transform = `translateX(-${scrollX.current}px)`;
    }
  });

  // Reposition on scroll/resize while tooltip open (anchor moves with marquee)
  useEffect(() => {
    if (!tip) return;
    const bump = () => bumpPosition();
    window.addEventListener("scroll", bump, true);
    window.addEventListener("resize", bump);
    return () => {
      window.removeEventListener("scroll", bump, true);
      window.removeEventListener("resize", bump);
    };
  }, [tip]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const tooltipBody =
    tip && typeof document !== "undefined"
      ? createPortal(
          <motion.div
            key={tip.anchorKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-auto fixed z-[200] w-80 max-h-[min(70vh,28rem)] overflow-y-auto rounded-xl border border-neutral-200/80 bg-white p-4 shadow-2xl"
            style={tooltipPosition(tip.anchor)}
            role="tooltip"
            aria-labelledby={`partner-tip-${tip.anchorKey}`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-neutral-200/80 bg-white" />
            <div className="relative pt-1">
              <h4
                id={`partner-tip-${tip.anchorKey}`}
                className="mb-2 text-lg font-bold"
              >
                {tip.partner.name}
              </h4>
              <p className="mb-3 text-sm text-neutral-600">
                {tip.partner.description}
              </p>
              <div className="flex flex-col gap-2 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Partnership:</span>
                  {tip.partner.partnership}
                </div>
                {tip.partner.employees && (
                  <div className="flex items-center gap-2">
                    <Suspense fallback={<div className="h-4 w-4" />}>
                      <Users className="h-4 w-4" />
                    </Suspense>
                    {tip.partner.employees} employees
                  </div>
                )}
                {tip.partner.location && (
                  <div className="flex items-center gap-2">
                    <Suspense fallback={<div className="h-4 w-4" />}>
                      <Globe className="h-4 w-4" />
                    </Suspense>
                    {tip.partner.location}
                  </div>
                )}
              </div>
              {tip.partner.website && (
                <a
                  href={tip.partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-medium text-primary-600 hover:text-primary-700"
                  aria-label={`Visit ${tip.partner.name} website`}
                >
                  Visit Website
                  <Suspense fallback={<div className="h-3 w-3" />}>
                    <ExternalLink className="h-3 w-3" />
                  </Suspense>
                </a>
              )}
            </div>
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <div className="relative overflow-x-hidden py-8 md:py-14 lg:py-16 xl:py-20">
      {tooltipBody}
      {/* Gradient Masks */}
      <div className="absolute bottom-0 left-0 top-0 z-10 w-14 bg-gradient-to-r from-white to-transparent sm:w-24 md:w-32 lg:w-40" />
      <div className="absolute bottom-0 right-0 top-0 z-10 w-14 bg-gradient-to-l from-white to-transparent sm:w-24 md:w-32 lg:w-40" />

      {/* Logo Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-8 md:gap-14 lg:gap-16 xl:gap-20 2xl:gap-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          scheduleClose();
        }}
        role="region"
        aria-label="Partner logos carousel"
      >
        {[...partners, ...partners].map((partner, index) => (
          <motion.div
            key={`${partner.id}-${index}`}
            className="relative flex-shrink-0 group"
            onMouseEnter={(e) =>
              openTip(partner, e.currentTarget, `${partner.id}-${index}`)
            }
            onMouseLeave={scheduleClose}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div
              className={
                partner.id === "celebrity-pink"
                  ? "px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6"
                  : "px-5 py-4 md:px-10 md:py-6 lg:px-12 lg:py-8 xl:px-14 xl:py-10"
              }
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                className={
                  partner.id === "celebrity-pink"
                    ? LOGO_IMG_WIDE
                    : LOGO_IMG_DEFAULT
                }
                fit="contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedLogoCarousel;
