import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// Declare gtag for Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

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

  // Validation
  const validateForm = (): boolean => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call - Replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');

      // Google Analytics 4 event
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1
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

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-heading font-bold text-white mb-6">
          Send us a message
        </h2>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-green-100 font-medium">Message sent successfully!</p>
              <p className="text-green-200/80 text-sm mt-1">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-red-100 font-medium">Error sending message</p>
              <p className="text-red-200/80 text-sm mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-white/10 border ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-white/10 border ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="Your company"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-white/10 border ${
                  errors.phone ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all`}
                placeholder="+880 XXX XXX XXX"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
              Subject <span className="text-red-400">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-white/10 border ${
                errors.subject ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all`}
            >
              <option value="" className="bg-gray-900">Select a subject</option>
              <option value="general" className="bg-gray-900">General Inquiry</option>
              <option value="sales" className="bg-gray-900">Sales & Orders</option>
              <option value="partnership" className="bg-gray-900">Partnership Opportunities</option>
              <option value="careers" className="bg-gray-900">Careers</option>
              <option value="support" className="bg-gray-900">Support</option>
              <option value="other" className="bg-gray-900">Other</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2.5 bg-white/10 border ${
                errors.message ? 'border-red-500' : 'border-white/20'
              } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all resize-none`}
              placeholder="Tell us how we can help you..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary-500 hover:bg-primary-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {status === 'loading' ? (
              <>
                <Loader className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
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
