'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));

  const add = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => dismiss(id), 4000);
  }, []);

  const value: ToastContextValue = {
    toast: add,
    success: (m) => add(m, 'success'),
    error: (m) => add(m, 'error'),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="pointer-events-auto flex items-center gap-3 min-w-[280px] max-w-sm px-4 py-3 rounded-xl bg-white/90 backdrop-blur-xl shadow-large border border-gray-100"
            >
              {t.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-whatsapp shrink-0" />
              ) : t.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-accent shrink-0" />
              )}
              <span className="text-body-sm text-text-primary flex-1">{t.message}</span>
              <button type="button" onClick={() => dismiss(t.id)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-3.5 h-3.5 text-text-muted" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
