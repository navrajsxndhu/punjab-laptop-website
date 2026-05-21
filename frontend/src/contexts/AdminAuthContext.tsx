'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { adminApi } from '@/lib/admin-api';
import { TOKEN_KEY, USER_KEY } from '@/lib/api';
import type { AdminUser } from '@/types';

interface AdminAuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  recover: (recoveryKey: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const hydrate = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const stored = localStorage.getItem(USER_KEY);
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AdminUser);
        setLoading(false); // Instantly stop loading if we have cached user
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    try {
      const res = await adminApi.verify();
      setUser(res.data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      try {
        const res = await adminApi.refreshToken();
        localStorage.setItem(TOKEN_KEY, res.data.token);
      } catch {
        /* token expired — auth guard will redirect */
      }
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (loading) return;
    const isLogin = pathname === '/admin/login';
    if (!user && !isLogin && pathname?.startsWith('/admin')) {
      router.replace('/admin/login');
    }
    if (user && isLogin) {
      router.replace('/admin');
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    const res = await adminApi.login(email, password);
    if (!res?.data?.token || !res?.data?.user) {
      throw new Error('Invalid response from server. Please try again.');
    }
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    setUser(res.data.user);
    router.replace('/admin');
  };

  const recover = async (recoveryKey: string) => {
    const res = await adminApi.recover(recoveryKey);
    if (!res?.data?.token || !res?.data?.user) {
      throw new Error('Invalid response from server. Please try again.');
    }
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    setUser(res.data.user);
    router.replace('/admin');
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    router.replace('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        login,
        recover,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
