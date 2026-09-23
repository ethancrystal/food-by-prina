import React, { useState } from 'react';
import { FAQ } from '@/data/menu';

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-pk-gold/20 py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-base sm:text-lg text-pk-ink">{item.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 12 12"
          className={`shrink-0 text-pk-red-text transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4.5 L6 8.5 L10 4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>
      {open && <p className="mt-3 text-sm sm:text-base text-pk-ink/70 leading-relaxed">{item.a}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="scroll-mt-24 bg-pk-bg py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-pk-ink">Frequently asked questions</h2>
        </div>
        <div>
          {FAQ.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
