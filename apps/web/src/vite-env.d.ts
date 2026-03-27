/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** Maps JavaScript API key for embedded Locator Plus (optional; iframe used if unset). */
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  /** Cloud Console Map ID for Vector Map / Locator Plus (see default in GoogleMapsLocator). */
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
