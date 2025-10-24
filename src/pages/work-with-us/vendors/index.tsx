import SEO from '../../../components/SEO';

const VendorsPage = () => {
  return (
    <>
      <SEO
        title="Vendors"
        description="Join KTL's vendor network. We partner with suppliers, service providers, and business partners to create a robust supply chain ecosystem."
        keywords={['vendors', 'suppliers', 'KTL partners', 'supply chain', 'business partners']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">For Vendors</h1>
            <p className="text-lg text-gray-800 mb-8">
              Join our vendor network and become part of KTL's supply chain ecosystem.
              We value long-term partnerships and mutual growth opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Supplier Partnerships</h3>
                <p className="text-gray-800">
                  Long-term partnerships with reliable suppliers for
                  raw materials, equipment, and services.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service Providers</h3>
                <p className="text-gray-800">
                  Collaboration with service providers for logistics,
                  maintenance, and specialized services.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Technology Partners</h3>
                <p className="text-gray-800">
                  Strategic partnerships with technology providers
                  for innovation and digital transformation.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Sustainability Partners</h3>
                <p className="text-gray-800">
                  Collaboration with organizations focused on
                  environmental sustainability and social responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VendorsPage;
