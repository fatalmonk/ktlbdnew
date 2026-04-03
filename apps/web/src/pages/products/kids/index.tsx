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

const kidsGallery = getPortfolioGridImages("kids");

const KidsPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Kids'", url: "/products/kids" },
  ];

  const productSchema = createProductSchema({
    name: "Premium Kids Wear Products",
    description:
      "KTL's premium kids wear collection features high-quality children's clothing for comfort, style, and durability manufactured in Bangladesh for global brands.",
    image: [
      "https://ktlbd.com/assets/portfolio/kids/kids-09.png",
      "https://ktlbd.com/assets/portfolio/kids/kids-10.png",
      "https://ktlbd.com/assets/portfolio/kids/kids-11.png",
      "https://ktlbd.com/assets/portfolio/kids/kids-12.png",
      "https://ktlbd.com/assets/portfolio/kids/kids-13.png",
    ],
    category: "Children's Apparel",
    brand: "Kattali Textile Ltd",
    availability: "https://schema.org/InStock",
  });

  return (
    <>
      <SEO
        title="Premium Kids Wear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium kids wear collection features high-quality children's clothing for comfort, style, and durability manufactured in Bangladesh for global brands."
        canonical="/products/kids"
        keywords={[
          "kids wear products",
          "children clothing",
          "kids fashion",
          "Bangladesh kids wear",
          "textile children apparel",
        ]}
      />
      <StructuredData
        data={[createBreadcrumbSchema(breadcrumbs), productSchema]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Kids'" },
        ]}
        pageTitle="Kids'"
      />
      <div className="min-h-screen bg-white text-neutral-900">
        <section className="py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className="max-w-3xl md:mx-0">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                Kids&apos; <span className="text-primary-500">collections</span>
              </h2>
              <p className="mt-8 text-lg text-neutral-700">
                Our premium kids wear collection features high-quality
                children&apos;s clothing designed for comfort, style, and
                durability. As part of our comprehensive product range, we also
                manufacture{" "}
                <Link to="/products/denims" className={CATEGORY_INLINE_LINK}>
                  premium denim
                </Link>
                ,{" "}
                <Link to="/products/knitwear" className={CATEGORY_INLINE_LINK}>
                  knitwear
                </Link>
                ,{" "}
                <Link to="/products/swimwear" className={CATEGORY_INLINE_LINK}>
                  swimwear
                </Link>
                , and a wide variety of{" "}
                <Link to="/products" className={CATEGORY_INLINE_LINK}>
                  woven garments
                </Link>{" "}
                for global fashion brands. All our products are made in our{" "}
                <Link to="/facilities/rmg" className={CATEGORY_INLINE_LINK}>
                  certified manufacturing facilities
                </Link>{" "}
                using{" "}
                <Link to="/sustainability" className={CATEGORY_INLINE_LINK}>
                  sustainable practices
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CategoryPortfolioSection
          gridIdSuffix="kids"
          items={kidsGallery}
          description="A selection of children's silhouettes we produce—sets, separates, sleepwear, and baby essentials for different age groups and markets."
        />

        <section className="border-t border-neutral-100 bg-white py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className={CATEGORY_FEATURE_GRID}>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Toddler clothing
                </h3>
                <p className="mt-3 text-neutral-700">
                  Comfortable and safe clothing for toddlers with modern
                  designs.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Kids fashion
                </h3>
                <p className="mt-3 text-neutral-700">
                  Stylish and trendy clothing for kids of all ages.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  School wear
                </h3>
                <p className="mt-3 text-neutral-700">
                  Durable and comfortable school uniforms and casual wear.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default KidsPage;
