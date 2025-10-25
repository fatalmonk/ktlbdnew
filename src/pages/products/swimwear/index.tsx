import SEO from '../../../components/SEO';
import StructuredData from '../../../components/StructuredData';

const SwimwearPage = () => {
  return (
    <>
      <SEO
        title="Premium Swimwear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium swimwear collection features high-quality swimsuits, bikinis, and beachwear manufactured in Bangladesh for global fashion brands."
        canonical="/products/swimwear"
        keywords={['swimwear products', 'swimsuits manufacturing', 'bikinis', 'Bangladesh swimwear', 'textile swimwear']}
      />
      <StructuredData data={[{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Premium Swimwear Products',
        description: 'High-quality swimsuits, bikinis, and beachwear manufactured by Kattali Textile Ltd',
        image: 'https://ktlbd.com/assets/swimwear.jpg',
        category: 'Swimwear Apparel',
        brand: {
          '@type': 'Brand',
          name: 'Kattali Textile Ltd'
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Kattali Textile Ltd',
          url: 'https://ktlbd.com'
        }
      }]} />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Swimwear</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our premium swimwear collection features high-quality swimsuits, bikinis, and beachwear
              designed for comfort, style, and durability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Swimsuits</h3>
                <p className="text-gray-800">
                  High-quality swimsuits with modern designs and comfortable fits.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Bikinis</h3>
                <p className="text-gray-800">
                  Stylish bikinis perfect for beach and pool activities.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Beachwear</h3>
                <p className="text-gray-800">
                  Complementary beachwear and accessories for complete summer looks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SwimwearPage;
