import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BurgerStackPreview } from '../builder/BurgerStackPreview';
import { CustomizationPanel } from '../builder/CustomizationPanel';
import { TopBar } from '../layout/TopBar';
import { useCart } from '../../context/CartContext';
import { builderBaseProduct, categories, defaultCustomization, slugifyName } from '../../data/catalog';
import { useBurgerCustomization } from '../../hooks/useBurgerCustomization';
import { formatPriceRupee, parsePriceRupee } from '../../utils/price';

function QuantityControl({ quantity, setQuantity }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/30 p-1">
      <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Decrease quantity">
        <Minus className="size-4" />
      </button>
      <span className="min-w-[2.4rem] text-center text-sm font-black text-[#ffe1a0]">{quantity}</span>
      <button type="button" onClick={() => setQuantity((value) => value + 1)} className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Increase quantity">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function ComboBuilder() {
  const { addToCart } = useCart();
  const burgers = categories.find((category) => category.title === 'Burgers')?.items ?? [];
  const fries = categories.find((category) => category.title === 'Fries')?.items ?? [];
  const drinks = categories.find((category) => category.title === 'Drinks')?.items ?? [];
  const [selected, setSelected] = useState({ burger: burgers[0], fries: fries[0], drink: drinks[0] });

  const pricing = useMemo(() => {
    const rawTotal = parsePriceRupee(selected.burger?.price) + parsePriceRupee(selected.fries?.price) + parsePriceRupee(selected.drink?.price);
    const discount = Math.round(rawTotal * 0.12);
    return { rawTotal, discount, total: rawTotal - discount };
  }, [selected]);

  const addCombo = () => {
    const comboProduct = {
      name: `Custom Combo · ${selected.burger.name}`,
      description: `${selected.burger.name}, ${selected.fries.name}, and ${selected.drink.name} with automatic combo value.`,
      protein: selected.burger.protein,
      calories: 'Combo',
      price: formatPriceRupee(pricing.total),
      image: selected.burger.image,
      category: 'Combo Meals',
      combo: true,
    };

    addToCart(comboProduct, 1, {
      variant: `combo-${slugifyName(selected.burger.name)}-${slugifyName(selected.fries.name)}-${slugifyName(selected.drink.name)}`,
      selectedOptions: [],
      summary: [selected.burger.name, selected.fries.name, selected.drink.name, `Saved ${formatPriceRupee(pricing.discount)}`],
      type: 'combo-builder',
    });
  };

  const groups = [
    ['burger', 'Burger', burgers],
    ['fries', 'Fries', fries],
    ['drink', 'Drink', drinks],
  ];

  return (
    <section className="mt-16 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#f0c76f]">Combo builder</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-none text-white sm:text-5xl">Pair the full meal</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">Select a burger, fries, and drink. The combo discount updates instantly for a delivery-app style flow.</p>
        </div>
        <div className="rounded-[8px] border border-[#f0c76f]/20 bg-[#f0c76f]/10 p-4 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-white/42">Combo total</p>
          <p className="text-3xl font-black text-[#ffe1a0]">{formatPriceRupee(pricing.total)}</p>
          <p className="mt-1 text-xs font-bold text-[#f0c76f]">Saved {formatPriceRupee(pricing.discount)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {groups.map(([key, label, items]) => (
          <div key={key} className="rounded-[8px] border border-white/10 bg-black/24 p-3">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-white/44">{label}</p>
            <div className="grid gap-2">
              {items.map((item) => {
                const active = selected[key]?.name === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelected((current) => ({ ...current, [key]: item }))}
                    className={`flex items-center gap-3 rounded-[8px] border p-3 text-left transition ${active ? 'border-[#f0c76f]/45 bg-[#f0c76f]/12' : 'border-white/8 bg-white/[0.035] hover:border-white/18'}`}
                  >
                    <img src={item.image} alt={item.name} className="size-14 rounded-[6px] object-cover" />
                    <span className="min-w-0">
                      <span className="block text-sm font-black text-white">{item.name}</span>
                      <span className="mt-1 block text-xs text-white/45">{item.price} · {item.protein}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/50">
          Regular total {formatPriceRupee(pricing.rawTotal)} · automatic 12% combo discount
        </p>
        <button type="button" onClick={addCombo} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-6 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]">
          <ShoppingCart className="size-4" strokeWidth={2.5} />
          Add combo
        </button>
      </div>
    </section>
  );
}

export function BuildYourOwnPage() {
  const navigate = useNavigate();
  const customization = useBurgerCustomization(builderBaseProduct, defaultCustomization);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const total = customization.unitPrice * quantity;

  const handleAdd = () => {
    addToCart(builderBaseProduct, quantity, {
      customizations: customization.selections,
      selectedOptions: customization.selectedOptions,
      summary: customization.summary,
      type: 'custom-builder',
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-screen overflow-hidden bg-[#030405]">
      <TopBar navigate={navigate} variant="build" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(240,199,111,0.13),transparent_30rem),radial-gradient(circle_at_82%_18%,rgba(214,65,53,0.16),transparent_34rem)]" />

      <div className="relative z-10 mx-auto max-w-[98rem] px-4 pb-20 pt-28 sm:px-8 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(30rem,0.9fr)] lg:items-start">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl lg:sticky lg:top-28 lg:p-7">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#f0c76f]">Build your own</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-none text-white sm:text-7xl">Design your protein stack</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">Choose bread, cheese, sauces, patty, cleaner oil finish, and add-ons. Every layer animates into the burger and the price updates live.</p>

            <BurgerStackPreview selections={customization.selections} lastChanged={customization.lastChanged} />

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {['Live pricing', 'Animated layers', 'Persistent cart'].map((label) => (
                <div key={label} className="rounded-[8px] border border-white/10 bg-black/26 p-4">
                  <Sparkles className="mb-3 size-4 text-[#ffe1a0]" />
                  <p className="text-sm font-black text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <CustomizationPanel customization={customization} />
            <div className="sticky bottom-4 z-20 rounded-[8px] border border-[#f0c76f]/24 bg-[#070808]/88 p-4 shadow-glass backdrop-blur-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/38">Order total</p>
                  <motion.p key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-black text-[#ffe1a0]">{formatPriceRupee(total)}</motion.p>
                </div>
                <div className="flex items-center gap-3">
                  <QuantityControl quantity={quantity} setQuantity={setQuantity} />
                  <button type="button" onClick={handleAdd} className="inline-flex items-center gap-2 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-5 py-3.5 text-xs font-black uppercase tracking-[0.17em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]">
                    <ShoppingCart className="size-4" strokeWidth={2.5} />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ComboBuilder />
      </div>
    </motion.div>
  );
}
