import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../lib/navigation';

interface DesktopMegaMenuProps {
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  setOpenWithIntent: (dropdown: string | null, delay?: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({
  openDropdown,
  setOpenDropdown,
  setOpenWithIntent,
  containerRef,
}) => {
  const renderNavItem = (item: typeof NAVIGATION_ITEMS[0]) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.name}
          to={item.href}
          className="px-4 py-2 text-[17px] leading-6 font-medium tracking-[0.01em] text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md"
        >
          {item.name}
        </Link>
      );
    }

    const isOpen = openDropdown === item.name;
    const panelId = `panel-${item.name.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div key={item.name} className="relative">
        <button
          onMouseEnter={() => setOpenWithIntent(item.name, 150)}
          onMouseLeave={() => setOpenWithIntent(null, 250)}
          onFocus={() => setOpenWithIntent(item.name, 100)}
          onBlur={(e) => {
            if (!containerRef.current?.contains(e.relatedTarget as Node)) {
              setOpenWithIntent(null, 200);
            }
          }}
          onClick={() => setOpenDropdown(isOpen ? null : item.name)}
          className="px-4 py-2 text-[17px] leading-6 font-medium tracking-[0.01em] text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md flex items-center"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={panelId}
        >
          {item.name}
          <span className="ml-2 opacity-80 group-open:rotate-180 transition">
            <ChevronDown className="h-5 w-5" />
          </span>
        </button>

        <div
          id={panelId}
          aria-label={item.name}
          className={`${
            isOpen
              ? 'pointer-events-auto opacity-100 translate-y-0'
              : 'pointer-events-none opacity-0 -translate-y-1'
          } absolute left-0 top-full z-50 mt-2 w-[min(36rem,92vw)] rounded-lg border border-black/5 bg-white shadow-lg transition-all duration-200`}
          onMouseEnter={() => setOpenWithIntent(item.name, 100)}
          onMouseLeave={() => setOpenWithIntent(null, 200)}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`trigger-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.children?.map((child) => (
                <Link
                  key={child.name}
                  to={child.href}
                  className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenDropdown(null)}
                >
                  <div className="font-medium text-gray-900">{child.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
      <nav
        ref={containerRef}
        className="hidden lg:flex items-center gap-1 xl:gap-2"
        aria-label="Primary"
      >
        {NAVIGATION_ITEMS.map(renderNavItem)}
      </nav>
  );
};

export default DesktopMegaMenu;
