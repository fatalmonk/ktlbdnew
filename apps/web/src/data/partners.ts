import { PartnerLogo } from "../types/partner";
import calvinKleinLogo from "@/assets/images/products/partners/partner-calvin-klein.png";
import celebrityPinkLogo from "@/assets/images/products/partners/partner-celebrity-pink.png";
import disneyLogo from "@/assets/images/products/partners/partner-disney.png";
import gapLogo from "@/assets/images/products/partners/partner-gap.png";
import giantTigerLogo from "@/assets/images/products/partners/partner-giant-tiger.png";
import hmLogo from "@/assets/images/products/partners/partner-hm.png";
import oldNavyLogo from "@/assets/images/products/partners/partner-old-navy.png";
import tjMaxxLogo from "@/assets/images/products/partners/partner-tj-maxx.png";
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
  {
    id: "celebrity-pink",
    name: "Celebrity Pink Jeans",
    logo: celebrityPinkLogo,
    description:
      "Contemporary denim and lifestyle brand known for fits, washes, and accessible style",
    website: "https://www.celebpink.com",
    partnership: "Denim & woven apparel",
    location: "USA",
  },
  {
    id: "giant-tiger",
    name: "Giant Tiger",
    logo: giantTigerLogo,
    description:
      "Canadian discount retailer offering apparel, home, and everyday essentials",
    website: "https://www.gianttiger.com",
    partnership: "Retail & private-label programs",
    location: "Ottawa, Canada",
  },
  {
    id: "disney",
    name: "Disney",
    logo: disneyLogo,
    description:
      "Global entertainment brand spanning family apparel, character programs, and licensed goods",
    website: "https://www.shopdisney.com",
    partnership: "Licensed apparel & character goods",
    location: "Burbank, USA",
  },
  {
    id: "tj-maxx",
    name: "T.J. Maxx",
    logo: tjMaxxLogo,
    description:
      "Off-price retailer offering branded apparel, accessories, and home at accessible prices",
    website: "https://www.tjmaxx.com",
    partnership: "Off-price apparel & sourcing",
    location: "Framingham, USA",
  },
];
