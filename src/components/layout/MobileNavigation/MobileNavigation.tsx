import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, X, Search as SearchIcon } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../../lib/navigation';
import { SOCIAL_MEDIA } from '../../../lib/constants';

interface NavItem {
  name: string;
  href: string;
  type: 'link' | 'dropdown';
  children?: Array<{ name: string; href: string }>;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuState {
  currentPanel: string;
  panelHistory: string[];
  isTransitioning: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>({
    currentPanel: 'main',
    panelHistory: [],
    isTransitioning: false,
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Navigation functions
  const navigateToPanel = (panelName: string) => {
    if (menuState.isTransitioning) return;

    setMenuState({
      currentPanel: panelName,
      panelHistory: [...menuState.panelHistory, menuState.currentPanel],
      isTransitioning: true,
    });

    setTimeout(() => {
      setMenuState((prev) => ({ ...prev, isTransitioning: false }));
    }, 300);
  };

  const navigateBack = useCallback(() => {
    if (menuState.isTransitioning || menuState.panelHistory.length === 0) return;

    const previousPanel = menuState.panelHistory[menuState.panelHistory.length - 1];
    const newHistory = menuState.panelHistory.slice(0, -1);

    setMenuState({
      currentPanel: previousPanel,
      panelHistory: newHistory,
      isTransitioning: true,
    });

    setTimeout(() => {
      setMenuState((prev) => ({ ...prev, isTransitioning: false }));
    }, 300);
  }, [menuState.isTransitioning, menuState.panelHistory]);

  const handleClose = useCallback(() => {
    onClose();
    // Reset to main panel when closing
    setTimeout(() => {
      setMenuState({
        currentPanel: 'main',
        panelHistory: [],
        isTransitioning: false,
      });
      setSearchQuery('');
      setIsSearchOpen(false);
    }, 300);
  }, [onClose]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
    if (!isSearchOpen) {
      // Focus search input after state updates
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Close menu on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuState.currentPanel !== 'main') {
          navigateBack();
        } else {
          handleClose();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuState.currentPanel, navigateBack, handleClose]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle mount/unmount animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Swipe gesture support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX.current - touchStartX.current;

      // Swipe right to go back (if not on main panel)
      if (swipeDistance > 100 && menuState.currentPanel !== 'main') {
        navigateBack();
      }

      // Swipe right from edge to close menu
      if (swipeDistance > 150 && touchStartX.current < 50) {
        handleClose();
      }
    };

    const menuElement = menuRef.current;
    if (menuElement && isOpen) {
      menuElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      menuElement.addEventListener('touchmove', handleTouchMove, { passive: true });
      menuElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener('touchstart', handleTouchStart);
        menuElement.removeEventListener('touchmove', handleTouchMove);
        menuElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isOpen, menuState.currentPanel, navigateBack, handleClose]);

  if (!isVisible && !isOpen) return null;

  // Get all navigation items including children for search
  const getAllNavigationItems = () => {
    const allItems: Array<{ name: string; href: string; parent?: string }> = [];

    NAVIGATION_ITEMS.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          allItems.push({
            name: child.name,
            href: child.href,
            parent: item.name,
          });
        });
      } else {
        allItems.push({
          name: item.name,
          href: item.href,
        });
      }
    });

    return allItems;
  };

  // Filter search results
  const getSearchResults = () => {
    if (!searchQuery) return [];

    const query = searchQuery.toLowerCase();
    const allItems = getAllNavigationItems();

    return allItems.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(query);
      const parentMatch = item.parent?.toLowerCase().includes(query);
      return nameMatch || parentMatch;
    });
  };

  // Get current parent item for submenu panels
  const getCurrentParentItem = () => {
    return NAVIGATION_ITEMS.find((item) => item.name === menuState.currentPanel);
  };

  // Render main panel items
  const renderMainPanelItem = (item: NavItem, index: number) => {
    const isActive = location.pathname === item.href;

    if (item.type === 'dropdown' && item.children) {
      return (
        <button
          key={item.name}
          onClick={() => navigateToPanel(item.name)}
          className="flex items-center justify-between w-full py-4 px-8 text-left"
          style={{
            animation: `slideInFromLeft 0.3s ease-out ${index * 0.05}s both`,
          }}
        >
          <div className="inline-block relative">
            <div className="absolute bottom-1 left-0 h-1.5 w-full bg-primary-500 -z-10"></div>
            <span className="text-2xl font-bold text-black relative z-10 tracking-wider">
              {item.name}
            </span>
          </div>
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </button>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={handleClose}
        className="flex items-center justify-between py-4 px-8"
        style={{
          animation: `slideInFromLeft 0.3s ease-out ${index * 0.05}s both`,
        }}
      >
        <div className="inline-block relative">
          <div className="absolute bottom-1 left-0 h-1.5 w-full bg-primary-500 -z-10"></div>
          <span className="text-2xl font-bold text-black relative z-10 tracking-wider">
            {item.name}
          </span>
        </div>
        {isActive && <div className="w-2 h-2 bg-primary-500 rounded-full" />}
      </Link>
    );
  };

  // Render submenu panel items
  const renderSubmenuItem = (child: { name: string; href: string }, index: number, hasSubmenu: boolean = false) => {
    return (
      <Link
        key={child.name}
        to={child.href}
        onClick={handleClose}
        className="flex items-center justify-between py-5 px-8 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        style={{
          animation: `slideInFromRight 0.3s ease-out ${(index + 1) * 0.05}s both`,
        }}
      >
        <span className="text-xl font-normal text-black">
          {child.name}
        </span>
        {hasSubmenu && <ChevronRight className="h-5 w-5 text-gray-400" />}
      </Link>
    );
  };

  // Render overview/parent title as first item in submenu
  const renderOverviewItem = () => {
    return (
      <div
        key="overview"
        className="py-5 px-8"
        style={{
          animation: `slideInFromRight 0.3s ease-out 0s both`,
        }}
      >
        <span className="text-xl font-normal text-black">Overview</span>
      </div>
    );
  };

  const currentParent = getCurrentParentItem();
  const isMainPanel = menuState.currentPanel === 'main';
  const searchResults = getSearchResults();

  return (
    <>
      {/* Overlay background with fade animation */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Mobile menu container - Full width on mobile, side drawer on desktop */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 w-full lg:w-96 bg-white min-h-screen shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white">
          {/* Top bar with centered logo, close button, and search */}
          <div className="relative flex items-center justify-center px-6 py-6 mb-8">
            {/* Close button - absolute left */}
            <button
              onClick={handleClose}
              aria-label="Close menu"
              className="absolute left-6 p-2"
            >
              <X className="h-7 w-7 text-gray-900" />
            </button>

            {/* Centered logo */}
            <div className="text-center">
              <div className="text-2xl font-bold text-black lowercase">kattali textile limited</div>
            </div>

            {/* Search icon - absolute right */}
            <button
              onClick={toggleSearch}
              aria-label="Search"
              className="absolute right-6 p-2"
            >
              <SearchIcon className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          {/* Search Panel */}
          {isSearchOpen && (
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                />
              </div>
            </div>
          )}

          {/* Back button (only visible in submenus) */}
          {!isMainPanel && (
            <button
              onClick={navigateBack}
              className="flex items-center w-full px-8 py-5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-base text-gray-600">Back</span>
            </button>
          )}
        </div>

        {/* Scrollable content area */}
        <div className="flex flex-col h-[calc(100vh-120px)]">
          <div className="overflow-y-auto flex-1 relative">
            {/* Search Results */}
            {isSearchOpen && searchQuery ? (
              <div className="px-8 py-4">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((item, index) => (
                      <Link
                        key={`${item.href}-${index}`}
                        to={item.href}
                        onClick={handleClose}
                        className="block py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="text-base font-semibold text-black">{item.name}</div>
                        {item.parent && (
                          <div className="text-sm text-gray-500 mt-0.5">{item.parent}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Main Panel */}
                <div
                  className={`absolute inset-0 transition-transform duration-300 ease-out ${
                    isMainPanel ? 'translate-x-0' : '-translate-x-full'
                  }`}
                >
                  <nav role="navigation" aria-label="Main navigation menu">
                    {NAVIGATION_ITEMS.map((item, index) => renderMainPanelItem(item, index))}
                  </nav>
                </div>

                {/* Submenu Panel */}
                {!isMainPanel && currentParent && currentParent.children && (
                  <div
                    className={`absolute inset-0 bg-white transition-transform duration-300 ease-out ${
                      isMainPanel ? 'translate-x-full' : 'translate-x-0'
                    }`}
                  >
                  <nav role="navigation" aria-label={`${currentParent.name} submenu`}>
                    {currentParent.children.map((child, index) => renderSubmenuItem(child, index))}
                  </nav>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Social Links Footer */}
          {!isSearchOpen && (
            <div className="border-t border-gray-200 px-8 py-6 bg-white">
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium" style={{ color: '#fdd336' }}>Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  <li className="sm-socials-item">
                    <a
                      href={SOCIAL_MEDIA.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="sm-socials-item">
                    <a
                      href={SOCIAL_MEDIA.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-[1.2rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyframe animations and Social Links Styles */}
      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: #fdd336; }
        .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
        .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
        .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
        .sm-socials-list .sm-socials-link:hover,
        .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
        .sm-socials-link:focus-visible { outline: 2px solid #fdd336; outline-offset: 3px; }
        .sm-socials-link { font-size: 1.2rem; font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
        .sm-socials-link:hover { color: #fdd336; }
      `}</style>
    </>
  );
};

export default MobileNavigation;
