import { motion } from "framer-motion";
import { Suspense } from "react";
import { createLazyIcon } from "@/lib/lucide-icons";
import { Certification } from "../../types/certification";

const ExternalLink = createLazyIcon("ExternalLink");
const Download = createLazyIcon("Download");
const Award = createLazyIcon("Award");
const CheckCircle = createLazyIcon("CheckCircle");
const AlertCircle = createLazyIcon("AlertCircle");
const Clock = createLazyIcon("Clock");

interface CertificationBadgeProps {
  certification: Certification;
  onClick?: () => void;
  compact?: boolean;
}

const CertificationBadge = ({
  certification,
  onClick,
  compact = false,
}: CertificationBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-50";
      case "Expiring Soon":
        return "text-yellow-600 bg-yellow-50";
      case "Expired":
        return "text-red-600 bg-red-50";
      case "In Renewal":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-neutral-600 bg-neutral-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CheckCircle size={18} />
          </Suspense>
        );
      case "Expiring Soon":
        return (
          <Suspense fallback={<div className="w-5 h-5" />}>
            <Clock size={18} />
          </Suspense>
        );
      case "Expired":
        return (
          <Suspense fallback={<div className="w-5 h-5" />}>
            <AlertCircle size={18} />
          </Suspense>
        );
      case "In Renewal":
        return (
          <Suspense fallback={<div className="w-5 h-5" />}>
            <Clock size={18} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div className="w-5 h-5" />}>
            <Award size={18} />
          </Suspense>
        );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Quality Management":
        return "bg-blue-100 text-blue-700";
      case "Environmental":
        return "bg-green-100 text-green-700";
      case "Social Compliance":
        return "bg-purple-100 text-purple-700";
      case "Product Safety":
        return "bg-orange-100 text-orange-700";
      case "Customer Specific":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  if (compact) {
    const src = certification.badgeImage;
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer bg-white rounded-xl border-2 border-neutral-200 hover:border-blue-500 p-5 md:p-6 transition-all hover:shadow-lg"
      >
        <div className="flex items-start gap-4">
          {src ? (
            <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-20 sm:w-20">
              <img
                src={src}
                alt={certification.fullName || certification.name}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Suspense fallback={<div className="w-8 h-8" />}>
                <Award className="text-blue-600" size={32} />
              </Suspense>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-lg text-neutral-900 group-hover:text-blue-600 transition-colors truncate">
              {certification.name}
            </h4>
            <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
              {certification.issuingBody}
            </p>
            <div
              className={`inline-flex items-center gap-1.5 mt-3 text-sm px-3 py-1.5 rounded-full ${getStatusColor(certification.status)}`}
            >
              {getStatusIcon(certification.status)}
              <span>{certification.status}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Header with badge */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-10 text-center">
        {certification.badgeImage ? (
          <div className="mx-auto mb-5 w-full max-w-[min(100%,12rem)]">
            <img
              src={certification.badgeImage}
              alt={certification.fullName || certification.name}
              className="mx-auto h-36 w-full object-contain sm:h-40 md:h-44"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="w-32 h-32 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-5">
            <Suspense fallback={<div className="w-14 h-14" />}>
              <Award className="text-blue-600" size={56} />
            </Suspense>
          </div>
        )}
        <h3 className="font-bold text-xl md:text-2xl text-neutral-900">
          {certification.name}
        </h3>
        <p className="text-base md:text-lg text-neutral-600 mt-2">
          {certification.issuingBody}
        </p>
      </div>

      {/* Content */}
      <div className="p-8 md:p-9">
        {/* Category & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <span
            className={`text-sm px-4 py-1.5 rounded-full ${getCategoryColor(certification.category)}`}
          >
            {certification.category}
          </span>
          <div
            className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full ${getStatusColor(certification.status)}`}
          >
            {getStatusIcon(certification.status)}
            <span>{certification.status}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-700 mb-5 line-clamp-4 leading-relaxed">
          {certification.description}
        </p>

        {/* Dates */}
        {certification.certificateNumber && (
          <div className="text-sm text-neutral-600 mb-2">
            <span className="font-medium">Certificate #:</span>{" "}
            {certification.certificateNumber}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 mb-5">
          <div>
            <span className="font-medium">Issued:</span>{" "}
            {new Date(certification.issuedDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>
            <span className="font-medium">Expires:</span>{" "}
            {new Date(certification.expiryDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-neutral-200">
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors min-h-[48px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={<div className="w-5 h-5" />}>
                <ExternalLink size={20} />
              </Suspense>
              Verify
            </a>
          )}
          {certification.certificatePdfUrl && (
            <a
              href={certification.certificatePdfUrl}
              download
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold border-2 border-neutral-300 text-neutral-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors min-h-[48px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={<div className="w-5 h-5" />}>
                <Download size={20} />
              </Suspense>
              Download
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationBadge;
