import SEO from '../../../../components/seo/SEO';

const QuarterlyReportsPage = () => {
  return (
    <>
      <SEO
        title="Quarterly Reports"
        description="Access KTL's quarterly financial reports, performance updates, and investor communications. Stay informed about our quarterly results."
        keywords={['quarterly reports', 'financial reports', 'KTL quarterly', 'investor reports', 'quarterly results']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Quarterly Reports</h1>
            <p className="text-lg text-gray-800 mb-8">
              Access our comprehensive quarterly financial reports and performance updates.
              Stay informed about KTL's quarterly results and strategic developments.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q3 2024 Report</h3>
                  <span className="text-sm text-primary">Latest</span>
                </div>
                <p className="text-gray-800 mb-4">
                  Third quarter 2024 financial results showing strong performance
                  and continued growth in international markets.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q2 2024 Report</h3>
                  <span className="text-sm text-gray-600">Previous</span>
                </div>
                <p className="text-gray-800 mb-4">
                  Second quarter results highlighting sustainable manufacturing
                  initiatives and operational efficiency improvements.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Q1 2024 Report</h3>
                  <span className="text-sm text-gray-600">Previous</span>
                </div>
                <p className="text-gray-800 mb-4">
                  First quarter performance with focus on new partnerships
                  and market expansion strategies.
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

export default QuarterlyReportsPage;
