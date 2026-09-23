import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useOrder } from '@/context/OrderContext';
import { BRAND, PAYMENT_METHODS, PAYMENT_NOTE, FREE_DELIVERY_MIN_PLATTERS } from '@/data/menu';
import ModeToggle from './ModeToggle';
import { panel, input, goldBtn, ghostBtn, money } from './theme';

const SMS_NUMBER = BRAND.smsHref.replace('sms:', '');

export function buildOrderText({ cart, totals, mode, form }) {
  const lines = [`New order for ${BRAND.name}`, `${mode === 'delivery' ? 'DELIVERY' : 'PICKUP'}`, ''];
  cart.forEach((l) => {
    const title = l.style ? `${l.name} (${l.style})` : l.name;
    lines.push(`${l.qty} x ${title} - ${money(l.price * l.qty)}`);
    if (l.sides?.length) lines.push(`   Sides: ${l.sides.join(', ')}`);
    if (l.notes) lines.push(`   Note: ${l.notes}`);
  });
  lines.push('', `Subtotal: ${money(totals.subtotal)}`, `Payment fee: ${money(totals.surcharge)}`);
  if (mode === 'delivery') {
    lines.push(totals.freeDelivery ? 'Delivery: FREE (3+ platters)' : 'Delivery: fee applies (please confirm)');
  }
  lines.push(`Total: ${money(totals.total)}${mode === 'delivery' && !totals.freeDelivery ? ' + delivery fee' : ''}`);
  lines.push(`Paying with: ${form.payment}`, '');
  lines.push(`Name: ${form.name}`, `Phone: ${form.phone}`);
  if (mode === 'delivery') lines.push(`Address: ${form.address}`);
  if (form.when) lines.push(`Wanted: ${form.when}`);
  return lines.join('\n');
}

function LineItem({ line }) {
  const { updateQty } = useOrder();
  return (
    <li className="py-4 flex gap-3" data-testid="cart-line">
      <div className="flex-1 min-w-0">
        <p className="font-medium">
          {line.name}
          {line.style && <span className="text-pk-ink/60"> · {line.style}</span>}
        </p>
        {line.sides?.length > 0 && <p className="text-xs text-pk-ink/55 mt-0.5">Sides: {line.sides.join(', ')}</p>}
        {line.notes && <p className="text-xs text-pk-ink/45 mt-0.5 italic">“{line.notes}”</p>}
        <div className="mt-2 inline-flex items-center rounded-full border border-pk-gold/25 text-sm">
          <button className="w-8 h-8" onClick={() => updateQty(line.key, line.qty - 1)} aria-label="Decrease">
            −
          </button>
          <span className="w-5 text-center">{line.qty}</span>
          <button className="w-8 h-8" onClick={() => updateQty(line.key, line.qty + 1)} aria-label="Increase">
            +
          </button>
        </div>
      </div>
      <span className="text-pk-red-text whitespace-nowrap">{money(line.price * line.qty)}</span>
    </li>
  );
}

export default function CartSheet() {
  const { cart, totals, mode, cartOpen, setCartOpen, profile, clearCart } = useOrder();
  const [step, setStep] = useState('cart'); // cart | checkout | sent
  const [form, setForm] = useState({ name: '', phone: '', address: '', when: '', payment: PAYMENT_METHODS[1].label });
  const [orderText, setOrderText] = useState('');

  useEffect(() => {
    if (cartOpen && step !== 'sent') {
      setStep('cart');
      if (profile) setForm((f) => ({ ...f, name: f.name || profile.name, phone: f.phone || profile.phone, address: f.address || profile.address || '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartOpen]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const formValid =
    form.name.trim() && form.phone.replace(/\D/g, '').length >= 10 && (mode === 'pickup' || form.address.trim());

  const send = (e) => {
    e.preventDefault();
    if (!formValid) return;
    const text = buildOrderText({ cart, totals, mode, form });
    setOrderText(text);
    setStep('sent');
    // iOS and Android both accept "?&body=".
    window.location.href = `sms:${SMS_NUMBER}?&body=${encodeURIComponent(text)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      toast.success('Order copied');
    } catch {
      toast.error('Could not copy — select the text and copy it manually');
    }
  };

  const finish = () => {
    clearCart();
    setStep('cart');
    setCartOpen(false);
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className={`${panel} border-y-0 border-r-0 w-full sm:max-w-md p-0 flex flex-col`}>
        <div className="px-6 pt-6 pb-4 border-b border-pk-gold/20">
          <SheetTitle className="font-display text-2xl font-normal text-pk-ink">
            {step === 'sent' ? 'Almost done!' : step === 'checkout' ? 'Checkout' : 'Your order'}
          </SheetTitle>
          <SheetDescription className="sr-only">Review your order and send it by text.</SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {step === 'sent' ? (
            <div className="py-6 space-y-5 text-sm">
              <p className="text-pk-ink/80">
                Your messaging app should open with your order ready to send to {BRAND.phone}. Hit send, then pay to
                confirm:
              </p>
              <ul className="space-y-2">
                {PAYMENT_METHODS.map((p) => (
                  <li key={p.label} className="flex justify-between rounded-lg border border-pk-gold/20 px-4 py-3">
                    <span className="text-pk-ink/60">{p.label}</span>
                    <span className="font-medium">{p.value}</span>
                  </li>
                ))}
              </ul>
              <p className="text-pk-red-text/85 text-xs">{PAYMENT_NOTE}</p>
              <div>
                <p className="text-pk-ink/60 mb-2">Messages didn’t open? Copy your order and text it to {BRAND.phone}:</p>
                <pre className="whitespace-pre-wrap rounded-lg bg-pk-bg border border-pk-gold/20 p-3 text-xs text-pk-ink/80 max-h-56 overflow-y-auto">
                  {orderText}
                </pre>
                <button onClick={copy} className={`${ghostBtn} mt-3 w-full`}>
                  Copy order
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center text-pk-ink/55">
              <p className="font-display text-xl text-pk-ink mb-2">Your cart is empty</p>
              <p className="text-sm">Add a platter to get started.</p>
            </div>
          ) : step === 'cart' ? (
            <>
              <div className="pt-5">
                <ModeToggle className="w-full [&>button]:flex-1" />
                {mode === 'delivery' && (
                  <p className="mt-3 text-xs text-pk-ink/60" data-testid="delivery-note">
                    {totals.freeDelivery
                      ? `Free delivery unlocked (${FREE_DELIVERY_MIN_PLATTERS}+ platters).`
                      : `Delivery fee applies. Add ${totals.plattersToFreeDelivery} more platter${totals.plattersToFreeDelivery === 1 ? '' : 's'} for free delivery.`}
                  </p>
                )}
              </div>
              <ul className="divide-y divide-pk-gold/15">
                {cart.map((l) => (
                  <LineItem key={l.key} line={l} />
                ))}
              </ul>
            </>
          ) : (
            <form id="checkout-form" onSubmit={send} className="py-5 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-pk-red-text/80">
                {mode === 'delivery' ? 'Delivery details' : 'Pickup details'}
              </p>
              <input className={input} placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" data-testid="checkout-name" />
              <input className={input} placeholder="Mobile number" value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" data-testid="checkout-phone" />
              {mode === 'delivery' && (
                <input className={input} placeholder="Delivery address" value={form.address} onChange={set('address')} autoComplete="street-address" data-testid="checkout-address" />
              )}
              <input className={input} placeholder={`When? e.g. ASAP or Sat 5 PM`} value={form.when} onChange={set('when')} />
              <fieldset>
                <legend className="text-sm font-medium mb-2">Pay with</legend>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_METHODS.map((p) => (
                    <label
                      key={p.label}
                      className={`cursor-pointer rounded-lg border px-3 py-2.5 text-sm text-center ${
                        form.payment === p.label ? 'border-pk-gold-light text-pk-red-text' : 'border-pk-gold/25 text-pk-ink/70'
                      }`}
                    >
                      <input type="radio" name="payment" value={p.label} checked={form.payment === p.label} onChange={set('payment')} className="sr-only" />
                      {p.label}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-pk-ink/45 mt-2">{PAYMENT_NOTE}</p>
              </fieldset>
            </form>
          )}
        </div>

        {step !== 'sent' && cart.length > 0 && (
          <div className="border-t border-pk-gold/20 px-6 py-5 space-y-2 text-sm">
            <div className="flex justify-between text-pk-ink/70">
              <span>Subtotal</span>
              <span>{money(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-pk-ink/70">
              <span>Apple Pay / Cashapp fee</span>
              <span>{money(totals.surcharge)}</span>
            </div>
            {mode === 'delivery' && (
              <div className="flex justify-between text-pk-ink/70">
                <span>Delivery</span>
                <span>{totals.freeDelivery ? 'FREE' : 'Confirmed by text'}</span>
              </div>
            )}
            <div className="flex justify-between font-display text-lg pt-1">
              <span>Total</span>
              <span className="text-pk-red-text" data-testid="cart-total">
                {money(totals.total)}
                {mode === 'delivery' && !totals.freeDelivery ? ' +' : ''}
              </span>
            </div>
            {step === 'cart' ? (
              <button onClick={() => setStep('checkout')} className={`${goldBtn} w-full mt-3`} data-testid="checkout-button">
                Checkout
              </button>
            ) : (
              <div className="flex gap-3 mt-3">
                <button type="button" onClick={() => setStep('cart')} className={ghostBtn}>
                  Back
                </button>
                <button type="submit" form="checkout-form" disabled={!formValid} className={`${goldBtn} flex-1`} data-testid="send-order">
                  Send order by text
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'sent' && (
          <div className="border-t border-pk-gold/20 px-6 py-5">
            <button onClick={finish} className={`${goldBtn} w-full`}>
              Done — start a new order
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
