import React, { useState } from 'react';
import { FAQ } from '@/data/menu';

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#cda03933] py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-base sm:text-lg text-[#f5efe4]">{item.q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 12 12"
          className={`shrink-0 text-[#e9c874] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2 4.5 L6 8.5 L10 4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      </button>
      {open && <p className="mt-3 text-sm sm:text-base text-[#f5efe4]/70 leading-relaxed">{item.a}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="bg-[#0d0b09] py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">FAQ</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4]">Good to Know</h2>
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
