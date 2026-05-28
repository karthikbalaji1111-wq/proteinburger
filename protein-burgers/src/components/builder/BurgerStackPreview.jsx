import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BottomBunSVG,
  CheeseSVG,
  LettuceSVG,
  OnionsSVG,
  PattySVG,
  SauceSVG,
  TomatoesSVG,
  TopBunSVG,
} from '../burger/BurgerSVGs';

function has(selections, group, id) {
  const value = selections?.[group];
  return Array.isArray(value) ? value.includes(id) : value === id;
}

function Layer({ children, top, z, changedKey, className = '' }) {
  return (
    <motion.div
      key={changedKey}
      initial={{ opacity: 0, x: '-50%', y: -58, scale: 0.92, rotate: -3 }}
      animate={{ opacity: 1, x: '-50%', y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, x: '-50%', y: 22, scale: 0.94 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute left-1/2 w-[82%] ${className}`}
      style={{ top, zIndex: z, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

function AddOnChip({ type, top, left, delay = 0 }) {
  const styles = {
    jalapenos: 'border-[#74c767]/55 bg-[#3c9f3d] shadow-[0_0_18px_rgba(116,199,103,0.26)]',
    olives: 'border-[#3d4631]/70 bg-[#1f2518] shadow-[0_0_18px_rgba(120,144,78,0.2)]',
    mushrooms: 'border-[#9f8064]/55 bg-[#6f4c36] shadow-[0_0_18px_rgba(159,128,100,0.24)]',
    bacon: 'border-[#d06f4f]/55 bg-[#8e2d20] shadow-[0_0_18px_rgba(208,111,79,0.28)]',
    egg: 'border-[#ffe1a0]/55 bg-[#f7f1dc] shadow-[0_0_18px_rgba(255,225,160,0.22)]',
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
      className={`absolute h-3 w-9 rounded-full border ${styles[type] ?? styles.jalapenos}`}
      style={{ top, left }}
    />
  );
}

export function BurgerStackPreview({ selections, compact = false, lastChanged }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const layerState = useMemo(() => {
    const cheeseCount = Math.min(3, (selections?.cheese?.length ?? 0) + (has(selections, 'addons', 'extra-cheese') ? 1 : 0));
    const pattyCount = has(selections, 'addons', 'double-patty') ? 2 : 1;

    return {
      cheeseCount,
      pattyCount,
      sauce: (selections?.sauces?.length ?? 0) > 0,
      lettuce: has(selections, 'addons', 'lettuce'),
      onions: has(selections, 'addons', 'caramelized-onions'),
      jalapenos: has(selections, 'addons', 'jalapenos'),
      olives: has(selections, 'addons', 'olives'),
      mushrooms: has(selections, 'addons', 'mushrooms'),
      bacon: has(selections, 'addons', 'bacon'),
      egg: has(selections, 'addons', 'fried-egg'),
    };
  }, [selections]);

  const handlePointerMove = (event) => {
    if (compact) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -7, ry: px * 8 });
  };

  return (
    <div
      className={`burger-stack-preview relative mx-auto ${compact ? 'h-24 w-28' : 'h-[31rem] w-full max-w-[30rem]'}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
    >
      <div className="absolute inset-x-8 bottom-8 h-10 rounded-full bg-black/70 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(240,199,111,0.15),transparent_42%),radial-gradient(circle_at_52%_75%,rgba(214,65,53,0.16),transparent_34%)]" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence>
          <Layer top={compact ? 58 : 365} z={1} changedKey={`bottom-${lastChanged}`}>
            <BottomBunSVG className="h-full w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]" />
          </Layer>

          {Array.from({ length: layerState.pattyCount }).map((_, index) => (
            <Layer key={`patty-${index}`} top={compact ? 46 - index * 7 : 316 - index * 34} z={3 + index} changedKey={`patty-${index}-${lastChanged}`}>
              <PattySVG className="h-full w-full drop-shadow-[0_14px_16px_rgba(0,0,0,0.46)]" />
            </Layer>
          ))}

          {Array.from({ length: layerState.cheeseCount }).map((_, index) => (
            <Layer key={`cheese-${index}`} top={compact ? 40 - index * 5 : 290 - index * 21} z={8 + index} changedKey={`cheese-${index}-${lastChanged}`} className="origin-center">
              <CheeseSVG className="h-full w-full drop-shadow-[0_12px_12px_rgba(198,96,0,0.25)]" />
            </Layer>
          ))}

          {layerState.lettuce ? (
            <Layer top={compact ? 35 : 253} z={12} changedKey={`lettuce-${lastChanged}`}>
              <LettuceSVG className="h-full w-full" />
            </Layer>
          ) : null}

          {layerState.sauce ? (
            <Layer top={compact ? 32 : 236} z={13} changedKey={`sauce-${lastChanged}`}>
              <motion.div animate={{ x: [0, 4, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <SauceSVG className="h-full w-full drop-shadow-[0_0_16px_rgba(227,95,45,0.22)]" />
              </motion.div>
            </Layer>
          ) : null}

          <Layer top={compact ? 27 : 205} z={14} changedKey={`tomato-${lastChanged}`}>
            <TomatoesSVG className="h-full w-full" />
          </Layer>

          {layerState.onions ? (
            <Layer top={compact ? 23 : 181} z={15} changedKey={`onions-${lastChanged}`}>
              <OnionsSVG className="h-full w-full" />
            </Layer>
          ) : null}

          {layerState.jalapenos ? <AddOnChip type="jalapenos" top={compact ? 36 : 236} left="31%" /> : null}
          {layerState.olives ? <AddOnChip type="olives" top={compact ? 33 : 220} left="54%" delay={0.04} /> : null}
          {layerState.mushrooms ? <AddOnChip type="mushrooms" top={compact ? 42 : 262} left="42%" delay={0.08} /> : null}
          {layerState.bacon ? <AddOnChip type="bacon" top={compact ? 31 : 210} left="38%" delay={0.1} /> : null}
          {layerState.egg ? <AddOnChip type="egg" top={compact ? 25 : 186} left="47%" delay={0.12} /> : null}

          <Layer top={compact ? 8 : 96} z={20} changedKey={`top-${selections?.bread}-${lastChanged}`}>
            <TopBunSVG className="h-full w-full drop-shadow-[0_18px_18px_rgba(0,0,0,0.38)]" />
          </Layer>
        </AnimatePresence>
      </motion.div>

      {!compact ? (
        <div className="pointer-events-none absolute inset-x-10 bottom-10 h-px bg-[linear-gradient(90deg,transparent,rgba(240,199,111,0.75),transparent)]" />
      ) : null}
    </div>
  );
}
