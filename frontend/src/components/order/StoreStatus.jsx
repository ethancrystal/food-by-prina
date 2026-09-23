import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ALWAYS_OPEN, HOURS } from '@/data/menu';
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
    <ul className="divide-y divide-pk-gold/15">
      {HOURS.map((h, i) => (
        <li
          key={h.day}
          className={`flex justify-between py-2.5 text-sm ${i === today ? 'text-pk-red-text font-medium' : 'text-pk-ink/75'}`}
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
        {status.open ? (
          // Blinking green "live" dot: a pulsing halo behind a solid dot.
          <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-red-400" aria-hidden="true" />
        )}
        <span className={status.open ? 'text-emerald-300 font-medium' : 'text-red-300 font-medium'}>{status.label}</span>
        <span className="text-pk-ink/55">
          · {status.detail}
          {!ALWAYS_OPEN && ' ·'}
        </span>
        {!ALWAYS_OPEN && (
          <button onClick={() => setOpen(true)} className="underline underline-offset-2 text-pk-ink/70 hover:text-pk-red-text">
            view hours
          </button>
        )}
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
