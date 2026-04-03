import type { RFQRequirements } from '../types/rfq.types';
import { CERTIFICATIONS_LIST, TIMELINE_OPTIONS } from '../data/rfq.config';

interface TimelineStepProps {
  requirements: RFQRequirements;
  updateRequirements: (requirements: Partial<RFQRequirements>) => void;
}

export const TimelineStep = ({ requirements, updateRequirements }: TimelineStepProps) => {
  const handleToggleCertification = (cert: string, checked: boolean) => {
    const current = requirements.certifications;
    const next = checked ? [...current, cert] : current.filter((item) => item !== cert);
    updateRequirements({ certifications: next });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Requirements</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Required Certifications
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CERTIFICATIONS_LIST.map((cert) => (
              <label key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  checked={requirements.certifications.includes(cert)}
                  onChange={(event) => handleToggleCertification(cert, event.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-neutral-700">{cert}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Timeline *</label>
            <select
              value={requirements.timeline}
              onChange={(event) => updateRequirements({ timeline: event.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select timeline...</option>
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Shipping Destination *
            </label>
            <input
              type="text"
              placeholder="Country/Region"
              value={requirements.shippingDestination}
              onChange={(event) =>
                updateRequirements({
                  shippingDestination: event.target.value,
                })
              }
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={requirements.moqAcceptable}
              onChange={(event) => updateRequirements({ moqAcceptable: event.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-neutral-700">
              I understand and accept minimum order quantity (MOQ) requirements
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Additional Requirements (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Any specific requirements, preferences, or questions..."
            value={requirements.additionalRequirements ?? ''}
            onChange={(event) =>
              updateRequirements({
                additionalRequirements: event.target.value,
              })
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
