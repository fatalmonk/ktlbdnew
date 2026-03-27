import { createLazyIconWrapper } from '@/lib/lucide-icons';
import { Product } from '../types/product';
import heroSustainability1x from '@/assets/images/hero/hero-sustainability@1x.webp';
import heroGlobal1x from '@/assets/images/hero/hero-global@1x.webp';
import heroMain1x from '@/assets/images/hero/hero-main@1x.webp';

export const products: Product[] = [
  {
    id: 'denims',
    name: 'Denims',
    category: 'Casual Wear',
    description: 'Premium denim products including jeans, jackets, and shirts for all ages',
    image: heroSustainability1x,
    icon: createLazyIconWrapper('Shirt'),
    link: '/products/denims',
    featured: true,
    price: 'From $15',
    tags: ['denim', 'casual', 'jeans', 'jackets']
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    category: 'Casual Wear',
    description: 'High-quality cotton and blended t-shirts for everyday comfort',
    image: heroGlobal1x,
    icon: createLazyIconWrapper('Shirt'),
    link: '/products/t-shirts',
    featured: true,
    price: 'From $8',
    tags: ['cotton', 'casual', 'basic', 'comfort']
  },
  {
    id: 'knitwear',
    name: 'Knitwear',
    category: 'Premium Apparel',
    description: 'Premium knitted garments including sweaters, cardigans, and knit tops',
    image: heroMain1x,
    icon: createLazyIconWrapper('Shirt'),
    link: '/products/knitwear',
    featured: true,
    price: 'From $15',
    tags: ['knit', 'premium', 'sweaters', 'cardigans']
  },
  {
    id: 'kids-clothing',
    name: 'Kids Clothing',
    category: "Children's Wear",
    description: 'Safe and comfortable children\'s apparel including tops, pants, and sets for all ages',
    image: heroSustainability1x,
    icon: createLazyIconWrapper('Package'),
    link: '/products/kids-clothing',
    featured: false,
    price: 'From $10',
    tags: ['children', 'kids', 'safe', 'comfortable']
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    category: 'Seasonal Wear',
    description: 'Stylish jackets, coats, and outerwear for all seasons',
    image: heroGlobal1x,
    icon: createLazyIconWrapper('Package'),
    link: '/products/outerwear',
    featured: false,
    price: 'From $25',
    tags: ['jackets', 'coats', 'seasonal', 'warmth']
  },
  {
    id: 'dresses',
    name: 'Dresses',
    category: "Women's Wear",
    description: 'Elegant dresses for women and children in contemporary styles',
    image: heroMain1x,
    icon: createLazyIconWrapper('Shirt'),
    link: '/products/dresses',
    featured: true,
    price: 'From $20',
    tags: ['women', 'elegant', 'dresses', 'fashion']
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    category: 'Casual Wear',
    description: 'Comfortable pants, shorts, and trousers for all occasions',
    image: heroSustainability1x,
    icon: createLazyIconWrapper('Package'),
    link: '/products/bottoms',
    featured: false,
    price: 'From $10',
    tags: ['pants', 'shorts', 'trousers', 'casual']
  },
  {
    id: 'swimwear',
    name: 'Swimwear',
    category: 'Sports Wear',
    description: 'High-quality swim trunks and swimwear for active lifestyles',
    image: heroGlobal1x,
    icon: createLazyIconWrapper('Package'),
    link: '/products/swimwear',
    featured: false,
    price: 'From $15',
    tags: ['swim', 'beach', 'sports', 'water']
  }
];

// Featured products for homepage showcase (limited to max 4 items for performance)
export const featuredProducts = products.filter(p => p.featured).slice(0, 4);
