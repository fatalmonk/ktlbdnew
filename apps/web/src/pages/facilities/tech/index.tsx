import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';

const TechFacility = () => {
  return (
    <>
      <SEO
        title="Technology Facility | Kattali Textile Ltd Digital Manufacturing"
        description="KTL's technology facility in Chittagong features advanced machinery, automation systems, and digital solutions for modern textile manufacturing."
        canonical="/facilities/tech"
        keywords={['technology facility', 'automation', 'digital manufacturing', 'advanced machinery', 'textile innovation']}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company/our-story' },
          { label: 'Technology' },
        ]}
        pageTitle="Technology"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our technology facility houses cutting-edge machinery and automation systems
              that drive efficiency and precision in textile manufacturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Automation Systems</h3>
                <p className="text-neutral-800">
                  Advanced automation technology for streamlined production processes
                  and reduced manual intervention.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Digital Solutions</h3>
                <p className="text-neutral-800">
                  Integrated digital systems for production monitoring,
                  quality control, and data analytics.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Precision Machinery</h3>
                <p className="text-neutral-800">
                  High-precision equipment for detailed work and complex
                  manufacturing requirements.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Innovation Lab</h3>
                <p className="text-neutral-800">
                  Research and development facility for testing new technologies
                  and improving manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechFacility;
