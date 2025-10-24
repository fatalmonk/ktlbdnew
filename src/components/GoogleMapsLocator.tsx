import React from 'react';
import { GOOGLE_MAPS_LOCATOR_URL } from '../lib/constants';

interface GoogleMapsLocatorProps {
  className?: string;
  height?: string;
  title?: string;
}

const GoogleMapsLocator: React.FC<GoogleMapsLocatorProps> = ({
  className = '',
  height = '400px',
  title = 'Google Maps Location Finder',
}) => {
  return (
    <div className={`rounded-lg overflow-hidden shadow-xl ${className}`} style={{ height }}>
      <iframe
        src={GOOGLE_MAPS_LOCATOR_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMapsLocator;
