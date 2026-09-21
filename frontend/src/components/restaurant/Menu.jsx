import React from 'react';
import { MEATS, MEATS_NOTE, SEAFOOD_PAN, BRAND } from '@/data/menu';

function MeatCard({ item }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-[#cda03933] bg-[#151109]">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg sm:text-xl text-[#f5efe4]">{item.name}</h3>
          {item.note && <p className="text-xs sm:text-sm text-[#f5efe4]/55 mt-1">{item.note}</p>}
        </div>
        <span className="font-display text-lg sm:text-xl text-[#e9c874] whitespace-nowrap">
          ${item.price}
        </span>
      </div>
    </div>
  );
}

export default function Menu() {
  return (
    <section id="menu" className="bg-[#0d0b09] py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">Meats</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4] mb-4">The Menu</h2>
          <p className="text-[#f5efe4]/65 max-w-xl mx-auto">{MEATS_NOTE}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {MEATS.map((item) => (
            <MeatCard key={item.name} item={item} />
          ))}
        </div>

        {/* Seafood Pan feature */}
        <div className="relative rounded-3xl overflow-hidden border border-[#cda039] grid md:grid-cols-2">
          <div className="aspect-[4/3] md:aspect-auto">
            <img
              src={SEAFOOD_PAN.img}
              alt={SEAFOOD_PAN.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-7 sm:p-10 flex flex-col justify-center bg-[#151109]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-2xl sm:text-3xl text-[#f5efe4]">
                {SEAFOOD_PAN.name}
              </h3>
              <span className="font-display text-2xl sm:text-3xl text-[#e9c874]">
                ${SEAFOOD_PAN.price}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#e9c874]/80 mb-3">Includes</p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-[#f5efe4]/80 text-sm sm:text-base mb-8">
              {SEAFOOD_PAN.includes.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e9c874] shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <a
              href={BRAND.smsHref}
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#cda039] px-6 py-3 text-sm font-semibold text-[#0d0b09] hover:bg-[#e9c874] transition-colors"
            >
              Order the Seafood Pan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
