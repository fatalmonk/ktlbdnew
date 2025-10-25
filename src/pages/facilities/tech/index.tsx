import SEO from '../../../components/SEO';

const TechFacility = () => {
  return (
    <>
      <SEO
        title="Technology Facility | Kattali Textile Ltd Digital Manufacturing"
        description="KTL's technology facility in Chittagong features advanced machinery, automation systems, and digital solutions for modern textile manufacturing."
        canonical="/facilities/tech"
        keywords={['technology facility', 'automation', 'digital manufacturing', 'advanced machinery', 'textile innovation']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Tech Facility</h1>
            <p className="text-lg text-gray-800 mb-8">
              Our technology facility houses cutting-edge machinery and automation systems
              that drive efficiency and precision in textile manufacturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Automation Systems</h3>
                <p className="text-gray-800">
                  Advanced automation technology for streamlined production processes
                  and reduced manual intervention.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Digital Solutions</h3>
                <p className="text-gray-800">
                  Integrated digital systems for production monitoring,
                  quality control, and data analytics.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Precision Machinery</h3>
                <p className="text-gray-800">
                  High-precision equipment for detailed work and complex
                  manufacturing requirements.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Innovation Lab</h3>
                <p className="text-gray-800">
                  Research and development facility for testing new technologies
                  and improving manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TechFacility;
