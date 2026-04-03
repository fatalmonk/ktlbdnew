import type { RFQFormData } from '../types/rfq.types';

export const isRFQStepValid = (formData: RFQFormData, step: number): boolean => {
  switch (step) {
    case 1: {
      return formData.products.length > 0;
    }
    case 2: {
      return formData.products.every((product) => product.quantity > 0);
    }
    case 3: {
      return (
        formData.requirements.timeline !== '' && formData.requirements.shippingDestination !== ''
      );
    }
    case 4: {
      return (
        formData.company.name !== '' &&
        formData.company.country !== '' &&
        formData.company.industry !== ''
      );
    }
    case 5: {
      return (
        formData.contact.name !== '' &&
        formData.contact.email !== '' &&
        formData.contact.phone !== ''
      );
    }
    case 6:
      return true;
    default:
      return false;
  }
};
