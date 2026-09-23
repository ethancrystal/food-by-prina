import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, MEATS, MEATS_NOTE, SIDES, SEAFOOD_PAN, PAYMENT_NOTE } from '@/data/menu';
import { Eyebrow, Title, Body, GoldButton, Split } from './ui';

const IMG = (name) => `/images/menu/${name}.jpg`;

export function Welcome() {
  return (
    <Split img={IMG('salmon')} alt="Salmon platter">
      <Eyebrow>Welcome</Eyebrow>
      <Title>Welcome to {BRAND.name}</Title>
      <Body className="mt-5">
        Every platter here is made with love and served with pride. We cook soul food and seafood favorites like salmon,
        stuffed salmon with crab, lamb chops, oxtails and chicken. Every meat platter comes with yellow rice and your
        choice of two sides.
      </Body>
      <Body className="mt-4">Order for pickup or delivery, and get free delivery on 3 or more platters.</Body>
    </Split>
  );
}

// Signature dishes with a flyer-style dotted price list.
export function Signature() {
  return (
    <Split img={IMG('lamb-chops')} alt="Lamb chops" reverse>
      <Eyebrow>The platters</Eyebrow>
      <Title>Signature dishes you’ll love</Title>
      <ul className="mt-7 space-y-3">
        {MEATS.map((m) => (
          <li key={m.id} className="flex items-baseline gap-3">
            <span className="font-display text-lg text-pk-ink">{m.name}</span>
            <span className="flex-1 border-b border-dotted border-pk-gold/40 -translate-y-1" aria-hidden="true" />
            <span className="font-display text-lg text-pk-red-text">${m.price}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-pk-ink/55">{MEATS_NOTE} Chicken comes Fried, BBQ, Buffalo or Thai Chili.</p>
      <GoldButton to="/menu" className="mt-8">
        View full menu
      </GoldButton>
    </Split>
  );
}

// Blurred-photo band with a card: the "order with ease" idea.
export function OrderBand() {
  const steps = [
    ['Build your order', 'Pick pickup or delivery, then your platters and sides.'],
    ['Send it by text', `Checkout sends your order to ${BRAND.phone}.`],
    ['Pay your way', 'Apple Pay or Cashapp. Free delivery on 3+ platters.'],
  ];
  return (
    <section id="order" className="scroll-mt-24 relative py-16 sm:py-24 overflow-hidden">
      <img src={IMG('chicken')} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-40" />
      <div className="absolute inset-0 bg-pk-bg/60" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-pk-gold/40 bg-pk-panel shadow-2xl shadow-black/60">
          <img src={IMG('oxtails')} alt="Oxtails" loading="lazy" className="w-full h-64 md:h-full object-cover" />
          <div className="p-8 sm:p-12">
            <Eyebrow>How to order</Eyebrow>
            <Title className="!text-3xl sm:!text-4xl">Order with ease</Title>
            <ol className="mt-7 space-y-5">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full border border-pk-gold text-pk-gold-light font-display flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg text-pk-ink">{t}</p>
                    <p className="text-sm text-pk-ink/60">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-pk-ink/45">{PAYMENT_NOTE}</p>
            <GoldButton to="/menu" className="mt-7">
              Order now
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MadeWithLove() {
  return (
    <Split img={IMG('mac-cheese')} alt="Mac and cheese">
      <p className="font-script text-3xl text-pk-red-text mb-2">Every bite matters</p>
      <Title>Food made with love</Title>
      <Body className="mt-5">
        That’s the promise behind every platter that leaves {BRAND.name}, from the seasoning on the salmon to the last
        scoop of mac &amp; cheese.
      </Body>
      <Body className="mt-4 italic">Thank you for supporting {BRAND.name}!</Body>
      <GoldButton to="/menu" outline className="mt-8">
        Order online
      </GoldButton>
    </Split>
  );
}

export function PlatesGrid() {
  const plates = [...MEATS, SEAFOOD_PAN];
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Title>Fresh plates, full flavor</Title>
          <Body className="mt-4">A look at what comes out of the kitchen. Tap any plate to order it.</Body>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {plates.map((p) => (
            <GridTile key={p.id} img={p.img} label={p.name} price={p.price} />
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mt-20 mb-10">
          <Title>Pick your two sides</Title>
          <Body className="mt-4">Every meat platter comes with yellow rice and two of these.</Body>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {SIDES.map((s) => (
            <GridTile key={s.name} img={s.img} label={s.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GridTile({ img, label, price }) {
  return (
    <Link
      to="/menu"
      className="group relative block aspect-square rounded-2xl overflow-hidden border border-pk-gold/25 hover:border-pk-gold transition-colors"
    >
      <img src={img} alt={label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 sm:p-4 flex items-end justify-between gap-2">
        <span className="font-display text-sm sm:text-lg text-pk-ink">{label}</span>
        {price && <span className="text-sm sm:text-base text-pk-red-text font-semibold">${price}</span>}
      </div>
    </Link>
  );
}

// Seafood Pan feature with the flyer's round price badge.
export function SeafoodFeature() {
  return (
    <Split img={SEAFOOD_PAN.img} alt="Seafood pan" reverse>
      <div className="flex items-center gap-5">
        <Title>Seafood Pan</Title>
        <span className="shrink-0 w-20 h-20 rounded-full bg-pk-red border-2 border-pk-gold flex items-center justify-center font-display text-2xl text-white shadow-lg shadow-black/50">
          ${SEAFOOD_PAN.price}
        </span>
      </div>
      <Body className="mt-5">A full pan of seafood, loaded and ready to share.</Body>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-pk-gold-light">Includes</p>
      <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-pk-ink/80">
        {SEAFOOD_PAN.includes.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pk-gold-light shrink-0" />
            {i}
          </li>
        ))}
      </ul>
      <GoldButton to="/menu" className="mt-8">
        Order the Seafood Pan
      </GoldButton>
    </Split>
  );
}
