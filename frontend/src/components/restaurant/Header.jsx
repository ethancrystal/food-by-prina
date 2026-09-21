import React, { useEffect, useState } from 'react';
import { BRAND, NAV } from '@/data/menu';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#0d0b09]/95 backdrop-blur border-b border-[#cda03933]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-20">
        <a href="#top" className="font-script text-2xl sm:text-3xl text-[#e9c874] leading-none">
          {BRAND.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm tracking-wide text-[#f5efe4]/80 hover:text-[#e9c874] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={BRAND.smsHref}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#cda039] px-5 py-2 text-sm font-medium text-[#e9c874] hover:bg-[#cda039] hover:text-[#0d0b09] transition-colors"
          data-testid="header-order-link"
        >
          Order Now
        </a>

        <button
          className="md:hidden text-[#e9c874] p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
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

      {open && (
        <div className="md:hidden bg-[#0d0b09] border-t border-[#cda03933] px-5 pb-6 pt-2 flex flex-col gap-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#f5efe4]/85"
            >
              {n.label}
            </a>
          ))}
          <a
            href={BRAND.smsHref}
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center rounded-full border border-[#cda039] px-5 py-2.5 text-sm font-medium text-[#e9c874]"
          >
            Order Now
          </a>
        </div>
      )}
    </header>
  );
}
