import React from 'react';
import { MapPin, Star, ExternalLink, Globe } from 'lucide-react';
import {
  GOOGLE_MAPS_VIEW_URL,
  GOOGLE_BUSINESS_PROFILE_URL,
  GOOGLE_BUSINESS_REVIEW_URL,
  COMPANY_COORDINATES
} from '../lib/constants';

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
  showDirections = true
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 space-y-4 ${className}`}>
      <h3 className="font-sans font-bold text-xl text-gray-900">Kattali Textile Limited</h3>
      <div className="flex items-center text-gray-700">
        <Star className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" />
        <span>4.5 (100+ reviews)</span>
      </div>
      <div className="space-y-2">
        {showMap && (
          <a
            href={GOOGLE_MAPS_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium">View on Google Maps</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        )}

        {showDirections && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${COMPANY_COORDINATES}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 font-medium">Get Directions</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        )}

        {showReviews && (
          <a
            href={GOOGLE_BUSINESS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700 font-medium">Leave a Review</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </a>
        )}

        <a
          href={GOOGLE_BUSINESS_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700 font-medium">View Business Profile</span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </a>
      </div>
    </div>
  );
};

export default GoogleBusinessWidget;
