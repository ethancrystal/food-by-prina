import React from 'react';
import { useOrder } from '@/context/OrderContext';

export default function ModeToggle({ className = '' }) {
  const { mode, setMode } = useOrder();
  return (
    <div
      role="radiogroup"
      aria-label="Pickup or delivery"
      className={`inline-flex rounded-full border border-pk-gold/40 p-1 bg-pk-bg ${className}`}
    >
      {['pickup', 'delivery'].map((m) => (
        <button
          key={m}
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          data-testid={`mode-${m}`}
          className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
            mode === m ? 'bg-pk-red border border-pk-gold text-white' : 'border border-transparent text-pk-ink/75 hover:text-pk-red-text'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
