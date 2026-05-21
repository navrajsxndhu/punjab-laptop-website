import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { SkipLink } from '@/components/common/SkipLink';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { BUSINESS, SEO } from '@/lib/constants';
import { buildLocalBusinessSchema, buildFaqSchema, DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.defaultDescription,
  keywords: [...SEO.keywords],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: '/',
    siteName: SEO.openGraph.siteName,
    locale: SEO.openGraph.locale,
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: BUSINESS.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  alternates: {
    canonical: '/',
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Sirsa',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <JsonLd data={[buildLocalBusinessSchema(), buildFaqSchema()]} />
      </head>
      <body className="min-h-screen flex flex-col">
        <SkipLink />
        <AnalyticsProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
