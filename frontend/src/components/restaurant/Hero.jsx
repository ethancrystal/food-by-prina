import React from 'react';
import { BRAND, HERO_IMAGE } from '@/data/menu';
import StoreStatus from '@/components/order/StoreStatus';
import { GoldButton } from './ui';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[88vh] flex items-end overflow-hidden">
      <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-pk-bg via-pk-bg/60 to-pk-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-pk-bg/80 via-pk-bg/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-24 pt-32">
        <p className="font-script text-2xl sm:text-3xl text-pk-red-text mb-3">Soul food &amp; seafood platters</p>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-pk-ink leading-[1.05] max-w-3xl">
          Made with love.
          <br />
          Served with pride.
        </h1>
        <p className="mt-5 max-w-xl text-pk-ink/75 text-base sm:text-lg">{BRAND.blurb}</p>
        <StoreStatus className="mt-5" />
        <div className="mt-8 flex flex-wrap gap-3">
          <GoldButton to="/menu" data-testid="hero-order-link">
            Order online
          </GoldButton>
          <GoldButton to="/menu" outline>
            View menu
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
