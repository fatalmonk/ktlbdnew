import { ChevronDown } from 'lucide-react';

export const DESKTOP_LINK_CLASSES =
  'px-4 py-2 text-[17px] leading-6 font-medium tracking-[0.01em] text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md';

export const NAVIGATION_ITEMS = [
  {
    name: 'Company',
    href: '/company',
    type: 'dropdown' as const,
    children: [
      { name: 'Our Story', href: '/company/our-story' },
      { name: 'Leadership', href: '/company/leadership' },
      { name: 'Governance', href: '/company/governance' },
      { name: 'Sustainability', href: '/company/sustainability' },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    type: 'dropdown' as const,
    children: [
      { name: 'All Products', href: '/products' },
      { name: 'Denims', href: '/products/denims' },
      { name: 'Knitwear', href: '/products/knitwear' },
      { name: 'Swimwear', href: '/products/swimwear' },
      { name: 'Kids Wear', href: '/products/kids' },
    ],
  },
  {
    name: 'Facilities',
    href: '/facilities',
    type: 'dropdown' as const,
    children: [
      { name: 'RMG Manufacturing', href: '/facilities/rmg' },
      { name: 'Washing Plant', href: '/facilities/washing' },
      { name: 'Tech Facility', href: '/facilities/tech' },
      { name: 'Agro Facility', href: '/facilities/agro' },
      { name: 'Shipping & Logistics', href: '/facilities/shipping' },
    ],
  },
  {
    name: 'Work With Us',
    href: '/work-with-us',
    type: 'dropdown' as const,
    children: [
      { name: 'Buyers', href: '/work-with-us/buyers' },
      { name: 'Vendors', href: '/work-with-us/vendors' },
      { name: 'Careers', href: '/work-with-us/careers' },
    ],
  },
  {
    name: 'Newsroom',
    href: '/newsroom',
    type: 'dropdown' as const,
    children: [
      { name: 'Press Releases', href: '/newsroom/press' },
      { name: 'Company Stories', href: '/newsroom/stories' },
      { name: 'PSI Services', href: '/newsroom/psi' },
      { name: 'Media Kit', href: '/newsroom/media-kit' },
    ],
  },
  {
    name: 'Investors',
    href: '/investors',
    type: 'dropdown' as const,
    children: [
      { name: 'Overview', href: '/investors/overview' },
      { name: 'Stock Information', href: '/investors/stock' },
      { name: 'Quarterly Reports', href: '/investors/reports/quarterly' },
      { name: 'Annual Reports', href: '/investors/reports/annual' },
      { name: 'PSI Reports', href: '/investors/reports/psi' },
      { name: 'Investor Contacts', href: '/investors/contacts' },
    ],
  },
];

export { ChevronDown };
