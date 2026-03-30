import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ProductsSkeleton } from '../../../components/skeletons';
import Image from '../../../components/media/Image';
import type { Product } from '../../../types/product';

import Product3DCard from '../../../components/product/Product3DCard/Product3DCard';

interface ProductsShowcaseProps {
  products: Product[];
}

const MobileProductCard = ({ product }: { product: Product }) => (
  <article className="w-[80vw] max-w-[22rem] shrink-0 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm">
    <div className="aspect-[4/5] bg-neutral-100">
      <Image
        src={product.image}
        alt={product.name}
        className="h-full w-full"
        width={360}
        height={450}
        fit="cover"
      />
    </div>

    <div className="flex min-h-[13rem] flex-col gap-3 p-5">
      <span className="inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-600">
        {product.category}
      </span>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold leading-tight text-neutral-900">
          {product.name}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
          {product.description}
        </p>
      </div>

      <Link
        to={product.link}
        className="mt-auto inline-flex min-h-[44px] items-center text-sm font-semibold text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
      >
        View product
      </Link>
    </div>
  </article>
);

const ProductsShowcase = ({ products }: ProductsShowcaseProps) => (
  <section className="bg-neutral-50 py-28 md:py-36" id="products">
    <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
      <div className="mb-24 text-center">
        <h2 className="font-heading text-5xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
          Our <span className="text-primary-500">Products</span>
        </h2>
      </div>

      {/* Mobile: simplified horizontal scroller to avoid sticky touch interactions */}
      <div className="md:hidden">
        <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4" aria-label="Products carousel">
            {products.map((product) => (
              <MobileProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
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


