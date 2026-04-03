import { motion } from "framer-motion";
import { Suspense } from "react";
import { createLazyIcon } from "@/lib/lucide-icons";

const CheckCircle = createLazyIcon("CheckCircle");
import SEO from "../../../components/seo/SEO";
import SubpageHeader from "../../../components/shared/SubpageHeader";
import type { RFQFormData } from "../types/rfq.types";

interface RFQSuccessProps {
  formData: RFQFormData;
  onSubmitAnother: () => void;
}

const generateReferenceNumber = () =>
  `RFQ-2025-${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")}`;

const RFQSuccess = ({ formData, onSubmitAnother }: RFQSuccessProps) => (
  <>
    <SEO
      title="Quote Request Submitted | KTL"
      description="Your quote request has been successfully submitted to KTL."
    />
    <SubpageHeader
      breadcrumbItems={[
        { label: "Home", to: "/" },
        { label: "Request a Quote" },
      ]}
      pageTitle="Request a Quote"
    />
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Suspense fallback={<div className="w-12 h-12" />}>
            <CheckCircle className="text-green-600" size={48} />
          </Suspense>
        </div>
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Request Successfully Submitted!
        </h2>
        <p className="text-lg text-neutral-600 mb-6">
          Thank you for your quote request. Our sales team will review your
          requirements and respond within 24 hours.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-neutral-600 mb-1">
            Your Reference Number:
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {generateReferenceNumber()}
          </p>
        </div>
        <p className="text-sm text-neutral-600 mb-8">
          A confirmation email has been sent to{" "}
          <strong>{formData.contact.email}</strong>
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-300 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={onSubmitAnother}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </motion.div>
    </div>
  </>
);

export default RFQSuccess;
