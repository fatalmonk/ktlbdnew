import React, { useState, Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const Send = createLazyIcon('Send');
const CheckCircle = createLazyIcon('CheckCircle');
const Loader = createLazyIcon('Loader');

import TextField from '../../modules/forms/TextField';
import SelectField from '../../modules/forms/SelectField';
import TextAreaField from '../../modules/forms/TextAreaField';
import FormError from '../../modules/forms/FormError';
import { FormData, FormErrors, FormStatus } from '../../modules/forms/form.types';
import { validateForm } from '../../modules/forms/form.validation';

// Declare gtag for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call - Replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('success');

      // Google Analytics 4 event
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1,
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
      console.error('Form submission error:', error);
    }
  };

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Orders' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'careers', label: 'Careers' },
    { value: 'support', label: 'Support' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-heading font-bold text-white mb-6">Send us a message</h2>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
            <Suspense fallback={<div className="w-5 h-5 flex-shrink-0 mt-0.5" />}>
              <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
            </Suspense>
            <div>
              <p className="text-green-100 font-medium">Message sent successfully!</p>
              <p className="text-green-200/80 text-sm mt-1">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && <FormError message={errorMessage} />}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <TextField
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              label="Name"
              required
              error={errors.name}
            />
            <TextField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              label="Email"
              required
              error={errors.email}
            />
          </div>

          {/* Company and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <TextField
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              label="Company"
              error={errors.company}
            />
            <TextField
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+880 XXX XXX XXX"
              label="Phone"
              error={errors.phone}
            />
          </div>

          {/* Subject */}
          <SelectField
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            options={subjectOptions}
            label="Subject"
            required
            error={errors.subject}
          />

          {/* Message */}
          <TextAreaField
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you..."
            label="Message"
            required
            error={errors.message}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full min-h-[48px] bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base md:text-sm"
          >
            {status === 'loading' ? (
              <>
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Loader className="animate-spin" size={20} />
                </Suspense>
                Sending...
              </>
            ) : (
              <>
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Send size={20} />
                </Suspense>
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
