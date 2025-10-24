import SEO from '../../../components/SEO';

const StoriesPage = () => {
  return (
    <>
      <SEO
        title="Company Stories"
        description="Discover inspiring stories from Kattali Textile Limited. Learn about our journey, achievements, and the people behind our success."
        keywords={['company stories', 'KTL journey', 'success stories', 'textile industry stories', 'KTL achievements']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Company Stories</h1>
            <p className="text-lg text-gray-800 mb-8">
              Discover the inspiring stories behind Kattali Textile Limited's journey.
              From our humble beginnings to becoming a global textile manufacturer,
              these stories showcase our commitment to excellence and innovation.
            </p>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">From Vision to Reality</h3>
                <p className="text-gray-800 mb-4">
                  The story of how Ms. Ananta Rahman's vision in 2002 transformed into
                  Bangladesh's leading eco-friendly textile manufacturer.
                </p>
                <span className="text-sm text-primary">Read Full Story →</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Sustainable Manufacturing Journey</h3>
                <p className="text-gray-800 mb-4">
                  How KTL became a pioneer in eco-friendly manufacturing practices,
                  setting new standards for the textile industry in Bangladesh.
                </p>
                <span className="text-sm text-primary">Read Full Story →</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Global Expansion Success</h3>
                <p className="text-gray-800 mb-4">
                  The journey of expanding from local markets to serving international
                  brands and retailers across multiple continents.
                </p>
                <span className="text-sm text-primary">Read Full Story →</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Employee Success Stories</h3>
                <p className="text-gray-800 mb-4">
                  Personal stories of our team members who have grown with the company
                  and contributed to our success over the years.
                </p>
                <span className="text-sm text-primary">Read Full Story →</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StoriesPage;
