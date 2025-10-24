import SEO from '../../../components/SEO';

const KnitwearPage = () => {
  return (
    <>
      <SEO
        title="Knitwear"
        description="Kattali Textile Limited's premium knitwear collection. High-quality sweaters, cardigans, and knit accessories for global markets."
        keywords={['knitwear', 'sweaters', 'cardigans', 'knit accessories', 'KTL knitwear']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Knitwear</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our premium knitwear collection features high-quality sweaters, cardigans, and knit accessories
              crafted for comfort, warmth, and style.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Premium Sweaters</h3>
                <p className="text-gray-800">
                  High-quality sweaters with modern designs and comfortable fits.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Stylish Cardigans</h3>
                <p className="text-gray-800">
                  Versatile cardigans perfect for layering and all seasons.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Knit Accessories</h3>
                <p className="text-gray-800">
                  Complementary knit accessories and finishing touches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KnitwearPage;
