import { Link } from 'react-router-dom';
import SEO from '../../../components/seo/SEO';

const CompanyLeadership = () => {
  return (
    <>
      <SEO
        title="Leadership Team | Kattali Textile Ltd Executive Management"
        description="Meet KTL's experienced leadership team driving success in Bangladesh's textile industry. From Chairman Nasreen Haque to our dedicated management team."
        canonical="/company/leadership"
        keywords={['KTL leadership', 'textile executives', 'Bangladesh management team', 'garment industry leaders']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Leadership Team</h1>
            <p className="text-lg text-neutral-800 mb-8">
              Our leadership team brings decades of experience in textile manufacturing,
              international trade, and <Link to="/company/sustainability" className="text-primary-600 hover:text-primary-700 font-medium underline">sustainable business practices</Link>. 
              Learn more about <Link to="/company/our-story" className="text-primary-600 hover:text-primary-700 font-medium underline">our company's journey</Link> and 
              <Link to="/company/governance" className="text-primary-600 hover:text-primary-700 font-medium underline"> corporate governance structure</Link>. 
              Our team oversees <Link to="/facilities/rmg" className="text-primary-600 hover:text-primary-700 font-medium underline">world-class manufacturing facilities</Link> producing 
              <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium underline">premium textile products</Link> for global brands.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Mrs. Nasreen Hoque</h3>
                <p className="text-primary mb-2">Chairman & Founder</p>
                <p className="text-neutral-800 text-sm">
                  Visionary leader with 20+ years of experience in textile industry development.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Mr. Emdadul Hoque</h3>
                <p className="text-primary mb-2">Managing Director</p>
                <p className="text-neutral-800 text-sm">
                  Expert in operations management and international business development.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-neutral-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
                <p className="text-primary mb-2">Executive Team</p>
                <p className="text-neutral-800 text-sm">
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
