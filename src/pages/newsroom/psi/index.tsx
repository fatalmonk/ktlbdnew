import SEO from '../../../components/seo/SEO';

const PSIPage = () => {
  return (
    <>
      <SEO
        title="PSI Services"
        description="KTL's Pre-Shipment Inspection (PSI) services ensuring quality control and compliance for textile exports. Professional inspection and certification services."
        keywords={['PSI services', 'pre-shipment inspection', 'quality control', 'textile inspection', 'export certification']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">PSI Services</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our Pre-Shipment Inspection (PSI) services ensure quality control and compliance
              for textile exports. We provide professional inspection and certification services
              to meet international standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quality Inspection</h3>
                <p className="text-gray-800">
                  Comprehensive quality inspection services for textile products
                  ensuring compliance with international standards and specifications.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Compliance Certification</h3>
                <p className="text-gray-800">
                  Professional certification services for export compliance,
                  meeting regulatory requirements and international trade standards.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Documentation Support</h3>
                <p className="text-gray-800">
                  Complete documentation support for export processes,
                  including certificates, reports, and compliance documentation.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
                <p className="text-gray-800">
                  Experienced inspection team with deep knowledge of textile
                  manufacturing, quality standards, and export requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PSIPage;
