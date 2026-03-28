export interface GetToKnowUsSectionProps {
  /** Section heading (capture default: "Get to Know Us") */
  title?: string;
  /** Prominent quote line (KTL-specific default) */
  quote?: string;
}

const DEFAULT_QUOTE =
  'From global manufacturing excellence to trusted partnerships across the supply chain, we help leading brands deliver quality apparel that meets the highest standards.';

/**
 * Editorial intro block inspired by a captured layout: section title + large statement
 * with a brand-yellow quarter-circle accent (no capture class names — Tailwind only).
 */
const GetToKnowUsSection = ({
  title = 'Get to Know Us',
  quote = DEFAULT_QUOTE,
}: GetToKnowUsSectionProps) => (
  <section
    className="bg-white pt-24 pb-16 md:pt-[200px] md:pb-[120px]"
    aria-labelledby="get-to-know-heading"
  >
    <div className="mx-auto max-w-[1440px] px-5">
      <h2
        id="get-to-know-heading"
        className="mb-12 font-heading text-[25px] font-bold leading-[35px] tracking-[-0.25px] text-neutral-900"
      >
        {title}
      </h2>

      <div className="relative isolate min-h-[7.5rem] md:min-h-[120px]">
        {/* Decorative quarter-disc — matches capture: ~240×240, brand yellow, top-left curve */}
        <div
          className="pointer-events-none absolute -z-10 -top-8 left-0 h-48 w-48 rounded-tl-full bg-primary-500 md:-top-[50px] md:left-[27.5rem] md:h-60 md:w-60"
          aria-hidden
        />
        <p className="relative z-10 max-w-[1400px] font-body text-2xl font-normal leading-snug tracking-[-0.02em] text-neutral-900 md:text-[45px] md:leading-[60px] md:tracking-[-0.45px]">
          {quote}
        </p>
      </div>
    </div>
  </section>
);

export default GetToKnowUsSection;
