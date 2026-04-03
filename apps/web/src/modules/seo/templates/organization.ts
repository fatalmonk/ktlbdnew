import { ORGANIZATION_SCHEMA_DESCRIPTION } from "../../../lib/b2b-listing-copy";

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kattali Textile Limited",
  alternateName: "KTL",
  url: "https://ktlbd.com",
  logo: "https://ktlbd.com/logos/ktl-logo.webp",
  description: ORGANIZATION_SCHEMA_DESCRIPTION,
  foundingDate: "2002",
  address: {
    "@type": "PostalAddress",
    streetAddress: "BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad",
    addressLocality: "Chittagong",
    addressCountry: "BD",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+8801734855403",
    contactType: "customer service",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://www.linkedin.com/company/kattali-textile-limited",
    "https://www.facebook.com/KTLManufacturing",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Woven Garment Manufacturing",
        description: "Premium woven apparel manufacturing services",
      },
      areaServed: "Bangladesh",
      availableAtOrFrom: {
        "@type": "Place",
        name: "Kattali Textile Ltd",
        address: {
          "@type": "PostalAddress",
          streetAddress: "BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad",
          addressLocality: "Chittagong",
          addressCountry: "BD",
        },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Denim Manufacturing",
        description: "High-quality denim products and jeans manufacturing",
      },
      areaServed: "Bangladesh",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Sustainable Textile Manufacturing",
        description: "Eco-friendly and ethical textile production",
      },
      areaServed: "Bangladesh",
    },
  ],
  keywords: [
    "bangladesh garment manufacturer",
    "textile exporter chittagong",
    "woven garment supplier bangladesh",
    "denim manufacturer bangladesh",
    "sustainable textile manufacturer",
    "Sedex",
    "OEKO-TEX",
    "BSCI",
    "WRAP",
    "GOTS",
    "ISO 9001",
  ],
  knowsAbout: [
    "Sedex SMETA ethical supply chain",
    "OEKO-TEX Standard 100",
    "amfori BSCI",
    "WRAP apparel certification",
    "Global Organic Textile Standard (GOTS)",
    "ISO 9001:2015 quality management",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 1200,
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Kattali Group",
  },
});
