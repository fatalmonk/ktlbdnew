import { Link } from "react-router-dom";
import Image from "../../../components/media/Image";
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
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              We develop knit programs that translate woven and jersey trends
              into stitch—jacquard and intarsia botanicals and animal prints,
              tonal damask effects, pinstripe textures, smocked necklines,
              balloon sleeves, mock-necks, and relaxed lounge silhouettes. Our
              premium knitwear line spans sweaters, cardigans, tops, and
              coordinated sets for comfort, drape, and retail-ready finish. As
              part of our comprehensive{" "}
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                woven garment products
              </Link>{" "}
              range, we also manufacture{" "}
              <Link
                to="/products/denims"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                premium denim
              </Link>{" "}
              and
              <Link
                to="/products/kids"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                {" "}
                children's clothing
              </Link>
              . All our knitwear is produced in our
              <Link
                to="/facilities/rmg"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                state-of-the-art manufacturing facilities
              </Link>{" "}
              using
              <Link
                to="/sustainability"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                sustainable production practices
              </Link>
              .
            </p>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Sample styles
              </h2>
              <p className="text-neutral-700 mb-6 max-w-2xl">
                Reference directions we can engineer in knit—from multi-color
                jacquard and tonal textures to engineered ribs, gathers, and
                contemporary women&apos;s silhouettes.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {knitwearGallery.map((item) => (
                  <figure
                    key={item.src}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-black/5"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt.replace(/^KTL Knitwear —\s*/i, "")}
                      className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      fit="cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <figcaption className="sr-only">{item.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Jacquard &amp; pattern knits
                </h3>
                <p className="text-neutral-800">
                  Multi-color jacquard, intarsia, and tonal stitch patterns for
                  botanical, animal, geo, and damask-inspired designs at the
                  gauge your brand specifies.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Statement silhouettes
                </h3>
                <p className="text-neutral-800">
                  Engineered ribs, smocked or gathered necklines, balloon
                  sleeves, mock-necks, peplum and high-low hems—built with
                  consistent sizing and clean finishing.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Loungewear &amp; layering
                </h3>
                <p className="text-neutral-800">
                  Coordinated sets, fine-gauge tops, and cardigans for lounge,
                  casual, and elevated everyday programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnitwearPage;
