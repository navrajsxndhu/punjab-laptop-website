'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OfferCountdownProps {
  endDate: string;
}

function getTimeLeft(end: number) {
  const diff = Math.max(0, end - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, expired: diff <= 0 };
}

export function OfferCountdown({ endDate }: OfferCountdownProps) {
  const end = new Date(endDate).getTime();
  const [time, setTime] = useState(() => getTimeLeft(end));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  if (time.expired) {
    return (
      <span className="text-caption text-white/60 font-medium">Ending soon</span>
    );
  }

  const units = [
    { label: 'D', value: time.days },
    { label: 'H', value: time.hours },
    { label: 'M', value: time.minutes },
    { label: 'S', value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-1">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          className="flex flex-col items-center min-w-[32px] glass rounded-lg px-1.5 py-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <span className="text-[13px] font-bold text-white tabular-nums leading-none">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-white/60 font-medium">{u.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
