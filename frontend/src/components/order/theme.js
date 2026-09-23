// Shared class strings for the dark/gold order UI (dialogs, inputs, buttons).
export const panel = 'bg-pk-panel border border-pk-gold/35 text-pk-ink';
export const input =
  'w-full rounded-lg bg-pk-bg border border-pk-gold/25 px-3.5 py-2.5 text-sm text-pk-ink placeholder:text-pk-ink/35 focus:outline-none focus:border-pk-gold-light';
export const goldBtn =
  'inline-flex items-center justify-center rounded-full bg-pk-red border border-pk-gold px-6 py-3 text-sm font-semibold text-white hover:bg-pk-red-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
export const ghostBtn =
  'inline-flex items-center justify-center rounded-full border border-pk-ink/30 px-6 py-3 text-sm font-medium text-pk-ink hover:border-pk-gold-light hover:text-pk-red-text transition-colors';
export const money = (n) => `$${n.toFixed(2).replace(/\.00$/, '')}`;
