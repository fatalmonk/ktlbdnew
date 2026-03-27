import { FormData, FormErrors } from './form.types';

export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    newErrors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Please enter a valid email';
  }

  // Phone validation (optional but validate if provided)
  if (formData.phone && !/^[\d\s\-+()]+$/.test(formData.phone)) {
    newErrors.phone = 'Please enter a valid phone number';
  }

  // Subject validation
  if (!formData.subject.trim()) {
    newErrors.subject = 'Subject is required';
  }

  // Message validation
  if (!formData.message.trim()) {
    newErrors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    newErrors.message = 'Message must be at least 10 characters';
  }

  return newErrors;
};
