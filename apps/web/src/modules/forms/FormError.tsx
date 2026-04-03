import React, { Suspense } from "react";
import { createLazyIcon } from "@/lib/lucide-icons";

const AlertCircle = createLazyIcon("AlertCircle");

interface FormErrorProps {
  message: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, className = "" }) => {
  return (
    <div
      className={`p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3 ${className}`}
    >
      <Suspense fallback={<div className="w-5 h-5 flex-shrink-0 mt-0.5" />}>
        <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
      </Suspense>
      <p className="text-red-100 font-medium">{message}</p>
    </div>
  );
};

export default FormError;
