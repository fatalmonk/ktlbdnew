import type { HomeCertification } from "../../../data/home/certifications";
import { PartnerProgramLogoGrid } from "../../../components/certifications/PartnerProgramLogoGrid";

interface CertificationsSectionContentProps {
  certifications: HomeCertification[];
}

const CertificationsSectionContent = ({
  certifications,
}: CertificationsSectionContentProps) => (
  <section className="w-full bg-neutral-50 py-16 md:py-24 lg:py-28">
    <div className="mx-auto w-full max-w-ktl px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading mb-12 text-center text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:mb-16 md:text-5xl lg:mb-20 lg:text-6xl">
        Our <span className="text-primary-500">Certifications</span>
      </h2>

      <PartnerProgramLogoGrid certifications={certifications} />
    </div>
  </section>
);

export default CertificationsSectionContent;
