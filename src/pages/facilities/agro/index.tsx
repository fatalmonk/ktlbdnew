import SEO from '../../../components/SEO';

const AgroFacility = () => {
  return (
    <>
      <SEO
        title="Agro Facility"
        description="KTL's agricultural facility supporting sustainable cotton production and organic farming practices for eco-friendly textile manufacturing."
        keywords={['agro facility', 'sustainable cotton', 'organic farming', 'KTL agriculture', 'eco-friendly production']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Agro Facility</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our agricultural facility focuses on sustainable cotton production and organic farming 
              practices to support eco-friendly textile manufacturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Sustainable Cotton</h3>
                <p className="text-gray-800">
                  Organic cotton cultivation using sustainable farming methods 
                  that protect the environment and soil health.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Organic Farming</h3>
                <p className="text-gray-800">
                  Chemical-free farming practices that ensure high-quality, 
                  natural fiber production for premium textiles.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Water Conservation</h3>
                <p className="text-gray-800">
                  Efficient irrigation systems and water management practices 
                  to minimize water usage and environmental impact.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                <p className="text-gray-800">
                  Supporting local farming communities through fair trade practices 
                  and sustainable agricultural development programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AgroFacility;
