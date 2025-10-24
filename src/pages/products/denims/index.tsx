import SEO from '../../../components/SEO';

const DenimsPage = () => {
  return (
    <>
      <SEO
        title="Denims"
        description="Kattali Textile Limited's premium denim collection. High-quality jeans, jackets, and accessories for global markets."
        keywords={['denim collection', 'jeans', 'denim jackets', 'denim accessories', 'KTL denims']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Denims</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our premium denim collection features high-quality jeans, jackets, and accessories
              crafted for comfort, durability, and timeless appeal.
            </p>

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
