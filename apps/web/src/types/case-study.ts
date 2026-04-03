/**
 * Case Study Type Definitions
 * For showcasing client success stories and building trust
 */

export interface CaseStudyResult {
  metric: string;
  value: string;
  icon: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string; // Can be anonymized "Leading European Retailer"
  industry: string[];
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial?: CaseStudyTestimonial;
  featured: boolean;
  products: string[]; // Link to product categories
  images: string[];
  publishDate: string;
  readTime: number; // in minutes
}

export interface CaseStudyFilterState {
  industry: string;
  product: string;
  searchQuery: string;
}
