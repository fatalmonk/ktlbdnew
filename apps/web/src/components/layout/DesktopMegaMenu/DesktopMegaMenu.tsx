import {
  NAVIGATION_ITEMS,
  type NavDropdownItem,
  type NavItem,
} from '@/modules/navigation/data/navigation';
import React from 'react';
import { Link } from 'react-router-dom';

function navSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

interface DesktopMegaMenuProps {
  openDropdown: string | null;
  setOpenDropdown: (dropdown: string | null) => void;
  toggleDropdown: (dropdown: string | null) => void;
  setOpenWithIntent: (dropdown: string | null, delay?: number) => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

function SubmenuPanelContent({
  item,
  isOpen,
  setOpenDropdown,
}: {
  item: NavDropdownItem;
  isOpen: boolean;
  setOpenDropdown: (v: string | null) => void;
}) {
  const tabIndex = isOpen ? 0 : -1;

  // Standardized 5-column layout with increased width and spacing
  const submenuGridClass =
    'nav--desktop--list--submenus grid w-full content-start grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-16';

  return (
    <div className="nav--desktop--list--submenu-container block w-full bg-white pb-32 pt-20 shadow-xl ring-1 ring-black/5">
      <div className="mx-auto max-w-[1430px] px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-16 xl:gap-x-20">
          {/* Brand/Section Headline */}
          <div className="nav--desktop--list--innerMenu--menuItem-title-container mb-12 w-full shrink-0 lg:mb-0 lg:w-[24rem] xl:w-[24rem]">
            <Link
              to={item.href}
              className="group flex flex-col items-start border-l-4 border-[var(--evgPrimaryColor)] pl-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              tabIndex={tabIndex}
              onClick={() => setOpenDropdown(null)}
            >
              <span className="header-nav-typography text-[1.4rem] font-bold uppercase tracking-widest text-neutral-900 transition-colors group-hover:text-primary-600">
                {item.name}
              </span>
              <span className="mt-2 block text-[0.8rem] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Section Overview
              </span>
            </Link>
          </div>

          {/* Columnar Grid */}
          <div className={submenuGridClass}>
            {item.columns.map((col, idx) => (
              <div
                key={col.title ?? col.links[0]?.href ?? idx}
                className="flex min-w-0 flex-col"
              >
                {col.title && (
                  <div className="mb-6 header-nav-typography text-[2.2rem] font-semibold uppercase tracking-widest text-[var(--evgBodyTextColor)] opacity-80">
                    {col.title}
                  </div>
                )}
                <ul className="nav--desktop--list--submenu level1 space-y-4" role="menu">
                  {col.links.map((link) => (
                    <li
                      key={`${link.href}-${link.label}`}
                      className="nav--desktop--list--innerMenu--menuItem"
                      role="menuitem"
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          className="link header-nav-typography block text-[2.2rem] font-normal leading-normal text-[#000c26] transition-all hover:translate-x-1 hover:text-[#06607f]"
                          target="_blank"
                          rel="noreferrer"
                          role="menuitem"
                          tabIndex={tabIndex}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="link header-nav-typography block text-[2.2rem] font-normal leading-normal text-[#000c26] transition-all hover:translate-x-1 hover:text-[#06607f]"
                          role="menuitem"
                          target="_self"
                          tabIndex={tabIndex}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({
  openDropdown,
  setOpenDropdown,
  toggleDropdown,
  setOpenWithIntent,
}) => {
  const renderNavItem = (item: NavItem, menuIndex: number) => {
    const slug = navSlug(item.name);
    
    if (item.type === 'link') {
      return (
        <li
          key={item.name}
          role="menuitem"
          className={`nav--desktop--list--innerMenu--menuItem flex items-center ${slug}`}
        >
          <Link
            to={item.href}
            target="_self"
            tabIndex={0}
            className="link header-nav-typography block text-[2.2rem] font-normal leading-[1.15] tracking-normal text-[#000c26] transition-colors hover:text-[#06607f]"
          >
            {item.name}
          </Link>
        </li>
      );
    }

    const isOpen = openDropdown === item.name;
    const menuId = `menu-${menuIndex}-desktop`;
    const buttonId = `button--menu-${menuIndex}-desktop`;

    return (
      <li
        key={item.name}
        role="menuitem"
        className={`nav--desktop--list--innerMenu--menuItem relative flex items-center ${slug}`}
        onMouseEnter={() => setOpenWithIntent(item.name, 100)}
        onMouseLeave={() => setOpenWithIntent(null, 300)}
      >
        <button
          type="button"
          id={buttonId}
          onClick={() => toggleDropdown(item.name)}
          className={`
            group inline-flex items-center text-[2.2rem] font-normal leading-[1.15] tracking-normal transition-all focus:outline-none
            ${isOpen ? 'text-[#06607f]' : 'text-[#000c26] hover:text-[#06607f]'}
          `}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          <span>{item.name}</span>
          {/* Aesthetic Active Underline */}
          <span 
            className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary-500 transition-all duration-300 ${isOpen ? 'opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`}
          />
        </button>

        <div
          id={menuId}
          className={`
            nav--desktop--list--submenu-item fixed inset-x-0 top-[var(--sticky-header-height)] z-[9995] w-full transition-all duration-300
            ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}
          `}
          aria-labelledby={buttonId}
          aria-hidden={!isOpen}
          role="navigation"
          aria-label={`${item.name} submenu`}
          onMouseEnter={() => setOpenWithIntent(item.name, 0)}
          onMouseLeave={() => setOpenWithIntent(null, 250)}
        >
          <SubmenuPanelContent item={item} isOpen={isOpen} setOpenDropdown={setOpenDropdown} />
        </div>
      </li>
    );
  };

  return (
    <nav className="pane--static-nav-menu min-w-0 flex-1" aria-label="primary">
      {/* li padding: 12px 0; button margin: 5px each side — exact macysinc.com spec */}
      <ul className="nav--desktop--list--topMenu flex h-full items-center justify-end">
        {NAVIGATION_ITEMS.map((item, menuIndex) => renderNavItem(item, menuIndex))}
      </ul>
    </nav>
  );
};

export default DesktopMegaMenu;
