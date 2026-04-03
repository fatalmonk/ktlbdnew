import SEO from '../../../../components/seo/SEO';
import SubpageHeader from '../../../../components/shared/SubpageHeader';

const AnnualReportsPage = () => {
  return (
    <>
      <SEO
        title="Annual Reports"
        description="Access KTL's comprehensive annual reports including financial statements, strategic overview, and year-end performance summaries."
        keywords={[
          'annual reports',
          'yearly reports',
          'KTL annual',
          'financial statements',
          'annual performance',
        ]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Investors', to: '/investors' },
          { label: 'Annual Reports' },
        ]}
        pageTitle="Annual Reports"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Comprehensive annual reports covering KTL's yearly performance, financial statements,
              strategic initiatives, and future outlook.
            </p>

            <div className="space-y-6">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Annual Report 2023</h3>
                  <span className="text-sm text-primary">Latest</span>
                </div>
                <p className="text-neutral-800 mb-4">
                  Complete annual report for 2023 including financial performance, sustainability
                  initiatives, and strategic achievements.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Annual Report 2022</h3>
                  <span className="text-sm text-neutral-600">Previous</span>
                </div>
                <p className="text-neutral-800 mb-4">
                  Annual report highlighting growth in international markets and expansion of
                  manufacturing capabilities.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Annual Report 2021</h3>
                  <span className="text-sm text-neutral-600">Previous</span>
                </div>
                <p className="text-neutral-800 mb-4">
                  Annual report focusing on digital transformation and sustainable manufacturing
                  practices.
                </p>
                <button className="text-primary hover:underline">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnnualReportsPage;
