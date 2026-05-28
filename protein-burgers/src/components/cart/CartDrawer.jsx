import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BurgerStackPreview } from '../builder/BurgerStackPreview';
import { useCart } from '../../context/CartContext';
import { EXTRA_CHEESE_PRICE, formatPriceRupee } from '../../utils/price';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    lines,
    isOpen,
    closeCart,
    setQuantity,
    setExtraCheese,
    removeFromCart,
    clearCart,
    itemCount,
    grandTotalLabel,
    grandTotal,
  } = useCart();

  const goToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-black/65 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="cart-drawer fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#08090b]/95 shadow-glass backdrop-blur-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,199,111,0.75),transparent)]" />

            <header className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border border-[#f0c76f]/35 bg-[#f0c76f]/12 text-[#ffe1a0]">
                  <ShoppingBag className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Your order</p>
                  <h2 className="text-lg font-black text-white">Cart ({itemCount})</h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white/70 transition hover:text-white"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full min-h-[14rem] flex-col items-center justify-center text-center">
                  <ShoppingBag className="size-12 text-white/20" strokeWidth={1.5} />
                  <p className="mt-4 text-sm font-semibold text-white/55">Your cart is empty</p>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-white/38">
                    Add burgers from the menu with your preferred quantity and extras.
                  </p>
                </div>
              ) : (
                <motion.ul layout className="space-y-4">
                  {lines.map((line) => (
                    <motion.li
                      key={line.key}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      className="cart-line-item rounded-[8px] border border-white/10 bg-white/[0.04] p-3"
                    >
                      <div className="flex gap-3">
                        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-[6px] border border-white/10 bg-black/35">
                          {line.customizations ? (
                            <BurgerStackPreview selections={line.customizations} compact lastChanged={line.key} />
                          ) : (
                            <img
                              src={line.product.image}
                              alt={line.product.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-black leading-tight text-white">{line.product.name}</h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(line.key)}
                              className="shrink-0 text-white/35 transition hover:text-red-300"
                              aria-label={`Remove ${line.product.name}`}
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/48">
                            {line.summary?.length
                              ? line.summary.slice(0, 4).join(' · ')
                              : line.extraCheese
                                ? `Extra cheese (+${formatPriceRupee(EXTRA_CHEESE_PRICE)})`
                                : line.product.description}
                          </p>

                          {!line.customizations && line.type === 'menu' ? (
                            <label className="mt-2 flex cursor-pointer items-center gap-2">
                              <input
                                type="checkbox"
                                checked={line.extraCheese}
                                onChange={(e) => setExtraCheese(line.key, e.target.checked)}
                                className="size-4 rounded border-white/20 bg-black/40 accent-[#f0c76f]"
                              />
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                                Add extra cheese
                              </span>
                            </label>
                          ) : null}

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/30 p-1">
                              <button
                                type="button"
                                onClick={() => setQuantity(line.key, line.quantity - 1)}
                                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="min-w-[2rem] text-center text-sm font-black text-[#ffe1a0]">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQuantity(line.key, line.quantity + 1)}
                                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                            <p className="text-sm font-black text-[#ffe1a0]">
                              {formatPriceRupee(line.lineTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            <footer className="border-t border-white/10 px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Grand total</span>
                <span className="text-2xl font-black text-[#ffe1a0]">{grandTotalLabel}</span>
              </div>
              {lines.length > 0 ? (
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={goToCheckout}
                    className="w-full rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] py-3.5 text-sm font-black uppercase tracking-[0.18em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]"
                  >
                    Checkout · {grandTotalLabel}
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full rounded-full border border-white/12 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white/50 transition hover:border-white/22 hover:text-white/75"
                  >
                    Clear cart
                  </button>
                </div>
              ) : null}
              {grandTotal > 0 ? (
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/32">
                  Prices update instantly as you edit your order
                </p>
              ) : null}
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
