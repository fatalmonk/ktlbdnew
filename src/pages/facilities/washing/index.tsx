import SEO from '../../../components/SEO';

const WashingFacility = () => {
  return (
    <>
      <SEO
        title="Washing Plant"
        description="KTL's state-of-the-art washing plant facility with advanced equipment for garment finishing and treatment processes."
        keywords={['washing plant', 'garment finishing', 'KTL washing', 'textile washing', 'garment treatment']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Washing Plant</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our advanced washing plant facility is equipped with state-of-the-art machinery 
              for garment finishing, treatment, and quality enhancement processes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Washing Equipment</h3>
                <p className="text-gray-800">
                  Modern washing machines and treatment equipment for various 
                  garment types and fabric specifications.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quality Control</h3>
                <p className="text-gray-800">
                  Rigorous quality control processes ensure consistent results 
                  and meet international standards.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Environmental Standards</h3>
                <p className="text-gray-800">
                  Eco-friendly washing processes that minimize environmental impact 
                  while maintaining high quality standards.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Capacity</h3>
                <p className="text-gray-800">
                  High-volume processing capacity to meet large-scale production 
                  requirements and tight deadlines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WashingFacility;
