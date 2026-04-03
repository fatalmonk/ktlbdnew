import React from "react";

interface TextFieldProps {
  id: string;
  name: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-white mb-2"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 md:py-3 bg-white/10 border ${
          error ? "border-red-500" : "border-white/20"
        } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 transition-all text-base md:text-sm ${className}`}
        placeholder={placeholder}
        style={{ fontSize: "16px" }}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default TextField;
