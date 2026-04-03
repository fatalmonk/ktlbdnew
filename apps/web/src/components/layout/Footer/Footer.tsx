import { Link } from "react-router-dom";
import { Suspense } from "react";
import { createLazyIcon } from "@/lib/lucide-icons";
import {
  COMPANY_EMAIL,
  GOOGLE_BUSINESS,
  SOCIAL_MEDIA,
  STOCK_EXCHANGES,
  ASSOCIATIONS,
} from "../../../lib/constants";
import { NAVIGATION_ITEMS } from "../../../modules/navigation/data/navigation";

const Linkedin = createLazyIcon("Linkedin");
const Facebook = createLazyIcon("Facebook");
const Instagram = createLazyIcon("Instagram");
const Mail = createLazyIcon("Mail");
const MapPin = createLazyIcon("MapPin");
const ExternalLink = createLazyIcon("ExternalLink");

const pipe = (
  <span className="text-neutral-500 text-base sm:text-lg" aria-hidden>
    |
  </span>
);

const Footer = () => {
  const primaryNav = NAVIGATION_ITEMS.map((item) => ({
    name: item.name,
    href: item.href,
  }));

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1920px] px-10 py-28 md:px-16 md:py-36 lg:px-20 lg:py-44 xl:px-24 xl:py-52">
        <div className="grid grid-cols-1 gap-20 text-left lg:grid-cols-2 lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:gap-x-28 lg:gap-y-12">
          {/* Wordmark — row 1 col 1; mobile order 1 */}
          <Link
            to="/"
            className="order-1 font-heading block text-6xl font-semibold tracking-tight text-[#6d8eb8] lowercase md:text-7xl lg:order-none lg:col-start-1 lg:row-start-1 lg:mb-16 lg:text-8xl xl:mb-20"
          >
            kattali textile limited
          </Link>

          {/* Social icons — row 2 col 1; aligns with footer nav on lg; mobile order 2 */}
          <div className="order-2 flex flex-wrap items-center gap-5 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-center">
            <a
              href={SOCIAL_MEDIA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60 hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <Suspense fallback={<span className="h-8 w-8" />}>
                <Linkedin className="h-8 w-8" strokeWidth={1.75} />
              </Suspense>
            </a>
            <a
              href={SOCIAL_MEDIA.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60 hover:bg-white/10"
              aria-label="Facebook"
            >
              <Suspense fallback={<span className="h-8 w-8" />}>
                <Facebook className="h-8 w-8" strokeWidth={1.75} />
              </Suspense>
            </a>
            <a
              href={SOCIAL_MEDIA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60 hover:bg-white/10"
              aria-label="Instagram"
            >
              <Suspense fallback={<span className="h-8 w-8" />}>
                <Instagram className="h-8 w-8" strokeWidth={1.75} />
              </Suspense>
            </a>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white/60 hover:bg-white/10"
              aria-label="Email us"
            >
              <Suspense fallback={<span className="h-8 w-8" />}>
                <Mail className="h-8 w-8" strokeWidth={1.75} />
              </Suspense>
            </a>
          </div>

          {/* Google Business — row 3 col 1; mobile order 3 */}
          <div className="order-3 flex w-full max-w-2xl flex-col gap-6 border-t border-white/10 pt-12 lg:order-none lg:col-start-1 lg:row-start-3 lg:pt-12">
            <p className="text-overline font-medium text-neutral-400">
              Google Business
            </p>
            <a
              href={GOOGLE_BUSINESS.headOffice.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 text-body text-neutral-200 transition-colors hover:text-white"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Suspense
                  fallback={
                    <span
                      className="inline-block h-6 w-6 shrink-0"
                      aria-hidden
                    />
                  }
                >
                  <MapPin
                    className="h-6 w-6 shrink-0 text-primary-400"
                    strokeWidth={2}
                  />
                </Suspense>
                <span className="min-w-0 flex-1 text-h4 font-medium leading-none text-white">
                  Head Office
                </span>
                <Suspense
                  fallback={
                    <span
                      className="inline-block h-6 w-6 shrink-0"
                      aria-hidden
                    />
                  }
                >
                  <ExternalLink className="h-6 w-6 shrink-0 text-neutral-500 group-hover:text-white" />
                </Suspense>
              </span>
              <span className="block min-w-0 pl-9 text-caption text-neutral-400 group-hover:text-neutral-300">
                {GOOGLE_BUSINESS.headOffice.address}
              </span>
            </a>
            <a
              href={GOOGLE_BUSINESS.production.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 text-body text-neutral-200 transition-colors hover:text-white"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Suspense
                  fallback={
                    <span
                      className="inline-block h-6 w-6 shrink-0"
                      aria-hidden
                    />
                  }
                >
                  <MapPin
                    className="h-6 w-6 shrink-0 text-primary-400"
                    strokeWidth={2}
                  />
                </Suspense>
                <span className="min-w-0 flex-1 text-h4 font-medium leading-none text-white">
                  Production facility
                </span>
                <Suspense
                  fallback={
                    <span
                      className="inline-block h-6 w-6 shrink-0"
                      aria-hidden
                    />
                  }
                >
                  <ExternalLink className="h-6 w-6 shrink-0 text-neutral-500 group-hover:text-white" />
                </Suspense>
              </span>
              <span className="block min-w-0 pl-9 text-caption text-neutral-400 group-hover:text-neutral-300">
                {GOOGLE_BUSINESS.production.address}
              </span>
            </a>
          </div>

          {/* Primary nav + stock/legal — col 2 spans rows 2–3 on lg; nav sits lower via justify-end */}
          <div className="order-4 flex min-h-0 w-full flex-col gap-14 lg:order-none lg:col-start-2 lg:row-start-2 lg:row-span-2 lg:w-full lg:justify-self-end lg:justify-end">
            <nav
              aria-label="Footer"
              className="w-full lg:ml-auto lg:w-auto lg:max-w-xl lg:text-right"
            >
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-body font-medium tracking-wide md:gap-x-6 md:text-body-lg md:tracking-wider lg:justify-end lg:gap-x-5 lg:text-body">
                {primaryNav.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-white transition-colors hover:text-primary-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex min-h-0 w-full flex-col gap-14 lg:items-end lg:justify-end lg:text-right">
              <div className="flex max-w-2xl flex-wrap items-center gap-x-2 gap-y-2 text-body text-neutral-300 md:text-body-lg lg:justify-end">
                <a
                  href={STOCK_EXCHANGES.dse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {STOCK_EXCHANGES.dse.shortName}
                </a>
                {pipe}
                <a
                  href={STOCK_EXCHANGES.cse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {STOCK_EXCHANGES.cse.shortName}
                </a>
                {pipe}
                <a
                  href={ASSOCIATIONS.bgmea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {ASSOCIATIONS.bgmea.shortName}
                </a>
                {pipe}
                <Link to="/certifications" className="hover:text-white">
                  Certifications
                </Link>
              </div>

              <div className="flex max-w-2xl flex-wrap items-center gap-x-2 gap-y-2 text-caption text-neutral-400 lg:justify-end">
                <Link to="/contact" className="hover:text-neutral-200">
                  Contact Us
                </Link>
                {pipe}
                <Link
                  to="/company/governance"
                  className="hover:text-neutral-200"
                >
                  Governance
                </Link>
                {pipe}
                <Link to="/sustainability" className="hover:text-neutral-200">
                  Sustainability
                </Link>
                {pipe}
                <Link to="/newsroom/stories" className="hover:text-neutral-200">
                  Company Stories
                </Link>
                {pipe}
                <span>© {new Date().getFullYear()} Kattali Textile Ltd.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
