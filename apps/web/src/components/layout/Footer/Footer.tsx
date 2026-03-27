import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';
import {
  COMPANY_PHONE,
  COMPANY_EMAIL,
  SOCIAL_MEDIA,
  STOCK_EXCHANGES,
  ASSOCIATIONS,
  GOOGLE_BUSINESS
} from '../../../lib/constants';

const MapPin = createLazyIcon('MapPin');
const Phone = createLazyIcon('Phone');
const Mail = createLazyIcon('Mail');
const Linkedin = createLazyIcon('Linkedin');
const Facebook = createLazyIcon('Facebook');
const ExternalLink = createLazyIcon('ExternalLink');
const Shirt = createLazyIcon('Shirt');

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-black text-neutral-50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Suspense fallback={<div className="w-6 h-6" />}>
                  <Shirt className="w-6 h-6 text-white" />
                </Suspense>
              </div>
              <div>
                <h3 className="font-heading font-bold text-body-lg">Kattali Textile Ltd</h3>
                <p className="text-caption text-neutral-300">Since 2002</p>
              </div>
            </div>

            <p className="text-body text-neutral-300 mb-6 leading-relaxed">
              Bangladesh's leading eco-friendly textile exporter with over 20 years of experience in
              manufacturing premium woven and knit garments for global markets.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Suspense fallback={<div className="w-5 h-5 mt-0.5 flex-shrink-0" />}>
                  <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                </Suspense>
                <span className="text-caption text-neutral-300">
                  BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad, Chittagong, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Phone className="w-5 h-5 text-primary-500" />
                </Suspense>
                <span className="text-caption text-neutral-300">{COMPANY_PHONE}</span>
              </div>

              <div className="flex items-center gap-3">
                <Suspense fallback={<div className="w-5 h-5" />}>
                  <Mail className="w-5 h-5 text-primary-500" />
                </Suspense>
                <span className="text-caption text-neutral-300 break-all">{COMPANY_EMAIL}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-body-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-caption text-neutral-300 hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h5 className="font-heading font-semibold text-body mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_MEDIA.linkedin}
                  className="text-neutral-300 hover:text-primary-500 transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Suspense fallback={<div className="w-5 h-5" />}>
                    <Linkedin className="w-5 h-5" />
                  </Suspense>
                </a>
                <a
                  href={SOCIAL_MEDIA.facebook}
                  className="text-neutral-300 hover:text-primary-500 transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Suspense fallback={<div className="w-5 h-5" />}>
                    <Facebook className="w-5 h-5" />
                  </Suspense>
                </a>
              </div>
            </div>
          </div>

          {/* Certifications & Associations */}
          <div>
            <h4 className="font-heading font-semibold text-body-lg mb-4">Certifications</h4>

            <div className="space-y-2 text-caption text-neutral-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Sedex Certified</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Green Factory Initiative</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <a
                  href={ASSOCIATIONS.bgmea.url}
                  className="hover:text-primary-500 inline-flex items-center gap-1"
                >
                  {ASSOCIATIONS.bgmea.shortName} Member #{ASSOCIATIONS.bgmea.memberNumber}
                  <Suspense fallback={<div className="w-3 h-3" />}>
                    <ExternalLink className="w-3 h-3" />
                  </Suspense>
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-heading font-semibold text-body mb-3">Stock Exchange</h5>
              <div className="space-y-2 text-caption">
                <a
                  href={STOCK_EXCHANGES.dse.url}
                  className="text-neutral-300 hover:text-primary-500 flex items-center gap-2"
                >
                  {STOCK_EXCHANGES.dse.shortName}
                  <Suspense fallback={<div className="w-3 h-3" />}>
                    <ExternalLink className="w-3 h-3" />
                  </Suspense>
                </a>

                <a
                  href={STOCK_EXCHANGES.cse.url}
                  className="text-neutral-300 hover:text-primary-500 flex items-center gap-2"
                >
                  {STOCK_EXCHANGES.cse.shortName}
                  <Suspense fallback={<div className="w-3 h-3" />}>
                    <ExternalLink className="w-3 h-3" />
                  </Suspense>
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-heading font-semibold text-body mb-3">Our Locations</h5>
              <div className="space-y-2 text-caption">
                <a
                  href={GOOGLE_BUSINESS.headOffice.profileUrl}
                  className="text-neutral-300 hover:text-primary-500 flex items-center gap-2"
                >
                  Head Office
                  <Suspense fallback={<div className="w-3 h-3" />}>
                    <ExternalLink className="w-3 h-3" />
                  </Suspense>
                </a>

                <a
                  href={GOOGLE_BUSINESS.production.profileUrl}
                  className="text-neutral-300 hover:text-primary-500 flex items-center gap-2"
                >
                  Production Facility
                  <Suspense fallback={<div className="w-3 h-3" />}>
                    <ExternalLink className="w-3 h-3" />
                  </Suspense>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center">
          <p className="text-caption text-neutral-400">
            © 2025 Kattali Textile Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;