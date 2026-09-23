import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FREE_DELIVERY_MIN_PLATTERS, PAYMENT_SURCHARGE, FOOD } from '@/data/menu';

const OrderContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode etc.) — state still works in memory */
  }
};

const FOOD_IDS = new Set(FOOD.map((f) => f.id));

export function OrderProvider({ children }) {
  const [cart, setCart] = useState(() => load('pk_cart', []));
  const [mode, setMode] = useState(() => load('pk_mode', 'pickup'));
  const [profile, setProfile] = useState(() => load('pk_profile', null));
  const [cartOpen, setCartOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => save('pk_cart', cart), [cart]);
  useEffect(() => save('pk_mode', mode), [mode]);
  useEffect(() => {
    if (profile) save('pk_profile', profile);
    else {
      try {
        window.localStorage.removeItem('pk_profile');
      } catch {
        /* ignore */
      }
    }
  }, [profile]);

  const addItem = (item) => {
    // Same item with same choices merges into one line.
    const key = [item.id, item.style || '', (item.sides || []).join('|'), item.notes || ''].join('~');
    setCart((c) => {
      const existing = c.find((l) => l.key === key);
      if (existing) return c.map((l) => (l.key === key ? { ...l, qty: l.qty + item.qty } : l));
      return [...c, { ...item, key }];
    });
  };

  const updateQty = (key, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))));

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, l) => sum + l.price * l.qty, 0);
    const itemCount = cart.reduce((n, l) => n + l.qty, 0);
    const platterCount = cart.reduce((n, l) => n + (FOOD_IDS.has(l.id) ? l.qty : 0), 0);
    const freeDelivery = platterCount >= FREE_DELIVERY_MIN_PLATTERS;
    const surcharge = cart.length ? PAYMENT_SURCHARGE : 0;
    return {
      subtotal,
      itemCount,
      platterCount,
      freeDelivery,
      surcharge,
      total: subtotal + surcharge,
      plattersToFreeDelivery: Math.max(0, FREE_DELIVERY_MIN_PLATTERS - platterCount),
    };
  }, [cart]);

  const value = {
    cart,
    addItem,
    updateQty,
    clearCart,
    totals,
    mode,
    setMode,
    profile,
    setProfile,
    cartOpen,
    setCartOpen,
    signInOpen,
    setSignInOpen,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
};
