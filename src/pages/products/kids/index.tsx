import SEO from '../../../components/SEO';

const KidsPage = () => {
  return (
    <>
      <SEO
        title="Kids Wear"
        description="Kattali Textile Limited's premium kids wear collection. High-quality children's clothing for comfort, style, and durability."
        keywords={['kids wear', 'children clothing', 'kids fashion', 'KTL kids', 'children apparel']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Kids Wear</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our premium kids wear collection features high-quality children's clothing
              designed for comfort, style, and durability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Toddler Clothing</h3>
                <p className="text-gray-800">
                  Comfortable and safe clothing for toddlers with modern designs.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Kids Fashion</h3>
                <p className="text-gray-800">
                  Stylish and trendy clothing for kids of all ages.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">School Wear</h3>
                <p className="text-gray-800">
                  Durable and comfortable school uniforms and casual wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KidsPage;
