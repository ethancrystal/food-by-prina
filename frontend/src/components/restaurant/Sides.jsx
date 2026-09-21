import React from 'react';
import { SIDES } from '@/data/menu';

export default function Sides() {
  return (
    <section id="sides" className="bg-[#141009] py-20 sm:py-28 border-y border-[#cda03920]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">Choose 2</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4]">Sides</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SIDES.map((s) => (
            <div key={s.name} className="text-center">
              <div className="aspect-square rounded-full overflow-hidden border border-[#cda03955] mx-auto mb-4 w-32 sm:w-40">
                <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-base sm:text-lg text-[#f5efe4]">{s.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
