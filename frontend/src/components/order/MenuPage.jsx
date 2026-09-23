import React, { useEffect, useRef, useState } from 'react';
import { BRAND, LOCATION, FOOD, SIDES, DESSERTS, BEVERAGES, MEATS_NOTE } from '@/data/menu';
import { useOrder } from '@/context/OrderContext';
import StoreStatus from './StoreStatus';
import ModeToggle from './ModeToggle';
import ItemDialog from './ItemDialog';
import { money } from './theme';

const TABS = [
  { id: 'food', label: 'Food', items: FOOD, note: MEATS_NOTE },
  { id: 'sides', label: 'Sides', items: SIDES, note: 'Pick any 2 with every platter.' },
  { id: 'desserts', label: 'Desserts', items: DESSERTS },
  { id: 'beverages', label: 'Beverages', items: BEVERAGES },
];

function ItemCard({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className="group text-left w-full flex gap-4 rounded-2xl border border-pk-gold/20 bg-pk-panel p-4 hover:border-pk-gold-light transition-colors"
      data-testid={`menu-item-${item.id}`}
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-display text-lg text-pk-ink">{item.name}</h3>
        {item.desc && <p className="text-sm text-pk-ink/55 mt-1 line-clamp-2">{item.desc}</p>}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-pk-red-text font-medium">{money(item.price)}</span>
          <span className="w-8 h-8 rounded-full border border-pk-gold text-pk-red-text flex items-center justify-center text-lg group-hover:bg-pk-red group-hover:text-white transition-colors">
            +
          </span>
        </div>
      </div>
      {item.img && (
        <img src={item.img} alt="" loading="lazy" className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover shrink-0" />
      )}
    </button>
  );
}

function SideCard({ side }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-pk-gold/20 bg-pk-panel p-4">
      <img src={side.img} alt="" loading="lazy" className="w-16 h-16 rounded-full object-cover" />
      <div>
        <h3 className="font-display text-lg text-pk-ink">{side.name}</h3>
        <p className="text-xs text-pk-red-text/75">Included with platters</p>
      </div>
    </div>
  );
}

function ComingSoon({ label }) {
  return (
    <div className="rounded-2xl border border-dashed border-pk-gold/35 p-8 text-center">
      <p className="font-display text-xl text-pk-ink mb-1">{label} coming soon</p>
      <p className="text-sm text-pk-ink/55">
        Text{' '}
        <a href={BRAND.smsHref} className="text-pk-red-text underline underline-offset-2">
          {BRAND.phone}
        </a>{' '}
        to ask what’s available today.
      </p>
    </div>
  );
}

export default function MenuPage() {
  const { totals, setCartOpen, mode } = useOrder();
  const [active, setActive] = useState('food');
  const [selected, setSelected] = useState(null);
  const sectionRefs = useRef({});
  const clickScrolling = useRef(false);

  // Highlight the tab for the section currently under the sticky bars.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (clickScrolling.current) return;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id) => {
    setActive(id);
    clickScrolling.current = true;
    const el = sectionRefs.current[id];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    setTimeout(() => (clickScrolling.current = false), 800);
  };

  return (
    <div className="pt-16 sm:pt-20 pb-28">
      {/* Store bar */}
      <section className="border-b border-pk-gold/15">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
          <h1 className="font-display text-3xl sm:text-4xl text-pk-ink">{BRAND.name} Menu</h1>
          <p className="text-sm text-pk-ink/60 mt-2">{LOCATION}</p>
          <StoreStatus className="mt-2" />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ModeToggle />
            <span className="text-xs text-pk-ink/55">
              {mode === 'delivery'
                ? 'Delivery fee applies · free with 3+ platters'
                : 'Pay by Apple Pay or Cashapp when you order'}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky category tabs */}
      <nav className="sticky top-16 sm:top-20 z-30 bg-pk-bg/95 backdrop-blur border-b border-pk-gold/20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => goTo(t.id)}
              data-testid={`tab-${t.id}`}
              className={`shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                active === t.id ? 'border-pk-gold-light text-pk-red-text' : 'border-transparent text-pk-ink/65 hover:text-pk-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {TABS.map((t) => (
          <section key={t.id} id={t.id} ref={(el) => (sectionRefs.current[t.id] = el)} className="pt-10">
            <h2 className="font-display text-2xl sm:text-3xl text-pk-ink">{t.label}</h2>
            {t.note && <p className="text-sm text-pk-ink/55 mt-1">{t.note}</p>}
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              {t.items.length === 0 ? (
                <div className="md:col-span-2">
                  <ComingSoon label={t.label} />
                </div>
              ) : t.id === 'sides' ? (
                t.items.map((s) => <SideCard key={s.name} side={s} />)
              ) : (
                t.items.map((item) => <ItemCard key={item.id} item={item} onSelect={setSelected} />)
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Floating cart bar */}
      {totals.itemCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-8 sm:bottom-8 z-40">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full sm:w-auto flex items-center justify-between gap-6 rounded-full bg-pk-red border border-pk-gold px-6 py-4 text-white font-semibold shadow-2xl shadow-black/60 hover:bg-pk-red-hover"
            data-testid="view-cart-bar"
          >
            <span>View order · {totals.itemCount}</span>
            <span>{money(totals.subtotal)}</span>
          </button>
        </div>
      )}

      <ItemDialog item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
