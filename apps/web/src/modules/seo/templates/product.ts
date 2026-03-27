export const createProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  category?: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: product.brand || 'Kattali Textile Ltd',
  },
  category: product.category,
  manufacturer: {
    '@type': 'Organization',
    name: 'Kattali Textile Ltd',
  },
  offers: {
    '@type': 'Offer',
    availability: product.availability || 'https://schema.org/InStock',
    price: product.price || 0,
    priceCurrency: product.priceCurrency || 'USD',
    priceValidUntil: '2026-03-31',
  },
});
