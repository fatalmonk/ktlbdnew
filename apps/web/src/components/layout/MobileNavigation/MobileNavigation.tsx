import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { NAVIGATION_ITEMS, type NavItem } from '@/modules/navigation/data/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const toggleItem = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderMenuItem = (item: NavItem) => {
    const hasSubmenu = item.type === 'dropdown';
    const isExpanded = !!expandedItems[item.name];

    return (
      <li key={item.name}>
        {hasSubmenu ? (
          <button
            type="button"
            onClick={() => toggleItem(item.name)}
            aria-expanded={isExpanded}
            className="group flex w-full items-center justify-between gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
          >
            <span className="font-heading text-h4 font-bold leading-[1.05] tracking-tight text-[#111827] md:text-h3">
              <span className="inline bg-[linear-gradient(#ffce00,#ffce00)] bg-[length:100%_0.15em] bg-no-repeat bg-[position:0_calc(100%-2px)] px-0.5">
                {item.name}
              </span>
            </span>
            <ChevronRight
              className={`h-11 w-11 shrink-0 text-[#374151] transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
              }`}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        ) : (
          <Link
            to={item.href}
            onClick={onClose}
            className="group flex items-center justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
          >
            <span className="font-heading text-h4 font-bold leading-[1.05] tracking-tight text-[#111827] md:text-h3">
              <span className="inline bg-[linear-gradient(#ffce00,#ffce00)] bg-[length:100%_0.15em] bg-no-repeat bg-[position:0_calc(100%-2px)] px-0.5">
                {item.name}
              </span>
            </span>
            <ChevronRight
              className="h-11 w-11 shrink-0 text-[#374151] transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
        )}

        <AnimatePresence>
          {hasSubmenu && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-l border-neutral-200 pl-4">
                {item.columns.map((column, columnIdx) => (
                  <div key={`${item.name}-${column.title ?? columnIdx}`} className="space-y-2">
                    {column.title && (
                      <h4 className="text-overline font-semibold text-neutral-700">
                        {column.title}
                      </h4>
                    )}
                    <ul className="space-y-2">
                      {column.links.map((link) => (
                        <li key={`${item.name}-${link.href}-${link.label}`}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="block text-body font-medium leading-snug text-[#111827] transition-colors hover:text-[#06607f]"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              to={link.href}
                              onClick={onClose}
                              className="block text-body font-medium leading-snug text-[#111827] transition-colors hover:text-[#06607f]"
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
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="fixed inset-x-0 z-[9998] h-[calc(100dvh-(var(--strip-height)+var(--mobile-nav-height)))] overflow-y-auto bg-white"
          style={{ top: 'calc(var(--strip-height) + var(--mobile-nav-height))' }}
        >
          <nav className="min-h-full px-8 pb-20 pt-32">
            <ul className="flex flex-col gap-16">{NAVIGATION_ITEMS.map(renderMenuItem)}</ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileNavigation;
