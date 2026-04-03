/**
 * Shared crawl-visible copy for B2B listing checks (export regions + sourcing audience).
 * Keep in sync with static prerender in apps/web/index.html where noted.
 */

/** Organization JSON-LD and default `<SEO />` description when a page omits its own. */
export const ORGANIZATION_SCHEMA_DESCRIPTION =
  "Bangladesh's leading eco-friendly textile exporter with over 20 years of experience in manufacturing premium woven and knit garments for international apparel buyers, sourcing managers, and brands importing from Asia, with export and logistics reach to buyers in the USA, EU, and Canada, and other markets.";

/** Home page `<meta name="description">` — mirror in index.html for non-JS crawlers. */
export const HOME_META_DESCRIPTION =
  "Kattali Textile Limited (KTL) is a publicly listed garment manufacturer in Chittagong, Bangladesh. We produce high-quality woven, denim, and children's apparel for international apparel buyers, sourcing managers, and brands importing from Asia, with export reach to the USA, EU, and Canada. Compliance programs include Sedex, OEKO-TEX Standard 100, BSCI, WRAP, GOTS, and ISO 9001:2015—see our Certifications hub.";

/** Shorter Open Graph / Twitter meta for index.html (still includes required tokens). */
export const HOME_SOCIAL_META_DESCRIPTION =
  "Publicly listed Bangladesh garment manufacturer for international apparel buyers, sourcing managers, and brands importing from Asia, with export reach to the USA, EU, and Canada. Compliance: Sedex, OEKO-TEX, BSCI, WRAP, GOTS, ISO 9001:2015.";
