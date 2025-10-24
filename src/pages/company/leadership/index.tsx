import SEO from '../../../components/SEO';

const CompanyLeadership = () => {
  return (
    <>
      <SEO
        title="Leadership"
        description="Meet the experienced leadership team driving Kattali Textile Limited's success in the global textile industry."
        keywords={['leadership team', 'KTL executives', 'company leadership', 'textile industry leaders', 'KTL management']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Leadership Team</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our leadership team brings decades of experience in textile manufacturing, 
              international trade, and sustainable business practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Ms. Ananta Rahman</h3>
                <p className="text-primary mb-2">Chairman & Founder</p>
                <p className="text-gray-800 text-sm">
                  Visionary leader with 20+ years of experience in textile industry development.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Mr. Emdadul Hoque</h3>
                <p className="text-primary mb-2">Managing Director</p>
                <p className="text-gray-800 text-sm">
                  Expert in operations management and international business development.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
                <p className="text-primary mb-2">Executive Team</p>
                <p className="text-gray-800 text-sm">
                  Dedicated professionals committed to excellence and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompanyLeadership;
