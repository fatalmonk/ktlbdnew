import SEO from '../../../../components/seo/SEO';

const PSIReportsPage = () => {
  return (
    <>
      <SEO
        title="PSI Reports"
        description="KTL's Pre-Shipment Inspection (PSI) reports and quality assurance documentation. Access detailed inspection reports and compliance certifications."
        keywords={['PSI reports', 'inspection reports', 'quality assurance', 'compliance reports', 'KTL PSI']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">PSI Reports</h1>
            <p className="text-lg text-gray-800 mb-8">
              Access our Pre-Shipment Inspection (PSI) reports and quality assurance documentation.
              These reports demonstrate our commitment to quality and compliance standards.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q3 2024 PSI Report</h3>
                  <span className="text-sm text-primary">Latest</span>
                </div>
                <p className="text-gray-800 mb-4">
                  Third quarter 2024 Pre-Shipment Inspection report covering
                  quality control measures and compliance certifications.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q2 2024 PSI Report</h3>
                  <span className="text-sm text-gray-600">Previous</span>
                </div>
                <p className="text-gray-800 mb-4">
                  Second quarter PSI report highlighting quality improvements
                  and enhanced inspection processes.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q1 2024 PSI Report</h3>
                  <span className="text-sm text-gray-600">Previous</span>
                </div>
                <p className="text-gray-800 mb-4">
                  First quarter PSI report focusing on new quality standards
                  and inspection methodology improvements.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PSIReportsPage;
