import heroGlobal1x from "@/assets/images/hero/hero-global@1x.webp";
import heroInvestor1x from "@/assets/images/hero/hero-investor@1x.webp";
import heroMain1x from "@/assets/images/hero/hero-main@1x.webp";
import heroSustainability1x from "@/assets/images/hero/hero-sustainability@1x.webp";

/** Public stock stills — same paths as `products.ts`. */
const stock = {
  denims: "/assets/images/products/stock/denims.jpg",
  tShirts: "/assets/images/products/stock/t-shirts.jpg",
  knitwear: "/assets/images/products/stock/knitwear.jpg",
  dresses: "/assets/images/products/stock/dresses.jpg",
} as const;

const imagePool = [
  stock.denims,
  stock.tShirts,
  stock.knitwear,
  stock.dresses,
  heroGlobal1x,
  heroInvestor1x,
  heroMain1x,
  heroSustainability1x,
] as const;

export type PortfolioCategoryId = "denims" | "knitwear" | "swimwear" | "kids";

/** Gallery is 4 columns × 3 rows on desktop (12 tiles). */
export const PORTFOLIO_GRID_COUNT = 12;

export const PORTFOLIO_CATEGORIES: readonly {
  id: PortfolioCategoryId;
  label: string;
  href: string;
  /** Starting index into an extended pool so each category shows a different slice. */
  offset: number;
}[] = [
  { id: "denims", label: "Denims", href: "/products/denims", offset: 0 },
  { id: "knitwear", label: "Knitwear", href: "/products/knitwear", offset: 2 },
  { id: "swimwear", label: "Swimwear", href: "/products/swimwear", offset: 4 },
  { id: "kids", label: "Kids'", href: "/products/kids", offset: 6 },
] as const;

const extendedPool = [...imagePool, ...imagePool, ...imagePool];

/**
 * Denim tiles: paths must match files under `public/assets/portfolio/denim/`
 * (only listed files are shipped; missing indices are omitted).
 */
const DENIM_PORTFOLIO_ITEMS: readonly { src: string; alt: string }[] = [
  {
    src: "/assets/portfolio/denim/denim-01.png",
    alt: "KTL Denims — light-wash distressed straight-leg jeans with crossover waistband and ripped knees, studio front view",
  },
  {
    src: "/assets/portfolio/denim/denim-02.png",
    alt: "KTL Denims — high-rise straight-leg jeans in medium blue wash with whiskering and distressed knee, studio front view",
  },
  {
    src: "/assets/portfolio/denim/denim-03.png",
    alt: "KTL Denims — medium-wash denim jumpsuit with bib front, straight leg, and patch pockets, studio full length",
  },
  {
    src: "/assets/portfolio/denim/denim-04.png",
    alt: "KTL Denims — cropped medium-wash denim jacket with high-rise dark skinny jeans and blown-out knee, side profile",
  },
  {
    src: "/assets/portfolio/denim/denim-05.png",
    alt: "KTL Denims — coordinated medium-wash denim jacket and jeans with knee distressing, seated full-length studio shot",
  },
  {
    src: "/assets/portfolio/denim/denim-07.png",
    alt: "KTL Denims — faded grey double-knee carpenter jeans with distressing and raw hem, ribbed brown top and braided belt, studio view",
  },
  {
    src: "/assets/portfolio/denim/denim-08.png",
    alt: "KTL Denims — light-wash double-knee carpenter jeans with fading and frayed hem, tucked button-up and braided belt, studio view",
  },
  {
    src: "/assets/portfolio/denim/denim-10.png",
    alt: "KTL Denims — dark indigo five-pocket jeans with contrast stitching and red cherub embroidery at hip, striped knit top, waist close-up",
  },
  {
    src: "/assets/portfolio/denim/denim-11.png",
    alt: "KTL Denims — light-wash relaxed straight-leg jeans with high-rise waist, pale knit top, studio view",
  },
  {
    src: "/assets/portfolio/denim/denim-12.png",
    alt: "KTL Denims — medium blue wide-leg jeans with white stud grid embellishment, front view",
  },
  {
    src: "/assets/portfolio/denim/denim-13.png",
    alt: "KTL Denims — light-wash wide-leg paneled jeans with vertical seaming, studio front view",
  },
  {
    src: "/assets/portfolio/denim/denim-14.png",
    alt: "KTL Denims — high-waisted medium-wash wide-leg jeans with raw hem, layered shirt and cropped jacket, studio full length",
  },
] as const;

/**
 * Knitwear tiles: paths under `public/assets/portfolio/knitwear/`
 */
const KNITWEAR_PORTFOLIO_ITEMS: readonly { src: string; alt: string }[] = [
  {
    src: "/assets/portfolio/knitwear/knitwear-01.png",
    alt: "KTL Knitwear — women's off-shoulder knit top in pale peach with bold black botanical jacquard-style motif and smocked neckline, flat product shot",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-02.png",
    alt: "KTL Knitwear — sleeveless seafoam mock-neck muscle tee with structured shoulders and curved hem, fine-gauge knit look, studio flat lay",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-03.png",
    alt: "KTL Knitwear — full-length look with white ruched V-neck blouse and wide-leg python-inspired print trousers, editorial studio styling",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-04.png",
    alt: "KTL Knitwear — oversized peach tunic with front drape folds and balloon sleeves gathered at cuffs, lightweight knit drape, flat product shot",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-05.png",
    alt: "KTL Knitwear — pale sage two-piece lounge set with tonal damask jacquard texture, wide cuffs and wide-leg pants, flat lay",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-06.png",
    alt: "KTL Knitwear — oversized leopard jacquard sweater with crew neck, dropped shoulders, wide cuffs, and high-low hem, studio product shot",
  },
  {
    src: "/assets/portfolio/knitwear/knitwear-07.png",
    alt: "KTL Knitwear — sleeveless ivory pinstripe shirt with navy contrast collar, drawstring waist, and bubble peplum hem, flat product shot",
  },
] as const;

/**
 * Swimwear tiles: paths under `public/assets/portfolio/swimwear/`
 */
const SWIMWEAR_PORTFOLIO_ITEMS: readonly { src: string; alt: string }[] = [
  {
    src: "/assets/portfolio/swimwear/swimwear-01.png",
    alt: "KTL Swimwear — children's two-piece rash guard and jammer shorts in bright blue with shark-themed graphics, studio product shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-02.png",
    alt: "KTL Swimwear — boy's two-piece rash guard and swim shorts in black, yellow, and grey with superhero bat emblem styling, studio model shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-03.png",
    alt: "KTL Swimwear — children's rash guard with striped body and navy sleeves plus matching navy swim shorts, character print chest graphic, flat product shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-04.png",
    alt: "KTL Swimwear — boy's short-sleeve sunsuit with space-themed astronaut and rocket graphics in sky and navy blue, studio model shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-05.png",
    alt: "KTL Swimwear — yellow shorty one-piece with snorkel-themed shark graphic, decorative side fin, and matching swim cap, flat product shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-06.png",
    alt: "KTL Swimwear — bright pink sleeveless swim dress with boy-leg shorts underneath, modest athletic silhouette, studio model shot",
  },
  {
    src: "/assets/portfolio/swimwear/swimwear-07.png",
    alt: "KTL Swimwear — girl's one-piece swimsuit with pink-to-blue gradient ground and large character graphic, thin strap styling, studio model shot",
  },
] as const;

/**
 * Kids' tiles: paths under `public/assets/portfolio/kids/`
 */
const KIDS_PORTFOLIO_ITEMS: readonly { src: string; alt: string }[] = [
  {
    src: "/assets/portfolio/kids/kids-01.png",
    alt: "KTL Kids' — children's two-piece set with mint graphic tee and royal blue jogger pants with drawstring, flat lay",
  },
  {
    src: "/assets/portfolio/kids/kids-02.png",
    alt: "KTL Kids' — child in light-wash denim jacket, striped tee, dark trousers, and tan sneakers, studio lookbook",
  },
  {
    src: "/assets/portfolio/kids/kids-03.png",
    alt: "KTL Kids' — oatmeal two-piece set with shoulder-snap tee and cargo-pocket textured pants, flat lay",
  },
  {
    src: "/assets/portfolio/kids/kids-04.png",
    alt: "KTL Kids' — sage green children's trousers with elastic waist, fabric drawstring, and side pockets, front view",
  },
  {
    src: "/assets/portfolio/kids/kids-05.png",
    alt: "KTL Kids' — pale blue ribbed long-sleeve pajama set with dinosaur print, flat lay",
  },
  {
    src: "/assets/portfolio/kids/kids-06.png",
    alt: "KTL Kids' — children's medium-wash denim pull-on shorts with elastic waist and rope drawstring, front view",
  },
  {
    src: "/assets/portfolio/kids/kids-07.png",
    alt: "KTL Kids' — matching sage camp-collar shirt and shorts in textured linen-blend fabric, flat lay",
  },
  {
    src: "/assets/portfolio/kids/kids-08.png",
    alt: "KTL Kids' — long-sleeve footed baby rompers with strawberry print and solid pink with shoulder ruffle, flat lay",
  },
] as const;

export function getPortfolioGridImages(category: PortfolioCategoryId): {
  src: string;
  alt: string;
}[] {
  const meta = PORTFOLIO_CATEGORIES.find((c) => c.id === category);
  if (!meta) return [];

  if (category === "denims") {
    return DENIM_PORTFOLIO_ITEMS.map((item) => ({ ...item }));
  }

  if (category === "swimwear") {
    return SWIMWEAR_PORTFOLIO_ITEMS.map((item) => ({ ...item }));
  }

  if (category === "knitwear") {
    return KNITWEAR_PORTFOLIO_ITEMS.map((item) => ({ ...item }));
  }

  if (category === "kids") {
    return KIDS_PORTFOLIO_ITEMS.map((item) => ({ ...item }));
  }

  const offset = meta.offset;
  return Array.from({ length: PORTFOLIO_GRID_COUNT }, (_, i) => ({
    src: extendedPool[offset + i] ?? extendedPool[i % extendedPool.length],
    alt: `KTL ${meta.label} — portfolio image ${i + 1}`,
  }));
}
