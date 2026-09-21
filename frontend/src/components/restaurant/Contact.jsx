import React from 'react';
import { BRAND } from '@/data/menu';

export default function Contact() {
  return (
    <section id="contact" className="bg-[#151109] py-20 sm:py-28 border-t border-[#cda03920]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-[#e9c874] mb-4">Get In Touch</p>
        <h2 className="font-display text-3xl sm:text-5xl text-[#f5efe4] mb-6">Ready to Order?</h2>
        <p className="text-[#f5efe4]/70 mb-9 max-w-xl mx-auto">
          Text or call to place your order. {BRAND.serviceArea}.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href={BRAND.smsHref}
            className="inline-flex items-center justify-center rounded-full bg-[#cda039] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#0d0b09] hover:bg-[#e9c874] transition-colors"
          >
            Text {BRAND.phone}
          </a>
          <a
            href={BRAND.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-[#f5efe4]/40 px-7 py-3.5 text-sm sm:text-base font-medium text-[#f5efe4] hover:border-[#e9c874] hover:text-[#e9c874] transition-colors"
          >
            Call to Order
          </a>
        </div>

        <div className="flex justify-center gap-5 text-[#e9c874]/70">
          <a href={BRAND.instagram} aria-label="Instagram" className="hover:text-[#e9c874]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
          <a href={BRAND.facebook} aria-label="Facebook" className="hover:text-[#e9c874]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 8.5h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3.5h2.5V22H14v-7.5h2.5L17 11h-3v-1.7c0-.5.3-.8.8-.8z"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
