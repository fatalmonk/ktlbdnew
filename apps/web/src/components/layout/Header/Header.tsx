import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';
import MobileNavigation from '../MobileNavigation';
import CorporateStaticHeader from '../CorporateStaticHeader';
import logo from '@/assets/images/brand/logo.webp';

const Menu = createLazyIcon('Menu');
const X = createLazyIcon('X');

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 80;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <CorporateStaticHeader />

      <header
        className={`
        fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 lg:hidden
        ${isScrolled ? 'bg-white/95 shadow-2 backdrop-blur-md' : 'bg-transparent'}
      `}
      >
        <div className="mx-auto flex h-[88px] max-w-ktl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kattali Textile Limited Logo"
              className={`
              h-16 md:h-[4.5rem] w-auto transition-all duration-300
              ${isScrolled ? 'drop-shadow-none' : 'drop-shadow-xl'}
            `}
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            className={`
            relative flex items-center justify-center rounded-md min-w-[44px] min-h-[44px]
            transition-colors duration-200
            ${isScrolled ? 'text-neutral-900 hover:text-neutral-700 bg-neutral-100/70' 
                         : 'text-white hover:text-white/80 bg-black/20 backdrop-blur-sm'}
          `}
          >
            <Suspense fallback={<div className="w-6 h-6 md:w-7 md:h-7" />}>
              {isMenuOpen ? (
                <X size={24} className="md:w-7 md:h-7" />
              ) : (
                <Menu size={24} className="md:w-7 md:h-7" />
              )}
            </Suspense>
          </button>
        </div>

        <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </header>
    </>
  );
};

export default Header;
