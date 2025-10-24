import SEO from '../../../components/SEO';

const InvestorContactsPage = () => {
  return (
    <>
      <SEO
        title="Investor Contacts"
        description="Contact information for KTL's investor relations team. Get in touch for investor inquiries, financial information, and shareholder services."
        keywords={['investor contacts', 'investor relations', 'KTL contacts', 'shareholder services', 'investor inquiries']}
      />
      <main className="min-h-screen bg-white text-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-black mb-8">Investor Contacts</h1>
            <p className="text-lg text-gray-800 mb-8">
              Get in touch with our investor relations team for inquiries about financial information,
              shareholder services, and investment opportunities at Kattali Textile Limited.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Investor Relations</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-black">Email</h4>
                    <p className="text-gray-800">investors@ktlbd.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Phone</h4>
                    <p className="text-gray-800">+880 1308 790475</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Response Time</h4>
                    <p className="text-gray-800">24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Shareholder Services</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-black">Email</h4>
                    <p className="text-gray-800">shareholders@ktlbd.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Phone</h4>
                    <p className="text-gray-800">+880 1308 790476</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Services</h4>
                    <p className="text-gray-800">Account inquiries, dividend information</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Financial Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-black">Email</h4>
                    <p className="text-gray-800">finance@ktlbd.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Phone</h4>
                    <p className="text-gray-800">+880 1308 790477</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Available</h4>
                    <p className="text-gray-800">Monday - Friday, 9 AM - 5 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Media & Press</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-black">Email</h4>
                    <p className="text-gray-800">press@ktlbd.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Phone</h4>
                    <p className="text-gray-800">+880 1308 790478</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">Response Time</h4>
                    <p className="text-gray-800">24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-4">Office Address</h3>
              <div className="text-gray-800">
                <p className="font-semibold">Kattali Textile Limited</p>
                <p>BM Heights, 8th Floor</p>
                <p>318 Sk. Mujib Road, Agrabad</p>
                <p>Chittagong, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default InvestorContactsPage;
