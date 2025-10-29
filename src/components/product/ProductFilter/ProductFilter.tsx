import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { FilterOption, ProductFilterState } from '../../types/product';

interface ProductFilterProps {
  categories: FilterOption[];
  tags: FilterOption[];
  onFilterChange: (filters: ProductFilterState) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  tags,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Debounce filter updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ categories: selectedCategories, tags: selectedTags });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategories, selectedTags, onFilterChange]);

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
  };

  const handleTagToggle = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updated);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const activeFilterCount = selectedCategories.length + selectedTags.length;

  return (
    <>
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-primary-500 text-black font-bold rounded-full shadow-lg flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open product filters"
      >
        <Filter className="w-5 h-5" />
        Filter Products
        {activeFilterCount > 0 && (
          <span className="ml-2 px-2 py-1 bg-black text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Filter Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="filter-title"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <h3 id="filter-title" className="text-2xl font-bold">Filter Products</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close filter panel"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-6">
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.value)}
                            onChange={() => handleCategoryToggle(category.value)}
                            className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                            aria-describedby={`category-${category.value}-count`}
                          />
                          <span className="font-medium">{category.label}</span>
                        </div>
                        {category.count && (
                          <span
                            id={`category-${category.value}-count`}
                            className="text-sm text-gray-500"
                          >
                            ({category.count})
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <motion.button
                        key={tag.value}
                        onClick={() => handleTagToggle(tag.value)}
                        className={`px-4 py-2 rounded-full border-2 transition-colors ${
                          selectedTags.includes(tag.value)
                            ? 'bg-primary-500 border-primary-500 text-black'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-pressed={selectedTags.includes(tag.value)}
                        aria-describedby={`tag-${tag.value}-count`}
                      >
                        {tag.label}
                        {tag.count && (
                          <span
                            id={`tag-${tag.value}-count`}
                            className="ml-1 text-xs opacity-75"
                          >
                            ({tag.count})
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <motion.button
                    onClick={clearFilters}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear All Filters ({activeFilterCount})
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilter;
