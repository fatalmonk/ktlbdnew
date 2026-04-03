import { PartnerLogo } from "../types/partner";
import calvinKleinLogo from "@/assets/images/products/partners/partner-calvin-klein.png";
import gapLogo from "@/assets/images/products/partners/partner-gap.png";
import hmLogo from "@/assets/images/products/partners/partner-hm.png";
import oldNavyLogo from "@/assets/images/products/partners/partner-old-navy.png";
import tommyHilfigerLogo from "@/assets/images/products/partners/partner-tommy-hilfiger.png";

export const partners: PartnerLogo[] = [
  {
    id: "calvin-klein",
    name: "Calvin Klein Jeans",
    logo: calvinKleinLogo,
    description:
      "Global fashion brand known for premium denim and contemporary clothing",
    website: "https://www.calvinklein.com",
    partnership: "Premium Denim Manufacturing",
    employees: "10,000+",
    location: "New York, USA",
  },
  {
    id: "gap",
    name: "GAP",
    logo: gapLogo,
    description:
      "American clothing and accessories retailer with global presence",
    website: "https://www.gap.com",
    partnership: "Casual Wear Production",
    employees: "50,000+",
    location: "San Francisco, USA",
  },
  {
    id: "hm",
    name: "H&M",
    logo: hmLogo,
    description:
      "Swedish multinational clothing retailer focused on fast fashion",
    website: "https://www.hm.com",
    partnership: "Fast Fashion Manufacturing",
    employees: "100,000+",
    location: "Stockholm, Sweden",
  },
  {
    id: "old-navy",
    name: "Old Navy",
    logo: oldNavyLogo,
    description:
      "American clothing and accessories retailer, subsidiary of Gap Inc.",
    website: "https://www.oldnavy.com",
    partnership: "Family Apparel Production",
    employees: "25,000+",
    location: "San Francisco, USA",
  },
  {
    id: "tommy-hilfiger",
    name: "Tommy Hilfiger",
    logo: tommyHilfigerLogo,
    description: "American fashion brand known for classic American cool style",
    website: "https://www.tommy.com",
    partnership: "Premium Lifestyle Apparel",
    employees: "15,000+",
    location: "New York, USA",
  },
];
