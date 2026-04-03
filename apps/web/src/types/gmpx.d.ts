import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmpx-api-loader": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "solution-channel"?: string },
        HTMLElement
      >;
      "gmpx-store-locator": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "map-id"?: string },
        HTMLElement
      >;
    }
  }
}

export {};
