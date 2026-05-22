import { motion } from 'framer-motion';
import { ArrowRight, Beef, Droplets, Egg, Leaf, ShieldCheck, Wheat } from 'lucide-react';
import { ingredients, philosophyStats, sauces } from '../../data/catalog';

const ingredientIcons = {
  'Grilled Chicken': Beef,
  'Paneer Protein': Wheat,
  'Egg Protein': Egg,
  'Fresh Vegetables': Leaf,
};

export function HeroSection({ heroRef, navigate }) {
  return (
    <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,190,93,0.12),transparent_31%),linear-gradient(180deg,rgba(3,4,5,0.35)_0%,rgba(3,4,5,0.72)_63%,#030405_100%)]" />
      <div className="smoke-layer opacity-60" />

      <div className="hero-copy relative z-10 flex min-h-screen items-center justify-center px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-5xl flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.8 }}
            className="mb-5 text-xs font-black uppercase tracking-[0.42em] text-[#f0c76f]"
          >
            Performance food, filmed in shadow
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 1 }}
            className="max-w-5xl text-balance font-display text-6xl font-black leading-[0.9] sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            Protein Burgers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.9 }}
            className="mt-7 max-w-3xl text-balance text-xl font-semibold text-white/88 sm:text-2xl"
          >
            Premium High-Protein Fast Food
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.9 }}
            className="mt-5 max-w-3xl text-pretty text-base leading-8 text-white/68 sm:text-lg"
          >
            Built for athletes, fitness enthusiasts, and modern lifestyles using high-quality
            ingredients and healthier alternatives.
          </motion.p>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/menu')}
            className="group mt-11 inline-flex items-center gap-3 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#130f08] shadow-glow transition duration-300 hover:bg-[#ffe1a0]"
          >
            Explore Menu
            <ArrowRight className="size-4 transition duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export function StoryIntro() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_40%,rgba(214,65,53,0.1),transparent_30rem),radial-gradient(circle_at_78%_40%,rgba(94,136,91,0.1),transparent_30rem)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">Nutrition philosophy</p>
          <h2 className="story-reveal mt-5 max-w-5xl text-balance font-display text-4xl font-black leading-none sm:text-6xl lg:text-7xl">
            Fast food should move with your lifestyle, not slow it down.
          </h2>
        </div>
        <div className="story-reveal rounded-[8px] border border-white/10 bg-[#030405]/55 p-5 shadow-glass backdrop-blur-xl sm:p-6">
          <p className="text-pretty text-lg leading-8 text-white/68">
            Protein Burgers treats indulgence as a design problem: keep the cinematic flavor, raise
            the protein, clean up the oils, and make every build feel premium.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {philosophyStats.map((stat) => (
              <div key={stat.label} className="rounded-[8px] border border-white/10 bg-black/24 p-4">
                <p className="text-2xl font-black text-[#ffe1a0]">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/44">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NoPalmOilSection() {
  const oils = ['sunflower oil', 'olive oil blends', 'rice bran oil'];
  const riskNotes = [
    'Processed oil density can make fast food feel heavier.',
    'Excess saturated fat intake can contribute to unhealthy cholesterol patterns.',
    'Cleaner oil choices support a fresher bite and better everyday balance.',
  ];
  const particlePositions = [
    ['11%', '24%', '0s'],
    ['22%', '70%', '0.8s'],
    ['47%', '76%', '0.4s'],
    ['71%', '62%', '1.8s'],
    ['84%', '34%', '0.2s'],
  ];

  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(214,65,53,0.18),transparent_30rem),radial-gradient(circle_at_78%_28%,rgba(240,199,111,0.1),transparent_28rem),linear-gradient(180deg,#030405_0%,#100604_50%,#030405_100%)]" />
      <div className="story-parallax oil-drop left-[7%] top-[18%]" />
      <div className="story-parallax oil-drop right-[10%] top-[24%] scale-75" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="story-reveal relative min-h-[32rem] overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_52%_48%,rgba(214,65,53,0.18),transparent_28rem),rgba(3,4,5,0.55)] shadow-glass backdrop-blur-xl">
          <div className="absolute inset-x-10 top-10 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(255,174,118,0.78),transparent)]" />
          <img
            src="/health/palm-oil-heart.png"
            alt="Medical-style heart visual with partially blocked arteries"
            loading="lazy"
            decoding="async"
            className="health-heart-visual story-parallax absolute inset-0 h-[112%] w-full object-cover"
          />
          <div className="heart-pulse-ring" />
          <div className="heart-pulse-ring heart-pulse-ring-delayed" />
          <div className="artery-scanline" />
          {particlePositions.map(([x, y, delay]) => (
            <span
              key={`${x}-${y}`}
              className="cholesterol-particle"
              style={{ '--particle-x': x, '--particle-y': y, '--particle-delay': delay }}
            />
          ))}
          <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 sm:grid-cols-3">
            {oils.map((oil) => (
              <div key={oil} className="rounded-[8px] border border-[#f0c76f]/18 bg-black/42 p-4 backdrop-blur-xl">
                <div className="mb-3 inline-grid size-8 place-items-center rounded-full bg-[#f0c76f]/14 text-[#ffe1a0]">
                  <Droplets className="size-4" strokeWidth={2} />
                </div>
                <p className="text-sm font-black capitalize text-white/88">{oil}</p>
                <p className="mt-2 text-xs leading-5 text-white/50">Cleaner oil alternative</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">Oil quality</p>
          <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
            No Palm Oil. No Compromise.
          </h2>
          <p className="story-reveal mt-7 text-pretty text-lg leading-8 text-white/66">
            Excessive use of heavily processed palm oil can make fast food feel cheaper and heavier.
            Diets high in processed saturated fats can contribute to cholesterol buildup risks over
            time.
          </p>
          <div className="story-reveal mt-8 grid gap-3">
            {riskNotes.map((note) => (
              <div key={note} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-[#030405]/50 p-4 backdrop-blur-xl">
                <span className="mt-1 size-2.5 rounded-full bg-[#f0c76f] shadow-glow" />
                <p className="text-sm leading-6 text-white/62">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function IngredientsSection() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">High protein ingredients</p>
        <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
          Engineered for Performance
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ingredients.map(({ title, grams, benefit, image }) => {
            const Icon = ingredientIcons[title] ?? Leaf;
            return (
              <motion.article
                key={title}
                whileHover={{ y: -10 }}
                className="story-reveal group overflow-hidden rounded-[8px] border border-white/10 bg-[#030405]/55 shadow-glass backdrop-blur-xl"
              >
                <div className="relative aspect-[1.05] overflow-hidden bg-black">
                  <img src={image} alt={title} loading="lazy" className="story-parallax h-[112%] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.86)_100%)]" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full border border-white/12 bg-black/35 backdrop-blur-md">
                      <Icon className="size-5 text-[#ffe1a0]" strokeWidth={1.8} />
                    </span>
                    <span className="text-2xl font-black text-white">{grams}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/56">{benefit}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SaucesSection() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">Sauce laboratory</p>
          <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
            Premium Signature Sauces
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sauces.map((sauce, index) => (
            <motion.article
              key={sauce.name}
              whileHover={{ y: -8, scale: 1.015 }}
              className={`story-reveal group relative min-h-48 overflow-hidden rounded-[8px] border border-white/10 bg-gradient-to-br ${sauce.tone} p-5 shadow-glass backdrop-blur-xl`}
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">0{index + 1}</p>
              <h3 className="mt-6 text-2xl font-black text-white">{sauce.name}</h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{sauce.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AthleteSection() {
  const points = [
    'High protein meals',
    'Cleaner ingredients',
    'Balanced nutrition',
    'Gym-friendly fast food',
    'Performance-focused meals',
  ];

  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">Athlete-focused fast food</p>
        <h2 className="story-reveal mt-5 text-balance font-display text-5xl font-black leading-none sm:text-7xl">
          Fast Food Built for Athletes
        </h2>
        <div className="story-reveal mt-12 grid gap-3 sm:grid-cols-5">
          {points.map((point) => (
            <div key={point} className="rounded-[8px] border border-white/10 bg-[#030405]/55 p-4 backdrop-blur-xl">
              <ShieldCheck className="mx-auto size-5 text-[#ffe1a0]" strokeWidth={1.8} />
              <p className="mt-3 text-sm font-bold leading-5 text-white/72">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingCta({ navigate }) {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 pb-24 pt-12 sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/10 bg-[#030405]/60 px-5 py-16 text-center shadow-glass backdrop-blur-xl sm:px-8 lg:py-24">
        <h2 className="story-reveal font-display text-4xl font-black leading-none sm:text-6xl">
          Choose the category. Build the meal. Keep the performance.
        </h2>
        <motion.button
          type="button"
          whileHover={{ y: -4, scale: 1.025 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/menu')}
          className="story-reveal group mt-10 inline-flex items-center gap-3 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-[#130f08] shadow-glow"
        >
          Explore Full Menu
          <ArrowRight className="size-5 transition duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </motion.button>
      </div>
    </section>
  );
}
