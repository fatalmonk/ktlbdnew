import { stockNews } from '../stockImages';

/**
 * Home “In The News” grid — slugs must exist in `public/data/blog/index.json`.
 */
export type HomeNewsItem = {
  title: string;
  excerpt: string;
  image: string;
  /** Short description of the preview image (for img alt; avoids duplicating the headline inside the link) */
  imageAlt: string;
  /** ISO date or parseable string for display */
  date: string;
  slug: string;
  /** Small label(s) above the headline */
  tags: string[];
};

export const newsItems: HomeNewsItem[] = [
  {
    title: 'Inside Kattali Textile Ltd: Building a Legacy in Bangladesh’s Garment Industry',
    excerpt:
      'Discover how Kattali Textile Ltd grew from a local manufacturer to a trusted global textile partner.',
    image: stockNews.factory,
    imageAlt: 'Textile manufacturing floor with machinery and fabric handling',
    date: '2025-01-15',
    slug: 'inside-kattali-textile-legacy',
    tags: ['Company News', 'Company'],
  },
  {
    title: 'Woven Garment Export Powerhouse: How KTL Serves Global Markets',
    excerpt:
      'Explore how our facilities, workforce, and quality focus make us a preferred woven garment exporter.',
    image: stockNews.fabricDetail,
    imageAlt: 'Colorful yarn cones and textile materials in a manufacturing setting',
    date: '2025-01-18',
    slug: 'woven-garment-export-powerhouse',
    tags: ['Manufacturing'],
  },
  {
    title: 'Global Textile Sourcing: Why Leading Brands Partner with KTL',
    excerpt:
      'Learn what makes Kattali Textile Ltd the sourcing partner of choice for global fashion brands.',
    image: stockNews.retail,
    imageAlt: 'Retail clothing display with apparel on racks in a bright store',
    date: '2025-01-20',
    slug: 'global-textile-sourcing-partnerships',
    tags: ['Partnerships', 'Financial'],
  },
];
