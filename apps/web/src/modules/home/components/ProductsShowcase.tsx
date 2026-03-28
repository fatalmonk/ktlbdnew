import { Suspense } from 'react';
import { ProductsSkeleton } from '../../../components/skeletons';
import type { Product } from '../../../types/product';

import Product3DCard from '../../../components/product/Product3DCard/Product3DCard';

interface ProductsShowcaseProps {
  products: Product[];
}

const ProductsShowcase = ({ products }: ProductsShowcaseProps) => (
  <section className="py-24 bg-neutral-50" id="products">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-6xl font-bold text-neutral-900 mb-6">
          Our <span className="text-primary-600">Products</span>
        </h2>
        <p className="text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Discover our premium range of sustainable textiles and garments, crafted with precision and care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<ProductsSkeleton />}>
          {products.map((product, index) => (
            <Product3DCard key={product.id} product={product} index={index} />
          ))}
        </Suspense>
      </div>
    </div>
  </section>
);

export default ProductsShowcase;


