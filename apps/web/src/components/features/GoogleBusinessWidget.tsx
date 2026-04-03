import React, { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const MapPin = createLazyIcon('MapPin');
const Star = createLazyIcon('Star');
const ExternalLink = createLazyIcon('ExternalLink');
const Globe = createLazyIcon('Globe');
import {
  GOOGLE_MAPS_VIEW_URL,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_BUSINESS_REVIEW_URL,
  COMPANY_COORDINATES,
} from '../../lib/constants';

interface GoogleBusinessWidgetProps {
  className?: string;
  showMap?: boolean;
  showReviews?: boolean;
  showDirections?: boolean;
}

const GoogleBusinessWidget: React.FC<GoogleBusinessWidgetProps> = ({
  className = '',
  showMap = true,
  showReviews = true,
  showDirections = true,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 space-y-4 ${className}`}>
      <h3 className="font-heading text-xl font-semibold lowercase leading-none tracking-tight text-[#243a4f]">
        kattali textile limited
      </h3>
      <div className="flex items-center text-neutral-700">
        <Suspense fallback={<div className="w-5 h-5 mr-2" />}>
          <Star className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" />
        </Suspense>
        <span>4.5 (100+ reviews)</span>
      </div>
      <div className="space-y-2">
        {showMap && (
          <a
            href={GOOGLE_MAPS_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Suspense fallback={<div className="w-4 h-4" />}>
                <MapPin className="w-4 h-4 text-blue-600" />
              </Suspense>
              <span className="text-neutral-700 font-medium">View on Google Maps</span>
            </div>
            <Suspense fallback={<div className="w-4 h-4" />}>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
            </Suspense>
          </a>
        )}

        {showDirections && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${COMPANY_COORDINATES}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Suspense fallback={<div className="w-4 h-4" />}>
                <MapPin className="w-4 h-4 text-green-600" />
              </Suspense>
              <span className="text-neutral-700 font-medium">Get Directions</span>
            </div>
            <Suspense fallback={<div className="w-4 h-4" />}>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
            </Suspense>
          </a>
        )}

        {showReviews && (
          <a
            href={GOOGLE_BUSINESS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Suspense fallback={<div className="w-4 h-4" />}>
                <Star className="w-4 h-4 text-yellow-500" />
              </Suspense>
              <span className="text-neutral-700 font-medium">Leave a Review</span>
            </div>
            <Suspense fallback={<div className="w-4 h-4" />}>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
            </Suspense>
          </a>
        )}

        <a
          href={GOOGLE_BUSINESS_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <Suspense fallback={<div className="w-4 h-4" />}>
              <Globe className="w-4 h-4 text-purple-600" />
            </Suspense>
            <span className="text-neutral-700 font-medium">View Business Profile</span>
          </div>
          <Suspense fallback={<div className="w-4 h-4" />}>
            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
          </Suspense>
        </a>
      </div>
    </div>
  );
};

export default GoogleBusinessWidget;
