import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_LOCATOR_URL } from "../../lib/constants";
import {
  LOCATOR_PLUS_BASE,
  type LocatorPlusConfiguration,
} from "../../lib/locatorQuickBuilderConfig";

const ECL_VERSION = "0.6.11";
const ECL_SCRIPT = `https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/${ECL_VERSION}/index.min.js`;

let eclLoadPromise: Promise<void> | null = null;

function loadExtendedComponentLibrary(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (customElements.get("gmpx-store-locator")) return Promise.resolve();
  if (eclLoadPromise) return eclLoadPromise;

  eclLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${ECL_SCRIPT}"]`,
    );
    if (existing) {
      if (customElements.get("gmpx-store-locator")) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => {
        eclLoadPromise = null;
        reject(
          new Error("Google Maps Extended Component Library failed to load"),
        );
      });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = ECL_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      eclLoadPromise = null;
      reject(
        new Error("Google Maps Extended Component Library failed to load"),
      );
    };
    document.head.appendChild(script);
  });

  return eclLoadPromise;
}

interface StoreLocatorPlusProps {
  className?: string;
  title?: string;
}

/**
 * Locator Plus (`gmpx-store-locator`) with Quick Builder configuration.
 * Falls back to the classic embed iframe when `VITE_GOOGLE_MAPS_API_KEY` is unset or init fails.
 */
const StoreLocatorPlus: React.FC<StoreLocatorPlusProps> = ({
  className = "",
  title = "Kattali Textile — location map",
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() ?? "";
  const locatorRef = useRef<HTMLElement | null>(null);
  const apiLoaderRef = useRef<HTMLElement | null>(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  useLayoutEffect(() => {
    if (!apiKey || !apiLoaderRef.current) return;
    apiLoaderRef.current.setAttribute("key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey || useIframeFallback) return;

    let cancelled = false;

    const run = async (): Promise<void> => {
      try {
        await loadExtendedComponentLibrary();
        await customElements.whenDefined("gmpx-store-locator");
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        if (cancelled) return;

        const el = locatorRef.current;
        const configure = (
          el as HTMLElement & {
            configureFromQuickBuilder?: (c: LocatorPlusConfiguration) => void;
          }
        ).configureFromQuickBuilder;
        if (typeof configure !== "function") {
          setUseIframeFallback(true);
          return;
        }

        const config: LocatorPlusConfiguration = {
          ...LOCATOR_PLUS_BASE,
          mapsApiKey: apiKey,
          mapOptions: {
            ...LOCATOR_PLUS_BASE.mapOptions,
            mapId: mapId || LOCATOR_PLUS_BASE.mapOptions.mapId,
          },
        };
        configure.call(el, config);
      } catch {
        if (!cancelled) setUseIframeFallback(true);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [apiKey, mapId, useIframeFallback]);

  const frameClass =
    "h-[26rem] min-h-[26rem] w-full md:h-[36rem] md:min-h-[36rem] lg:h-[min(58vh,44rem)] lg:min-h-[min(58vh,44rem)]";

  if (!apiKey || useIframeFallback) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-neutral-200 ${className}`}
      >
        <iframe
          src={GOOGLE_MAPS_LOCATOR_URL}
          title={title}
          className={`${frameClass} border-0`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div
      className={`ktl-store-locator relative flex flex-col overflow-hidden rounded-2xl shadow-lg ring-1 ring-neutral-200 ${frameClass} ${className}`}
    >
      <style>{`
        .ktl-store-locator gmpx-store-locator {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 0;
          flex: 1 1 auto;
          --gmpx-color-surface: #fff;
          --gmpx-color-on-surface: #212121;
          --gmpx-color-on-surface-variant: #757575;
          --gmpx-color-primary: #1967d2;
          --gmpx-color-outline: #e0e0e0;
          --gmpx-fixed-panel-width-row-layout: 38rem;
          --gmpx-fixed-panel-height-column-layout: 72%;
          --gmpx-font-family-base: "Roboto", sans-serif;
          --gmpx-font-family-headings: "Roboto", sans-serif;
          --gmpx-font-size-base: 1.25rem;
          --gmpx-hours-color-open: #188038;
          --gmpx-hours-color-closed: #d50000;
          --gmpx-rating-color: #ffb300;
          --gmpx-rating-color-empty: #e0e0e0;
        }
      `}</style>
      <gmpx-api-loader
        ref={apiLoaderRef}
        solution-channel="GMP_QB_locatorplus_v11_cABD"
      />
      <gmpx-store-locator
        ref={locatorRef}
        map-id={mapId}
        className="min-h-0 flex-1"
      />
    </div>
  );
};

export default StoreLocatorPlus;
