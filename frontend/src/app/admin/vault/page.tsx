'use client';

import { useState } from 'react';
import { AdminPage } from '@/components/admin/AdminPage';
import { useToast } from '@/contexts/ToastContext';
import { adminApi } from '@/lib/admin-api';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';

export default function SecurityVaultPage() {
  const { success, error } = useToast();
  const { user, logout } = useAdminAuth();
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.email || '',
    password: '*************',
    currentPassword: ''
  });

  const handleCopy = () => {
    navigator.clipboard.writeText('PUNJAB-LAPTOP-RESET-2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    success('System recovery key copied to clipboard.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    if (!formData.currentPassword) {
      error('Please enter your current password to update credentials.');
      return;
    }
    
    setIsSaving(true);
    try {
      await adminApi.updateCredentials({
        username: formData.username,
        password: formData.password === '*************' ? undefined : formData.password,
        currentPassword: formData.currentPassword
      });
      success('Your access credentials have been updated. You will be logged out shortly.');
      setFormData(prev => ({ ...prev, currentPassword: '' }));
      setTimeout(() => logout(), 1500);
    } catch (e) {
      error(e instanceof Error ? e.message : 'Failed to update credentials');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminPage title="Security Vault" subtitle="Protect your administrative access and recovery keys.">
      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl">
        
        {/* System Recovery Key Card */}
        <div className="rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-yellow-500/20 p-6 lg:p-8 h-fit">
          <h2 className="font-display font-semibold text-heading-sm text-text-primary mb-2">System Recovery Key</h2>
          <p className="text-body-sm text-text-muted mb-6">
            Keep this key safe. Use it if you ever lose your login credentials.
          </p>

          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
            <span className="font-mono text-yellow-500 font-medium tracking-wider">
              PUNJAB-LAPTOP-RESET-2026
            </span>
            <button 
              onClick={handleCopy}
              className="p-2 text-yellow-500/70 hover:text-yellow-500 transition-colors bg-yellow-500/10 rounded-lg"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Change Access Credentials Card */}
        <div className="rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-white/10 p-6 lg:p-8">
          <h2 className="font-display font-semibold text-heading-sm text-text-primary mb-6">Change Access Credentials</h2>
          
          <div className="space-y-6">
            {/* New Username */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
                NEW USERNAME
              </label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Current Password */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-red-400">
                CURRENT PASSWORD (TO CONFIRM)
              </label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Verification required"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Update Button */}
            <div className="pt-2 text-center">
              <button 
                onClick={handleUpdate}
                disabled={isSaving}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isSaving ? (
                  <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Update Credentials'
                )}
              </button>
              <p className="text-[11px] text-text-muted mt-3">
                <span className="inline-block w-3 h-3 rounded-full border border-text-muted flex items-center justify-center mr-1 pb-[1px] text-[8px] font-bold">i</span>
                You will be logged out after updating.
              </p>
            </div>

          </div>
        </div>
      </div>
    </AdminPage>
  );
}
