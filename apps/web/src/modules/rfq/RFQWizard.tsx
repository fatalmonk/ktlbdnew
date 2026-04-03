import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { reportMessage } from '@/lib/observability';
import SubpageHeader from '../../components/shared/SubpageHeader';
import { useRFQForm } from '../../hooks/useRFQForm';
import { RFQ_STEPS } from './data/rfq.config';
import RFQSuccess from './components/RFQSuccess';
import RFQProgress from './components/RFQProgress';
import RFQNavigation from './components/RFQNavigation';
import { ProductSelectionStep, ProductSpecificationsStep } from './steps/ProductStep';
import { TimelineStep } from './steps/TimelineStep';
import { CompanyStep } from './steps/CompanyStep';
import ContactStep from './steps/ContactStep';
import { ReviewStep } from './steps/ReviewStep';

const RFQWizard = () => {
  const {
    currentStep,
    formData,
    updateProducts,
    updateRequirements,
    updateCompany,
    updateContact,
    nextStep,
    prevStep,
    isStepValid,
    resetForm,
  } = useRFQForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const referenceNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0')}`;

    reportMessage('RFQ submitted', 'info', {
      ...formData,
      referenceNumber,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <RFQSuccess
        formData={formData}
        onSubmitAnother={() => {
          resetForm();
          setIsSubmitted(false);
        }}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductSelectionStep products={formData.products} updateProducts={updateProducts} />
        );
      case 2:
        return (
          <ProductSpecificationsStep products={formData.products} updateProducts={updateProducts} />
        );
      case 3:
        return (
          <TimelineStep
            requirements={formData.requirements}
            updateRequirements={updateRequirements}
          />
        );
      case 4:
        return <CompanyStep company={formData.company} updateCompany={updateCompany} />;
      case 5:
        return <ContactStep contact={formData.contact} updateContact={updateContact} />;
      case 6:
      default:
        return <ReviewStep formData={formData} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SubpageHeader
        breadcrumbItems={[{ label: 'Home', to: '/' }, { label: 'Request a Quote' }]}
        pageTitle="Request a Quote"
      />
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-neutral-600">
              Complete this form to receive a customized quote within 24 hours
            </p>
          </div>
          <RFQProgress steps={RFQ_STEPS} currentStep={currentStep} />
          <div className="bg-white rounded-lg shadow-md p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
            <RFQNavigation
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              isStepValid={isStepValid}
              onPrevious={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQWizard;
