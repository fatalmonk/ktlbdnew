import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';

const DenimsPage = () => {
  return (
    <>
      <SEO
        title="Denim Manufacturer Bangladesh | Kattali Textile Ltd Premium Denim Products"
        description="KTL is Bangladesh's leading denim manufacturer, producing high-quality jeans, denim jackets, and accessories for global fashion brands from our Chittagong facilities."
        canonical="/products/denims"
        keywords={['denim manufacturer bangladesh', 'jeans manufacturer', 'denim supplier', 'Bangladesh denim', 'denim production']}
      />
      <StructuredData data={[{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Premium Denim Products',
        description: 'High-quality denim jeans, jackets, and accessories manufactured by Kattali Textile Ltd',
        image: 'https://ktlbd.com/assets/denimcloseup.jpg',
        category: 'Denim Apparel',
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
            <h1 className="text-4xl font-bold text-black mb-8">Denim Manufacturer Bangladesh</h1>
            <div className="mb-8">
              <p className="text-lg text-gray-800 mb-6">
                As a leading <strong>denim manufacturer in Bangladesh</strong>, KTL specializes in producing
                high-quality denim products for global fashion brands. Our state-of-the-art denim production
                facilities in Chittagong combine traditional craftsmanship with modern technology to deliver
                premium jeans, denim jackets, and accessories.
              </p>
              <p className="text-lg text-gray-800 mb-6">
                Our <strong>denim manufacturing</strong> capabilities include advanced washing techniques,
                custom finishing processes, and sustainable production practices. We work with premium denim
                fabrics and offer a wide range of styles from classic straight-fit jeans to contemporary
                denim jackets and accessories.
              </p>
            </div>

            {/* Denim Production Process */}
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Denim Production Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Manufacturing Capabilities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Premium denim fabric sourcing</li>
                    <li>• Advanced cutting and sewing techniques</li>
                    <li>• Custom washing and finishing</li>
                    <li>• Quality control and inspection</li>
                    <li>• Sustainable production practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Product Range</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Men's and women's jeans</li>
                    <li>• Denim jackets and shirts</li>
                    <li>• Denim shorts and skirts</li>
                    <li>• Custom denim products</li>
                    <li>• Private label denim</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Modern Fit Jeans</h3>
                <p className="text-gray-800">
                  Traditional denim jeans with modern fit and comfort features.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Stylish Denim Jackets</h3>
                <p className="text-gray-800">
                  Versatile denim jackets for all seasons and occasions.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Denim Accessories</h3>
                <p className="text-gray-800">
                  Complementary denim accessories and finishing touches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DenimsPage;
