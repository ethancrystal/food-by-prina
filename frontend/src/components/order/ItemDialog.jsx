import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SIDES, SIDES_PER_PLATTER } from '@/data/menu';
import { useOrder } from '@/context/OrderContext';
import { panel, input, goldBtn, money } from './theme';

function Chip({ active, disabled, onClick, children, testId }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? 'bg-pk-red border border-pk-gold border-pk-gold text-white font-medium'
          : 'border-pk-gold/35 text-pk-ink/80 hover:border-pk-gold-light disabled:opacity-35 disabled:hover:border-pk-gold/35'
      }`}
    >
      {children}
    </button>
  );
}

export default function ItemDialog({ item, onClose }) {
  const { addItem, setCartOpen } = useOrder();
  const [sides, setSides] = useState([]);
  const [style, setStyle] = useState(null);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setSides([]);
    setStyle(null);
    setQty(1);
    setNotes('');
  }, [item]);

  if (!item) return null;

  const needsSides = !!item.sides;
  const needsStyle = !!item.styles;
  const sidesDone = !needsSides || sides.length === SIDES_PER_PLATTER;
  const styleDone = !needsStyle || !!style;
  const ready = sidesDone && styleDone;

  const toggleSide = (name) =>
    setSides((s) => (s.includes(name) ? s.filter((x) => x !== name) : s.length < SIDES_PER_PLATTER ? [...s, name] : s));

  const add = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      qty,
      sides: needsSides ? sides : [],
      style: needsStyle ? style : null,
      notes: notes.trim(),
    });
    toast.success(`${qty} × ${item.name} added`, {
      action: { label: 'View cart', onClick: () => setCartOpen(true) },
    });
    onClose();
  };

  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className={`${panel} max-w-lg p-0 overflow-hidden rounded-2xl max-h-[92vh] overflow-y-auto gap-0`}>
        {item.img && <img src={item.img} alt={item.name} className="w-full aspect-[16/9] object-cover" />}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 pr-6">
              <DialogTitle className="font-display text-2xl font-normal">{item.name}</DialogTitle>
              <span className="font-display text-2xl text-pk-red-text">{money(item.price)}</span>
            </div>
            {item.desc && <DialogDescription className="mt-2 text-pk-ink/65">{item.desc}</DialogDescription>}
          </div>

          {needsStyle && (
            <fieldset>
              <legend className="flex w-full justify-between text-sm font-medium mb-3">
                <span>Chicken style</span>
                <span className="text-xs text-pk-red-text/80">Required · pick 1</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {item.styles.map((s) => (
                  <Chip key={s} active={style === s} onClick={() => setStyle(s)} testId={`style-${s}`}>
                    {s}
                  </Chip>
                ))}
              </div>
            </fieldset>
          )}

          {needsSides && (
            <fieldset>
              <legend className="flex w-full justify-between text-sm font-medium mb-3">
                <span>Choose your sides</span>
                <span className="text-xs text-pk-red-text/80">
                  Required · {sides.length}/{SIDES_PER_PLATTER}
                </span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {SIDES.map((s) => (
                  <Chip
                    key={s.name}
                    active={sides.includes(s.name)}
                    disabled={!sides.includes(s.name) && sides.length >= SIDES_PER_PLATTER}
                    onClick={() => toggleSide(s.name)}
                    testId={`side-${s.name}`}
                  >
                    {s.name}
                  </Chip>
                ))}
              </div>
              <p className="text-xs text-pk-ink/45 mt-3">Served with yellow rice.</p>
            </fieldset>
          )}

          <label className="block">
            <span className="text-sm font-medium">Special instructions</span>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, extra sauce, etc."
              className={`${input} mt-2 resize-none`}
            />
          </label>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-pk-gold/35">
              <button className="w-10 h-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span className="w-6 text-center" data-testid="item-qty">{qty}</span>
              <button className="w-10 h-10 text-lg" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
            <button onClick={add} disabled={!ready} className={`${goldBtn} flex-1`} data-testid="add-to-cart">
              {ready ? `Add to order · ${money(item.price * qty)}` : needsStyle && !style ? 'Pick a chicken style' : `Pick ${SIDES_PER_PLATTER - sides.length} more side${SIDES_PER_PLATTER - sides.length === 1 ? '' : 's'}`}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
