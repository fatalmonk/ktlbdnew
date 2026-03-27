import { Product, FilterOption, ProductFilterState } from '../types/product';

/**
 * Extract unique categories from products array
 */
export const getUniqueCategories = (products: Product[]): FilterOption[] => {
  const categoryMap = new Map<string, number>();

  products.forEach(product => {
    const count = categoryMap.get(product.category) || 0;
    categoryMap.set(product.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([value, count]) => ({
    value,
    label: value,
    count
  }));
};

/**
 * Extract unique tags from products array
 */
export const getUniqueTags = (products: Product[]): FilterOption[] => {
  const tagMap = new Map<string, number>();

  products.forEach(product => {
    product.tags?.forEach(tag => {
      const count = tagMap.get(tag) || 0;
      tagMap.set(tag, count + 1);
    });
  });

  return Array.from(tagMap.entries()).map(([value, count]) => ({
    value,
    label: value,
    count
  }));
};

/**
 * Filter products based on selected categories and tags
 */
export const filterProducts = (
  products: Product[],
  filters: ProductFilterState
): Product[] => {
  let filtered = [...products];

  // Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories.includes(product.category)
    );
  }

  // Filter by tags
  if (filters.tags.length > 0) {
    filtered = filtered.filter(product =>
      product.tags?.some(tag => filters.tags.includes(tag))
    );
  }

  return filtered;
};

/**
 * Get featured products only
 */
export const getFeaturedProducts = (products: Product[]): Product[] => {
  return products.filter(product => product.featured);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => product.category === category);
};

/**
 * Search products by name or description
 */
export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) return products;

  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
