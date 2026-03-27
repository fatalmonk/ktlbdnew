import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Company', path: '/company/our-story' },
  { label: 'Facilities', path: '/facilities/rmg' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'Newsroom', path: '/newsroom/stories' },
  { label: 'Investors', path: '/investors' },
  { label: 'Contact', path: '/contact' },
];

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  // Use portal to render at document body level, escaping any parent stacking contexts
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[10000] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[300px] bg-white z-[10001] shadow-2xl overflow-y-auto"
          >
            <div className="p-4 flex justify-between items-center border-b border-neutral-100">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg group"
                    >
                      <span className="font-medium text-neutral-700 group-hover:text-primary-600">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileNavigation;
