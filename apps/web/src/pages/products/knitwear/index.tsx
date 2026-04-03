import { Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';
import SubpageHeader from '../../../components/shared/SubpageHeader';
import { createProductSchema, createBreadcrumbSchema } from '../../../modules/seo/templates';

const KnitwearPage = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Knitwear', url: '/products/knitwear' },
  ];

  const productSchema = createProductSchema({
    name: 'Premium Knitwear Products',
    description:
      "KTL's premium knitwear collection features high-quality sweaters, cardigans, and knit accessories manufactured in Bangladesh for global fashion brands.",
    image: 'https://ktlbd.com/assets/knitwear.jpg',
    category: 'Knitwear Apparel',
    brand: 'Kattali Textile Ltd',
    availability: 'https://schema.org/InStock',
  });

  return (
    <>
      <SEO
        title="Premium Knitwear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium knitwear collection features high-quality sweaters, cardigans, and knit accessories manufactured in Bangladesh for global fashion brands."
        canonical="/products/knitwear"
        keywords={[
          'knitwear products',
          'sweaters manufacturing',
          'cardigans',
          'Bangladesh knitwear',
          'textile knitwear',
        ]}
      />
      <StructuredData data={[createBreadcrumbSchema(breadcrumbs), productSchema]} />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: 'Knitwear' },
        ]}
        pageTitle="Knitwear"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our premium knitwear collection features high-quality sweaters, cardigans, and knit
              accessories crafted for comfort, warmth, and style. As part of our comprehensive{' '}
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                woven garment products
              </Link>{' '}
              range, we also manufacture{' '}
              <Link
                to="/products/denims"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                premium denim
              </Link>{' '}
              and
              <Link
                to="/products/kids"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                {' '}
                children's clothing
              </Link>
              . All our knitwear is produced in our
              <Link
                to="/facilities/rmg"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                state-of-the-art manufacturing facilities
              </Link>{' '}
              using
              <Link
                to="/sustainability"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                sustainable production practices
              </Link>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Premium Sweaters</h3>
                <p className="text-neutral-800">
                  High-quality sweaters with modern designs and comfortable fits.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Stylish Cardigans</h3>
                <p className="text-neutral-800">
                  Versatile cardigans perfect for layering and all seasons.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Knit Accessories</h3>
                <p className="text-neutral-800">
                  Complementary knit accessories and finishing touches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnitwearPage;
