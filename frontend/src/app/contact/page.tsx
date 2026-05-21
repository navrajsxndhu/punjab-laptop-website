import type { Metadata } from 'next';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { GoogleMap } from '@/components/common/GoogleMap';
import { ContactForm } from '@/components/contact/ContactForm';
import { BUSINESS, getWhatsAppUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact Punjab Laptop Sirsa — ${BUSINESS.address}. Call +91 ${BUSINESS.phone} or WhatsApp for instant laptop inquiries.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        overline="Contact"
        title="We're Here to Help"
        description="Questions about a laptop, repair, or pricing? Send a message or chat with us instantly on WhatsApp."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-premium p-6 lg:p-10 border border-white/10">
                <h2 className="font-display text-heading-lg text-text-primary mb-2">Send a Message</h2>
                <p className="text-body-md text-text-muted mb-8">
                  We typically respond within a few hours during business hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <ContactInfoCard
                icon={MessageCircle}
                title="WhatsApp (Fastest)"
                highlight
              >
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center mt-3"
                >
                  Chat Now — +91 {BUSINESS.phone}
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={Phone} title="Phone">
                <a href={`tel:+${BUSINESS.whatsapp}`} className="text-body-lg font-medium text-accent hover:underline">
                  +91 {BUSINESS.phone}
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={Mail} title="Email">
                <a href={`mailto:${BUSINESS.email}`} className="text-body-md text-text-primary hover:text-accent transition-colors">
                  {BUSINESS.email}
                </a>
              </ContactInfoCard>

              <ContactInfoCard icon={MapPin} title="Address">
                <p className="text-body-md text-text-muted leading-relaxed">{BUSINESS.address}</p>
                <p className="text-caption text-text-muted mt-1">{BUSINESS.landmark}</p>
              </ContactInfoCard>

              <ContactInfoCard icon={Clock} title="Business Hours">
                <ul className="space-y-2 text-body-md text-text-muted">
                  <li className="flex justify-between gap-4">
                    <span>Mon – Sat</span>
                    <span className="font-medium text-text-primary">{BUSINESS.businessHours.weekdays}</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Sunday</span>
                    <span className="font-medium text-deals">{BUSINESS.businessHours.sunday}</span>
                  </li>
                </ul>
              </ContactInfoCard>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm pb-20 bg-background">
        <div className="container-wide">
          <GoogleMap title="Visit Our Store" />
        </div>
      </section>
    </>
  );
}

function ContactInfoCard({
  icon: Icon,
  title,
  children,
  highlight = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card-premium p-6 transition-all duration-300 ${
        highlight ? 'bg-gradient-to-br from-whatsapp/10 to-transparent border border-whatsapp/20' : 'border border-white/10'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-whatsapp/10' : 'bg-accent/10'}`}>
          <Icon className={`w-5 h-5 ${highlight ? 'text-whatsapp' : 'text-accent'}`} />
        </div>
        <h3 className="font-display font-semibold text-heading-sm text-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}
