import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingCart, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { BurgerStackPreview } from '../builder/BurgerStackPreview';
import { CustomizationPanel } from '../builder/CustomizationPanel';
import { TopBar } from '../layout/TopBar';
import { useCart } from '../../context/CartContext';
import { burgerProducts, findProductBySlug, reviews, slugifyName } from '../../data/catalog';
import { emptyCustomization, useBurgerCustomization } from '../../hooks/useBurgerCustomization';
import { formatPriceRupee } from '../../utils/price';

function QuantityControl({ quantity, setQuantity }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/30 p-1">
      <button
        type="button"
        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
        className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-[2.4rem] text-center text-sm font-black text-[#ffe1a0]">{quantity}</span>
      <button
        type="button"
        onClick={() => setQuantity((value) => value + 1)}
        className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = findProductBySlug(slug);
  const customization = useBurgerCustomization(product, emptyCustomization);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const recommended = useMemo(
    () => burgerProducts.filter((item) => item.slug !== slug).slice(0, 3),
    [slug],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#030405] px-5 py-32 text-center text-white">
        <TopBar navigate={navigate} variant="menu" />
        <h1 className="font-display text-5xl font-black">Burger not found</h1>
        <button
          type="button"
          onClick={() => navigate('/menu')}
          className="mt-8 rounded-full border border-[#f0c76f]/45 bg-[#f0c76f] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#130f08]"
        >
          Back to menu
        </button>
      </div>
    );
  }

  const lineTotal = customization.unitPrice * quantity;

  const handleAdd = () => {
    addToCart(product, quantity, {
      customizations: customization.selections,
      selectedOptions: customization.selectedOptions,
      summary: customization.summary,
      type: 'burger-detail',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-[#030405]"
    >
      <TopBar navigate={navigate} variant="menu" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_17%_20%,rgba(214,65,53,0.18),transparent_32rem),radial-gradient(circle_at_80%_12%,rgba(240,199,111,0.12),transparent_30rem)]" />

      <div className="relative z-10 mx-auto max-w-[98rem] px-4 pb-20 pt-28 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate('/menu')}
          className="mb-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/45 transition hover:text-[#ffe1a0]"
        >
          <ArrowLeft className="size-4" />
          Menu
        </button>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(28rem,0.95fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[8px] border border-white/10 bg-black/40 shadow-glass"
          >
            <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_44%,rgba(3,4,5,0.92)_100%)]" />
            <img src={product.image} alt={product.name} className="h-[30rem] w-full object-cover opacity-90 lg:h-[43rem]" />
            <div className="absolute bottom-6 left-6 right-6 z-20 grid gap-3 sm:grid-cols-3">
              {[
                ['Protein', product.protein],
                ['Calories', product.calories],
                ['Base', product.price],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[8px] border border-white/10 bg-black/38 p-4 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/38">{label}</p>
                  <p className="mt-1 text-xl font-black text-[#ffe1a0]">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-2xl sm:p-6"
            >
              <div className="mb-4 flex items-center gap-1 text-[#f0c76f]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" strokeWidth={1.8} />
                ))}
                <span className="ml-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">4.9 · 1,248 reviews</span>
              </div>
              <h1 className="font-display text-5xl font-black leading-none text-white sm:text-6xl">{product.name}</h1>
              <p className="mt-5 text-lg leading-8 text-white/62">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[product.carbs, product.fats, product.benefits?.[0] ?? 'Fresh prep'].map((value, index) => (
                  <div key={value} className="rounded-[8px] border border-white/10 bg-black/25 p-3">
                    <ShieldCheck className="mb-2 size-4 text-[#ffe1a0]" strokeWidth={1.8} />
                    <p className="text-xs font-bold text-white/62">{index === 0 ? 'Carbs' : index === 1 ? 'Fats' : 'Benefit'}</p>
                    <p className="mt-1 text-sm font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 xl:grid-cols-[0.86fr_1.14fr]"
            >
              <div className="rounded-[8px] border border-white/10 bg-[#050607]/72 p-4 shadow-glass backdrop-blur-2xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-[#f0c76f]">Animated layers</p>
                <BurgerStackPreview selections={customization.selections} lastChanged={customization.lastChanged} />
              </div>
              <CustomizationPanel customization={customization} compact />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.65 }}
              className="sticky bottom-4 z-20 rounded-[8px] border border-[#f0c76f]/24 bg-[#070808]/86 p-4 shadow-glass backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-white/38">Final total</p>
                  <motion.p key={lineTotal} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-3xl font-black text-[#ffe1a0]">
                    {formatPriceRupee(lineTotal)}
                  </motion.p>
                </div>
                <div className="flex items-center gap-3">
                  <QuantityControl quantity={quantity} setQuantity={setQuantity} />
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center gap-2 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-5 py-3.5 text-xs font-black uppercase tracking-[0.17em] text-[#130f08] shadow-glow transition hover:bg-[#ffe1a0]"
                  >
                    <ShoppingCart className="size-4" strokeWidth={2.5} />
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Recommended</p>
            <div className="mt-5 grid gap-3">
              {recommended.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(`/menu/${slugifyName(item.name)}`)}
                  className="flex items-center gap-4 rounded-[8px] border border-white/10 bg-black/24 p-3 text-left transition hover:border-[#f0c76f]/32 hover:bg-white/[0.06]"
                >
                  <img src={item.image} alt={item.name} className="size-20 rounded-[6px] object-cover" />
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-white">{item.name}</span>
                    <span className="mt-1 block text-xs text-white/45">{item.protein} · {item.price}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Reviews</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-[8px] border border-white/10 bg-black/24 p-4">
                  <div className="flex text-[#f0c76f]">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} className="size-3 fill-current" />
                    ))}
                  </div>
                  <h3 className="mt-3 text-sm font-black text-white">{review.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/36">{review.focus}</p>
                  <p className="mt-3 text-sm leading-6 text-white/55">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
