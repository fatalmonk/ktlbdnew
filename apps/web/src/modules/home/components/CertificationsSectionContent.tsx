import type { HomeCertification } from '../../../data/home/certifications';
import { cn } from '../../../lib/utils';

interface CertificationsSectionContentProps {
  certifications: HomeCertification[];
}

const CertLogo = ({ cert }: { cert: HomeCertification }) => (
  <div className="flex items-center justify-center px-2 py-3 md:px-3 md:py-4 lg:px-4 lg:py-5">
    <div className="mx-auto flex h-32 w-full max-w-[240px] items-center justify-center sm:max-w-[280px] md:h-44 md:max-w-[380px] lg:h-48 lg:max-w-none xl:h-64 2xl:h-72">
      <img
        src={cert.logoSrc}
        alt={cert.logoAlt}
        className={cn(
          'max-h-full w-full max-w-full object-contain',
          // Walt Disney asset ships with a white box; blend so it matches bg-neutral-50
          cert.id === 'disney-fama' && 'mix-blend-multiply',
        )}
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
);

const desktopGridGaps =
  'gap-x-4 gap-y-6 xl:gap-x-6 xl:gap-y-8 2xl:gap-x-8 2xl:gap-y-10';

const CertificationsSectionContent = ({ certifications }: CertificationsSectionContentProps) => (
  <section className="py-16 md:py-24 lg:py-32 bg-neutral-50">
    <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
      <h2 className="font-heading mb-24 text-center text-5xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
        Our <span className="text-primary-500">Certifications</span>
      </h2>

      {/* Mobile / tablet: single grid */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:hidden">
        {certifications.map((cert) => (
          <CertLogo key={cert.id} cert={cert} />
        ))}
      </div>

      {/* Desktop: row of 5, then centered row of 4 (10-col grid) */}
      <div className="hidden flex-col gap-y-8 xl:gap-y-10 2xl:gap-y-12 lg:flex">
        <div className={cn('grid w-full grid-cols-10', desktopGridGaps)}>
          {certifications.slice(0, 5).map((cert) => (
            <div key={cert.id} className="col-span-2">
              <CertLogo cert={cert} />
            </div>
          ))}
        </div>
        <div className={cn('grid w-full grid-cols-10', desktopGridGaps)}>
          {certifications.slice(5, 9).map((cert, idx) => (
            <div
              key={cert.id}
              className={cn('col-span-2', idx === 0 && 'col-start-2')}
            >
              <CertLogo cert={cert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CertificationsSectionContent;
