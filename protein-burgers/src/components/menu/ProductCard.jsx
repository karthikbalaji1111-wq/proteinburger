import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSizzleSound } from '../../hooks/useSizzleSound';
import { EXTRA_CHEESE_PRICE, formatPriceRupee, getLineTotal, parsePriceRupee } from '../../utils/price';
import { SteamEffect } from './SteamEffect';

export function ProductCard({ item, index = 0, onSelect, isBurger = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);
  const playSizzle = useSizzleSound();
  const { addToCart } = useCart();

  const basePrice = useMemo(() => parsePriceRupee(item.price), [item.price]);
  const previewTotal = useMemo(
    () => getLineTotal(basePrice, quantity, isBurger && extraCheese),
    [basePrice, quantity, extraCheese, isBurger],
  );

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item, quantity, isBurger && extraCheese);
    setQuantity(1);
    setExtraCheese(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.025 }}
      onMouseEnter={() => {
        setIsHovered(true);
        playSizzle();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="product-card group relative overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] shadow-glass backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,199,111,0.85),transparent)]" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#d64135]/10 blur-3xl" />
      </div>

      <div className="reflection-sweep" />

      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative z-20 block w-full aspect-[1.05] overflow-hidden bg-black text-left"
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.9] transition duration-700 group-hover:scale-[1.06] group-hover:opacity-100"
        />
        <SteamEffect active={isHovered} />
        <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_48%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
          <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md">
            {item.protein} protein
          </span>
          <span className="rounded-full border border-[#f0c76f]/35 bg-[#f0c76f]/14 px-3 py-1.5 text-xs font-bold text-[#ffe0a0] backdrop-blur-md">
            {item.price}
          </span>
        </div>
      </button>

      <div className="relative z-20 p-5">
        <div className="flex min-h-[3.25rem] items-start justify-between gap-3">
          <h2 className="text-pretty text-xl font-black leading-tight transition-colors duration-300 group-hover:text-[#ffe1a0]">
            {item.name}
          </h2>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/56">
            {item.calories}
          </span>
        </div>
        <p className="mt-3 min-h-[4rem] text-sm leading-6 text-white/58">{item.description}</p>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c76f]/55 transition hover:text-[#ffe1a0]"
        >
          View nutrition →
        </button>

        <div className="mt-5 space-y-4 border-t border-white/10 pt-5" onClick={(e) => e.stopPropagation()}>
          {isBurger ? (
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-black/25 px-3 py-2.5">
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="size-4 rounded border-white/20 bg-black/40 accent-[#f0c76f]"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">
                  Extra cheese
                </span>
              </span>
              <span className="text-xs font-black text-[#ffe1a0]">+{formatPriceRupee(EXTRA_CHEESE_PRICE)}</span>
            </label>
          ) : null}

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Quantity</span>
            <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/30 p-1">
              <button
                type="button"
                onClick={decreaseQty}
                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-black text-[#ffe1a0]">{quantity}</span>
              <button
                type="button"
                onClick={increaseQty}
                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-[0.14em] text-white/40">Item total</span>
            <span className="font-black text-[#ffe1a0]">{formatPriceRupee(previewTotal)}</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]"
          >
            <ShoppingCart className="size-4" strokeWidth={2.5} />
            Add to cart
          </button>
        </div>

        {false ? (
          <div className="mt-5 space-y-4 border-t border-white/10 pt-5" onClick={(e) => e.stopPropagation()}>
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-black/25 px-3 py-2.5">
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={extraCheese}
                  onChange={(e) => setExtraCheese(e.target.checked)}
                  className="size-4 rounded border-white/20 bg-black/40 accent-[#f0c76f]"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">
                  Extra cheese
                </span>
              </span>
              <span className="text-xs font-black text-[#ffe1a0]">+{formatPriceRupee(EXTRA_CHEESE_PRICE)}</span>
            </label>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Quantity</span>
              <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/30 p-1">
                <button
                  type="button"
                  onClick={decreaseQty}
                  className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-black text-[#ffe1a0]">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQty}
                  className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-[0.14em] text-white/40">Item total</span>
              <span className="font-black text-[#ffe1a0]">{formatPriceRupee(previewTotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]"
            >
              <ShoppingCart className="size-4" strokeWidth={2.5} />
              Add to cart
            </button>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
