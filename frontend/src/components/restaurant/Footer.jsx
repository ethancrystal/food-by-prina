import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, NAV } from '@/data/menu';

export default function Footer() {
  return (
    <footer className="bg-[#0d0b09] border-t border-[#cda03920] py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-script text-xl text-[#e9c874]">{BRAND.name}</span>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#f5efe4]/55">
          {NAV.map((n) =>
            n.href.includes('#') ? (
              <a key={n.href} href={n.href} className="hover:text-[#e9c874] transition-colors">
                {n.label}
              </a>
            ) : (
              <Link key={n.href} to={n.href} className="hover:text-[#e9c874] transition-colors">
                {n.label}
              </Link>
            )
          )}
        </nav>
        <p className="text-xs text-[#f5efe4]/40">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
