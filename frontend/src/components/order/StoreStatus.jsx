import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { HOURS } from '@/data/menu';
import { getStoreStatus, formatTime, todayIndex } from '@/lib/hours';
import { panel } from './theme';

export function useStoreStatus() {
  const [status, setStatus] = useState(() => getStoreStatus());
  useEffect(() => {
    const t = setInterval(() => setStatus(getStoreStatus()), 60 * 1000);
    return () => clearInterval(t);
  }, []);
  return status;
}

export function HoursList() {
  const today = todayIndex();
  return (
    <ul className="divide-y divide-[#cda03922]">
      {HOURS.map((h, i) => (
        <li
          key={h.day}
          className={`flex justify-between py-2.5 text-sm ${i === today ? 'text-[#e9c874] font-medium' : 'text-[#f5efe4]/75'}`}
        >
          <span>{h.day}</span>
          <span>{h.open ? `${formatTime(h.open)} – ${formatTime(h.close)}` : 'Closed'}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StoreStatus({ className = '' }) {
  const status = useStoreStatus();
  const [open, setOpen] = useState(false);
  return (
    <>
      <span className={`inline-flex flex-wrap items-center gap-x-1.5 text-sm ${className}`} data-testid="store-status">
        <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className={status.open ? 'text-emerald-300 font-medium' : 'text-red-300 font-medium'}>{status.label}</span>
        <span className="text-[#f5efe4]/55">· {status.detail} ·</span>
        <button onClick={() => setOpen(true)} className="underline underline-offset-2 text-[#f5efe4]/70 hover:text-[#e9c874]">
          view hours
        </button>
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`${panel} max-w-sm rounded-2xl`}>
          <DialogTitle className="font-display text-2xl font-normal">Opening hours</DialogTitle>
          <HoursList />
        </DialogContent>
      </Dialog>
    </>
  );
}
