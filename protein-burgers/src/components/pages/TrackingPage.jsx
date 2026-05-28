import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, ChefHat, Flame, Home, Navigation, PackageCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../layout/TopBar';

const steps = [
  { label: 'Preparing', detail: 'Kitchen is weighing sauces and prepping the protein stack.', icon: ChefHat },
  { label: 'Grilling', detail: 'Patty is on heat with the selected cleaner oil finish.', icon: Flame },
  { label: 'Packing', detail: 'Order is being sealed with sides, drinks, and thermal wrap.', icon: Box },
  { label: 'Out for delivery', detail: 'Rider is moving through the final delivery route.', icon: Navigation },
];

export function TrackingPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => Math.min(steps.length - 1, value + 1));
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030405]">
      <TopBar navigate={navigate} variant="menu" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(240,199,111,0.16),transparent_30rem),radial-gradient(circle_at_20%_62%,rgba(214,65,53,0.14),transparent_34rem)]" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-28 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-[#f0c76f]">Live kitchen tracker</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-none text-white sm:text-7xl">Your order is moving</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/62">A cinematic fake live tracker for the full ordering flow, from prep table to delivery route.</p>
        </motion.div>

        <section className="mt-12 rounded-[8px] border border-white/10 bg-white/[0.045] p-5 shadow-glass backdrop-blur-2xl sm:p-7">
          <div className="relative mb-10 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[#f0c76f] shadow-glow"
              animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;
              const isDone = active > index;
              return (
                <motion.article
                  key={step.label}
                  animate={{ y: isActive ? -8 : 0, opacity: active >= index ? 1 : 0.45 }}
                  className={`rounded-[8px] border p-5 transition ${isActive ? 'border-[#f0c76f]/50 bg-[#f0c76f]/12' : isDone ? 'border-white/16 bg-white/[0.055]' : 'border-white/10 bg-black/24'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`grid size-12 place-items-center rounded-full border ${isActive ? 'border-[#f0c76f]/45 bg-[#f0c76f]/18 text-[#ffe1a0]' : 'border-white/12 bg-black/30 text-white/55'}`}>
                      {isDone ? <PackageCheck className="size-5" /> : <Icon className="size-5" />}
                    </span>
                    {isActive ? <span className="size-2.5 rounded-full bg-[#f0c76f] shadow-glow" /> : null}
                  </div>
                  <h2 className="mt-5 text-xl font-black text-white">{step.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/55">{step.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => navigate('/')} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl transition hover:border-[#f0c76f]/40 hover:text-[#ffe1a0]">
            <Home className="size-4" />
            Back home
          </button>
        </div>
      </main>
    </div>
  );
}
