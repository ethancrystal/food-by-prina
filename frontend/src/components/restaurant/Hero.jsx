import React from 'react';
import { BRAND, HERO_IMAGE, PAYMENT_METHODS, PAYMENT_NOTE } from '@/data/menu';
import StoreStatus from '@/components/order/StoreStatus';
import { GoldButton } from './ui';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[88vh] flex items-end overflow-hidden">
      <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-pk-bg via-pk-bg/60 to-pk-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-pk-bg/80 via-pk-bg/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-24 pt-32">
        {/* Flyer slogan, as a gold ribbon */}
        <div className="mb-6 flex items-center gap-3" data-testid="hero-slogan">
          <span className="h-px w-6 sm:w-12 bg-pk-gold/60" aria-hidden="true" />
          <p className="font-display uppercase tracking-[0.2em] text-xs sm:text-base text-pk-gold-light">
            <span aria-hidden="true">♥ </span>Food made with love. Every bite matters.<span aria-hidden="true"> ♥</span>
          </p>
          <span className="h-px w-6 sm:w-12 bg-pk-gold/60" aria-hidden="true" />
        </div>
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
        {/* Payment methods, as on the flyer */}
        <div className="mt-6 w-fit max-w-full rounded-2xl border border-pk-gold/40 bg-pk-bg/70 backdrop-blur px-4 py-2.5 text-sm text-pk-ink/80">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {PAYMENT_METHODS.map((p, i) => (
              <React.Fragment key={p.label}>
                {i > 0 && <span className="h-4 w-px bg-pk-gold/40" aria-hidden="true" />}
                <span>
                  {p.label} <span className="font-semibold text-pk-ink">{p.value}</span>
                </span>
              </React.Fragment>
            ))}
          </div>
          <p className="mt-1 text-xs text-pk-gold-light/90">{PAYMENT_NOTE}</p>
        </div>
      </div>
    </section>
  );
}
