// Shared class strings for the dark/gold order UI (dialogs, inputs, buttons).
export const panel = 'bg-[#151109] border border-[#cda03955] text-[#f5efe4]';
export const input =
  'w-full rounded-lg bg-[#0d0b09] border border-[#cda03944] px-3.5 py-2.5 text-sm text-[#f5efe4] placeholder:text-[#f5efe4]/35 focus:outline-none focus:border-[#e9c874]';
export const goldBtn =
  'inline-flex items-center justify-center rounded-full bg-[#cda039] px-6 py-3 text-sm font-semibold text-[#0d0b09] hover:bg-[#e9c874] transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
export const ghostBtn =
  'inline-flex items-center justify-center rounded-full border border-[#f5efe4]/30 px-6 py-3 text-sm font-medium text-[#f5efe4] hover:border-[#e9c874] hover:text-[#e9c874] transition-colors';
export const money = (n) => `$${n.toFixed(2).replace(/\.00$/, '')}`;
