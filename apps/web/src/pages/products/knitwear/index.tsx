import { Link } from "react-router-dom";
import {
  CATEGORY_FEATURE_CARD,
  CATEGORY_FEATURE_GRID,
  CATEGORY_INLINE_LINK,
  CATEGORY_PAGE_SHELL,
  CategoryPortfolioSection,
} from "../../../components/portfolio/CategoryPortfolioSection";
import SEO from "../../../components/seo/SEO";
import StructuredData from "../../../components/seo/StructuredData";
import SubpageHeader from "../../../components/shared/SubpageHeader";
import { getPortfolioGridImages } from "../../../data/portfolioGallery";
import {
  createProductSchema,
  createBreadcrumbSchema,
} from "../../../modules/seo/templates";

const knitwearGallery = getPortfolioGridImages("knitwear");

const KnitwearPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Knitwear", url: "/products/knitwear" },
  ];

  const productSchema = createProductSchema({
    name: "Premium Knitwear Products",
    description:
      "KTL's premium knitwear collection features high-quality sweaters, cardigans, and knit accessories manufactured in Bangladesh for global fashion brands.",
    image: "https://ktlbd.com/assets/portfolio/knitwear/knitwear-01.png",
    category: "Knitwear Apparel",
    brand: "Kattali Textile Ltd",
    availability: "https://schema.org/InStock",
  });

  return (
    <>
      <SEO
        title="Premium Knitwear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium knitwear collection features high-quality sweaters, cardigans, and knit accessories manufactured in Bangladesh for global fashion brands."
        canonical="/products/knitwear"
        keywords={[
          "knitwear products",
          "sweaters manufacturing",
          "cardigans",
          "Bangladesh knitwear",
          "textile knitwear",
        ]}
      />
      <StructuredData
        data={[createBreadcrumbSchema(breadcrumbs), productSchema]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Knitwear" },
        ]}
        pageTitle="Knitwear"
      />
      <div className="min-h-screen bg-white text-neutral-900">
        <section className="py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className="max-w-3xl md:mx-0">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                Premium <span className="text-primary-500">knitwear</span>
              </h2>
              <p className="mt-8 text-lg text-neutral-700">
                We develop knit programs that translate woven and jersey trends
                into stitch—jacquard and intarsia botanicals and animal prints,
                tonal damask effects, pinstripe textures, smocked necklines,
                balloon sleeves, mock-necks, and relaxed lounge silhouettes. Our
                premium knitwear line spans sweaters, cardigans, tops, and
                coordinated sets for comfort, drape, and retail-ready finish. As
                part of our comprehensive{" "}
                <Link to="/products" className={CATEGORY_INLINE_LINK}>
                  woven garment products
                </Link>{" "}
                range, we also manufacture{" "}
                <Link to="/products/denims" className={CATEGORY_INLINE_LINK}>
                  premium denim
                </Link>
                ,{" "}
                <Link to="/products/swimwear" className={CATEGORY_INLINE_LINK}>
                  swimwear
                </Link>
                , and{" "}
                <Link to="/products/kids" className={CATEGORY_INLINE_LINK}>
                  kids&apos; clothing
                </Link>
                . All our knitwear is produced in our{" "}
                <Link to="/facilities/rmg" className={CATEGORY_INLINE_LINK}>
                  state-of-the-art manufacturing facilities
                </Link>{" "}
                using{" "}
                <Link to="/sustainability" className={CATEGORY_INLINE_LINK}>
                  sustainable production practices
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CategoryPortfolioSection
          gridIdSuffix="knitwear"
          items={knitwearGallery}
          description="Reference directions we can engineer in knit—from multi-color jacquard and tonal textures to engineered ribs, gathers, and contemporary women's silhouettes."
        />

        <section className="border-t border-neutral-100 bg-white py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className={CATEGORY_FEATURE_GRID}>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Jacquard &amp; pattern knits
                </h3>
                <p className="mt-3 text-neutral-700">
                  Multi-color jacquard, intarsia, and tonal stitch patterns for
                  botanical, animal, geo, and damask-inspired designs at the
                  gauge your brand specifies.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Statement silhouettes
                </h3>
                <p className="mt-3 text-neutral-700">
                  Engineered ribs, smocked or gathered necklines, balloon
                  sleeves, mock-necks, peplum and high-low hems—built with
                  consistent sizing and clean finishing.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Loungewear &amp; layering
                </h3>
                <p className="mt-3 text-neutral-700">
                  Coordinated sets, fine-gauge tops, and cardigans for lounge,
                  casual, and elevated everyday programs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default KnitwearPage;
