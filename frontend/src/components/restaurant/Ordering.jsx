import React from 'react';
import { BRAND, DELIVERY_NOTES, PAYMENT_METHODS, PAYMENT_NOTE } from '@/data/menu';

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.07-1.27 2.86-.9.86-2.05 1.36-3.05 1.28-.13-1.1.42-2.24 1.24-2.98.86-.78 2.12-1.31 3.08-1.16zM20.5 17.2c-.53 1.23-.78 1.78-1.46 2.87-.95 1.53-2.29 3.44-3.95 3.46-1.48.02-1.86-.96-3.87-.95-2 .01-2.43.97-3.91.95-1.66-.02-2.93-1.75-3.88-3.28C1.16 16.9.5 13.1 1.96 10.55c.94-1.65 2.62-2.7 4.44-2.72 1.5-.02 2.92.99 3.87.99.95 0 2.68-1.23 4.52-1.05.77.03 2.94.31 4.33 2.34-.11.07-2.58 1.5-2.55 4.49.03 3.58 3.14 4.77 3.17 4.79-.03.09-.5 1.7-1.24 3.38z" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Ordering() {
  return (
    <section id="order" className="bg-[#0d0b09] py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">How to Order</p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4] mb-4">
            Text, Confirm, Enjoy
          </h2>
          <p className="text-[#f5efe4]/70 max-w-xl mx-auto">
            No app needed — call or text your order in and pay right from your phone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { n: '01', t: 'Send your order', d: `Text or call ${BRAND.phone} with your platter picks and 2 sides.` },
            { n: '02', t: 'Pay your way', d: 'Confirm your total, then pay by Apple Pay or Cashapp.' },
            { n: '03', t: 'Pickup or delivery', d: 'Delivery fee applies — free with 3+ platters ordered.' },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-[#cda03933] bg-[#151109] p-6">
              <span className="font-display text-[#e9c874] text-2xl">{s.n}</span>
              <h3 className="font-display text-lg text-[#f5efe4] mt-2 mb-2">{s.t}</h3>
              <p className="text-sm text-[#f5efe4]/65">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#cda039] bg-[#151109] p-7 sm:p-9">
          <h3 className="font-display text-xl text-[#f5efe4] mb-5">Payment Methods</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {PAYMENT_METHODS.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 rounded-xl bg-[#0d0b09] border border-[#cda03933] px-5 py-4"
              >
                <span className="text-[#e9c874]">
                  {p.label === 'Apple Pay' ? <AppleIcon /> : <CashIcon />}
                </span>
                <div>
                  <p className="text-sm text-[#f5efe4]/60">{p.label}</p>
                  <p className="font-medium text-[#f5efe4]">{p.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[#e9c874]/80 mb-4">{PAYMENT_NOTE}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-[#f5efe4]/55">
            {DELIVERY_NOTES.map((n) => (
              <span key={n} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e9c874]" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
