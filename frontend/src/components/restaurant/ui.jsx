import React from 'react';
import { Link } from 'react-router-dom';

// Small shared building blocks for the homepage sections.

export function Eyebrow({ children, className = '' }) {
  return <p className={`uppercase tracking-[0.25em] text-xs text-pk-red-text mb-3 ${className}`}>{children}</p>;
}

export function Title({ children, className = '' }) {
  return <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl text-pk-ink leading-tight ${className}`}>{children}</h2>;
}

export function Body({ children, className = '' }) {
  return <p className={`text-pk-ink/70 text-base leading-relaxed ${className}`}>{children}</p>;
}

const arrow = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Gold pill button. `to` = in-app route, `href` = external/tel/sms/hash.
export function GoldButton({ to, href, children, outline = false, className = '', ...rest }) {
  const cls = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
    outline
      ? 'border border-pk-gold text-pk-red-text hover:bg-pk-red hover:text-white'
      : 'bg-pk-red border border-pk-gold text-white hover:bg-pk-red-hover'
  } ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
      {arrow}
    </a>
  );
}

// Two-column row: photo on one side, content on the other. Alternates with `reverse`.
export function Split({ img, alt = '', reverse = false, children, id }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={reverse ? 'md:order-2' : ''}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] border border-pk-gold/20 hidden sm:block" aria-hidden="true" />
            <img src={img} alt={alt} loading="lazy" className="relative w-full aspect-[4/3] object-cover rounded-3xl" />
          </div>
        </div>
        <div className={reverse ? 'md:order-1' : ''}>{children}</div>
      </div>
    </section>
  );
}
