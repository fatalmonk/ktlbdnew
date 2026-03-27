/**
 * RFQ (Request for Quote) Type Definitions
 * Scoped to the RFQ feature module
 */

export interface ProductSelection {
  category: string;
  productId: string;
  productName: string;
  quantity: number;
  specifications: {
    sizes?: string[];
    colors?: string[];
    customization?: string;
    [key: string]: string | string[] | number | boolean | undefined;
  };
}

export interface RFQRequirements {
  certifications: string[];
  targetPrice?: string;
  timeline: string;
  shippingDestination: string;
  moqAcceptable: boolean;
  additionalRequirements?: string;
}

export interface CompanyInfo {
  name: string;
  country: string;
  website?: string;
  industry: string;
  annualVolume?: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  position: string;
}

export interface RFQFormData {
  products: ProductSelection[];
  requirements: RFQRequirements;
  company: CompanyInfo;
  contact: ContactInfo;
  attachments: File[];
}

export interface RFQSubmission extends RFQFormData {
  id: string;
  timestamp: string;
  referenceNumber: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Quoted' | 'Closed';
}


