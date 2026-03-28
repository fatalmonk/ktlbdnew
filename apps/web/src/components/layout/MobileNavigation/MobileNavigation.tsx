import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { NAVIGATION_ITEMS, type NavItem } from '@/modules/navigation/data/navigation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderMobileNavItem = (item: NavItem) => {
    const isExpanded = expandedItems[item.name];
    const hasSubmenu = item.type === 'dropdown';

    return (
      <li key={item.name} className="border-b border-neutral-50 last:border-0">
        <div className="flex items-center">
          <button
            onClick={() => (hasSubmenu ? toggleItem(item.name) : undefined)}
            className="flex-1 py-4 text-left text-[0.85rem] font-medium uppercase tracking-wider text-neutral-900 transition-colors hover:text-primary-600 focus:outline-none"
          >
            {hasSubmenu ? item.name : (
              <Link to={item.href} onClick={onClose} className="block w-full">
                {item.name}
              </Link>
            )}
          </button>
        </div>

        <AnimatePresence>
          {hasSubmenu && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-neutral-50/50"
            >
              <div className="pb-6 pl-4 pr-4">
                {item.columns.map((column, idx) => (
                  <div key={column.title || idx} className="mb-6 last:mb-0">
                    {column.title && (
                      <h4 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-widest text-neutral-400">
                        {column.title}
                      </h4>
                    )}
                    <ul className="space-y-3 border-l-2 border-neutral-100 pl-4">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            to={link.href}
                            onClick={onClose}
                            className="block py-1 text-[0.9375rem] font-medium text-neutral-600 hover:text-primary-600"
                          >
                            {link.label}
                          </Link>
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[10001] h-full w-[320px] bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
                <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-neutral-900">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <X className="h-6 w-6" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="flex flex-col">
                  {NAVIGATION_ITEMS.map(renderMobileNavItem)}
                </ul>
              </nav>

              <div className="border-t border-neutral-100 p-6 bg-neutral-50">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-[0.875rem] font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileNavigation;
