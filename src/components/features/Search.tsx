import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../lib/navigation';

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Get all navigation items including children
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
    if (!query.trim()) return [];

    const searchQuery = query.toLowerCase();
    const allItems = getAllNavigationItems();

    return allItems.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchQuery);
      const parentMatch = item.parent?.toLowerCase().includes(searchQuery);
      return nameMatch || parentMatch;
    });
  };

  const searchResults = getSearchResults();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setQuery('');
    }
  };

  const handleResultClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={handleToggle}
        className="p-2 rounded-md text-white hover:text-white/75 drop-shadow-lg transition-colors"
        aria-label="Search"
      >
        <SearchIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
              </div>
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="overflow-y-auto flex-1">
            {query.trim() ? (
              searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((item, index) => (
                    <button
                      key={`${item.href}-${index}`}
                      onClick={() => handleResultClick(item.href)}
                      className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="text-base font-semibold text-black">{item.name}</div>
                      {item.parent && (
                        <div className="text-sm text-gray-500 mt-0.5">{item.parent}</div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4 text-gray-500">
                  No results found for "{query}"
                </div>
              )
            ) : (
              <div className="text-center py-8 px-4 text-gray-400 text-sm">
                Type to search menu items...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
