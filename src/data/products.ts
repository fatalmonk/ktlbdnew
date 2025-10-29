import { Shirt, Package } from 'lucide-react';
import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'denims',
    name: 'Denims',
    category: 'Casual Wear',
    description: 'Premium denim products including jeans, jackets, and shirts for all ages',
    image: '/assets-optimized/designer-1.webp',
    icon: Shirt,
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
    image: '/assets-optimized/designer-2.webp',
    icon: Shirt,
    link: '/products/t-shirts',
    featured: false,
    price: 'From $8',
    tags: ['cotton', 'casual', 'basic', 'comfort']
  },
  {
    id: 'knitwear',
    name: 'Knitwear',
    category: 'Premium Apparel',
    description: 'Premium knitted garments including sweaters, cardigans, and knit tops',
    image: '/assets-optimized/hero.webp',
    icon: Shirt,
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
    image: '/assets-optimized/designer-1.webp',
    icon: Package,
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
    image: '/assets-optimized/designer-2.webp',
    icon: Package,
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
    image: '/assets-optimized/hero.webp',
    icon: Shirt,
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
    image: '/assets-optimized/designer-1.webp',
    icon: Package,
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
    image: '/assets-optimized/designer-2.webp',
    icon: Package,
    link: '/products/swimwear',
    featured: false,
    price: 'From $15',
    tags: ['swim', 'beach', 'sports', 'water']
  }
];
