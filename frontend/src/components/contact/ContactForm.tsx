'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  general?: string;
}

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) next.name = 'Name must be at least 2 characters';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (phone.trim() && !/^[+]?[\d\s-]{10,15}$/.test(phone.replace(/\s/g, ''))) {
      next.phone = 'Enter a valid phone number';
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      await api.post('/api/contact', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Something went wrong. Please try WhatsApp instead.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mb-6 flex items-center gap-3 p-4 rounded-card bg-whatsapp/10 border border-whatsapp/20 text-whatsapp-dark"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-medium text-body-sm">Message sent successfully!</p>
              <p className="text-caption text-whatsapp-dark/80">We&apos;ll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {errors.general && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex items-center gap-3 p-4 rounded-card bg-red-50 border border-red-100 text-red-600"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-body-sm">{errors.general}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="Full Name" error={errors.name}>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn('input-field', errors.name && 'border-red-300 focus:border-red-400 focus:ring-red-100')}
            placeholder="Your name"
            disabled={loading}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Email" error={errors.email}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn('input-field', errors.email && 'border-red-300 focus:border-red-400 focus:ring-red-100')}
              placeholder="you@email.com"
              disabled={loading}
            />
          </Field>
          <Field label="Phone (optional)" error={errors.phone}>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn('input-field', errors.phone && 'border-red-300 focus:border-red-400 focus:ring-red-100')}
              placeholder="+91 9991020143"
              disabled={loading}
            />
          </Field>
        </div>

        <Field label="Message" error={errors.message}>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cn(
              'input-field resize-none',
              errors.message && 'border-red-300 focus:border-red-400 focus:ring-red-100'
            )}
            placeholder="Tell us what laptop you're looking for..."
            disabled={loading}
          />
        </Field>

        <motion.button
          type="submit"
          disabled={loading}
          className="btn-primary w-full sm:w-auto min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={loading ? {} : { scale: 1.02 }}
          whileTap={loading ? {} : { scale: 0.97 }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-body-sm font-medium text-text-primary mb-2">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-caption text-red-500 mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
