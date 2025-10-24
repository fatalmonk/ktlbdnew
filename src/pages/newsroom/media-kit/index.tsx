import SEO from '../../../components/SEO';

const MediaKitPage = () => {
  return (
    <>
      <SEO
        title="Media Kit"
        description="Download KTL's media kit including company logos, brand guidelines, press photos, and media resources for journalists and partners."
        keywords={['media kit', 'press resources', 'KTL logos', 'brand guidelines', 'media downloads']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Media Kit</h1>
            <p className="text-lg text-gray-800 mb-8">
              Download our comprehensive media kit including company logos, brand guidelines,
              press photos, and other resources for journalists, partners, and media professionals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Company Logos</h3>
                <p className="text-gray-800 mb-4">
                  High-resolution KTL logos in various formats (PNG, SVG, EPS)
                  for print and digital use.
                </p>
                <button className="text-primary hover:underline">Download Logos</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Brand Guidelines</h3>
                <p className="text-gray-800 mb-4">
                  Complete brand guidelines including color palettes,
                  typography, and usage guidelines.
                </p>
                <button className="text-primary hover:underline">Download Guidelines</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Press Photos</h3>
                <p className="text-gray-800 mb-4">
                  High-quality press photos of facilities, products,
                  and team members for media use.
                </p>
                <button className="text-primary hover:underline">Download Photos</button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Company Fact Sheet</h3>
                <p className="text-gray-800 mb-4">
                  Comprehensive company information, statistics,
                  and key facts for media reference.
                </p>
                <button className="text-primary hover:underline">Download Fact Sheet</button>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-4">Media Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-black mb-2">Press Inquiries</h4>
                  <p className="text-gray-800">Email: press@ktlbd.com</p>
                  <p className="text-gray-800">Phone: +880 1308 790475</p>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Media Relations</h4>
                  <p className="text-gray-800">Email: media@ktlbd.com</p>
                  <p className="text-gray-800">Response time: 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MediaKitPage;
