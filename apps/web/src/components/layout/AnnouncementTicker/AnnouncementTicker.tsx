import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { announcementTicker } from '@/data/announcementTicker';

/** Pause-style vertical bars after “News” (Macy’s Inc.–style badge) */
const NewsPauseMarks = () => (
  <span className="ml-1 inline-flex items-center gap-[3px]" aria-hidden>
    <span className="inline-block h-[13px] w-[2px] rounded-[1px] bg-white" />
    <span className="inline-block h-[13px] w-[2px] rounded-[1px] bg-white" />
  </span>
);

interface AnnouncementTickerProps {
  isHidden?: boolean;
}

const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ isHidden }) => {
  const text = useMemo(() => announcementTicker.lines.join('   ·   '), []);

  return (
    <section
      className={`relative z-0 flex w-full bg-[var(--announcement-ticker-yellow)] transition-all duration-300 ${
        isHidden ? 'invisible h-0 opacity-0 overflow-hidden' : 'visible h-auto opacity-100'
      }`}
      aria-label="News and announcements"
    >
      <Link
        to={announcementTicker.badgeHref}
        className="flex min-h-[50px] shrink-0 items-center gap-0.5 self-stretch bg-[var(--announcement-ticker-badge-red)] px-3.5 py-2.5 font-body text-[1.8rem] font-normal leading-none text-white outline-none transition-colors hover:bg-[#c91526] focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--announcement-ticker-badge-red)] sm:px-5"
      >
        <span className="whitespace-nowrap">{announcementTicker.badgeLabel}</span>
        <NewsPauseMarks />
      </Link>
      <div className="announcement-ticker-mask relative flex min-h-[50px] min-w-0 flex-1 items-stretch overflow-hidden pl-5 pr-3 sm:pl-8 sm:pr-6">
        <div className="announcement-ticker-track announcement-ticker-typography flex h-full min-h-[50px] w-max shrink-0 flex-nowrap items-center font-body text-[1.8rem] font-normal leading-normal text-black animate-announcement-marquee">
          {/* No flex gap — gap breaks translateX(-50%) seamless loop; use trailing padding on each copy */}
          <span className="inline-block shrink-0 whitespace-nowrap pr-12 sm:pr-16">{text}</span>
          <span className="inline-block shrink-0 whitespace-nowrap pr-12 sm:pr-16" aria-hidden>
            {text}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementTicker;
