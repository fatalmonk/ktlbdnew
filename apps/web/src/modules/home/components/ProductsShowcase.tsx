import { Suspense } from 'react';
import { ProductsSkeleton } from '../../../components/skeletons';
import type { Product } from '../../../types/product';

import Product3DCard from '../../../components/product/Product3DCard/Product3DCard';

interface ProductsShowcaseProps {
  products: Product[];
}

const ProductsShowcase = ({ products }: ProductsShowcaseProps) => (
  <section className="bg-neutral-50 py-28 md:py-36" id="products">
    <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
      <div className="mb-24 text-center">
        <h2 className="font-heading text-5xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
          Our <span className="text-primary-500">Products</span>
        </h2>
      </div>

      {/* Mobile: swipeable snap carousel */}
      <div className="md:hidden">
        <Suspense fallback={<ProductsSkeleton />}>
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Products carousel"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-[84vw] max-w-[28rem] shrink-0 snap-start first:ml-1 last:mr-1"
              >
                <Product3DCard product={product} index={index} />
              </div>
            ))}
          </div>
        </Suspense>
      </div>

      {/* Tablet/Desktop: existing multi-column grid */}
      <div className="hidden gap-10 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-14">
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


