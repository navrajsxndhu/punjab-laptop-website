'use client';

import { AdminHeader } from './AdminHeader';
import { useAdminMenu } from './AdminShell';

interface AdminPageProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function AdminPage({ title, subtitle, actions, children, fullWidth }: AdminPageProps) {
  const openMenu = useAdminMenu();

  return (
    <>
      <AdminHeader title={title} subtitle={subtitle} actions={actions} onMenuClick={openMenu} />
      <div className={fullWidth ? 'p-4 lg:p-8' : 'p-4 lg:p-8 max-w-[1400px]'}>{children}</div>
    </>
  );
}
