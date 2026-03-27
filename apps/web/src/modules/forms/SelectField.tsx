import React from 'react';

interface SelectFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  label,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 md:py-3 bg-white/10 border ${
          error ? 'border-red-500' : 'border-white/20'
        } rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all text-base md:text-sm ${className}`}
        style={{ fontSize: '16px' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-neutral-900">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default SelectField;
