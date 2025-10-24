import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shirt } from 'lucide-react';
import Search from '../components/Search';
import DesktopMegaMenu from '../components/DesktopMegaMenu';
import MobileNavigation from '../components/MobileNavigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ariaLabel = isMenuOpen ? 'Close navigation menu' : 'Open navigation menu';
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setOpenWithIntent = (next: string | null, delay = next ? 200 : 300) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenDropdown(next), delay);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] h-[72px] transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="w-full">
        <div className="flex items-center h-[72px] px-4">
          {/* Mobile: Hamburger on left (visible below lg) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-white hover:text-white/75 drop-shadow-lg lg:hidden"
            aria-label={ariaLabel}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Desktop: left aligned, Mobile: centered */}
          <Link to="/" className="flex items-center space-x-4 lg:ml-0 absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none">
            <div className="hidden lg:flex w-14 h-14 bg-brand-primary/90 backdrop-blur-sm rounded-lg items-center justify-center border border-black-300/50">
              <Shirt className="w-8 h-8 text-neutral-900" />
            </div>
            <div>
              {/* Mobile: white text, Desktop: white text */}
              <h1 className="font-sans font-bold text-xl text-white lg:text-white drop-shadow-lg lg:drop-shadow-none lowercase">
                kattali textile limited
              </h1>
              <p className="hidden lg:block text-sm text-white/95 lg:text-white/80 drop-shadow-lg lg:drop-shadow-none">Since 2002</p>
            </div>
          </Link>

          {/* Spacer to push nav to the right */}
          <div className="flex-1"></div>

          {/* Desktop nav (visible at lg+) - Shifted to the right */}
          <DesktopMegaMenu
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setOpenWithIntent={setOpenWithIntent}
            containerRef={containerRef}
          />

          {/* Search on the right */}
          <div className="flex items-center ml-4">
            <Search />
          </div>
        </div>

        {/* Mobile drawer */}
        <MobileNavigation
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
