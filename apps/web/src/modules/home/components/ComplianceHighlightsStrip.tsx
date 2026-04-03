import { Link } from "react-router-dom";
import Image from "@/components/media/Image";
import {
  COMPLIANCE_STRIP_MARKS,
  COMPLIANCE_STRIP_PROGRAM_HREFS,
} from "@/data/home/compliance-highlights";

/** Fixed row height; inner flex + max-h/max-w on <img> keeps intrinsic aspect ratio (no letterboxed “wrong ratio” boxes). */
const LOGO_CELL =
  "flex h-32 min-h-0 items-stretch px-2 sm:h-40 sm:px-3 md:h-44 md:px-4 lg:h-[11.5rem] xl:h-[12.5rem]";

/** Wide wordmarks use full column width; compact marks cap width so they don’t scale past their natural proportions. */
const logoSlotClass = (wide: boolean | undefined) =>
  [
    "flex h-full min-h-0 w-full items-center justify-center",
    wide ? "max-w-none" : "mx-auto max-w-[min(280px,96%)]",
  ].join(" ");

const LOGO_IMG_MONO =
  "max-h-full max-w-full h-auto w-auto object-contain brightness-0";
const LOGO_IMG_COLOR = "max-h-full max-w-full h-auto w-auto object-contain";

const EXTERNAL_TEXT_LINK =
  "inline no-underline font-medium text-[#555555] transition-colors hover:text-black focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const LOGO_EXTERNAL_LINK =
  "inline-flex h-full min-h-0 max-h-full w-full max-w-full items-center justify-center rounded-sm transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const CERTIFICATIONS_CTA_CLASS =
  "inline-flex min-h-[52px] items-center justify-center rounded-sm bg-blue-600 px-8 py-3.5 font-heading text-lg font-semibold leading-none tracking-tight text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-14 sm:px-10 sm:py-4 sm:text-xl md:px-12 lg:min-h-[3.75rem] lg:px-14 lg:py-[1.125rem] lg:text-2xl";

/**
 * Above-the-fold trust strip: headline + compliance program marks (Nirapon, Better Work, Sedex, Disney FAMA).
 */
const ComplianceHighlightsStrip = () => {
  return (
    <section className="bg-white" aria-labelledby="trust-partners-heading">
      <div className="mx-auto w-full max-w-[1920px] px-20 py-52 sm:px-[5rem] sm:py-56 md:px-24 md:py-60 lg:px-28 lg:py-64 xl:px-36 xl:py-72 2xl:px-44 2xl:py-80">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center lg:gap-28 xl:gap-32 2xl:gap-40">
          <div className="min-w-0 lg:max-w-[min(100%,48rem)] xl:max-w-[min(100%,56rem)] 2xl:max-w-[min(100%,64rem)]">
            <h2
              id="trust-partners-heading"
              className="font-heading text-5xl font-bold leading-[1.06] tracking-tight text-black sm:text-6xl md:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.5rem] 2xl:text-[4.75rem]"
            >
              Globally recognized,
              <br />
              Ethically grounded.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[#666666] sm:mt-9 sm:text-xl lg:mt-12 lg:text-2xl lg:leading-relaxed xl:text-[1.625rem] xl:leading-[1.55]">
              KTL operates under internationally recognized compliance and
              safety frameworks such as{" "}
              <a
                href={COMPLIANCE_STRIP_PROGRAM_HREFS.sedex}
                target="_blank"
                rel="noopener noreferrer"
                className={EXTERNAL_TEXT_LINK}
              >
                Sedex
              </a>
              ,{" "}
              <a
                href={COMPLIANCE_STRIP_PROGRAM_HREFS.betterWork}
                target="_blank"
                rel="noopener noreferrer"
                className={EXTERNAL_TEXT_LINK}
              >
                Better Work
              </a>
              ,{" "}
              <a
                href={COMPLIANCE_STRIP_PROGRAM_HREFS.nirapon}
                target="_blank"
                rel="noopener noreferrer"
                className={EXTERNAL_TEXT_LINK}
              >
                NIRAPON
              </a>{" "}
              &{" "}
              <a
                href={COMPLIANCE_STRIP_PROGRAM_HREFS.waltDisney}
                target="_blank"
                rel="noopener noreferrer"
                className={EXTERNAL_TEXT_LINK}
              >
                FAMA
              </a>
              , ensuring strict adherence to global buyer requirements across
              the USA, EU, and beyond.
            </p>
            <Link
              to="/certifications"
              className={`${CERTIFICATIONS_CTA_CLASS} mt-10 hidden sm:mt-11 md:mt-12 lg:mt-14 lg:inline-flex`}
            >
              Certifications & compliance
            </Link>
          </div>

          <ul
            className="grid min-w-0 grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:gap-x-12 md:gap-y-14 lg:gap-x-14 xl:gap-x-16"
            role="list"
            aria-label="Compliance and audit program marks"
          >
            {COMPLIANCE_STRIP_MARKS.map((mark) => {
              const imgClass = mark.originalColors
                ? LOGO_IMG_COLOR
                : LOGO_IMG_MONO;
              const image = (
                <Image
                  src={mark.logoSrc}
                  alt={mark.logoHref ? "" : mark.logoAlt}
                  className={imgClass}
                  fit="contain"
                  eager
                />
              );
              const linked =
                mark.logoHref != null && mark.logoHref.length > 0 ? (
                  <a
                    href={mark.logoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      /\.pdf(\?|#|$)/i.test(mark.logoHref)
                        ? `${mark.logoAlt} — certificate PDF (opens in new tab)`
                        : `${mark.logoAlt} — official website (opens in new tab)`
                    }
                    className={LOGO_EXTERNAL_LINK}
                  >
                    {image}
                  </a>
                ) : (
                  image
                );
              return (
                <li key={mark.id} className={LOGO_CELL}>
                  <div className={logoSlotClass(mark.wide)}>{linked}</div>
                </li>
              );
            })}
          </ul>

          <div className="min-w-0 lg:hidden">
            <Link to="/certifications" className={CERTIFICATIONS_CTA_CLASS}>
              Certifications & compliance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceHighlightsStrip;
