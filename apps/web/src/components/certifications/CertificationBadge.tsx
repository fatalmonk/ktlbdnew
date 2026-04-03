import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';
import { Certification } from '../../types/certification';

const ExternalLink = createLazyIcon('ExternalLink');
const Download = createLazyIcon('Download');
const Award = createLazyIcon('Award');
const CheckCircle = createLazyIcon('CheckCircle');
const AlertCircle = createLazyIcon('AlertCircle');
const Clock = createLazyIcon('Clock');

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
      case 'Active':
        return 'text-green-600 bg-green-50';
      case 'Expiring Soon':
        return 'text-yellow-600 bg-yellow-50';
      case 'Expired':
        return 'text-red-600 bg-red-50';
      case 'In Renewal':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Suspense fallback={<div className="w-4 h-4" />}>
            <CheckCircle size={16} />
          </Suspense>
        );
      case 'Expiring Soon':
        return (
          <Suspense fallback={<div className="w-4 h-4" />}>
            <Clock size={16} />
          </Suspense>
        );
      case 'Expired':
        return (
          <Suspense fallback={<div className="w-4 h-4" />}>
            <AlertCircle size={16} />
          </Suspense>
        );
      case 'In Renewal':
        return (
          <Suspense fallback={<div className="w-4 h-4" />}>
            <Clock size={16} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div className="w-4 h-4" />}>
            <Award size={16} />
          </Suspense>
        );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Quality Management':
        return 'bg-blue-100 text-blue-700';
      case 'Environmental':
        return 'bg-green-100 text-green-700';
      case 'Social Compliance':
        return 'bg-purple-100 text-purple-700';
      case 'Product Safety':
        return 'bg-orange-100 text-orange-700';
      case 'Customer Specific':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer bg-white rounded-lg border-2 border-neutral-200 hover:border-blue-500 p-4 transition-all hover:shadow-md"
      >
        <div className="flex items-start gap-3">
          {certification.badgeImage ? (
            <img
              src={certification.badgeImage}
              alt={certification.name}
              className="w-12 h-12 object-contain flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
              <Suspense fallback={<div className="w-6 h-6" />}>
                <Award className="text-blue-600" size={24} />
              </Suspense>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors truncate">
              {certification.name}
            </h4>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
              {certification.issuingBody}
            </p>
            <div
              className={`inline-flex items-center gap-1 mt-2 text-xs px-2 py-1 rounded-full ${getStatusColor(certification.status)}`}
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
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Header with badge */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
        {certification.badgeImage ? (
          <img
            src={certification.badgeImage}
            alt={certification.name}
            className="w-24 h-24 mx-auto object-contain mb-4"
          />
        ) : (
          <div className="w-24 h-24 mx-auto bg-blue-200 rounded-full flex items-center justify-center mb-4">
            <Suspense fallback={<div className="w-12 h-12" />}>
              <Award className="text-blue-600" size={48} />
            </Suspense>
          </div>
        )}
        <h3 className="font-bold text-lg text-neutral-900">{certification.name}</h3>
        <p className="text-sm text-neutral-600 mt-1">{certification.issuingBody}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(certification.category)}`}
          >
            {certification.category}
          </span>
          <div
            className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full ${getStatusColor(certification.status)}`}
          >
            {getStatusIcon(certification.status)}
            <span>{certification.status}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-700 mb-4 line-clamp-3">{certification.description}</p>

        {/* Dates */}
        {certification.certificateNumber && (
          <div className="text-xs text-neutral-600 mb-2">
            <span className="font-medium">Certificate #:</span> {certification.certificateNumber}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 mb-4">
          <div>
            <span className="font-medium">Issued:</span>{' '}
            {new Date(certification.issuedDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <div>
            <span className="font-medium">Expires:</span>{' '}
            {new Date(certification.expiryDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-neutral-200">
          {certification.verificationUrl && (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={<div className="w-3.5 h-3.5" />}>
                <ExternalLink size={14} />
              </Suspense>
              Verify
            </a>
          )}
          {certification.certificatePdfUrl && (
            <a
              href={certification.certificatePdfUrl}
              download
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border-2 border-neutral-300 text-neutral-700 rounded hover:border-blue-600 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Suspense fallback={<div className="w-3.5 h-3.5" />}>
                <Download size={14} />
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
