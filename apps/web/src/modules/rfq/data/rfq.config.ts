import type { LucideIcon } from "lucide-react";
import {
  Package,
  FileText,
  CheckCircle,
  Building,
  User,
  Send,
} from "lucide-react";
import type { RFQFormData } from "../types/rfq.types";

export interface RFQStepConfig {
  number: number;
  name: string;
  icon: LucideIcon;
}

export const RFQ_STEPS: RFQStepConfig[] = [
  { number: 1, name: "Product Selection", icon: Package },
  { number: 2, name: "Specifications", icon: FileText },
  { number: 3, name: "Requirements", icon: CheckCircle },
  { number: 4, name: "Company Info", icon: Building },
  { number: 5, name: "Contact Info", icon: User },
  { number: 6, name: "Review & Submit", icon: Send },
];

export const PRODUCT_CATEGORIES = [
  "Denim",
  "Knitwear",
  "Woven",
  "Swimwear",
  "Kids Apparel",
] as const;

export const CERTIFICATIONS_LIST = [
  "ISO 9001",
  "ISO 14001",
  "OEKO-TEX Standard 100",
  "GOTS",
  "BSCI",
  "WRAP",
  "Disney FAMA",
  "GRS",
  "Sedex",
  "BGMEA",
] as const;

export const TIMELINE_OPTIONS = [
  "1-2 months",
  "2-3 months",
  "3-6 months",
  "6+ months",
  "Flexible",
] as const;

export const INDUSTRY_OPTIONS = [
  "Fashion Retail",
  "Sportswear",
  "Fast Fashion",
  "Luxury Fashion",
  "Children's Apparel",
  "Department Store",
  "E-commerce",
  "Brand Manufacturer",
  "Other",
] as const;

export const RFQ_STORAGE_KEY = "rfq_form_draft";

export const initialRFQFormData: RFQFormData = {
  products: [],
  requirements: {
    certifications: [],
    timeline: "",
    shippingDestination: "",
    moqAcceptable: false,
  },
  company: {
    name: "",
    country: "",
    industry: "",
  },
  contact: {
    name: "",
    email: "",
    phone: "",
    position: "",
  },
  attachments: [],
};
