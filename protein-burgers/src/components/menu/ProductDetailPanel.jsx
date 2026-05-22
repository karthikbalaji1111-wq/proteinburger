import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function PanelContent({ item, onClose }) {
  const caloriesNumeric = item.calories?.replace(/\s*kcal/i, '') ?? '—';

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, x: 48, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="detail-panel fixed bottom-0 right-0 z-[70] w-full max-w-md overflow-hidden rounded-t-[12px] border border-white/12 bg-[#0a0b0d]/88 shadow-glass backdrop-blur-2xl sm:bottom-8 sm:right-8 sm:rounded-[12px]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,199,111,0.75),transparent)]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition hover:text-white"
        >
          <X className="size-5" />
        </button>

        <div className="relative aspect-[1.2] overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(3,4,5,0.92)_100%)]" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Nutrition panel</p>
            <h3 className="mt-2 text-2xl font-black text-white">{item.name}</h3>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Protein', item.protein],
              ['Carbs', item.carbs],
              ['Calories', caloriesNumeric],
              ['Fats', item.fats],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[8px] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{label}</p>
                <p className="mt-1 text-xl font-black text-[#ffe1a0]">{value ?? '—'}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">Ingredients</p>
            <ul className="mt-2 space-y-1.5 text-sm text-white/62">
              {(item.ingredients ?? []).map((ing) => (
                <li key={ing}>• {ing}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">Sauces</p>
            <ul className="mt-2 space-y-1.5 text-sm text-white/62">
              {(item.sauces ?? []).map((sauce) => (
                <li key={sauce}>• {sauce}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/42">Health benefits</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(item.benefits ?? []).map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-[#f0c76f]/25 bg-[#f0c76f]/10 px-3 py-1 text-xs font-semibold text-[#ffe1a0]"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm leading-6 text-white/54">{item.description}</p>
        </div>
      </motion.aside>
    </>
  );
}

export function ProductDetailPanel({ item, onClose }) {
  return (
    <AnimatePresence>
      {item ? <PanelContent key={item.name} item={item} onClose={onClose} /> : null}
    </AnimatePresence>
  );
}
