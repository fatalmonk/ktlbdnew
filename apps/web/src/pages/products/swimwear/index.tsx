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

const swimwearGallery = getPortfolioGridImages("swimwear");

const SwimwearPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Swimwear", url: "/products/swimwear" },
  ];

  const productSchema = createProductSchema({
    name: "Premium Swimwear Products",
    description:
      "KTL's premium swimwear collection features high-quality swimsuits, bikinis, and beachwear manufactured in Bangladesh for global fashion brands.",
    image: "https://ktlbd.com/assets/portfolio/swimwear/swimwear-01.png",
    category: "Swimwear Apparel",
    brand: "Kattali Textile Ltd",
    availability: "https://schema.org/InStock",
  });

  return (
    <>
      <SEO
        title="Premium Swimwear Products | Kattali Textile Ltd Manufacturing"
        description="KTL's premium swimwear collection features high-quality swimsuits, bikinis, and beachwear manufactured in Bangladesh for global fashion brands."
        canonical="/products/swimwear"
        keywords={[
          "swimwear products",
          "swimsuits manufacturing",
          "bikinis",
          "Bangladesh swimwear",
          "textile swimwear",
        ]}
      />
      <StructuredData
        data={[createBreadcrumbSchema(breadcrumbs), productSchema]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Swimwear" },
        ]}
        pageTitle="Swimwear"
      />
      <div className="min-h-screen bg-white text-neutral-900">
        <section className="py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className="max-w-3xl md:mx-0">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                Premium <span className="text-primary-500">swimwear</span>
              </h2>
              <p className="mt-8 text-lg text-neutral-700">
                Our premium swimwear collection features high-quality swimsuits,
                bikinis, and beachwear designed for comfort, style, and
                durability. As part of our diverse{" "}
                <Link to="/products" className={CATEGORY_INLINE_LINK}>
                  textile product range
                </Link>
                , we also manufacture{" "}
                <Link to="/products/denims" className={CATEGORY_INLINE_LINK}>
                  premium denim
                </Link>
                ,{" "}
                <Link to="/products/knitwear" className={CATEGORY_INLINE_LINK}>
                  knitwear
                </Link>
                , and{" "}
                <Link to="/products/kids" className={CATEGORY_INLINE_LINK}>
                  children&apos;s apparel
                </Link>
                . All swimwear products are manufactured in our{" "}
                <Link to="/facilities/rmg" className={CATEGORY_INLINE_LINK}>
                  advanced production facilities
                </Link>{" "}
                with{" "}
                <Link to="/sustainability" className={CATEGORY_INLINE_LINK}>
                  certified sustainable practices
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <CategoryPortfolioSection
          gridIdSuffix="swimwear"
          items={swimwearGallery}
          description="A selection of swim and beach silhouettes we produce—rash guards, sunsuits, swim sets, and modest swim options for different markets."
        />

        <section className="border-t border-neutral-100 bg-white py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className={CATEGORY_FEATURE_GRID}>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Swimsuits
                </h3>
                <p className="mt-3 text-neutral-700">
                  High-quality swimsuits with modern designs and comfortable
                  fits.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Bikinis
                </h3>
                <p className="mt-3 text-neutral-700">
                  Stylish bikinis perfect for beach and pool activities.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Beachwear
                </h3>
                <p className="mt-3 text-neutral-700">
                  Complementary beachwear and accessories for complete summer
                  looks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SwimwearPage;
