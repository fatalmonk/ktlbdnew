import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Facebook, ExternalLink, Shirt } from 'lucide-react';
import {
  COMPANY_PHONE,
  COMPANY_EMAIL,
  SOCIAL_MEDIA,
  STOCK_EXCHANGES,
  ASSOCIATIONS,
  GOOGLE_BUSINESS
} from '../lib/constants';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-footer text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Kattali Textile Ltd</h3>
                <p className="text-sm text-gray-300">Since 2002</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bangladesh's leading eco-friendly textile exporter with over 20 years of experience in
              manufacturing premium woven and knit garments for global markets.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">
                  BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad, Chittagong, Bangladesh
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_PHONE}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_EMAIL}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h5 className="font-heading font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href={SOCIAL_MEDIA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_MEDIA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Certifications & Associations */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Certifications</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Sedex Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Green Factory Initiative</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <a
                  href={ASSOCIATIONS.bgmea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                >
                  {ASSOCIATIONS.bgmea.shortName} Member #{ASSOCIATIONS.bgmea.memberNumber}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-heading font-semibold mb-3">Stock Exchange</h5>
              <div className="space-y-2 text-sm">
                <a
                  href={STOCK_EXCHANGES.dse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  {STOCK_EXCHANGES.dse.shortName}
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={STOCK_EXCHANGES.cse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  {STOCK_EXCHANGES.cse.shortName}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-heading font-semibold mb-3">Our Locations</h5>
              <div className="space-y-2 text-sm">
                <a
                  href={GOOGLE_BUSINESS.headOffice.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  Head Office
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={GOOGLE_BUSINESS.production.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                >
                  Production Facility
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">© 2025 Kattali Textile Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
