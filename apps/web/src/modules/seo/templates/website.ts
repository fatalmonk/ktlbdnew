export const createWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kattali Textile Ltd',
  url: 'https://ktlbd.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://ktlbd.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});
