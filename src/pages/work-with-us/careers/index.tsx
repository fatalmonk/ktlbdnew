import SEO from '../../../components/SEO';

const CareersPage = () => {
  return (
    <>
      <SEO
        title="Careers"
        description="Join KTL's team and build your career in the textile industry. Explore job opportunities, benefits, and growth prospects at Kattali Textile Limited."
        keywords={['careers', 'jobs', 'KTL careers', 'textile jobs', 'employment opportunities']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Careers</h1>
            <p className="text-lg text-gray-800 mb-8">
              Join our team and be part of Bangladesh's leading textile manufacturer.
              We offer exciting career opportunities, professional development, and a
              supportive work environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Manufacturing Roles</h3>
                <p className="text-gray-800">
                  Production supervisors, quality control specialists,
                  machine operators, and technical staff positions.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Design & Development</h3>
                <p className="text-gray-800">
                  Fashion designers, product developers, pattern makers,
                  and creative professionals in textile design.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Business & Sales</h3>
                <p className="text-gray-800">
                  Sales representatives, business development managers,
                  marketing specialists, and customer service roles.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Administrative</h3>
                <p className="text-gray-800">
                  HR professionals, finance specialists, IT support,
                  and administrative staff positions.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-4">Why Work at KTL?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-800">
                  <li>• Competitive salary and benefits</li>
                  <li>• Professional development opportunities</li>
                  <li>• Safe and modern work environment</li>
                </ul>
                <ul className="space-y-2 text-gray-800">
                  <li>• Career growth and advancement</li>
                  <li>• Team collaboration and support</li>
                  <li>• Contribution to sustainable manufacturing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CareersPage;
