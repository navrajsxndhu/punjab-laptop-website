'use client';

import { useState } from 'react';
import { AdminPage } from '@/components/admin/AdminPage';
import { useToast } from '@/contexts/ToastContext';
import { BUSINESS } from '@/lib/constants';

export default function SystemConfigPage() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Initializing state with existing constants as a baseline
  const [formData, setFormData] = useState({
    phone: BUSINESS.phone.join(', '),
    whatsapp: BUSINESS.whatsapp.replace('+', ''),
    email: BUSINESS.email,
    address: BUSINESS.address,
    instagram: BUSINESS.instagram,
    youtube: 'https://youtube.com/@shipramiglani_?si=L1jy2Nm3yGlelltU',
    facebook: 'https://facebook.com/webcomsirsa',
    channel: 'https://whatsapp.com/channel/0029Va9X7Y5B4hdR8X9Z9V0M'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call to save settings
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    showToast('success', 'Settings Saved', 'System configurations have been updated successfully.');
  };

  return (
    <AdminPage title="System Config" subtitle="Manage contact info and global configurations.">
      <div className="max-w-5xl rounded-[20px] bg-surface/50 backdrop-blur-md shadow-soft border border-white/10 p-6 lg:p-10">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          
          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Phone Number
            </label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              WhatsApp Number (No +)
            </label>
            <input 
              type="text" 
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Email Address
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Physical Address
            </label>
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Instagram */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Instagram Link
            </label>
            <input 
              type="text" 
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* YouTube */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              YouTube Link
            </label>
            <input 
              type="text" 
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Facebook */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Facebook Link
            </label>
            <input 
              type="text" 
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          {/* Channel */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-text-muted">
              Channel Link (WhatsApp/Telegram)
            </label>
            <input 
              type="text" 
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

        </div>

        <div className="mt-8">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-accent hover:bg-accent-600 text-white font-medium py-2.5 px-6 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center min-w-[140px]"
          >
            {isSaving ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </div>
    </AdminPage>
  );
}
