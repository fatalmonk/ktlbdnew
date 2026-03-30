import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';

const PressPage = () => {
  return (
    <>
      <SEO
        title="Press Releases"
        description="Latest press releases and news from Kattali Textile Limited. Stay updated with our company announcements and industry news."
        keywords={['press releases', 'KTL news', 'company announcements', 'textile news', 'industry updates']}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Newsroom', to: '/newsroom/stories' },
          { label: 'Press' },
        ]}
        pageTitle="Press"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Stay updated with the latest news and announcements from Kattali Textile Limited.
              Our press releases cover company milestones, industry developments, and strategic initiatives.
            </p>

            <div className="space-y-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-600">December 2024</span>
                  <span className="text-sm text-primary">Press Release</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">KTL Expands Sustainable Manufacturing</h3>
                <p className="text-neutral-800">
                  Kattali Textile Limited announces the installation of new eco-friendly production lines,
                  reducing environmental impact by 40% and setting new industry standards for sustainable manufacturing.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-600">November 2024</span>
                  <span className="text-sm text-primary">Press Release</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Strategic Partnership with Global Brands</h3>
                <p className="text-neutral-800">
                  KTL establishes strategic alliances with leading international retailers,
                  expanding our global reach and strengthening our position in the competitive textile market.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-neutral-600">October 2024</span>
                  <span className="text-sm text-primary">Press Release</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Employee Development Program Launch</h3>
                <p className="text-neutral-800">
                  Comprehensive training initiative launched to enhance workforce skills and capabilities,
                  demonstrating KTL's commitment to employee growth and professional development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PressPage;
