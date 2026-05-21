// ============================================================
// Constants — Business details, WhatsApp, navigation
// ============================================================

export const BUSINESS = {
  name: 'Punjab Laptop Sirsa',
  officialName: 'Punjab Laptop Solution',
  tagline: 'Premium Laptops, Unbeatable Prices',
  description: 'Sirsa\'s most trusted laptop destination. New & refurbished laptops from HP, Dell, Lenovo, and Apple — wholesale & retail. Expert repair services, genuine spare parts, and the best prices in Haryana. Rated 4.7★ on JustDial with 200+ reviews.',
  phone: '9991020143',
  whatsapp: '919991020143',
  email: 'punjablaptopsirsa@gmail.com',
  address: 'Shop No. 52, New M.C. Market, Circular Road, Agrasain Colony, Sirsa, Haryana 125055',
  landmark: 'Near Chawla Restaurant',
  city: 'Sirsa',
  state: 'Haryana',
  pincode: '125055',
  instagram: 'https://www.instagram.com/punjab_laptop_sirsa/',
  instagramHandle: '@punjab_laptop_sirsa',
  instagramFollowers: '47K+',
  youtube: 'https://www.youtube.com/@punjablaptopsolution',
  dukaanStore: 'https://punjablaptopsolution.mydukaan.io',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.0!2d75.02!3d29.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sShop+No+52+New+MC+Market+Sirsa!5e0!3m2!1sen!2sin!4v1',
  rating: '4.7',
  reviewCount: '200+',
  businessHours: {
    weekdays: '9:30 AM – 7:00 PM',
    saturday: '9:30 AM – 7:00 PM',
    sunday: 'Closed',
  },
  paymentMethods: ['Cash', 'UPI', 'Paytm', 'PhonePe', 'Amazon Pay', 'JioMoney'],
  services: [
    'New Laptop Sales',
    'Refurbished Laptops',
    'Gaming Laptops',
    'Laptop Repair & Service',
    'Spare Parts & Accessories',
    'Wholesale & Retail',
  ],
} as const;

export const WHATSAPP_BASE_URL = `https://wa.me/${BUSINESS.whatsapp}`;

export function getWhatsAppUrl(productName?: string, processor?: string, ram?: string, price?: number, pageUrl?: string): string {
  if (!productName) {
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent('Hello Punjab Laptop Sirsa, I would like to know about your laptops.')}`;
  }
  const parts = [
    `Hello Punjab Laptop Sirsa, I am interested in:`,
    productName,
    processor && `Processor: ${processor}`,
    ram && `RAM: ${ram}`,
    price && `Price: ₹${price.toLocaleString('en-IN')}`,
    pageUrl && `Link: ${pageUrl}`,
  ].filter(Boolean);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(parts.join(' | '))}`;
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Offers', href: '/offers' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: 'Gaming Laptops', href: '/products?category=gaming' },
    { label: 'Office Laptops', href: '/products?category=office' },
    { label: 'Student Laptops', href: '/products?category=student' },
    { label: 'Ultrabooks', href: '/products?category=ultrabooks' },
    { label: 'Refurbished', href: '/products?category=refurbished' },
  ],
  brands: [
    { label: 'Dell', href: '/products?brand=dell' },
    { label: 'HP', href: '/products?brand=hp' },
    { label: 'Lenovo', href: '/products?brand=lenovo' },
    { label: 'ASUS', href: '/products?brand=asus' },
    { label: 'Apple', href: '/products?brand=apple' },
    { label: 'Acer', href: '/products?brand=acer' },
    { label: 'MSI', href: '/products?brand=msi' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Offers & Deals', href: '/offers' },
    { label: 'License', href: '/license' },
  ],
} as const;

export const SEO = {
  defaultTitle: 'Punjab Laptop Sirsa — Premium Laptops at Best Prices in Sirsa',
  titleTemplate: '%s | Punjab Laptop Sirsa',
  defaultDescription: 'Punjab Laptop Sirsa — Your trusted laptop shop in Sirsa, Haryana. New and refurbished laptops from Dell, HP, Lenovo, ASUS, Apple, Acer, MSI. Best prices, warranty included. Visit Shop No. 52, New M.C. Market.',
  keywords: [
    'laptop shop Sirsa',
    'Punjab Laptop Sirsa',
    'best laptops in Sirsa',
    'gaming laptops Sirsa',
    'student laptops Sirsa',
    'refurbished laptops Sirsa',
    'Dell laptops Sirsa',
    'HP laptops Sirsa',
    'laptop dealer Sirsa Haryana',
    'buy laptop Sirsa',
    'laptop repair Sirsa',
    'used laptops Sirsa',
    'MacBook Sirsa',
    'gaming laptop under 50000 Sirsa',
  ],
  openGraph: {
    siteName: 'Punjab Laptop Sirsa',
    locale: 'en_IN',
    type: 'website',
  },
} as const;

export const PRICE_RANGES = [
  { label: 'Under ₹20,000', min: 0, max: 20000 },
  { label: '₹20,000 – ₹40,000', min: 20000, max: 40000 },
  { label: '₹40,000 – ₹60,000', min: 40000, max: 60000 },
  { label: '₹60,000 – ₹80,000', min: 60000, max: 80000 },
  { label: 'Above ₹80,000', min: 80000, max: 999999 },
] as const;

export const PROCESSOR_OPTIONS = [
  'Intel Core i3',
  'Intel Core i5',
  'Intel Core i7',
  'Intel Core i9',
  'AMD Ryzen 3',
  'AMD Ryzen 5',
  'AMD Ryzen 7',
  'AMD Ryzen 9',
  'Apple M1',
  'Apple M2',
  'Apple M3',
] as const;

export const RAM_OPTIONS = ['4 GB', '8 GB', '16 GB', '32 GB', '64 GB'] as const;

export const STORAGE_OPTIONS = ['128 GB', '256 GB', '512 GB', '1 TB', '2 TB'] as const;

export const CONDITION_LABELS: Record<string, string> = {
  new: 'Brand New',
  'like-new': 'Like New',
  excellent: 'Excellent',
  good: 'Good',
  refurbished: 'Refurbished',
};
