import { useEffect } from 'react';

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
