import SEO from '../../../components/seo/SEO';

const BuyersPage = () => {
  return (
    <>
      <SEO
        title="Buyers"
        description="Partner with KTL as a buyer. Discover our comprehensive textile solutions, quality assurance, and global supply chain capabilities."
        keywords={['buyers', 'textile buyers', 'KTL partners', 'global buyers', 'textile sourcing']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">For Buyers</h1>
            <p className="text-lg text-gray-800 mb-8">
              Partner with KTL for comprehensive textile solutions. We offer quality products, 
              reliable supply chain, and dedicated support for your business needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Product Range</h3>
                <p className="text-gray-800">
                  Wide variety of textile products including denims, knitwear, 
                  swimwear, and kids wear to meet diverse market demands.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
                <p className="text-gray-800">
                  Rigorous quality control processes and certifications 
                  ensuring consistent high-quality products.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Global Supply Chain</h3>
                <p className="text-gray-800">
                  Efficient global distribution network with reliable 
                  shipping and logistics support worldwide.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
                <p className="text-gray-800">
                  Tailored manufacturing solutions to meet specific 
                  requirements and design specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BuyersPage;
