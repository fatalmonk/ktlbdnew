import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MobileNavigation from '../MobileNavigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is typically 100vh, detect scroll past it
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] h-[72px]">
      <div className="flex items-center justify-between h-[72px] px-4">
        {/* Logo (left side, all screen sizes) */}
        <Link to="/" className="flex items-center pt-8">
          <img
            src="/logos/ktl-logo.webp"
            alt="Kattali Textile Limited Logo"
            className="h-20 lg:h-32 w-auto object-contain drop-shadow-2xl"
          />
        </Link>

        {/* Menu button (right side, all screen sizes) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-md transition-colors duration-300 ${
            isScrolled
              ? 'text-black hover:text-black/75'
              : 'text-white hover:text-white/75 drop-shadow-lg'
          }`}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MobileNavigation (works for all screens) */}
      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
