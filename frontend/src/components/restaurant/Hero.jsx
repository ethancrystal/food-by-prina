import React from 'react';
import { BRAND, HERO_IMAGE } from '@/data/menu';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-end sm:items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/80 to-[#0d0b09]/30" />
      <div className="absolute inset-0 bg-[#0d0b09]/25" />

      <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-0 pt-40 sm:pt-0">
        <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-[#e9c874] mb-4">
          Soul Food &amp; Seafood Platters
        </p>
        <h1 className="font-script text-5xl sm:text-7xl lg:text-8xl text-[#f5efe4] leading-[0.95] mb-2">
          {BRAND.name}
        </h1>
        <p className="font-display text-lg sm:text-xl text-[#e9c874] tracking-wide mb-6">
          {BRAND.tagline}
        </p>
        <p className="max-w-xl text-[#f5efe4]/80 text-base sm:text-lg mb-9">{BRAND.blurb}</p>

        <div className="flex flex-wrap gap-4">
          <a
            href={BRAND.smsHref}
            className="inline-flex items-center justify-center rounded-full bg-[#cda039] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#0d0b09] hover:bg-[#e9c874] transition-colors"
            data-testid="hero-order-link"
          >
            Order Now — Text {BRAND.phone}
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full border border-[#f5efe4]/40 px-7 py-3.5 text-sm sm:text-base font-medium text-[#f5efe4] hover:border-[#e9c874] hover:text-[#e9c874] transition-colors"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
}
