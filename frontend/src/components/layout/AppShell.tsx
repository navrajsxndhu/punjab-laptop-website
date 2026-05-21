'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';
import { ApiStatusBanner } from '@/components/common/ApiStatusBanner';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ApiStatusBanner />
      <Header />
      <main id="main-content" className="flex-1 scroll-smooth" role="main">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
