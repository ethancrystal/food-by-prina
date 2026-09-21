import React from 'react';
import { BRAND } from '@/data/menu';

export default function About() {
  return (
    <section className="bg-[#0d0b09] py-20 sm:py-28 border-t border-[#cda03920]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">Welcome</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#f5efe4] mb-6">
          Cooking from the heart, one platter at a time
        </h2>
        <p className="text-[#f5efe4]/75 text-base sm:text-lg leading-relaxed">
          At {BRAND.name}, every plate is made fresh to order — big, hearty meats seasoned right,
          paired with soulful sides and yellow rice. No shortcuts, no filler. Just home cooking
          done with care, packed up and ready for your table.
        </p>
      </div>
    </section>
  );
}
