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
  createBreadcrumbSchema,
  createProductSchema,
} from "../../../modules/seo/templates";

const denimsGallery = getPortfolioGridImages("denims");

const DenimsPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Denims", url: "/products/denims" },
  ];

  const productSchema = createProductSchema({
    name: "Premium Denim Products",
    description:
      "High-quality denim jeans, jackets, and accessories manufactured by Kattali Textile Ltd",
    image: "https://ktlbd.com/assets/portfolio/denim/denim-01.png",
    category: "Denim Apparel",
    brand: "Kattali Textile Ltd",
    availability: "https://schema.org/InStock",
  });

  return (
    <>
      <SEO
        title="Denim Manufacturer Bangladesh | Kattali Textile Ltd Premium Denim Products"
        description="KTL is Bangladesh's leading denim manufacturer, producing high-quality jeans, denim jackets, and accessories for global fashion brands from our Chittagong facilities."
        canonical="/products/denims"
        keywords={[
          "denim manufacturer bangladesh",
          "jeans manufacturer",
          "denim supplier",
          "Bangladesh denim",
          "denim production",
        ]}
      />
      <StructuredData
        data={[createBreadcrumbSchema(breadcrumbs), productSchema]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Denims" },
        ]}
        pageTitle="Denims"
      />
      <div className="min-h-screen bg-white text-neutral-900">
        <section className="py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className="max-w-3xl md:mx-0">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                Denim manufacturer{" "}
                <span className="text-primary-500">Bangladesh</span>
              </h2>
              <div className="mt-8 space-y-6 text-lg text-neutral-700">
                <p>
                  As a leading{" "}
                  <strong className="text-neutral-900">
                    denim manufacturer in Bangladesh
                  </strong>
                  , KTL specializes in producing high-quality denim products for
                  global fashion brands. Our state-of-the-art denim production
                  facilities in Chittagong combine traditional craftsmanship
                  with modern technology to deliver premium jeans, denim
                  jackets, and accessories.
                </p>
                <p>
                  Our{" "}
                  <strong className="text-neutral-900">
                    denim manufacturing
                  </strong>{" "}
                  capabilities include advanced washing techniques, custom
                  finishing processes, and sustainable production practices. We
                  work with premium denim fabrics and offer a wide range of
                  styles from classic straight-fit jeans to contemporary denim
                  jackets and accessories. Explore our full range of{" "}
                  <Link to="/products" className={CATEGORY_INLINE_LINK}>
                    woven garment products
                  </Link>
                  ,{" "}
                  <Link
                    to="/products/knitwear"
                    className={CATEGORY_INLINE_LINK}
                  >
                    premium knitwear
                  </Link>
                  ,{" "}
                  <Link
                    to="/products/swimwear"
                    className={CATEGORY_INLINE_LINK}
                  >
                    swimwear
                  </Link>
                  , and{" "}
                  <Link to="/products/kids" className={CATEGORY_INLINE_LINK}>
                    kids&apos; collections
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <CategoryPortfolioSection
          gridIdSuffix="denims"
          items={denimsGallery}
          description="Reference washes and silhouettes we manufacture—five-pocket jeans, wide-leg and carpenter fits, denim jackets, jumpsuits, and coordinated sets."
        />

        <section className="border-t border-neutral-100 bg-white py-12 md:py-16 lg:py-20">
          <div className={CATEGORY_PAGE_SHELL}>
            <div className="max-w-5xl rounded-xl bg-neutral-50 p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Denim production process
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Manufacturing capabilities
                  </h3>
                  <ul className="mt-3 space-y-2 text-neutral-700">
                    <li>• Premium denim fabric sourcing</li>
                    <li>• Advanced cutting and sewing techniques</li>
                    <li>• Custom washing and finishing</li>
                    <li>• Quality control and inspection</li>
                    <li>• Sustainable production practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Product range
                  </h3>
                  <ul className="mt-3 space-y-2 text-neutral-700">
                    <li>• Men&apos;s and women&apos;s jeans</li>
                    <li>• Denim jackets and shirts</li>
                    <li>• Denim shorts and skirts</li>
                    <li>• Custom denim products</li>
                    <li>• Private label denim</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`mt-12 ${CATEGORY_FEATURE_GRID}`}>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Modern fit jeans
                </h3>
                <p className="mt-3 text-neutral-700">
                  Traditional denim jeans with modern fit and comfort features.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Stylish denim jackets
                </h3>
                <p className="mt-3 text-neutral-700">
                  Versatile denim jackets for all seasons and occasions.
                </p>
              </div>
              <div className={CATEGORY_FEATURE_CARD}>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Denim accessories
                </h3>
                <p className="mt-3 text-neutral-700">
                  Complementary denim accessories and finishing touches.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DenimsPage;
