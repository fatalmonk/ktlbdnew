/**
 * Chatbot Response Database
 * Rule-based responses for common questions
 */

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface QuickAction {
  id: string;
  label: string;
  action: "navigate" | "message";
  value: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "rfq", label: "Request a Quote", action: "navigate", value: "/rfq" },
  {
    id: "products",
    label: "View Products",
    action: "navigate",
    value: "/products",
  },
  {
    id: "contact",
    label: "Contact Sales",
    action: "navigate",
    value: "/contact",
  },
  {
    id: "certifications",
    label: "View Certifications",
    action: "navigate",
    value: "/certifications",
  },
];

export const KNOWLEDGE_BASE: Record<string, string[]> = {
  greeting: [
    "Hello! Welcome to Kattali Textile Ltd. How can I help you today?",
    "Hi there! I'm here to help you learn more about KTL. What would you like to know?",
    "Welcome! I can help you with information about our products, certifications, and services. What are you looking for?",
  ],
  products: [
    "We manufacture premium Denim, Knitwear, Woven garments, Swimwear, and Kids Apparel. Which category interests you?",
    "KTL specializes in sustainable textile manufacturing across 5 main categories: Denim, Knitwear, Woven, Swimwear, and Kids Apparel. Would you like to know more about a specific category?",
  ],
  denim: [
    "Our denim division produces high-quality jeans with advanced washing facilities. We offer custom washes, OEKO-TEX certification, and sustainable practices. Would you like to request a quote?",
  ],
  knitwear: [
    "We produce premium knitwear including t-shirts, polo shirts, and hoodies. We offer GOTS organic cotton options and can work with your specifications. Interested in learning more?",
  ],
  swimwear: [
    "Our swimwear line uses advanced stretch fabrics with chlorine resistance and UV protection. We can develop custom blends with recycled materials. Want to discuss your swimwear needs?",
  ],
  certifications: [
    "KTL holds 10+ international certifications including ISO 9001, ISO 14001, OEKO-TEX, GOTS, BSCI, WRAP, and customer-specific certifications like Disney FAMA. Which certification are you interested in?",
  ],
  sustainability: [
    "Sustainability is core to our operations. We use 45% renewable energy, recycle 78% of waste, and 62% of our products use sustainable materials. We're committed to net-zero by 2030. Want to see our full sustainability dashboard?",
  ],
  moq: [
    "Our minimum order quantities vary by product category. Typically: Denim: 1,000-2,000 pcs, Knitwear: 500-1,000 pcs per style. For exact MOQs, please submit an RFQ with your specific requirements.",
  ],
  pricing: [
    "Pricing depends on product type, quantity, specifications, and certifications required. The best way to get accurate pricing is to submit a Request for Quote (RFQ) with your detailed requirements. Would you like me to direct you to the RFQ form?",
  ],
  timeline: [
    "Production timelines typically range from 45-90 days depending on order complexity and quantity. Rush orders may be possible. For your specific timeline, please submit an RFQ or contact our sales team directly.",
  ],
  samples: [
    "Yes, we provide samples! Sample lead time is typically 7-14 days. You can request samples through our RFQ form or by contacting our sales team. Would you like to start an RFQ?",
  ],
  contact: [
    "You can reach our sales team at info@ktlbd.com or visit our Contact page. We typically respond within 24 hours. Would you like me to direct you to the contact form?",
  ],
  location: [
    "KTL is based in Bangladesh with state-of-the-art facilities in Dhaka. We export to 50+ countries worldwide and have been manufacturing since 2004.",
  ],
  capacity: [
    "Our annual production capacity exceeds 12 million units across all product categories. We have 5 modern facilities with dedicated lines for each product type.",
  ],
  quality: [
    "Quality is guaranteed through ISO 9001 certification, in-line quality control, final inspections, and third-party audits. Our quality acceptance rate is 99.2%. We also hold product-specific certifications like OEKO-TEX.",
  ],
  payment: [
    "We accept various payment terms including L/C, T/T, and other mutually agreed methods. Specific payment terms are discussed during quotation based on order value and client relationship.",
  ],
  shipping: [
    "We ship worldwide via major ports in Bangladesh. We can arrange FOB, CIF, or other Incoterms as needed. Shipping costs and timelines vary by destination - please include this in your RFQ for accurate quotes.",
  ],
  customization: [
    "Yes! We specialize in custom manufacturing including custom washes, prints, embroidery, labels, and packaging. Our R&D team can work with you to develop exactly what you need.",
  ],
  thanks: [
    "You're welcome! Is there anything else I can help you with?",
    "Happy to help! Feel free to ask if you have any other questions.",
    "Glad I could assist! Let me know if you need anything else.",
  ],
  default: [
    "I'm not sure about that specific question, but our sales team can definitely help! Would you like to contact them or submit an RFQ for detailed information?",
    "That's a great question! For specific inquiries like this, I recommend contacting our sales team or submitting an RFQ. Can I direct you there?",
  ],
};

export function getResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Greeting keywords
  if (/\b(hi|hello|hey|greetings)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.greeting);
  }

  // Product keywords
  if (/\b(product|what do you|manufacture|make)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.products);
  }

  // Specific products
  if (/\b(denim|jeans|jean)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.denim);
  }
  if (/\b(knitwear|knit|t-shirt|tshirt|polo)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.knitwear);
  }
  if (/\b(swimwear|swim|bikini|bathingsuit)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.swimwear);
  }

  // Certifications
  if (/\b(certification|certified|iso|oeko|gots|bsci|wrap)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.certifications);
  }

  // Sustainability
  if (/\b(sustainab|environment|green|eco|organic)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.sustainability);
  }

  // MOQ
  if (/\b(moq|minimum|minimum order)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.moq);
  }

  // Pricing
  if (/\b(price|pricing|cost|how much)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.pricing);
  }

  // Timeline
  if (/\b(timeline|lead time|how long|when|delivery)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.timeline);
  }

  // Samples
  if (/\b(sample|samples)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.samples);
  }

  // Contact
  if (/\b(contact|reach|email|phone)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.contact);
  }

  // Location
  if (/\b(where|location|based|country)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.location);
  }

  // Capacity
  if (/\b(capacity|volume|how many)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.capacity);
  }

  // Quality
  if (/\b(quality|defect|inspection)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.quality);
  }

  // Payment
  if (/\b(payment|pay|terms)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.payment);
  }

  // Shipping
  if (/\b(ship|shipping|freight|export)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.shipping);
  }

  // Customization
  if (/\b(custom|customize|personalize|bespoke)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.customization);
  }

  // Thanks
  if (/\b(thank|thanks|appreciate)\b/.test(message)) {
    return randomChoice(KNOWLEDGE_BASE.thanks);
  }

  // Default
  return randomChoice(KNOWLEDGE_BASE.default);
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
