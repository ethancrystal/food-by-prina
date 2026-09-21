import React from 'react';
import { GALLERY } from '@/data/menu';

export default function Gallery() {
  return (
    <section className="bg-[#141009] py-20 sm:py-28 border-y border-[#cda03920]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">Gallery</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4]">Fresh, Every Plate</h2>
        </div>

        <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
          {GALLERY.map((src, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden border border-[#cda03933]">
              <img src={src} alt="" loading="lazy" className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
