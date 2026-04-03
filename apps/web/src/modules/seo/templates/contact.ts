import { COMPANY_EMAIL } from "../../../lib/constants";

export const createContactSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Kattali Textile Ltd",
  description:
    "Get in touch with Kattali Textile Ltd for inquiries, orders, and partnerships",
  url: "https://ktlbd.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Kattali Textile Ltd",
    email: COMPANY_EMAIL,
    telephone: "+8801734855403",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801734855403",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  },
});
