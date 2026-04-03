import { Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';
import SubpageHeader from '../../../components/shared/SubpageHeader';
import { createProductSchema, createBreadcrumbSchema } from '../../../modules/seo/templates';

const KidsPage = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Kids Wear', url: '/products/kids' },
  ];

  const productSchema = createProductSchema({
    name: 'Premium Kids Wear Products',
    description:
      "KTL's premium kids wear collection features high-quality children's clothing for comfort, style, and durability manufactured in Bangladesh for global brands.",
    image: 'https://ktlbd.com/assets/kids.jpg',
    category: "Children's Apparel",
    brand: 'Kattali Textile Ltd',
    availability: 'https://schema.org/InStock',
  });

  return (
    <>
      <SEO
        title="Premium Kids Wear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium kids wear collection features high-quality children's clothing for comfort, style, and durability manufactured in Bangladesh for global brands."
        canonical="/products/kids"
        keywords={[
          'kids wear products',
          'children clothing',
          'kids fashion',
          'Bangladesh kids wear',
          'textile children apparel',
        ]}
      />
      <StructuredData data={[createBreadcrumbSchema(breadcrumbs), productSchema]} />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: "Kids'" },
        ]}
        pageTitle="Kids'"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our premium kids wear collection features high-quality children's clothing designed
              for comfort, style, and durability. As part of our comprehensive product range, we
              also manufacture{' '}
              <Link
                to="/products/denims"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                premium denim products
              </Link>{' '}
              and a wide variety of{' '}
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                woven garments
              </Link>{' '}
              for global fashion brands. All our products are made in our{' '}
              <Link
                to="/facilities/rmg"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                certified manufacturing facilities
              </Link>{' '}
              using
              <Link
                to="/sustainability"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                {' '}
                sustainable practices
              </Link>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Toddler Clothing</h3>
                <p className="text-neutral-800">
                  Comfortable and safe clothing for toddlers with modern designs.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Kids Fashion</h3>
                <p className="text-neutral-800">
                  Stylish and trendy clothing for kids of all ages.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">School Wear</h3>
                <p className="text-neutral-800">
                  Durable and comfortable school uniforms and casual wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KidsPage;
