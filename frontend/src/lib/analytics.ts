type EventName =
  | 'whatsapp_click'
  | 'product_view'
  | 'product_inquiry'
  | 'contact_submit'
  | 'page_view'
  | 'select_item';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', name, params);

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', name, params);
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
