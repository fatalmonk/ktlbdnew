import React, { useEffect, useRef } from 'react';

const SCRIPT_ATTR = 'data-ktl-maps-js-api';

let mapsJsLoadPromise: Promise<void> | null = null;

function loadMapsJavaScriptApi(apiKey: string): Promise<void> {
  if (typeof window !== 'undefined' && window.google?.maps?.places) {
    return Promise.resolve();
  }
  if (mapsJsLoadPromise) return mapsJsLoadPromise;

  mapsJsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[${SCRIPT_ATTR}="1"]`);
    if (existing) {
      if (existing.dataset.loaded === '1') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Maps load failed')));
      return;
    }
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&solution_channel=GMP_CCS_placedetails_v2`;
    s.async = true;
    s.defer = true;
    s.setAttribute(SCRIPT_ATTR, '1');
    s.onload = () => {
      s.dataset.loaded = '1';
      resolve();
    };
    s.onerror = () => {
      mapsJsLoadPromise = null;
      reject(new Error('Failed to load Google Maps JavaScript API'));
    };
    document.head.appendChild(s);
  });
  return mapsJsLoadPromise;
}

export interface PlaceDetailsMapProps {
  apiKey: string;
  placeId: string;
  height?: string;
  zoom?: number;
  className?: string;
  /** Accessible name for the map region */
  title?: string;
  /** Fallback center before place details load */
  defaultCenter?: google.maps.LatLngLiteral;
  onError?: () => void;
}

const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: 22.3698912,
  lng: 91.7696064,
};

/**
 * Google Maps JavaScript API — Place Details (PlacesService.getDetails).
 * @see https://developers.google.com/maps/documentation/javascript/examples/place-details
 */
const PlaceDetailsMap: React.FC<PlaceDetailsMapProps> = ({
  apiKey,
  placeId,
  height = '400px',
  zoom = 15,
  className = '',
  title = 'Map',
  defaultCenter = DEFAULT_CENTER,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let marker: google.maps.Marker | undefined;

    loadMapsJavaScriptApi(apiKey)
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const map = new google.maps.Map(el, {
          center: defaultCenter,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        const request: google.maps.places.PlaceDetailsRequest = {
          placeId,
          fields: ['name', 'formatted_address', 'place_id', 'geometry'],
          region: 'bd',
        };

        const infowindow = new google.maps.InfoWindow();
        const service = new google.maps.places.PlacesService(map);

        service.getDetails(request, (place, status) => {
          if (cancelled) return;
          if (status !== google.maps.places.PlacesServiceStatus.OK || !place?.geometry?.location) {
            onError?.();
            return;
          }

          map.setCenter(place.geometry.location);

          marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
            title: place.name,
          });

          marker.addListener('click', () => {
            const content = document.createElement('div');
            const nameElement = document.createElement('h2');
            nameElement.className =
              'font-heading text-lg font-semibold text-neutral-900 m-0 mb-2 pr-6';
            nameElement.textContent = place.name ?? '';
            content.appendChild(nameElement);

            const placeIdElement = document.createElement('p');
            placeIdElement.className = 'text-xs text-neutral-500 m-0 mb-2 break-all';
            placeIdElement.textContent = place.place_id ?? '';
            content.appendChild(placeIdElement);

            const placeAddressElement = document.createElement('p');
            placeAddressElement.className = 'text-sm text-neutral-700 m-0';
            placeAddressElement.textContent = place.formatted_address ?? '';
            content.appendChild(placeAddressElement);

            infowindow.setContent(content);
            infowindow.setOptions({ ariaLabel: place.name });
            infowindow.open(map, marker);
          });
        });
      })
      .catch(() => {
        if (!cancelled) onError?.();
      });

    return () => {
      cancelled = true;
      if (marker) {
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
    };
  }, [apiKey, placeId, zoom, defaultCenter, onError]);

  return (
    <div className={`rounded-lg overflow-hidden shadow-xl ${className}`} style={{ height }}>
      <div
        ref={containerRef}
        className="h-full w-full min-h-[320px]"
        role="region"
        aria-label={title}
      />
    </div>
  );
};

export default PlaceDetailsMap;
