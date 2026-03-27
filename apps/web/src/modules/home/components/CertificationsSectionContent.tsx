import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const Award = createLazyIcon('Award');

interface Certification {
  name: string;
  description: string;
}

interface CertificationsSectionContentProps {
  certifications: Certification[];
}

const CertificationsSectionContent = ({ certifications }: CertificationsSectionContentProps) => (
  <section className="py-8 md:py-16 lg:py-20 bg-neutral-50">
    <div className="max-w-ktl mx-auto px-4 md:px-6">
      <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold text-center mb-6 md:mb-8 lg:mb-16 text-neutral-900 leading-tight">
        Our <span className="text-primary">Certifications</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="bg-white p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4">
              <Suspense fallback={<div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />}>
                <Award className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary" />
              </Suspense>
            </div>
            <h3 className="font-heading text-sm md:text-lg lg:text-xl font-bold mb-1 md:mb-2 lg:mb-3 text-neutral-900">
              {cert.name}
            </h3>
            <p className="text-neutral-600 text-xs md:text-sm lg:text-base">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSectionContent;

