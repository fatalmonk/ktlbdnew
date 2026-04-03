import certificationSedexPositive from "@/assets/certifications/certification-sedex-positive.png";

/** Official program sites referenced by the home compliance strip (logos + body copy). */
export const COMPLIANCE_STRIP_PROGRAM_HREFS = {
  sedex: "https://www.sedex.com/",
  nirapon: "https://www.nirapon.org/",
  betterWork:
    "https://betterwork.org/bangladesh/participating-factories-in-bangladesh/",
  waltDisney: "https://thewaltdisneycompany.com/",
} as const;

export type ComplianceStripMark = {
  id: string;
  logoSrc: string;
  logoAlt: string;
  /** Wider wordmark — use relaxed max-width in the home compliance strip */
  wide?: boolean;
  /**
   * When true, skip `brightness-0` so full-color rasters render correctly.
   */
  originalColors?: boolean;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  logoHref?: string;
};

/** Above-the-fold compliance strip on Home (`public/Certifications/*` and bundled assets). */
export const COMPLIANCE_STRIP_MARKS: readonly ComplianceStripMark[] = [
  {
    id: "nirapon",
    logoSrc: "/Certifications/nirapon.webp",
    logoAlt: "Nirapon",
    originalColors: true,
    logoHref: COMPLIANCE_STRIP_PROGRAM_HREFS.nirapon,
  },
  {
    id: "betterwork-bangladesh",
    logoSrc: "/Certifications/betterwork-bangladesh.png",
    logoAlt: "Better Work Bangladesh",
    wide: true,
    originalColors: true,
    logoHref: COMPLIANCE_STRIP_PROGRAM_HREFS.betterWork,
  },
  {
    id: "sedex",
    logoSrc: certificationSedexPositive,
    logoAlt: "Sedex Member",
    wide: true,
    originalColors: true,
    /** Certificate PDF in `public/Certifications/` (synced from repo `docs/Sedex_Certificate.pdf`). */
    logoHref: "/Certifications/Sedex_Certificate.pdf",
  },
  {
    id: "walt-disney-fama",
    logoSrc: "/Certifications/walt-disney-fama.png",
    logoAlt: "Walt Disney FAMA — Facility and Merchandise Authorization",
    wide: true,
    originalColors: true,
    /** Certificate PDF in `public/Certifications/` (synced from repo `docs/FAMA_Certificate.pdf`). */
    logoHref: "/Certifications/FAMA_Certificate.pdf",
  },
];

/**
 * Named compliance programs referenced in homepage copy.
 * Keep aligned with `src/data/certifications/index.json` and `/certifications`.
 */
export const COMPLIANCE_HIGHLIGHT_NAMES = [
  "Sedex",
  "OEKO-TEX Standard 100",
  "BSCI",
  "WRAP",
  "GOTS",
  "ISO 9001:2015",
] as const;

/** Oxford-comma list for body copy (plain text, crawler-friendly). */
export function formatComplianceHighlightsOxford(
  names: readonly string[] = COMPLIANCE_HIGHLIGHT_NAMES,
): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
