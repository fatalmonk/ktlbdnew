import SEO from '../../components/seo/SEO';
import RFQWizard from '../../modules/rfq/RFQWizard';

const RequestQuote = () => {
  return (
    <>
      <SEO
        title="Request a Quote | KTL"
        description="Request a custom quote for textile manufacturing. Share your requirements and get a detailed proposal from KTL within 24 hours."
        keywords={[
          'textile quote',
          'manufacturing quote',
          'custom apparel production',
          'bulk order',
        ]}
      />

      <RFQWizard />
    </>
  );
};

export default RequestQuote;
