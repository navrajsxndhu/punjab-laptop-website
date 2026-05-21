import { BUSINESS, SEO } from './constants';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://punjablaptopsirsa.com').replace(/\/$/, '');

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

export function canonical(path: string = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function pageTitle(title?: string): string {
  if (!title) return SEO.defaultTitle;
  return SEO.titleTemplate.replace('%s', title);
}

export const FAQ_ITEMS = [
  {
    question: 'Where is Punjab Laptop Sirsa located?',
    answer: `${BUSINESS.officialName} is at ${BUSINESS.address}, near ${BUSINESS.landmark}.`,
  },
  {
    question: 'Do you sell gaming laptops in Sirsa?',
    answer: 'Yes. We stock gaming laptops from HP, ASUS, MSI, and more with dedicated GPUs and warranty support.',
  },
  {
    question: 'Are refurbished laptops available with warranty?',
    answer: 'Yes. All refurbished laptops are tested and include minimum 6 months warranty with genuine software.',
  },
  {
    question: 'What is the best budget laptop for students in Sirsa?',
    answer: 'Popular student picks include Dell Inspiron, HP 14s, and Lenovo IdeaPad — visit our store for hands-on demos.',
  },
  {
    question: 'How can I buy a laptop on WhatsApp?',
    answer: `Message us on WhatsApp at +91 ${BUSINESS.phone}. We share specs, price, and product links instantly.`,
  },
] as const;

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    alternateName: BUSINESS.officialName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: `+${BUSINESS.whatsapp}`,
    email: BUSINESS.email,
    image: DEFAULT_OG_IMAGE,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shop No. 52, New M.C. Market',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.5341,
      longitude: 75.026,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.rating,
      reviewCount: '200',
      bestRating: '5',
    },
    sameAs: [BUSINESS.instagram, BUSINESS.youtube],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    ],
  };
}

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function buildProductSchema(product: {
  name: string;
  slug: string;
  description?: string;
  images?: string[];
  price: number;
  sale_price?: number | null;
  in_stock: boolean;
  brand?: { name: string };
  condition?: string;
}) {
  const price = product.sale_price || product.price;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    brand: product.brand ? { '@type': 'Brand', name: product.brand.name } : undefined,
    offers: {
      '@type': 'Offer',
      url: canonical(`/products/${product.slug}`),
      priceCurrency: 'INR',
      price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: `https://schema.org/${product.condition === 'new' ? 'NewCondition' : 'UsedCondition'}`,
      seller: { '@type': 'Organization', name: BUSINESS.name },
    },
  };
}
