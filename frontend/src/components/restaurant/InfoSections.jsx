import React from 'react';
import { BRAND, PAYMENT_METHODS, PAYMENT_NOTE, LOCATION } from '@/data/menu';
import StoreStatus, { HoursList } from '@/components/order/StoreStatus';
import { Eyebrow, Title, GoldButton } from './ui';

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-pk-gold-light">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Hours + ordering promises: the "visit us today" idea, adapted for pickup & delivery.
export function HoursInfo() {
  return (
    <section className="py-16 sm:py-24 bg-pk-panel border-y border-pk-gold/15">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12">
        <div>
          <Eyebrow>Hours</Eyebrow>
          <Title className="!text-3xl sm:!text-4xl">When we’re cooking</Title>
          <StoreStatus className="mt-4" />
          <div className="mt-6 rounded-2xl border border-pk-gold/30 px-5 py-2">
            <HoursList />
          </div>
        </div>
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <Title className="!text-3xl sm:!text-4xl">Pickup &amp; delivery</Title>
          <ul className="mt-6 space-y-4 text-pk-ink/80">
            {[
              'Pickup & delivery available',
              'Free delivery on 3 or more platters',
              'Every platter comes with yellow rice & 2 sides',
              'Pay with Apple Pay or Cashapp',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((p) => (
              <div key={p.label} className="rounded-xl border border-pk-gold/30 px-4 py-3">
                <p className="text-xs text-pk-ink/50">{p.label}</p>
                <p className="font-medium text-pk-ink">{p.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-pk-ink/45">{PAYMENT_NOTE}</p>
        </div>
      </div>
    </section>
  );
}

const icons = {
  delivery: (
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7M7 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  ),
  pickup: <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" />,
  phone: <path d="M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2" />,
  cash: <path d="M3 6h18v12H3zM12 15a3 3 0 100-6 3 3 0 000 6z" />,
};

export function Featuring() {
  const items = [
    ['delivery', 'Delivery'],
    ['pickup', 'Pickup'],
    ['phone', 'Apple Pay'],
    ['cash', 'Cashapp'],
  ];
  return (
    <section className="py-14">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Title className="!text-2xl sm:!text-3xl">Featuring</Title>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {items.map(([k, label]) => (
            <div key={k} className="flex flex-col items-center gap-3">
              <span className="w-14 h-14 rounded-full border border-pk-gold/50 flex items-center justify-center text-pk-red-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                  {icons[k]}
                </svg>
              </span>
              <span className="text-sm text-pk-ink/80">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact card: the "our location" idea, without a map until there is an address.
export function ContactCard() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Title className="mb-8">Get in touch</Title>
        <div className="grid md:grid-cols-[2fr_3fr] rounded-3xl overflow-hidden border border-pk-gold/40 bg-pk-panel">
          <img src="/images/menu/stuffed-salmon.jpg" alt="" loading="lazy" className="w-full h-56 md:h-full object-cover" />
          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs text-pk-ink/50">{BRAND.name}</p>
                <p className="font-display text-2xl text-pk-ink">{LOCATION}</p>
              </div>
              <GoldButton href={BRAND.smsHref} outline className="!py-2 !px-4">
                Text us
              </GoldButton>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pk-gold-light mb-2">Contact</p>
                <a href={BRAND.phoneHref} className="block text-pk-ink hover:text-pk-red-text">{BRAND.phone}</a>
                <p className="text-pk-ink/55 mt-1">Call or text to order</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pk-gold-light mb-2">Payment</p>
                <p className="text-pk-ink">Apple Pay {BRAND.phone}</p>
                <p className="text-pk-ink">Cashapp {BRAND.cashapp}</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-pk-gold/20 flex flex-wrap items-center justify-between gap-4">
              <StoreStatus />
              <GoldButton to="/menu">Order online</GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
