import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSizzleSound } from '../../hooks/useSizzleSound';
import { SteamEffect } from './SteamEffect';

export function ProductCard({ item, index = 0, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const playSizzle = useSizzleSound();

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
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      role="button"
      tabIndex={0}
      className="product-card group relative cursor-pointer overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] shadow-glass backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,199,111,0.85),transparent)]" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#d64135]/10 blur-3xl" />
      </div>

      <div className="reflection-sweep" />

      <div className="relative z-20 aspect-[1.05] overflow-hidden bg-black">
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
      </div>

      <div className="relative z-20 p-5">
        <div className="flex min-h-[3.25rem] items-start justify-between gap-3">
          <h2 className="text-pretty text-xl font-black leading-tight transition-colors duration-300 group-hover:text-[#ffe1a0]">
            {item.name}
          </h2>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/56">
            {item.calories}
          </span>
        </div>
        <p className="mt-4 min-h-[4.75rem] text-sm leading-6 text-white/58">{item.description}</p>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c76f]/55">Tap for nutrition</p>
      </div>
    </motion.article>
  );
}
