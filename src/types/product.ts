import { ComponentType } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  icon: ComponentType<unknown>;
  link: string;
  featured?: boolean;
  price?: string;
  tags?: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface ProductFilterState {
  categories: string[];
  tags: string[];
}
