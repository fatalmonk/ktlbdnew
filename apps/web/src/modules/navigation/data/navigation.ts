/**
 * Primary navigation for desktop mega menu and search.
 * Paths align with App.tsx routes.
 */

export type NavLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavColumnGroup = {
  title?: string;
  links: NavLinkItem[];
};

export type NavDropdownItem = {
  name: string;
  type: "dropdown";
  href: string;
  columns: NavColumnGroup[];
};

export type NavLinkTop = {
  name: string;
  type: "link";
  href: string;
};

export type NavItem = NavDropdownItem | NavLinkTop;

/** Primary URL for the Company nav section — reuse for CTAs that should match header nav. */
export const COMPANY_NAV_HREF = "/company/our-story";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    name: "Company",
    type: "dropdown",
    href: COMPANY_NAV_HREF,
    columns: [
      {
        title: "About",
        links: [
          { label: "Our Story", href: "/company/our-story" },
          { label: "Leadership", href: "/company/leadership" },
          { label: "Governance", href: "/company/governance" },
        ],
      },
      {
        title: "The Catalogue",
        links: [
          { label: "Overview", href: "/products" },
          { label: "Denims", href: "/products/denims" },
          { label: "Knitwear", href: "/products/knitwear" },
          { label: "Swimwear", href: "/products/swimwear" },
          { label: "Kids'", href: "/products/kids" },
        ],
      },
      {
        title: "Inside KTL",
        links: [
          { label: "RMG", href: "/facilities/rmg" },
          { label: "Washing", href: "/facilities/washing" },
          { label: "Technology", href: "/facilities/tech" },
          { label: "Agro", href: "/facilities/agro" },
          { label: "Shipping", href: "/facilities/shipping" },
        ],
      },
    ],
  },
  {
    name: "Corporate Responsibility",
    type: "dropdown",
    href: "/sustainability",
    columns: [
      {
        title: "Corporate Responsibility",
        links: [{ label: "Sustainability", href: "/sustainability" }],
      },
    ],
  },
  {
    name: "Newsroom",
    type: "dropdown",
    href: "/newsroom/stories",
    columns: [
      {
        links: [
          { label: "Press", href: "/newsroom/press" },
          { label: "Company Stories", href: "/newsroom/stories" },
          { label: "PSI", href: "/newsroom/psi" },
          { label: "Media Kit", href: "/newsroom/media-kit" },
        ],
      },
    ],
  },
  {
    name: "Investors",
    type: "dropdown",
    href: "/investors",
    columns: [
      {
        title: "Overview",
        links: [
          { label: "Investor Overview", href: "/investors" },
          { label: "Stock Data", href: "/investors/stock" },
          { label: "Quarterly Reports", href: "/investors/reports/quarterly" },
          { label: "Annual Reports", href: "/investors/reports/annual" },
          { label: "PSI", href: "/investors/reports/psi" },
          { label: "IR Contacts", href: "/investors/contacts" },
        ],
      },
    ],
  },
  {
    name: "Work With Us",
    type: "dropdown",
    href: "/work-with-us/buyers",
    columns: [
      {
        title: "Partners",
        links: [
          { label: "Buyers", href: "/work-with-us/buyers" },
          { label: "Vendors", href: "/work-with-us/vendors" },
          { label: "Careers", href: "/work-with-us/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

/** Flattened labels for header search suggestions. */
export function flattenNavLinks(items: NavItem[]): NavLinkItem[] {
  const out: NavLinkItem[] = [];
  for (const item of items) {
    if (item.type === "link") {
      out.push({ label: item.name, href: item.href });
    } else {
      out.push({ label: item.name, href: item.href });
      for (const col of item.columns) {
        for (const link of col.links) {
          out.push(link);
        }
      }
    }
  }
  return out;
}
