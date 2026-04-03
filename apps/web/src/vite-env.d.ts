/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  /** Maps JavaScript API key for embedded Locator Plus (optional; iframe used if unset). */
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  /** Cloud Console Map ID for Vector Map / Locator Plus (see default in GoogleMapsLocator). */
  readonly VITE_GOOGLE_MAPS_MAP_ID?: string;
  /** Datadog RUM — from RUM Application settings. */
  readonly VITE_DD_APPLICATION_ID?: string;
  /** Datadog RUM client token (browser-safe). */
  readonly VITE_DD_CLIENT_TOKEN?: string;
  /** Datadog site, e.g. ap1.datadoghq.com */
  readonly VITE_DD_SITE?: string;
  /** Service name in Datadog (default: ktlbd-website-app). */
  readonly VITE_DD_SERVICE?: string;
  /** Environment label (default: Vite mode). */
  readonly VITE_DD_ENV?: string;
  /** Release version string for RUM (default: 1.0.0). */
  readonly VITE_APP_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
