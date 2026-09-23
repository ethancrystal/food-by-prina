import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, NAV } from '@/data/menu';
import { useOrder } from '@/context/OrderContext';

function NavLink({ item, onClick, className }) {
  // Hash links point at homepage sections; plain routes use client-side navigation.
  if (item.href.includes('#')) {
    return (
      <a href={item.href} onClick={onClick} className={className}>
        {item.label}
      </a>
    );
  }
  return (
    <Link to={item.href} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { totals, setCartOpen, profile, setSignInOpen } = useOrder();
  const solid = scrolled || pathname !== '/' || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const firstName = profile?.name?.split(' ')[0];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-pk-bg/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-8 h-16 sm:h-20">
        <Link to="/" className="shrink-0" aria-label={`${BRAND.name} home`}>
          <img src="/images/logo.png" alt={BRAND.name} className="h-11 sm:h-14 w-auto" />
        </Link>

        {/* Floating bar holding the nav and actions, after the client's reference site */}
        <div className="flex items-center gap-1 rounded-2xl border border-pk-gold/25 bg-pk-panel/90 backdrop-blur p-1.5 shadow-lg shadow-black/40">
          <nav className="hidden lg:flex items-center">
            {NAV.map((n) => (
              <NavLink
                key={n.href}
                item={n}
                className={`px-3.5 py-2 rounded-xl text-[15px] font-medium transition-colors hover:bg-white/5 hover:text-pk-red-text ${
                  pathname === n.href ? 'text-pk-red-text' : 'text-pk-ink/85'
                }`}
              />
            ))}
          </nav>

          <button
            onClick={() => setSignInOpen(true)}
            className="lg:ml-2 inline-flex items-center gap-2 rounded-xl border border-pk-gold/40 px-3 sm:px-4 py-2 text-sm font-semibold text-pk-ink hover:border-pk-gold hover:text-pk-gold-light transition-colors"
            aria-label={firstName ? `Signed in as ${firstName}` : 'Sign in'}
            data-testid="header-signin"
          >
            <UserIcon />
            <span className="max-w-[7rem] truncate">{firstName ? `Hi, ${firstName}` : 'Sign in'}</span>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-xl text-pk-ink/85 hover:bg-white/5 hover:text-pk-red-text"
            aria-label="Open cart"
            data-testid="header-cart"
          >
            <BagIcon />
            {totals.itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-pk-red border border-pk-gold text-white text-[11px] font-bold flex items-center justify-center">
                {totals.itemCount}
              </span>
            )}
          </button>

          <Link
            to="/menu"
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-pk-red border border-pk-gold px-4 py-2 text-sm font-semibold text-white hover:bg-pk-red-hover transition-colors"
            data-testid="header-order-link"
          >
            Order online
            <ChevronIcon />
          </Link>

          <button
            className="lg:hidden text-pk-red-text p-2 rounded-xl hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-4 sm:mx-8 mb-3 rounded-2xl border border-pk-gold/25 bg-pk-panel px-5 pb-5 pt-3 flex flex-col gap-4">
          {NAV.map((n) => (
            <NavLink key={n.href} item={n} onClick={() => setOpen(false)} className="text-base text-pk-ink/85" />
          ))}
          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex justify-center items-center gap-1.5 rounded-xl bg-pk-red border border-pk-gold px-5 py-2.5 text-sm font-semibold text-white"
          >
            Order online
            <ChevronIcon />
          </Link>
        </div>
      )}
    </header>
  );
}
