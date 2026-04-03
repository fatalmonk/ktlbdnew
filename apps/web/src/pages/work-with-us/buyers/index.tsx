import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';

const BuyersPage = () => {
  return (
    <>
      <SEO
        title="Buyers"
        description="Partner with KTL as a buyer. Discover our comprehensive textile solutions, quality assurance, and global supply chain capabilities."
        keywords={['buyers', 'textile buyers', 'KTL partners', 'global buyers', 'textile sourcing']}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Work With Us', to: '/work-with-us/buyers' },
          { label: 'Buyers' },
        ]}
        pageTitle="Buyers"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Partner with KTL for comprehensive textile solutions. We offer quality products,
              reliable supply chain, and dedicated support for your business needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Product Range</h3>
                <p className="text-neutral-800">
                  Wide variety of textile products including denims, knitwear, swimwear, and kids
                  wear to meet diverse market demands.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
                <p className="text-neutral-800">
                  Rigorous quality control processes and certifications ensuring consistent
                  high-quality products.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Global Supply Chain</h3>
                <p className="text-neutral-800">
                  Efficient global distribution network with reliable shipping and logistics support
                  worldwide.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
                <p className="text-neutral-800">
                  Tailored manufacturing solutions to meet specific requirements and design
                  specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BuyersPage;
