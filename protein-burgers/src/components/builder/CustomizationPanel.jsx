import { AnimatePresence, motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';
import { formatPriceRupee } from '../../utils/price';

function isSelected(selections, group, optionId) {
  const value = selections[group.id];
  return Array.isArray(value) ? value.includes(optionId) : value === optionId;
}

export function CustomizationPanel({ customization, compact = false }) {
  const { groups, selections, basePrice, addonTotal, unitPrice, toggleOption, resetToDefault } = customization;

  return (
    <div className="rounded-[8px] border border-white/10 bg-[#050607]/72 p-4 shadow-glass backdrop-blur-2xl sm:p-5">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Live customization</p>
          <h2 className="mt-2 text-2xl font-black text-white">Build the stack</h2>
        </div>
        <button
          type="button"
          onClick={resetToDefault}
          className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white/55 transition hover:border-[#f0c76f]/40 hover:text-[#ffe1a0]"
          aria-label="Reset customization"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>

      <div className={`${compact ? 'max-h-[30rem]' : 'max-h-[38rem]'} mt-5 space-y-5 overflow-y-auto pr-1`}> 
        {groups.map((group) => (
          <section key={group.id} className="rounded-[8px] border border-white/10 bg-black/24 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white/70">{group.label}</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/34">
                {group.type === 'single' ? 'Choose one' : 'Multi select'}
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {group.options.map((option) => {
                const selected = isSelected(selections, group, option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleOption(group, option.id)}
                    className={`group relative overflow-hidden rounded-[8px] border p-3 text-left transition duration-300 ${
                      selected
                        ? 'border-[#f0c76f]/52 bg-[#f0c76f]/13 text-[#ffe1a0] shadow-[0_0_26px_rgba(240,199,111,0.08)]'
                        : 'border-white/8 bg-white/[0.035] text-white/68 hover:border-white/18 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] opacity-0 transition group-hover:opacity-100" />
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block text-sm font-black leading-tight">{option.name}</span>
                        <span className="mt-1 block text-xs leading-5 text-white/43">{option.note}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-black text-[#ffe1a0]">
                        +{formatPriceRupee(option.price)}
                        <AnimatePresence>
                          {selected ? (
                            <motion.span
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              className="grid size-5 place-items-center rounded-full bg-[#f0c76f] text-[#130f08]"
                            >
                              <Check className="size-3" strokeWidth={3} />
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-5 rounded-[8px] border border-[#f0c76f]/20 bg-[#f0c76f]/10 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/46">
          <span>Base</span>
          <span>{formatPriceRupee(basePrice)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/46">
          <span>Add-ons</span>
          <span>{formatPriceRupee(addonTotal)}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#f0c76f]">Unit total</span>
          <motion.span
            key={unitPrice}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-black text-[#ffe1a0]"
          >
            {formatPriceRupee(unitPrice)}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
