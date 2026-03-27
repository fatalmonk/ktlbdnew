/**
 * Locator Plus (Quick Builder) configuration for gmpx-store-locator.
 * @see https://github.com/googlemaps/extended-component-library/blob/main/src/store_locator/README.md
 */
export type LocatorPlusLocation = {
  title: string;
  address1: string;
  address2: string;
  coords: { lat: number; lng: number };
  placeId: string;
};

export type LocatorPlusConfiguration = {
  locations: LocatorPlusLocation[];
  mapOptions: {
    center: { lat: number; lng: number };
    fullscreenControl: boolean;
    mapTypeControl: boolean;
    streetViewControl: boolean;
    zoom: number;
    zoomControl: boolean;
    maxZoom: number;
    mapId: string;
  };
  mapsApiKey: string;
  capabilities: {
    input: boolean;
    autocomplete: boolean;
    directions: boolean;
    distanceMatrix: boolean;
    details: boolean;
    actions: boolean;
  };
};

/** Base config; `mapsApiKey` is set at runtime from env in the embed component. */
export const LOCATOR_PLUS_BASE: Omit<LocatorPlusConfiguration, 'mapsApiKey'> = {
  locations: [
    {
      title: 'Kattali Textile Limited (KTL) - Production Facility',
      address1: 'Kattali Textile Limited (KTL)',
      address2: 'Chittagong, Bangladesh',
      coords: { lat: 22.3698912, lng: 91.7696064 },
      placeId: 'ChIJyQndyHXZrDARQbHKfGpmR-w',
    },
    {
      title: 'Kattali Textile Limited (KTL) — Head Office',
      address1: '318 SK Mujib Road, BM Heights, 8th Floor, Agrabad',
      address2: 'Chittagong, Bangladesh',
      coords: { lat: 22.328026, lng: 91.8127478 },
      placeId: 'ChIJmQQmAjHZrDARs0GQJ33qECg',
    },
  ],
  mapOptions: {
    center: { lat: 22.349, lng: 91.791 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 11,
    zoomControl: true,
    maxZoom: 17,
    mapId: '',
  },
  capabilities: {
    input: true,
    autocomplete: true,
    directions: false,
    distanceMatrix: true,
    details: false,
    actions: false,
  },
};
