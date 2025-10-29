import SEO from '../../../components/seo/SEO';

const StockPage = () => {
  return (
    <>
      <SEO
        title="Stock Information"
        description="KTL stock information, share prices, market data, and investor resources. Stay updated with Kattali Textile Limited's financial performance."
        keywords={['stock information', 'KTL shares', 'share price', 'market data', 'investor information']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Stock Information</h1>
            <p className="text-lg text-gray-800 mb-8">
              Stay updated with Kattali Textile Limited's stock performance,
              share prices, and market data. Access real-time information
              and investor resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Current Price</h3>
                <div className="text-3xl font-bold text-primary mb-2">৳45.50</div>
                <p className="text-gray-800">DSE: M | as of September 19, 2025 4:00 PM EST</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Trading Volume</h3>
                <div className="text-2xl font-bold text-black mb-2">10,508,014</div>
                <p className="text-gray-800">Change: -0.06 (-0.34%)</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Market Cap</h3>
                <div className="text-2xl font-bold text-black mb-2">৳2.1B</div>
                <p className="text-gray-800">Based on current share price</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">52-Week Range</h3>
                <div className="text-lg font-semibold text-black mb-2">৳38.20 - ৳52.80</div>
                <p className="text-gray-800">High and low prices</p>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-4">Investor Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-black mb-2">Financial Reports</h4>
                  <ul className="space-y-1 text-gray-800">
                    <li>• Quarterly Reports</li>
                    <li>• Annual Reports</li>
                    <li>• PSI Reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2">Investor Relations</h4>
                  <ul className="space-y-1 text-gray-800">
                    <li>• Contact Information</li>
                    <li>• Investor Presentations</li>
                    <li>• Corporate Governance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StockPage;
