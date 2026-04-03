import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';

const AgroFacility = () => {
  return (
    <>
      <SEO
        title="Agricultural Facility | Kattali Textile Ltd Sustainable Cotton Production"
        description="KTL's agricultural facility supports sustainable cotton production and organic farming practices for eco-friendly textile manufacturing in Bangladesh."
        canonical="/facilities/agro"
        keywords={[
          'agricultural facility',
          'sustainable cotton',
          'organic farming',
          'eco-friendly production',
          'textile agriculture',
        ]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company/our-story' },
          { label: 'Agro' },
        ]}
        pageTitle="Agro"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our agricultural facility focuses on sustainable cotton production and organic farming
              practices to support eco-friendly textile manufacturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Sustainable Cotton</h3>
                <p className="text-neutral-800">
                  Organic cotton cultivation using sustainable farming methods that protect the
                  environment and soil health.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Organic Farming</h3>
                <p className="text-neutral-800">
                  Chemical-free farming practices that ensure high-quality, natural fiber production
                  for premium textiles.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Water Conservation</h3>
                <p className="text-neutral-800">
                  Efficient irrigation systems and water management practices to minimize water
                  usage and environmental impact.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                <p className="text-neutral-800">
                  Supporting local farming communities through fair trade practices and sustainable
                  agricultural development programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgroFacility;
