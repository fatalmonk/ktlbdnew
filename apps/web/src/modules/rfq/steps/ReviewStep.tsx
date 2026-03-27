import type { RFQFormData } from '../types/rfq.types';

interface ReviewStepProps {
  formData: RFQFormData;
}

export const ReviewStep = ({ formData }: ReviewStepProps) => (
  <div>
    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
      Review Your Request
    </h2>
    <div className="space-y-6">
      <div className="border border-neutral-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Products</h3>
        <div className="space-y-2">
          {formData.products.map((product) => (
            <div key={product.category} className="flex justify-between">
              <span>{product.category}</span>
              <span className="font-semibold">
                {product.quantity.toLocaleString()} units
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Requirements</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-600">Timeline:</span>
            <p className="font-semibold">{formData.requirements.timeline}</p>
          </div>
          <div>
            <span className="text-neutral-600">Destination:</span>
            <p className="font-semibold">
              {formData.requirements.shippingDestination}
            </p>
          </div>
          {formData.requirements.certifications.length > 0 && (
            <div className="col-span-2">
              <span className="text-neutral-600">Certifications:</span>
              <p className="font-semibold">
                {formData.requirements.certifications.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Company &amp; Contact</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-600">Company:</span>
            <p className="font-semibold">{formData.company.name}</p>
          </div>
          <div>
            <span className="text-neutral-600">Contact:</span>
            <p className="font-semibold">{formData.contact.name}</p>
          </div>
          <div>
            <span className="text-neutral-600">Email:</span>
            <p className="font-semibold">{formData.contact.email}</p>
          </div>
          <div>
            <span className="text-neutral-600">Phone:</span>
            <p className="font-semibold">{formData.contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ Please review all information carefully before submitting. Our team
          will respond within 24 business hours.
        </p>
      </div>
    </div>
  </div>
);


