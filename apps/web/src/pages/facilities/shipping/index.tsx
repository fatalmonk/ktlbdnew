import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';

const ShippingFacility = () => {
  return (
    <>
      <SEO
        title="Shipping & Logistics Facility | Kattali Textile Ltd Global Distribution"
        description="KTL's comprehensive shipping and logistics facility in Chittagong ensures efficient global distribution and timely delivery of textile products worldwide."
        canonical="/facilities/shipping"
        keywords={[
          'shipping logistics',
          'global distribution',
          'textile logistics',
          'international delivery',
          'supply chain',
        ]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company/our-story' },
          { label: 'Shipping' },
        ]}
        pageTitle="Shipping"
      />
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our comprehensive shipping and logistics facility ensures efficient global
              distribution and timely delivery of textile products to customers worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Global Distribution</h3>
                <p className="text-neutral-800">
                  Worldwide shipping network with partnerships across major ports and logistics hubs
                  for efficient global delivery.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Warehouse Management</h3>
                <p className="text-neutral-800">
                  Advanced warehouse management systems for inventory control, order processing, and
                  quality assurance.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Customs & Compliance</h3>
                <p className="text-neutral-800">
                  Expert handling of customs procedures and international trade compliance for
                  seamless global shipping.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Tracking & Monitoring</h3>
                <p className="text-neutral-800">
                  Real-time shipment tracking and monitoring systems for complete visibility and
                  customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingFacility;
