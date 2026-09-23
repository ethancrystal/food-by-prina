import React from 'react';
import { useOrder } from '@/context/OrderContext';

export default function ModeToggle({ className = '' }) {
  const { mode, setMode } = useOrder();
  return (
    <div
      role="radiogroup"
      aria-label="Pickup or delivery"
      className={`inline-flex rounded-full border border-[#cda03966] p-1 bg-[#0d0b09] ${className}`}
    >
      {['pickup', 'delivery'].map((m) => (
        <button
          key={m}
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          data-testid={`mode-${m}`}
          className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
            mode === m ? 'bg-[#cda039] text-[#0d0b09]' : 'text-[#f5efe4]/75 hover:text-[#e9c874]'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
