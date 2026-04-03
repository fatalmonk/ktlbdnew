import { Link } from "react-router-dom";
import SEO from "../../../components/seo/SEO";
import StructuredData from "../../../components/seo/StructuredData";
import SubpageHeader from "../../../components/shared/SubpageHeader";
import {
  createProductSchema,
  createBreadcrumbSchema,
} from "../../../modules/seo/templates";

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
    image: "https://ktlbd.com/assets/swimwear.jpg",
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
      <section className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-800 mb-8">
              Our premium swimwear collection features high-quality swimsuits,
              bikinis, and beachwear designed for comfort, style, and
              durability. As part of our diverse{" "}
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                textile product range
              </Link>
              , we also manufacture{" "}
              <Link
                to="/products/denims"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                premium denim
              </Link>
              ,
              <Link
                to="/products/knitwear"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                knitwear
              </Link>
              , and
              <Link
                to="/products/kids"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                children's apparel
              </Link>
              . All swimwear products are manufactured in our
              <Link
                to="/facilities/rmg"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                advanced production facilities
              </Link>{" "}
              with
              <Link
                to="/sustainability"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                certified sustainable practices
              </Link>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Swimsuits</h3>
                <p className="text-neutral-800">
                  High-quality swimsuits with modern designs and comfortable
                  fits.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Bikinis</h3>
                <p className="text-neutral-800">
                  Stylish bikinis perfect for beach and pool activities.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Beachwear</h3>
                <p className="text-neutral-800">
                  Complementary beachwear and accessories for complete summer
                  looks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SwimwearPage;
