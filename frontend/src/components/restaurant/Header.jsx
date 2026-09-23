import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, NAV } from '@/data/menu';
import { useOrder } from '@/context/OrderContext';

// Header copied from the client's reference site (angiessoulhouse.com):
// solid black bar, logo on the left, and one dark rounded box on the right
// holding the links, an outlined "Sign in" and a red "Order online ›".
const REF = {
  bar: '#000000',
  box: '#0f0f0f',
  line: '#2e2e2e',
  text: '#ededed',
  red: '#e5383b',
  redHover: '#f04a4d',
  redText: '#1f0505',
};

function NavLink({ item, onClick, className, style }) {
  // Hash links point at homepage sections; plain routes use client-side navigation.
  if (item.href.includes('#')) {
    return (
      <a href={item.href} onClick={onClick} className={className} style={style}>
        {item.label}
      </a>
    );
  }
  return (
    <Link to={item.href} onClick={onClick} className={className} style={style}>
      {item.label}
    </Link>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrderButton({ onClick, className = '' }) {
  return (
    <Link
      to="/menu"
      onClick={onClick}
      className={`items-center gap-2 rounded-xl px-5 py-2.5 text-[17px] font-semibold transition-colors bg-[#e5383b] hover:bg-[#f04a4d] ${className}`}
      style={{ color: REF.redText }}
      data-testid="header-order-link"
    >
      Order online
      <ChevronIcon />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { profile, setSignInOpen } = useOrder();

  useEffect(() => setOpen(false), [pathname]);

  const firstName = profile?.name?.split(' ')[0];

  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ background: REF.bar }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-8 h-16 sm:h-20">
        <Link to="/" className="shrink-0" aria-label={`${BRAND.name} home`}>
          <img src="/images/logo.png" alt={BRAND.name} className="h-11 sm:h-14 w-auto" />
        </Link>

        <div
          className="flex items-center gap-2 rounded-2xl border p-1.5 sm:p-2"
          style={{ background: REF.box, borderColor: REF.line }}
        >
          <nav className="hidden lg:flex items-center gap-1 mr-1">
            {NAV.map((n) => (
              <NavLink
                key={n.href}
                item={n}
                className="px-4 py-2.5 rounded-xl text-[17px] font-medium transition-colors hover:bg-white/5"
                style={{ color: pathname === n.href ? REF.red : REF.text }}
              />
            ))}
          </nav>

          <button
            onClick={() => setSignInOpen(true)}
            className="rounded-xl border px-4 sm:px-5 py-2 sm:py-2.5 text-[15px] sm:text-[17px] font-semibold transition-colors hover:bg-white/5"
            style={{ borderColor: '#3a3a3a', color: REF.text }}
            aria-label={firstName ? `Signed in as ${firstName}` : 'Sign in'}
            data-testid="header-signin"
          >
            <span className="block max-w-[7rem] truncate">{firstName ? `Hi, ${firstName}` : 'Sign in'}</span>
          </button>

          <OrderButton className="hidden md:inline-flex" />

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/5"
            style={{ color: REF.text }}
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
        <div
          className="lg:hidden mx-4 sm:mx-8 mb-3 rounded-2xl border px-5 pb-5 pt-3 flex flex-col gap-4"
          style={{ background: REF.box, borderColor: REF.line }}
        >
          {NAV.map((n) => (
            <NavLink key={n.href} item={n} onClick={() => setOpen(false)} className="text-[17px] font-medium" style={{ color: REF.text }} />
          ))}
          <OrderButton onClick={() => setOpen(false)} className="mt-1 inline-flex justify-center" />
        </div>
      )}
    </header>
  );
}
