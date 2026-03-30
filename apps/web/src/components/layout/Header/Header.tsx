import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';
import MobileNavigation from '../MobileNavigation';
import CorporateStaticHeader from '../CorporateStaticHeader';
import HeaderSearch from '../HeaderSearch';
import AnnouncementTicker from '../AnnouncementTicker';

const Menu = createLazyIcon('Menu');
const X = createLazyIcon('X');

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      const delta = y - lastScrollY.current;
      if (y < 48) {
        setScrollHidden(false);
      } else if (delta > 6) {
        setScrollHidden(true);
      } else if (delta < -6) {
        setScrollHidden(false);
      }
      lastScrollY.current = y;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const hideOnScroll = scrollHidden && !isMenuOpen;

  return (
    <>
      <CorporateStaticHeader scrollHidden={scrollHidden} />

      <header
        className={`
        fixed top-0 left-0 right-0 z-[9999] bg-white transition-transform duration-300 ease-out lg:hidden
        ${hideOnScroll ? '-translate-y-full pointer-events-none' : 'translate-y-0'}
      `}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1470px]">
          <div className="corp-header-strip mx-auto w-full max-w-[1430px]" aria-hidden />
          <div className="mx-auto grid h-[var(--mobile-nav-height)] w-full max-w-[1430px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-0.5 px-1.5 md:gap-1 md:px-3">
            <div className="flex min-w-0 justify-start">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                className="relative flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-md text-neutral-900 transition-colors hover:bg-neutral-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                <Suspense fallback={<div className="h-7 w-7 sm:h-8 sm:w-8" />}>
                  {isMenuOpen ? (
                    <X
                      size={30}
                      strokeWidth={2.5}
                      className="h-7 w-7 sm:h-8 sm:w-8"
                    />
                  ) : (
                    <Menu
                      size={30}
                      strokeWidth={2.5}
                      className="h-7 w-7 sm:h-8 sm:w-8"
                    />
                  )}
                </Suspense>
              </button>
            </div>

            <Link
              to="/"
              className="flex min-h-0 min-w-0 flex-shrink-0 items-center justify-center px-0.5"
            >
              <span className="font-heading text-center text-[1.75rem] font-semibold leading-none tracking-tight text-[#243a4f] lowercase sm:text-[2.4rem] md:text-4xl">
                kattali textile limited
              </span>
            </Link>

            <div className="search-container flex min-w-0 justify-end">
              <HeaderSearch />
            </div>
          </div>
          {location.pathname === '/' && (
            <AnnouncementTicker isHidden={isMenuOpen} />
          )}
        </div>

        <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </header>
    </>
  );
};

export default Header;
