import type { ContactInfo } from '../types/rfq.types';

interface ContactStepProps {
  contact: ContactInfo;
  updateContact: (contact: Partial<ContactInfo>) => void;
}

const ContactStep = ({ contact, updateContact }: ContactStepProps) => (
  <div>
    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
      Contact Information
    </h2>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={contact.name}
            onChange={(event) => updateContact({ name: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Position/Title *
          </label>
          <input
            type="text"
            value={contact.position}
            onChange={(event) =>
              updateContact({ position: event.target.value })
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(event) => updateContact({ email: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(event) => updateContact({ phone: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          📧 A confirmation email will be sent to{' '}
          <strong>{contact.email || 'your email'}</strong> once you submit this
          request.
        </p>
      </div>
    </div>
  </div>
);

export default ContactStep;


