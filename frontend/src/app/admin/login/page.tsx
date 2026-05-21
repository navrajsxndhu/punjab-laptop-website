'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Laptop, Loader2, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/contexts/ToastContext';
import { BUSINESS } from '@/lib/constants';
import { checkApiHealth, getApiBaseUrl } from '@/lib/api-health';

export default function AdminLoginPage() {
  const { login, loading: authLoading } = useAdminAuth();
  const toast = useToast();
  const [email, setEmail] = useState('admin@punjablaptopsirsa.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    checkApiHealth(true).then((s) => setApiOk(s === 'ok'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-whatsapp/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass-dark rounded-[24px] p-8 lg:p-10 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <Laptop className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-heading-md">Admin CMS</h1>
              <p className="text-caption text-white/50">{BUSINESS.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-caption text-white/60 block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-input bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>
            <div>
              <label className="text-caption text-white/60 block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-input bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                required
              />
            </div>

            {apiOk === false && (
              <div className="flex items-start gap-2 text-body-sm text-amber-300 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  API unreachable at <span className="font-mono text-xs">{getApiBaseUrl()}</span>. Check Render deploy and{' '}
                  <code className="text-xs">NEXT_PUBLIC_API_URL</code> on Vercel.
                </span>
              </div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-body-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign in
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => toast.info('Please contact the superadmin or use your Recovery Key.')}
              className="text-[13px] text-white/50 hover:text-white transition-colors"
            >
              Forgot password?
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Return to main website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
