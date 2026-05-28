import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, CreditCard, MapPin, TicketPercent, Truck, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../layout/TopBar';
import { useCart } from '../../context/CartContext';
import { formatPriceRupee } from '../../utils/price';

const payments = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Wallet },
  { id: 'cod', label: 'COD', icon: Truck },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, itemCount, grandTotal, grandTotalLabel, clearCart } = useCart();
  const [payment, setPayment] = useState('card');
  const [coupon, setCoupon] = useState('PROTEIN10');
  const [success, setSuccess] = useState(false);

  const discount = useMemo(() => (coupon.trim().toUpperCase() === 'PROTEIN10' ? Math.round(grandTotal * 0.1) : 0), [coupon, grandTotal]);
  const delivery = grandTotal > 399 || grandTotal === 0 ? 0 : 39;
  const finalTotal = Math.max(0, grandTotal - discount + delivery);

  const placeOrder = (event) => {
    event.preventDefault();
    if (!lines.length) {
      navigate('/menu');
      return;
    }
    setSuccess(true);
    window.setTimeout(() => clearCart(), 900);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030405]">
      <TopBar navigate={navigate} variant="menu" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(214,65,53,0.16),transparent_30rem),radial-gradient(circle_at_84%_18%,rgba(240,199,111,0.12),transparent_30rem)]" />

      <AnimatePresence mode="wait">
        {success ? (
          <motion.section
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex min-h-screen items-center justify-center px-5 py-28 text-center"
          >
            <div className="max-w-2xl rounded-[8px] border border-[#f0c76f]/22 bg-white/[0.055] p-8 shadow-glass backdrop-blur-2xl sm:p-12">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="mx-auto grid size-20 place-items-center rounded-full border border-[#f0c76f]/35 bg-[#f0c76f]/14 text-[#ffe1a0] shadow-glow"
              >
                <BadgeCheck className="size-10" strokeWidth={1.8} />
              </motion.div>
              <h1 className="mt-7 font-display text-5xl font-black leading-none text-white sm:text-6xl">Order fired up</h1>
              <p className="mt-5 text-lg leading-8 text-white/62">Your ProteinBurger order is moving into the grill queue. Track the fake live kitchen flow next.</p>
              <button
                type="button"
                onClick={() => navigate('/tracking')}
                className="mt-8 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]"
              >
                Track order
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.form
            key="checkout"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            onSubmit={placeOrder}
            className="relative z-10 mx-auto grid max-w-[92rem] gap-7 px-4 pb-20 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-12"
          >
            <section className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-[#f0c76f]">Checkout</p>
                <h1 className="mt-4 font-display text-5xl font-black leading-none text-white sm:text-7xl">Complete the order</h1>
              </div>

              <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-xl sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <MapPin className="size-5 text-[#ffe1a0]" />
                  <h2 className="text-xl font-black text-white">Delivery details</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Full name', 'Phone', 'Address', 'Apartment / landmark'].map((label, index) => (
                    <label key={label} className={index > 1 ? 'sm:col-span-2' : ''}>
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/38">{label}</span>
                      <input
                        required={index < 3}
                        className="w-full rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#f0c76f]/45"
                        placeholder={label}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-xl sm:p-6">
                <h2 className="text-xl font-black text-white">Payment method</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {payments.map(({ id, label, icon: Icon }) => {
                    const active = payment === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPayment(id)}
                        className={`rounded-[8px] border p-4 text-left transition ${active ? 'border-[#f0c76f]/45 bg-[#f0c76f]/12 text-[#ffe1a0]' : 'border-white/10 bg-black/24 text-white/62 hover:border-white/20'}`}
                      >
                        <Icon className="mb-4 size-5" />
                        <span className="text-sm font-black">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside className="h-fit rounded-[8px] border border-white/10 bg-[#060708]/82 p-5 shadow-glass backdrop-blur-2xl lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Order summary</p>
              <h2 className="mt-2 text-2xl font-black text-white">{itemCount} items</h2>

              <div className="mt-5 max-h-[20rem] space-y-3 overflow-y-auto pr-1">
                {lines.length ? lines.map((line) => (
                  <div key={line.key} className="flex gap-3 rounded-[8px] border border-white/10 bg-white/[0.035] p-3">
                    <img src={line.product.image} alt={line.product.name} className="size-14 rounded-[6px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-white">{line.product.name}</p>
                      <p className="mt-1 text-xs text-white/42">Qty {line.quantity}</p>
                    </div>
                    <p className="text-sm font-black text-[#ffe1a0]">{formatPriceRupee(line.lineTotal)}</p>
                  </div>
                )) : (
                  <p className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-sm text-white/45">Your cart is empty.</p>
                )}
              </div>

              <label className="mt-5 block">
                <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/38">
                  <TicketPercent className="size-4" /> Coupon
                </span>
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  className="w-full rounded-[8px] border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white outline-none transition focus:border-[#f0c76f]/45"
                />
              </label>

              <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="flex justify-between text-white/52"><span>Subtotal</span><span>{grandTotalLabel}</span></div>
                <div className="flex justify-between text-white/52"><span>Discount</span><span>-{formatPriceRupee(discount)}</span></div>
                <div className="flex justify-between text-white/52"><span>Delivery</span><span>{delivery ? formatPriceRupee(delivery) : 'Free'}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-black text-[#ffe1a0]"><span>Total</span><span>{formatPriceRupee(finalTotal)}</span></div>
              </div>

              <button type="submit" className="mt-6 w-full rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] py-4 text-xs font-black uppercase tracking-[0.2em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]">
                Place order
              </button>
            </aside>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
