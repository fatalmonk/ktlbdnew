import { useEffect } from 'react';

/**
 * Organization Structured Data for Kattali Textile Ltd
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kattali Textile Ltd',
  alternateName: 'KTL',
  url: 'https://ktlbd.com',
  logo: 'https://ktlbd.com/logo.png',
  description:
    "Bangladesh's leading eco-friendly textile exporter with over 20 years of experience in manufacturing premium woven and knit garments for global markets.",
  foundingDate: '2002',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad',
    addressLocality: 'Chittagong',
    addressCountry: 'BD',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+8801730597576',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Bengali'],
  },
  sameAs: [
    'https://www.linkedin.com/company/kattali-textile-limited',
    'https://www.facebook.com/KTLManufacturing',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Woven Garment Manufacturing',
        description: 'Premium woven apparel manufacturing services'
      },
      areaServed: 'Bangladesh',
      availableAtOrFrom: {
        '@type': 'Place',
        name: 'Kattali Textile Ltd',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad',
          addressLocality: 'Chittagong',
          addressCountry: 'BD'
        }
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Denim Manufacturing',
        description: 'High-quality denim products and jeans manufacturing'
      },
      areaServed: 'Bangladesh'
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Sustainable Textile Manufacturing',
        description: 'Eco-friendly and ethical textile production'
      },
      areaServed: 'Bangladesh'
    }
  ],
  keywords: [
    'bangladesh garment manufacturer',
    'textile exporter chittagong',
    'woven garment supplier bangladesh',
    'denim manufacturer bangladesh',
    'sustainable textile manufacturer'
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 1200,
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Kattali Group',
  },
};

/**
 * Website Structured Data
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kattali Textile Ltd',
  url: 'https://ktlbd.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ktlbd.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Breadcrumb Structured Data Generator
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Product Structured Data Generator
 */
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  category?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: {
    '@type': 'Brand',
    name: product.brand || 'Kattali Textile Ltd',
  },
  category: product.category,
  manufacturer: {
    '@type': 'Organization',
    name: 'Kattali Textile Ltd',
  },
});

/**
 * Corporate Contact Structured Data
 */
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Kattali Textile Ltd',
  description: 'Get in touch with Kattali Textile Ltd for inquiries, orders, and partnerships',
  url: 'https://ktlbd.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Kattali Textile Ltd',
    email: 'info@ktlbd.com',
    telephone: '+880-XXX-XXX-XXX',
  },
};

/**
 * FAQPage Structured Data Generator
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

interface StructuredDataProps {
  data: object | object[];
  id?: string;
}

/**
 * StructuredData component that injects JSON-LD schema into the page
 *
 * Usage:
 * <StructuredData data={organizationSchema} />
 * <StructuredData data={[organizationSchema, websiteSchema]} />
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data, id = 'structured-data' }) => {
  useEffect(() => {
    const schemas = Array.isArray(data) ? data : [data];

    schemas.forEach((schema, index) => {
      const scriptId = schemas.length > 1 ? `${id}-${index}` : id;
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;

      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      scriptTag.text = JSON.stringify(schema);
    });

    // Cleanup function to remove old schemas if data changes
    return () => {
      schemas.forEach((_, index) => {
        const scriptId = schemas.length > 1 ? `${id}-${index}` : id;
        const scriptTag = document.getElementById(scriptId);
        if (scriptTag) {
          scriptTag.remove();
        }
      });
    };
  }, [data, id]);

  return null;
};

export default StructuredData;
