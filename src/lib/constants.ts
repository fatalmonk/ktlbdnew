// Company Information
export const COMPANY_NAME = 'Kattali Textile Limited';
export const COMPANY_SHORT_NAME = 'KTL';
export const COMPANY_EMAIL = 'sales@ktlbd.com';
export const COMPANY_PHONE = '+880 1308 790475';

// Google Business Profiles
export const GOOGLE_BUSINESS = {
  headOffice: {
    businessId: '8886129079233453347',
    profileUrl: 'https://share.google/ae1EuNOOCEfZcpbF7',
    reviewUrl: 'https://g.page/r/CbNBkCd96hAoEBM/review',
    name: 'Kattali Textile Limited - Head Office',
    address: 'BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad, Chittagong',
    latitude: 22.369813,
    longitude: 91.7696,
  },
  production: {
    businessId: '16012215259105609695',
    profileUrl: 'https://share.google/GQ3uLtV74CUYhDDL1',
    reviewUrl: 'https://g.page/r/CUGxynxqZkfsEBE/review',
    name: 'Kattali Textile Limited - Production Facility',
    address: 'North Kattali Industrial Area, Chittagong',
    latitude: 22.369813,
    longitude: 91.7696,
  },
  mapEmbedUrl: 'https://storage.googleapis.com/maps-solutions-vxluvoc8bi/locator-plus/if9r/locator-plus.html',
};

// Social Media Links
export const SOCIAL_MEDIA = {
  linkedin: 'http://linkedin.com/company/ktlbd',
  facebook: 'https://www.facebook.com/KTLManufacturing',
};

// Stock Exchange Links
export const STOCK_EXCHANGES = {
  dse: {
    name: 'Dhaka Stock Exchange',
    shortName: 'DSE',
    url: 'https://www.dsebd.org/displayCompany.php?name=KTL',
  },
  cse: {
    name: 'Chittagong Stock Exchange',
    shortName: 'CSE',
    url: 'https://www.cse.com.bd/index.php?/company/companydetails/KTL',
  },
};

// Industry Associations
export const ASSOCIATIONS = {
  bgmea: {
    name: 'Bangladesh Garment Manufacturers and Exporters Association',
    shortName: 'BGMEA',
    url: 'https://www.bgmea.com.bd/member/1940',
    memberNumber: '1940',
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
export const GOOGLE_BUSINESS_PROFILE_URL = GOOGLE_BUSINESS.headOffice.profileUrl;
export const GOOGLE_BUSINESS_REVIEW_URL = GOOGLE_BUSINESS.headOffice.reviewUrl;
export const FACEBOOK_PAGE_URL = SOCIAL_MEDIA.facebook;

// Enhanced Google Business Profile structured data
export const GOOGLE_BUSINESS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": COMPANY_NAME,
  "alternateName": COMPANY_SHORT_NAME,
  "url": "https://ktlbd.com",
  "logo": "https://ktlbd.com/logo.png",
  "description": "Bangladesh's leading eco-friendly textile exporter with over 20 years of experience in manufacturing premium woven and knit garments for global markets.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad",
    "addressLocality": "Chittagong",
    "addressCountry": "Bangladesh"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": COMPANY_LATITUDE.toString(),
    "longitude": COMPANY_LONGITUDE.toString()
  },
  "hasPOS": {
    "@type": "Place",
    "name": GOOGLE_BUSINESS.production.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "North Kattali Industrial Area",
      "addressLocality": "Chittagong",
      "addressCountry": "Bangladesh"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": FACTORY_LATITUDE.toString(),
      "longitude": FACTORY_LONGITUDE.toString()
    },
    "hasMap": GOOGLE_MAPS_COORDINATES_URL,
    "url": FACTORY_GOOGLE_PROFILE_URL
  },
  "hasMap": GOOGLE_MAPS_COORDINATES_URL,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": COMPANY_PHONE,
    "contactType": "customer service",
    "email": COMPANY_EMAIL
  },
  "sameAs": [
    SOCIAL_MEDIA.facebook,
    SOCIAL_MEDIA.linkedin,
    GOOGLE_BUSINESS.headOffice.profileUrl,
    GOOGLE_BUSINESS.production.profileUrl,
    STOCK_EXCHANGES.dse.url,
    STOCK_EXCHANGES.cse.url,
    ASSOCIATIONS.bgmea.url,
  ],
  "additionalType": [
    "https://en.wikipedia.org/wiki/Textile_manufacturing",
    "https://en.wikipedia.org/wiki/Garment_manufacturing"
  ],
  "keywords": [
    "textile manufacturer",
    "garment exporter",
    "eco-friendly clothing",
    "Bangladesh RMG",
    "woven and knit garments"
  ],
  "foundingDate": "2002",
  "industry": "Textile Manufacturing",
  "numberOfEmployees": "1000+"
};
