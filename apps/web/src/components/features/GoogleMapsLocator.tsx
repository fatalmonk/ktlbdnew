import React, { useCallback, useState } from "react";
import { GOOGLE_MAPS_LOCATOR_URL } from "../../lib/constants";
import { LOCATOR_PLUS_BASE } from "../../lib/locatorQuickBuilderConfig";
import PlaceDetailsMap from "./PlaceDetailsMap";

interface GoogleMapsLocatorProps {
  className?: string;
  height?: string;
  title?: string;
}

const IframeLocator: React.FC<GoogleMapsLocatorProps> = ({
  className = "",
  height = "400px",
  title = "Google Maps Location Finder",
}) => (
  <div
    className={`rounded-lg overflow-hidden shadow-xl ${className}`}
    style={{ height }}
  >
    <iframe
      src={GOOGLE_MAPS_LOCATOR_URL}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      title={title}
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
);

/** Default map: production facility (first Locator Plus entry). */
const DEFAULT_PLACE_ID = LOCATOR_PLUS_BASE.locations[0].placeId;

const GoogleMapsLocator: React.FC<GoogleMapsLocatorProps> = (props) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  const [embedFailed, setEmbedFailed] = useState(false);
  const onEmbedError = useCallback(() => setEmbedFailed(true), []);

  if (apiKey && !embedFailed) {
    return (
      <PlaceDetailsMap
        {...props}
        apiKey={apiKey}
        placeId={DEFAULT_PLACE_ID}
        title={
          props.title ?? "Kattali Textile Limited — production facility on map"
        }
        onError={onEmbedError}
      />
    );
  }

  return <IframeLocator {...props} />;
};

export default GoogleMapsLocator;
