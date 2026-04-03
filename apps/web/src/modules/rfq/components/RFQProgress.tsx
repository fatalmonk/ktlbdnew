import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const CheckCircle = createLazyIcon('CheckCircle');
import type { RFQStepConfig } from '../data/rfq.config';

interface RFQProgressProps {
  steps: RFQStepConfig[];
  currentStep: number;
}

const RFQProgress = ({ steps, currentStep }: RFQProgressProps) => (
  <div className="mb-12">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep > step.number
                  ? 'bg-green-600 text-white'
                  : currentStep === step.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-200 text-neutral-500'
              }`}
            >
              {currentStep > step.number ? (
                <Suspense fallback={<div className="w-6 h-6" />}>
                  <CheckCircle size={24} />
                </Suspense>
              ) : (
                <step.icon size={24} />
              )}
            </div>
            <span className="text-xs mt-2 text-center hidden md:block font-medium">
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-colors ${
                currentStep > step.number ? 'bg-green-600' : 'bg-neutral-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default RFQProgress;
