import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useOrder } from '@/context/OrderContext';
import { panel, input, goldBtn, ghostBtn } from './theme';

// "Sign in" saves the customer's details on this device so checkout is prefilled.
// There is no server account behind it (see README note / TODO for real accounts).
export default function SignInDialog() {
  const { signInOpen, setSignInOpen, profile, setProfile } = useOrder();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    if (signInOpen) setForm(profile || { name: '', phone: '', address: '' });
  }, [signInOpen, profile]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.trim() && form.phone.replace(/\D/g, '').length >= 10;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setProfile({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() });
    toast.success(`Welcome, ${form.name.trim().split(' ')[0]}!`);
    setSignInOpen(false);
  };

  const signOut = () => {
    setProfile(null);
    toast('Signed out');
    setSignInOpen(false);
  };

  return (
    <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
      <DialogContent className={`${panel} max-w-md rounded-2xl`}>
        <DialogTitle className="font-display text-2xl font-normal">{profile ? 'Your details' : 'Sign in'}</DialogTitle>
        <DialogDescription className="text-pk-ink/60 -mt-2">
          Save your name, phone and address on this device so ordering takes seconds next time.
        </DialogDescription>
        <form onSubmit={submit} className="space-y-4">
          <input className={input} placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" data-testid="signin-name" />
          <input className={input} placeholder="Mobile number" value={form.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" data-testid="signin-phone" />
          <input className={input} placeholder="Delivery address (optional)" value={form.address} onChange={set('address')} autoComplete="street-address" />
          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={!valid} className={`${goldBtn} flex-1`} data-testid="signin-submit">
              {profile ? 'Save' : 'Sign in'}
            </button>
            {profile && (
              <button type="button" onClick={signOut} className={ghostBtn}>
                Sign out
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
