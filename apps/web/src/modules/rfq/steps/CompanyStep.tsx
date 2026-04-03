import type { CompanyInfo } from "../types/rfq.types";
import { INDUSTRY_OPTIONS } from "../data/rfq.config";

interface CompanyStepProps {
  company: CompanyInfo;
  updateCompany: (company: Partial<CompanyInfo>) => void;
}

export const CompanyStep = ({ company, updateCompany }: CompanyStepProps) => (
  <div>
    <h2 className="text-2xl font-bold text-neutral-900 mb-6">
      Company Information
    </h2>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={company.name}
            onChange={(event) => updateCompany({ name: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Country *
          </label>
          <input
            type="text"
            value={company.country}
            onChange={(event) => updateCompany({ country: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Industry *
          </label>
          <select
            value={company.industry}
            onChange={(event) =>
              updateCompany({ industry: event.target.value })
            }
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select industry...</option>
            {INDUSTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Website (Optional)
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={company.website ?? ""}
            onChange={(event) => updateCompany({ website: event.target.value })}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Annual Volume (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g., 100,000 units/year"
          value={company.annualVolume ?? ""}
          onChange={(event) =>
            updateCompany({ annualVolume: event.target.value })
          }
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>
);
