import logo from '@/assets/images/brand/logo.webp';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnnouncementTicker from '../AnnouncementTicker';
import DesktopMegaMenu from '../DesktopMegaMenu/DesktopMegaMenu';
import HeaderSearch from '../HeaderSearch';
import WebMenuHidden from '../WebMenuHidden/WebMenuHidden';

type CorporateStaticHeaderProps = {
  /** When true, header slides up (unless mega menu is open). */
  scrollHidden?: boolean;
};

const CorporateStaticHeader: React.FC<CorporateStaticHeaderProps> = ({
  scrollHidden = false,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const containerRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleDropdown = useCallback((dropdown: string | null) => {
    clearTimer();
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  }, [clearTimer]);

  const setOpenWithIntent = useCallback((dropdown: string | null, delay = 0) => {
    clearTimer();
    if (delay === 0) {
      setOpenDropdown(dropdown);
    } else {
      timerRef.current = setTimeout(() => {
        setOpenDropdown(dropdown);
        timerRef.current = null;
      }, delay);
    }
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [openDropdown]);

  // Body class and scroll management
  useEffect(() => {
    if (openDropdown) {
      document.body.classList.add('megaMenuActive');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('megaMenuActive');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('megaMenuActive');
      document.body.style.overflow = '';
    };
  }, [openDropdown]);

  const hideOnScroll = scrollHidden && !openDropdown;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[9990] bg-black/40 transition-opacity duration-300 pointer-events-none lg:pointer-events-auto ${openDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpenDropdown(null)}
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[9999] hidden bg-white shadow-1 transition-transform duration-300 ease-out lg:block ${
          hideOnScroll ? '-translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
        ref={containerRef}
      >
        {/* z-10: nav + mega menus must stack above the ticker (later sibling) */}
        <div className="mx-auto w-full max-w-[1470px] relative z-10">
          {/* 17px decorative strip — exact macysinc.com spec */}
          <div
            className="mx-auto w-full max-w-[1430px]"
            style={{
              height: '17px',
              backgroundImage: 'linear-gradient(90deg, #fdd338 50%, #e11a2b 50%, #e11a2b 66.33%, #000000 66.33%, #000000 82.66%, #1c6fe3 82.66%, #1c6fe3 100%)',
              backgroundSize: '100% 17px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 0%',
            }}
            aria-hidden
          />
          <div className="pane--static-header-container relative w-full">
            <WebMenuHidden />
            <div className="pane--static-header overflow-visible">
              <div className="mx-auto flex h-[var(--secondary-nav-height)] w-full max-w-[1430px] items-center justify-between px-10">
                <div className="pane--static-header-logo">
                  <div className="module-logo">
                    <Link to="/" className="module-logo__link">
                      <img
                        src={logo}
                        alt="Kattali Textile Limited"
                        className="module-logo__img"
                      />
                    </Link>
                  </div>
                </div>
                <div className="pane--static-nav ml-auto flex min-w-0 shrink items-center gap-2 overflow-visible md:gap-3 lg:gap-4">
                  <DesktopMegaMenu
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    toggleDropdown={toggleDropdown}
                    setOpenWithIntent={setOpenWithIntent}
                    containerRef={containerRef}
                  />
                  <div className="search-container shrink-0">
                    <HeaderSearch />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {location.pathname === '/' && (
            <AnnouncementTicker isHidden={!!openDropdown} />
          )}
        </div>
      </header>
    </>
  );
};

export default CorporateStaticHeader;
