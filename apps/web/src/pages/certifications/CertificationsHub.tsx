import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import SEO from "../../components/seo/SEO";
import SubpageHeader from "../../components/shared/SubpageHeader";
import { certifications as partnerProgramLogos } from "@/data/home/certifications";
import { PartnerProgramLogoGrid } from "@/components/certifications/PartnerProgramLogoGrid";

const PAGE_EDGE = "mx-auto w-full max-w-ktl px-4 sm:px-6 lg:px-8";

const CertificationsHub = () => (
  <>
    <SEO
      title="Certifications & Compliance | KTL"
      description="KTL partners and programs: ACCORD, Nirapon, Better Work Bangladesh, Sedex, Disney FAMA, Walmart Supplier ONE, CSE, DSE, and BGMEA."
      keywords={[
        "Sedex",
        "ACCORD",
        "BGMEA",
        "Better Work Bangladesh",
        "Nirapon",
        "compliance",
        "Bangladesh garment",
      ]}
    />

    <SubpageHeader
      breadcrumbItems={[
        { label: "Home", to: "/" },
        { label: "Certifications" },
      ]}
      pageTitle="Certifications"
    />

    <div className="min-h-screen bg-neutral-50">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 pb-24 pt-14 text-white md:pb-28 md:pt-16 lg:pb-32 lg:pt-20">
        <div className={PAGE_EDGE}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield
              size={88}
              strokeWidth={1.5}
              className="mx-auto mb-8 md:mb-10"
              aria-hidden
            />
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
              Certifications &amp; Compliance
            </h2>
            <p className="mx-auto max-w-4xl text-xl leading-snug text-blue-100 sm:text-2xl md:text-3xl">
              Trusted by global brands. Certified by international standards.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={`${PAGE_EDGE} pb-20 pt-12 md:pb-28 md:pt-16`}>
        <PartnerProgramLogoGrid certifications={partnerProgramLogos} />
      </section>
    </div>
  </>
);

export default CertificationsHub;
