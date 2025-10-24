import React, { useEffect } from 'react';
import { COMPANY_NAME } from '../lib/constants';

const SEO = {
  siteName: COMPANY_NAME,
  siteUrl: 'https://ktlbd.com/',
  defaultDescription: 'Bangladesh\'s leading eco-friendly textile exporter with over 20 years of experience in manufacturing premium woven and knit garments for global markets.',
};

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[];
  structuredData?: object;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOComponent: React.FC<SEOProps> = ({
  title,
  description = SEO.defaultDescription,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  keywords,
  structuredData,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  const fullTitle = title ? `${title} | ${SEO.siteName}` : SEO.siteName;
  const canonicalUrl = canonical ? `${SEO.siteUrl}${canonical}` : SEO.siteUrl;

  useEffect(() => {
    // --- Title ---
    document.title = fullTitle;

    // --- Utility: create or update meta tag ---
    const setMeta = (name: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // --- Basic Meta ---
    setMeta('description', description);
    if (keywords?.length) setMeta('keywords', keywords.join(', '));
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow');

    // --- Canonical Link ---
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // --- Open Graph Tags ---
    const ogTags: Record<string, string> = {
      'og:title': fullTitle,
      'og:description': description,
      'og:type': ogType,
      'og:url': canonicalUrl,
      'og:image': ogImage || `${SEO.siteUrl}/logo.png`,
      'og:site_name': SEO.siteName,
      'og:locale': 'en_US',
    };

    // Add article-specific Open Graph tags
    if (ogType === 'article') {
      if (author) ogTags['article:author'] = author;
      if (publishedTime) ogTags['article:published_time'] = publishedTime;
      if (modifiedTime) ogTags['article:modified_time'] = modifiedTime;
      if (section) ogTags['article:section'] = section;
      if (tags?.length) ogTags['article:tag'] = tags.join(', ');
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // --- Twitter Tags ---
    const twitterTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': description,
      'twitter:image': ogImage || `${SEO.siteUrl}/logo.png`,
      'twitter:site': '@KTLManufacturing',
      'twitter:creator': '@KTLManufacturing',
    };
    Object.entries(twitterTags).forEach(([name, content]) => setMeta(name, content));

    // --- JSON-LD Structured Data ---
    if (structuredData) {
      let scriptTag = document.getElementById('structured-data');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        (scriptTag as HTMLScriptElement).type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      (scriptTag as HTMLScriptElement).text = JSON.stringify(structuredData);
    }
  }, [
    fullTitle,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    noIndex,
    keywords,
    structuredData,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags
  ]);

  return null; // Nothing visual rendered
};

export default SEOComponent;
