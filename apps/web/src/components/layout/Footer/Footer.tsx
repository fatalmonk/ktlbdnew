import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';
import {
  COMPANY_EMAIL,
  GOOGLE_BUSINESS,
  SOCIAL_MEDIA,
  STOCK_EXCHANGES,
  ASSOCIATIONS,
} from '../../../lib/constants';
import { NAVIGATION_ITEMS } from '../../../modules/navigation/data/navigation';

const Linkedin = createLazyIcon('Linkedin');
const Facebook = createLazyIcon('Facebook');
const Instagram = createLazyIcon('Instagram');
const Mail = createLazyIcon('Mail');
const MapPin = createLazyIcon('MapPin');
const ExternalLink = createLazyIcon('ExternalLink');

const pipe = <span className="text-neutral-500 text-base sm:text-lg" aria-hidden>|</span>;

const Footer = () => {
  const primaryNav = NAVIGATION_ITEMS.map((item) => ({
    name: item.name,
    href: item.href,
  }));

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1920px] px-10 py-28 md:px-16 md:py-36 lg:px-20 lg:py-44 xl:px-24 xl:py-52">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-24 lg:gap-x-28">
          {/* Left: logo, socials, Google Business locator links */}
          <div className="flex flex-col items-start gap-12 text-left md:gap-14">
            <Link
              to="/"
              className="font-heading block text-6xl font-semibold tracking-tight text-[#6d8eb8] lowercase md:text-7xl lg:text-8xl"
            >
              kattali textile limited
            </Link>

            <div className="flex flex-wrap items-center gap-5">
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

            <div className="flex w-full max-w-2xl flex-col gap-6 border-t border-white/10 pt-12">
              <p className="text-overline font-medium text-neutral-400">Google Business</p>
              <a
                href={GOOGLE_BUSINESS.headOffice.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-3 text-body text-neutral-200 transition-colors hover:text-white"
              >
                <Suspense fallback={<span className="mt-0.5 h-6 w-6 shrink-0" />}>
                  <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary-400" strokeWidth={2} />
                </Suspense>
                <span className="min-w-0 flex-1">
                  <span className="block text-h4 font-medium text-white">Head Office</span>
                  <span className="mt-1 block text-caption text-neutral-400 group-hover:text-neutral-300">
                    {GOOGLE_BUSINESS.headOffice.address}
                  </span>
                </span>
                <Suspense fallback={<span className="h-6 w-6 shrink-0" />}>
                  <ExternalLink className="mt-1 h-6 w-6 shrink-0 text-neutral-500 group-hover:text-white" />
                </Suspense>
              </a>
              <a
                href={GOOGLE_BUSINESS.production.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-3 text-body text-neutral-200 transition-colors hover:text-white"
              >
                <Suspense fallback={<span className="mt-0.5 h-6 w-6 shrink-0" />}>
                  <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary-400" strokeWidth={2} />
                </Suspense>
                <span className="min-w-0 flex-1">
                  <span className="block text-h4 font-medium text-white">Production facility</span>
                  <span className="mt-1 block text-caption text-neutral-400 group-hover:text-neutral-300">
                    {GOOGLE_BUSINESS.production.address}
                  </span>
                </span>
                <Suspense fallback={<span className="h-6 w-6 shrink-0" />}>
                  <ExternalLink className="mt-1 h-6 w-6 shrink-0 text-neutral-500 group-hover:text-white" />
                </Suspense>
              </a>
            </div>
          </div>

          {/* Right: nav + meta rows */}
          <div className="flex flex-col items-start gap-14 text-left lg:items-end lg:text-right">
            <nav aria-label="Footer" className="w-full lg:w-auto">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body font-medium md:gap-x-8 md:text-body-lg lg:justify-end lg:text-h4">
                {primaryNav.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-white transition-colors hover:text-primary-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

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
              <a href={ASSOCIATIONS.bgmea.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
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
              <Link to="/company/governance" className="hover:text-neutral-200">
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
    </footer>
  );
};

export default Footer;
