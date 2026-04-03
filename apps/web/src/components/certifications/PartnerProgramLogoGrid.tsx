import type { HomeCertification } from "@/data/home/certifications";

/** Large flush tiles; `gap-px` + grid bg draws 1px hairlines between cells. */
function PartnerProgramLogoTile({ cert }: { cert: HomeCertification }) {
  return (
    <article className="relative flex h-full min-h-0 flex-col items-center justify-center bg-white p-10 transition-colors md:p-12 lg:p-14 hover:z-[1] hover:bg-neutral-50/90">
      <div className="flex min-h-[208px] w-full items-center justify-center sm:min-h-[232px] lg:min-h-[256px]">
        <img
          src={cert.logoSrc}
          alt={cert.logoAlt}
          className="max-h-[184px] w-full object-contain object-center sm:max-h-[204px] lg:max-h-[228px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export function PartnerProgramLogoGrid({
  certifications,
}: {
  certifications: HomeCertification[];
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/90"
      role="list"
      aria-label="Certification and partner program logos"
    >
      <div className="grid grid-cols-1 gap-px bg-neutral-200/90 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="min-w-0" role="listitem">
            <PartnerProgramLogoTile cert={cert} />
          </div>
        ))}
      </div>
    </div>
  );
}
