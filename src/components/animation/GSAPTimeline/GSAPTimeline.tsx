import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GSAPTimelineProps {
  autoPlay?: boolean;
  startPosition?: number;
  timeScale?: number;
  className?: string;
  children?: React.ReactNode;
}

const GSAPTimeline: React.FC<GSAPTimelineProps> = ({
  autoPlay = true,
  startPosition = 1.2,
  timeScale = 0.8,
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".scrubber", { x: 0 });
      gsap.set(".mask", { scaleX: 1, transformOrigin: "left center" });
      gsap.set(".icon1", { scale: 0, transformOrigin: "center center" });
      gsap.set(".text1", { autoAlpha: 0, scale: 0, transformOrigin: "center center" });
      gsap.set(".icon2", { scale: 0, transformOrigin: "center center" });
      gsap.set(".text2", { autoAlpha: 0, scale: 0, transformOrigin: "center center" });

      // Create sequence2 timeline
      const sequence2 = gsap.timeline();
      sequence2
        .to(".icon2", { scale: 1, duration: 0.3, ease: "back.out(1.7)" })
        .to(".text2", { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2");

      // Main timeline
      const tl = gsap.timeline({ paused: true });

      tl.to(".scrubber", { x: 500, duration: 2, ease: "power2.out" })
        .to(".mask", { scaleX: 0, duration: 1.5, ease: "power2.in" }, "<")
        .to(".icon1", { scale: 1, duration: 0.3, ease: "back.out(1.7)" }, 0.5)
        .to(".text1", { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
        .add(sequence2, "+=0.1")
        .timeScale(timeScale);

      // Seek to position and play if autoPlay is enabled
      if (autoPlay) {
        tl.seek(startPosition).play();
      }

      return () => {
        tl.kill();
        sequence2.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [autoPlay, startPosition, timeScale]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPTimeline;

