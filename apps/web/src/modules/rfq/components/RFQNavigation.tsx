import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const ChevronLeft = createLazyIcon('ChevronLeft');
const ChevronRight = createLazyIcon('ChevronRight');
const Send = createLazyIcon('Send');

interface RFQNavigationProps {
  currentStep: number;
  isSubmitting: boolean;
  isStepValid: (step: number) => boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const RFQNavigation = ({
  currentStep,
  isSubmitting,
  isStepValid,
  onPrevious,
  onNext,
  onSubmit,
}: RFQNavigationProps) => (
  <div className="mt-8 flex items-center justify-between pt-6 border-t border-neutral-200">
    <button
      onClick={onPrevious}
      disabled={currentStep === 1}
      className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Suspense fallback={<div className="w-5 h-5" />}>
        <ChevronLeft size={20} />
      </Suspense>
      Previous
    </button>

    {currentStep < 6 ? (
      <button
        onClick={onNext}
        disabled={!isStepValid(currentStep)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <Suspense fallback={<div className="w-5 h-5" />}>
          <ChevronRight size={20} />
        </Suspense>
      </button>
    ) : (
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Suspense fallback={<div className="w-5 h-5" />}>
              <Send size={20} />
            </Suspense>
            Submit Request
          </>
        )}
      </button>
    )}
  </div>
);

export default RFQNavigation;


