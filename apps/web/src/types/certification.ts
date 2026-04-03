/**
 * Certification Type Definitions
 * For showcasing company certifications and compliance
 */

export type CertificationCategory =
  | "Quality Management"
  | "Environmental"
  | "Social Compliance"
  | "Product Safety"
  | "Customer Specific";

export interface Certification {
  id: string;
  name: string;
  fullName: string;
  category: CertificationCategory;
  issuingBody: string;
  certificateNumber?: string;
  issuedDate: string;
  expiryDate: string;
  status: "Active" | "Expiring Soon" | "Expired" | "In Renewal";
  description: string;
  whyItMatters: string;
  verificationUrl?: string;
  certificatePdfUrl?: string;
  badgeImage?: string;
  relatedProducts?: string[];
}

export interface CertificationFilterState {
  category: CertificationCategory | "";
  status: string;
  searchQuery: string;
}
