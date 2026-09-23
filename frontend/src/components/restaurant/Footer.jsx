import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/data/menu';
import { useOrder } from '@/context/OrderContext';

const linkCls = 'text-pk-ink/60 hover:text-pk-red-text transition-colors';

export default function Footer() {
  const { setSignInOpen } = useOrder();
  return (
    <footer className="bg-black/40 border-t border-pk-gold/25">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/">
            <img src="/images/logo.png" alt={BRAND.name} className="h-20 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-pk-ink/55">{BRAND.tagline}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pk-gold-light mb-4">Order</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/menu" className={linkCls}>Menu</Link></li>
            <li><Link to="/menu" className={linkCls}>Order online</Link></li>
            <li><button onClick={() => setSignInOpen(true)} className={linkCls}>Sign in</button></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pk-gold-light mb-4">Info</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/#order" className={linkCls}>How to order</a></li>
            <li><a href="/#faq" className={linkCls}>FAQ</a></li>
            <li><a href="/#contact" className={linkCls}>Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pk-gold-light mb-4">Pay with</p>
          <ul className="space-y-2.5 text-sm text-pk-ink/60">
            <li>Apple Pay · {BRAND.phone}</li>
            <li>Cashapp · {BRAND.cashapp}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              ['Instagram', BRAND.instagram, <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></>],
              ['Facebook', BRAND.facebook, <path d="M14 8.5h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3.5h2.5V22H14v-7.5h2.5L17 11h-3v-1.7c0-.5.3-.8.8-.8z" />],
            ].map(([label, href, icon]) => (
              <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full border border-pk-gold/40 flex items-center justify-center text-pk-ink/70 hover:text-pk-red-text hover:border-pk-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-pk-gold/15">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-pk-ink/40">
          <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span className="font-script text-base text-pk-gold-light/80">Thank you for supporting {BRAND.name}!</span>
        </div>
      </div>
    </footer>
  );
}
