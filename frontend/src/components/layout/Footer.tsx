import Link from 'next/link';
import { Laptop, MapPin, Phone, Clock, Instagram, ArrowUpRight, Github, Mail, MessageCircle } from 'lucide-react';
import { BUSINESS, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top divider gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main footer */}
      <div className="container-wide relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-16 lg:py-20">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-[15px] block leading-tight">
                  Punjab Laptop
                </span>
                <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-white/50">
                  Sirsa
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-body-sm leading-relaxed mb-6 max-w-xs">
              Your trusted destination for premium laptops in Sirsa. All major brands, best prices, warranty on every purchase.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:+${BUSINESS.whatsapp}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-body-sm"
              >
                <Phone className="w-4 h-4 text-whatsapp" />
                +91 {BUSINESS.phone}
              </a>
              <div className="flex items-start gap-3 text-white/70 text-body-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-400 shrink-0" />
                <span>{BUSINESS.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-body-sm">
                <Clock className="w-4 h-4 text-deals" />
                {BUSINESS.businessHours.weekdays}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-[13px] uppercase tracking-wider text-white/40 mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-body-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-display font-semibold text-[13px] uppercase tracking-wider text-white/40 mb-5">
              Brands
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.brands.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-body-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Social */}
          <div>
            <h3 className="font-display font-semibold text-[13px] uppercase tracking-wider text-white/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-body-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <h3 className="font-display font-semibold text-[13px] uppercase tracking-wider text-white/40 mb-4">
              Follow Us
            </h3>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-body-sm group"
            >
              <Instagram className="w-4 h-4" />
              {BUSINESS.instagramHandle}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            <p className="text-white/40 text-caption mt-2">
              {BUSINESS.instagramFollowers} followers
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 pb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-body-sm">
            © {currentYear} {BUSINESS.name}. All rights reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <div className="flex items-center gap-3 text-white/50 text-[13px] font-medium tracking-wide">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-6 h-6 bg-accent/40 rounded-full blur-[8px] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-accent relative z-10" />
              </div>
              <span>Designed & Engineered by</span>
              <a 
                href="https://github.com/navrajsxndhu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-accent hover:text-white transition-colors ml-1"
              >
                Navraj Sandhu
              </a>
            </div>

            <div className="flex items-center gap-5 text-white/40 pr-0 lg:pr-16">
              <a href="https://github.com/navrajsxndhu" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href={`tel:+${BUSINESS.phone}`} className="hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
