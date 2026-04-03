import { useState, useEffect } from 'react';
import {
  RFQFormData,
  ProductSelection,
  RFQRequirements,
  CompanyInfo,
  ContactInfo,
} from '../modules/rfq/types/rfq';
import {
  RFQ_STORAGE_KEY,
  initialRFQFormData,
} from '../modules/rfq/data/rfq.config';
import { isRFQStepValid } from '../modules/rfq/validation/rfq.validation';
import {
  safeLocalStorageGetItem,
  safeLocalStorageRemoveItem,
  safeLocalStorageSetItem,
} from '../lib/storage/safeLocalStorage';

export const useRFQForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RFQFormData>(initialRFQFormData);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = safeLocalStorageGetItem(RFQ_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...initialRFQFormData, ...parsed, attachments: [] }); // Don't restore files
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const toSave = {
      ...formData,
      attachments: [], // Don't save files to localStorage
    };
    safeLocalStorageSetItem(RFQ_STORAGE_KEY, JSON.stringify(toSave));
  }, [formData]);

  const updateProducts = (products: ProductSelection[]) => {
    setFormData((prev) => ({ ...prev, products }));
  };

  const updateRequirements = (requirements: Partial<RFQRequirements>) => {
    setFormData((prev) => ({
      ...prev,
      requirements: { ...prev.requirements, ...requirements },
    }));
  };

  const updateCompany = (company: Partial<CompanyInfo>) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, ...company },
    }));
  };

  const updateContact = (contact: Partial<ContactInfo>) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact },
    }));
  };

  const updateAttachments = (attachments: File[]) => {
    setFormData((prev) => ({ ...prev, attachments }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), 6));
  };

  const resetForm = () => {
    setFormData(initialRFQFormData);
    setCurrentStep(1);
    safeLocalStorageRemoveItem(RFQ_STORAGE_KEY);
  };

  const isStepValid = (step: number): boolean => {
    return isRFQStepValid(formData, step);
  };

  return {
    currentStep,
    formData,
    updateProducts,
    updateRequirements,
    updateCompany,
    updateContact,
    updateAttachments,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isStepValid,
  };
};

