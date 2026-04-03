import { ORGANIZATION_SCHEMA_DESCRIPTION } from "./b2b-listing-copy";

// Company Information
export const COMPANY_NAME = "Kattali Textile Limited";
export const COMPANY_SHORT_NAME = "KTL";
export const COMPANY_EMAIL = "sales@ktlbd.com";
export const COMPANY_PHONE = "+880 1308 790475";

// Google Business Profiles
export const GOOGLE_BUSINESS = {
  headOffice: {
    businessId: "8886129079233453347",
    profileUrl: "https://share.google/ae1EuNOOCEfZcpbF7",
    reviewUrl: "https://g.page/r/CbNBkCd96hAoEBM/review",
    name: "Kattali Textile Limited - Head Office",
    address: "BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad, Chittagong",
    latitude: 22.328026,
    longitude: 91.8127478,
  },
  production: {
    businessId: "16012215259105609695",
    profileUrl: "https://share.google/GQ3uLtV74CUYhDDL1",
    reviewUrl: "https://g.page/r/CUGxynxqZkfsEBE/review",
    name: "Kattali Textile Limited - Production Facility",
    address: "North Kattali Industrial Area, Chittagong",
    latitude: 22.3698912,
    longitude: 91.7696064,
  },
  /** Classic Maps embed (Contact page iframe fallback when Locator Plus web component is not used). */
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d48460.73540954905!2d91.75345432475997!3d22.345788754880374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d22.2456982!2d91.8146787!4m5!1s0x30acd975c8dd09c9%3A0xec47666a7ccab141!2sKattali%20Textile%20Limited%20(KTL)%20-%20Production%20Facility%2C%20Kattali%20Textile%20Limited%2C%20Chittagong%204217!3m2!1d22.369891199999998!2d91.7696064!5e0!3m2!1sen!2sbd!4v1774642051806!5m2!1sen!2sbd",
};

// Social Media Links
export const SOCIAL_MEDIA = {
  linkedin: "http://linkedin.com/company/ktlbd",
  facebook: "https://www.facebook.com/KTLManufacturing",
  instagram: "https://www.instagram.com/ktl.rmg/",
};

// Stock Exchange Links
export const STOCK_EXCHANGES = {
  dse: {
    name: "Dhaka Stock Exchange",
    shortName: "DSE",
    url: "https://www.dsebd.org/displayCompany.php?name=KTL",
  },
  cse: {
    name: "Chittagong Stock Exchange",
    shortName: "CSE",
    url: "https://www.cse.com.bd/index.php?/company/companydetails/KTL",
  },
};

/** Third-party market data site (not affiliated). Use for outbound “live quote” links only. */
export const STOCKNOW_KTL_URL =
  "https://stocknow.com.bd/search?symbol=KTL" as const;

// Industry Associations
export const ASSOCIATIONS = {
  bgmea: {
    name: "Bangladesh Garment Manufacturers and Exporters Association",
    shortName: "BGMEA",
    url: "https://www.bgmea.com.bd/member/1940",
    memberNumber: "1940",
  },
};

// Legacy Constants (for backward compatibility)
export const GOOGLE_BUSINESS_PROFILE_ID = GOOGLE_BUSINESS.headOffice.businessId;
export const COMPANY_LATITUDE = GOOGLE_BUSINESS.headOffice.latitude;
export const COMPANY_LONGITUDE = GOOGLE_BUSINESS.headOffice.longitude;
export const COMPANY_COORDINATES = `${COMPANY_LATITUDE},${COMPANY_LONGITUDE}`;
export const FACTORY_LATITUDE = GOOGLE_BUSINESS.production.latitude;
export const FACTORY_LONGITUDE = GOOGLE_BUSINESS.production.longitude;
export const FACTORY_COORDINATES = `${FACTORY_LATITUDE},${FACTORY_LONGITUDE}`;
export const FACTORY_GOOGLE_PROFILE_URL = GOOGLE_BUSINESS.production.profileUrl;
export const GOOGLE_MAPS_EMBED_URL = GOOGLE_BUSINESS.mapEmbedUrl;
export const GOOGLE_MAPS_LOCATOR_URL = GOOGLE_BUSINESS.mapEmbedUrl;
export const GOOGLE_MAPS_VIEW_URL = GOOGLE_BUSINESS.headOffice.profileUrl;
export const GOOGLE_MAPS_COORDINATES_URL = `https://maps.google.com/?q=${COMPANY_COORDINATES}`;
export const GOOGLE_BUSINESS_PROFILE_URL =
  GOOGLE_BUSINESS.headOffice.profileUrl;
export const GOOGLE_BUSINESS_REVIEW_URL = GOOGLE_BUSINESS.headOffice.reviewUrl;
export const FACEBOOK_PAGE_URL = SOCIAL_MEDIA.facebook;

// Enhanced Google Business Profile structured data
export const GOOGLE_BUSINESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  alternateName: COMPANY_SHORT_NAME,
  url: "https://ktlbd.com",
  logo: "https://ktlbd.com/logos/ktl-logo.webp",
  description: ORGANIZATION_SCHEMA_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad",
    addressLocality: "Chittagong",
    addressCountry: "Bangladesh",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY_LATITUDE.toString(),
    longitude: COMPANY_LONGITUDE.toString(),
  },
  hasPOS: {
    "@type": "Place",
    name: GOOGLE_BUSINESS.production.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "North Kattali Industrial Area",
      addressLocality: "Chittagong",
      addressCountry: "Bangladesh",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: FACTORY_LATITUDE.toString(),
      longitude: FACTORY_LONGITUDE.toString(),
    },
    hasMap: GOOGLE_MAPS_COORDINATES_URL,
    url: FACTORY_GOOGLE_PROFILE_URL,
  },
  hasMap: GOOGLE_MAPS_COORDINATES_URL,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: COMPANY_PHONE,
    contactType: "customer service",
    email: COMPANY_EMAIL,
  },
  sameAs: [
    SOCIAL_MEDIA.facebook,
    SOCIAL_MEDIA.linkedin,
    SOCIAL_MEDIA.instagram,
    GOOGLE_BUSINESS.headOffice.profileUrl,
    GOOGLE_BUSINESS.production.profileUrl,
    STOCK_EXCHANGES.dse.url,
    STOCK_EXCHANGES.cse.url,
    ASSOCIATIONS.bgmea.url,
  ],
  additionalType: [
    "https://en.wikipedia.org/wiki/Textile_manufacturing",
    "https://en.wikipedia.org/wiki/Garment_manufacturing",
  ],
  keywords: [
    "textile manufacturer",
    "garment exporter",
    "eco-friendly clothing",
    "Bangladesh RMG",
    "woven and knit garments",
  ],
  foundingDate: "2002",
  industry: "Textile Manufacturing",
  numberOfEmployees: "1000+",
};
