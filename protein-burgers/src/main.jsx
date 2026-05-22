import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowLeft,
  ArrowRight,
  Beef,
  Droplets,
  Egg,
  Leaf,
  Menu as MenuIcon,
  ShieldCheck,
  Wheat,
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const asset = (path) => path;

const categories = [
  {
    title: 'Burgers',
    eyebrow: 'Signature stack',
    summary: 'Gourmet patties, clean sauces, and protein-first builds with a glossy flame-finished finish.',
    items: [
      {
        name: 'Mexicana Paneer Burger',
        description: 'Charred paneer slab, pico crunch, lettuce, and smoky chipotle yoghurt sauce.',
        protein: '32g',
        calories: '520 kcal',
        price: '₹189',
        image: asset('/food/mexicana-paneer-burger.webp'),
      },
      {
        name: 'Korean Paneer Burger',
        description: 'Gochujang-glazed paneer, sesame slaw, scallions, and toasted brioche.',
        protein: '34g',
        calories: '545 kcal',
        price: '₹209',
        image: asset('/food/korean-paneer-burger.webp'),
      },
      {
        name: 'Spicy Paneer Burger',
        description: 'Pepper-seared paneer, jalapeno relish, tomato, onion, and heat-balanced sauce.',
        protein: '31g',
        calories: '505 kcal',
        price: '₹179',
        image: asset('/food/spicy-paneer-burger.webp'),
      },
      {
        name: 'Classic Egg Burger',
        description: 'Soft egg stack, crisp greens, tomato, and a rich protein mayo finish.',
        protein: '28g',
        calories: '470 kcal',
        price: '₹159',
        image: asset('/food/classic-egg-burger.webp'),
      },
      {
        name: 'Grilled Chicken Protein Burger',
        description: 'Lean grilled chicken, fresh lettuce, onion, tomato, and herb yoghurt sauce.',
        protein: '42g',
        calories: '560 kcal',
        price: '₹229',
        image: asset('/food/grilled-chicken-protein-burger.webp'),
      },
      {
        name: 'Smoky BBQ Chicken Burger',
        description: 'BBQ-glazed chicken, cheddar melt, grilled onions, and smoked paprika sauce.',
        protein: '45g',
        calories: '610 kcal',
        price: '₹249',
        image: asset('/food/smoky-bbq-chicken-burger.webp'),
      },
      {
        name: 'Double Protein Beast Burger',
        description: 'Double chicken patties, cheese, tomato, onions, greens, and beast sauce.',
        protein: '62g',
        calories: '780 kcal',
        price: '₹329',
        image: asset('/food/double-protein-beast-burger.webp'),
      },
      {
        name: 'Peri Peri Paneer Burger',
        description: 'Peri peri paneer, crisp lettuce, tomato, onion, and roasted garlic sauce.',
        protein: '35g',
        calories: '535 kcal',
        price: '₹199',
        image: asset('/food/peri-peri-paneer-burger.webp'),
      },
    ],
  },
  {
    title: 'Wraps',
    eyebrow: 'Lean rolls',
    summary: 'Toasted wraps packed with clean protein, crisp vegetables, and bold global sauces.',
    items: [
      {
        name: 'Mexican Chicken Wrap',
        description: 'Grilled chicken, black bean salsa, lettuce, peppers, and chipotle yoghurt.',
        protein: '39g',
        calories: '510 kcal',
        price: '₹219',
        image: asset('/food/mexican-chicken-wrap.webp'),
      },
      {
        name: 'Paneer Power Wrap',
        description: 'Paneer cubes, crunchy greens, tomato salsa, and high-protein garlic sauce.',
        protein: '33g',
        calories: '485 kcal',
        price: '₹189',
        image: asset('/food/paneer-power-wrap.webp'),
      },
      {
        name: 'Egg Melt Wrap',
        description: 'Layered egg, caramelized onion, pepper cheese, and clean mayo drizzle.',
        protein: '29g',
        calories: '455 kcal',
        price: '₹169',
        image: asset('/food/egg-melt-wrap.webp'),
      },
      {
        name: 'Smoky Peri Peri Wrap',
        description: 'Peri peri chicken, charred vegetables, lettuce, and smoked yoghurt sauce.',
        protein: '41g',
        calories: '525 kcal',
        price: '₹229',
        image: asset('/food/smoky-peri-peri-wrap.webp'),
      },
      {
        name: 'Korean Chicken Wrap',
        description: 'Korean-glazed chicken, sesame slaw, pickled onions, and spicy cream.',
        protein: '43g',
        calories: '540 kcal',
        price: '₹239',
        image: asset('/food/korean-chicken-wrap.webp'),
      },
    ],
  },
  {
    title: 'Tacos',
    eyebrow: 'Crunch line',
    summary: 'High-crunch tacos built for flavor density, fresh textures, and clean sauce balance.',
    items: [
      {
        name: 'Mexicana Taco',
        description: 'Spiced protein filling, lettuce, tomato, olives, and smoky salsa crema.',
        protein: '24g',
        calories: '360 kcal',
        price: '₹149',
        image: asset('/food/mexicana-taco.webp'),
      },
      {
        name: 'Paneer Taco',
        description: 'Seared paneer, shredded greens, peppers, and toasted cumin yoghurt.',
        protein: '26g',
        calories: '380 kcal',
        price: '₹159',
        image: asset('/food/paneer-taco.webp'),
      },
      {
        name: 'Aloo Crunch Taco',
        description: 'Crispy aloo bites, lettuce, tomato, spice dust, and tangy protein crema.',
        protein: '18g',
        calories: '340 kcal',
        price: '₹129',
        image: asset('/food/aloo-crunch-taco.webp'),
      },
      {
        name: 'Chalupa Taco',
        description: 'Toasted chalupa shell, seasoned filling, cheese, lettuce, and fresh salsa.',
        protein: '27g',
        calories: '410 kcal',
        price: '₹169',
        image: asset('/food/chalupa-taco.webp'),
      },
      {
        name: 'Chicken Fiesta Taco',
        description: 'Chicken, crunchy greens, tomato, corn salsa, and spicy lime sauce.',
        protein: '31g',
        calories: '390 kcal',
        price: '₹179',
        image: asset('/food/chicken-fiesta-taco.webp'),
      },
    ],
  },
  {
    title: 'Pizza Puffs',
    eyebrow: 'Molten bites',
    summary: 'Crisp golden puffs with rich fillings, clean oils, and indulgent controlled macros.',
    items: [
      {
        name: 'Cheese Burst Puff',
        description: 'Golden puff with molten cheese, herb dust, and slow-roasted tomato notes.',
        protein: '20g',
        calories: '370 kcal',
        price: '₹119',
        image: asset('/food/cheese-burst-puff.webp'),
      },
      {
        name: 'Spicy Paneer Puff',
        description: 'Paneer cubes, pepper masala, clean cheese melt, and crisp layered pastry.',
        protein: '26g',
        calories: '410 kcal',
        price: '₹139',
        image: asset('/food/spicy-paneer-puff.webp'),
      },
      {
        name: 'Chicken Volcano Puff',
        description: 'Spiced chicken, molten cheese, chilli crema, and a deep golden shell.',
        protein: '31g',
        calories: '455 kcal',
        price: '₹159',
        image: asset('/food/chicken-volcano-puff.webp'),
      },
      {
        name: 'Peri Peri Puff',
        description: 'Peri peri filling, roasted garlic cream, and crisp pastry with warm spice.',
        protein: '23g',
        calories: '390 kcal',
        price: '₹129',
        image: asset('/food/peri-peri-puff.webp'),
      },
    ],
  },
];

const philosophyStats = [
  { label: 'Protein-first builds', value: '28-62g' },
  { label: 'Palm oil', value: '0%' },
  { label: 'Fresh prep rhythm', value: 'Daily' },
];

const ingredients = [
  {
    title: 'Grilled Chicken',
    grams: '42g+',
    benefit: 'Lean complete protein for recovery, satiety, and clean performance meals.',
    icon: Beef,
    image: asset('/food/grilled-chicken-protein-burger.webp'),
  },
  {
    title: 'Paneer Protein',
    grams: '31g+',
    benefit: 'Rich vegetarian protein with a charred, satisfying gourmet bite.',
    icon: Wheat,
    image: asset('/food/mexicana-paneer-burger.webp'),
  },
  {
    title: 'Egg Protein',
    grams: '28g',
    benefit: 'A classic high-bioavailability protein source with balanced fats.',
    icon: Egg,
    image: asset('/food/classic-egg-burger.webp'),
  },
  {
    title: 'Fresh Vegetables',
    grams: 'Daily',
    benefit: 'Crisp textures, micronutrients, freshness, and cleaner macro balance.',
    icon: Leaf,
    image: asset('/food/paneer-taco.webp'),
  },
];

const sauces = [
  { name: 'Korean spicy sauce', tone: 'from-[#d64135]/30 to-[#f0c76f]/10', note: 'Glossy heat with sesame depth.' },
  { name: 'Mexicana chipotle sauce', tone: 'from-[#b94a28]/30 to-[#f0c76f]/10', note: 'Smoked chilli, lime, and creamy spice.' },
  { name: 'Smoky BBQ sauce', tone: 'from-[#6e2c21]/35 to-[#f0c76f]/10', note: 'Charred sweetness with grilled finish.' },
  { name: 'Garlic herb sauce', tone: 'from-[#d8d4a5]/20 to-[#6d8f64]/14', note: 'Cool herbs with roasted garlic.' },
  { name: 'Peri peri sauce', tone: 'from-[#e35f2d]/30 to-[#f0c76f]/10', note: 'Bright spice, citrus lift, clean finish.' },
];

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      delete window.lenis;
      lenis.destroy();
    };
  }, []);
}

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (window.location.pathname === nextPath) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0 });
  };

  return [path, navigate];
}

function App() {
  const [path, navigate] = usePathname();

  useSmoothScroll();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [path]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030405] text-white">
      <AnimatePresence mode="wait">
        {path === '/menu' ? (
          <MenuPage key="menu" navigate={navigate} />
        ) : (
          <HomePage key="home" navigate={navigate} />
        )}
      </AnimatePresence>
    </main>
  );
}

function HomePage({ navigate }) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    let removeMetadataListener;
    let heroVideoTween;
    const context = gsap.context(() => {
      const heroVideo = heroRef.current?.querySelector('.hero-video');

      if (heroVideo) {
        const setupVideoScrub = () => {
          const duration = heroVideo.duration || 1;

          heroVideo.pause();
          heroVideo.currentTime = 0.04;

          heroVideoTween?.scrollTrigger?.kill();
          heroVideoTween?.kill();
          heroVideoTween = gsap.to(heroVideo, {
            currentTime: Math.max(duration - 0.12, 0),
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        };

        if (heroVideo.readyState >= 1) {
          setupVideoScrub();
        } else {
          heroVideo.addEventListener('loadedmetadata', setupVideoScrub, { once: true });
          removeMetadataListener = () => {
            heroVideo.removeEventListener('loadedmetadata', setupVideoScrub);
          };
        }
      }

      gsap.to('.hero-video', {
        scale: 1.16,
        yPercent: 10,
        opacity: 0.32,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      gsap.to('.hero-copy', {
        yPercent: -18,
        scale: 0.96,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '38% top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.utils.toArray('.story-section').forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0.82 },
          {
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          },
        );

        gsap.fromTo(
          section.querySelectorAll('.story-reveal'),
          { autoAlpha: 0, y: 80, filter: 'blur(18px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.15,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          },
        );

        const visuals = section.querySelectorAll('.story-parallax');
        if (visuals.length) {
          gsap.to(visuals, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });

      gsap.to('.oil-drop', {
        y: -28,
        x: 10,
        rotate: 8,
        duration: 3.8,
        stagger: 0.28,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.health-heart-visual', {
        scale: 1.035,
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, rootRef);

    return () => {
      removeMetadataListener?.();
      heroVideoTween?.scrollTrigger?.kill();
      heroVideoTween?.kill();
      context.revert();
    };
  }, []);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <TopBar navigate={navigate} />
      <HeroSection heroRef={heroRef} navigate={navigate} />
      <StoryIntro />
      <NoPalmOilSection />
      <IngredientsSection />
      <SaucesSection />
      <AthleteSection />
      <LandingCta navigate={navigate} />
    </motion.div>
  );
}

function TopBar({ navigate, variant = 'glass' }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 py-2 pl-2 pr-4 backdrop-blur-xl transition duration-300 hover:border-white/22 hover:bg-white/[0.07]"
      >
        <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-sm font-black text-[#f1c46b] shadow-glow">
          PB
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/76">
          Protein Burgers
        </span>
      </button>

      <button
        type="button"
        onClick={() => navigate(variant === 'menu' ? '/' : '/menu')}
        className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/76 backdrop-blur-xl transition duration-300 hover:border-[#f0c76f]/45 hover:text-[#ffe1a0]"
      >
        {variant === 'menu' ? <ArrowLeft className="size-4" /> : <MenuIcon className="size-4" />}
        {variant === 'menu' ? 'Home' : 'Menu'}
      </button>
    </div>
  );
}

function HeroSection({ heroRef, navigate }) {
  return (
    <section ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover opacity-60"
        src="/media/hero-burger.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,190,93,0.16),transparent_31%),linear-gradient(180deg,rgba(3,4,5,0.42)_0%,rgba(3,4,5,0.82)_63%,#030405_100%)]" />
      <div className="smoke-layer opacity-75" />

      <div className="hero-copy relative z-10 flex min-h-screen items-center justify-center px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(18px)' }}
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
            className="max-w-5xl text-balance font-display text-6xl font-black leading-[0.9] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
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

function StoryIntro() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_40%,rgba(214,65,53,0.1),transparent_30rem),radial-gradient(circle_at_78%_40%,rgba(94,136,91,0.1),transparent_30rem)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
            Nutrition philosophy
          </p>
          <h2 className="story-reveal mt-5 max-w-5xl text-balance font-display text-4xl font-black leading-none sm:text-6xl lg:text-7xl">
            Fast food should move with your lifestyle, not slow it down.
          </h2>
        </div>
        <div className="story-reveal rounded-[8px] border border-white/10 bg-white/[0.055] p-5 shadow-glass backdrop-blur-xl sm:p-6">
          <p className="text-pretty text-lg leading-8 text-white/68">
            Protein Burgers treats indulgence as a design problem: keep the cinematic flavor,
            raise the protein, clean up the oils, and make every build feel premium without
            drifting away from real fast-food comfort.
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

function NoPalmOilSection() {
  const oils = ['sunflower oil', 'olive oil blends', 'rice bran oil'];
  const riskNotes = [
    'Processed oil density can make fast food feel heavier.',
    'Excess saturated fat intake can contribute to unhealthy cholesterol patterns.',
    'Cleaner oil choices support a fresher bite and better everyday balance.',
  ];
  const particlePositions = [
    ['11%', '24%', '0s'],
    ['22%', '70%', '0.8s'],
    ['33%', '18%', '1.5s'],
    ['47%', '76%', '0.4s'],
    ['58%', '28%', '1.1s'],
    ['71%', '62%', '1.8s'],
    ['84%', '34%', '0.2s'],
    ['88%', '78%', '1.3s'],
  ];

  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(214,65,53,0.18),transparent_30rem),radial-gradient(circle_at_78%_28%,rgba(240,199,111,0.1),transparent_28rem),linear-gradient(180deg,#030405_0%,#100604_50%,#030405_100%)]" />
      <div className="story-parallax oil-drop left-[7%] top-[18%]" />
      <div className="story-parallax oil-drop right-[10%] top-[24%] scale-75" />
      <div className="story-parallax oil-drop bottom-[13%] left-[26%] scale-50" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="story-reveal relative min-h-[32rem] overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_52%_48%,rgba(214,65,53,0.18),transparent_28rem),rgba(255,255,255,0.045)] shadow-glass backdrop-blur-xl">
          <div className="absolute inset-x-10 top-10 z-20 h-px bg-[linear-gradient(90deg,transparent,rgba(255,174,118,0.78),transparent)]" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_52%_52%,transparent_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.66)_100%)]" />
          <img
            src="/health/palm-oil-heart.png"
            alt="Medical-style heart visual with partially blocked arteries"
            loading="lazy"
            decoding="async"
            className="health-heart-visual story-parallax absolute inset-0 h-[112%] w-full object-cover opacity-[0.88]"
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

          <div className="absolute left-5 top-5 z-20 rounded-[8px] border border-red-300/20 bg-black/38 px-4 py-3 backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-200/76">
              Health awareness
            </p>
            <p className="mt-1 text-sm font-black text-white/86">Processed oil load</p>
          </div>

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
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
            Oil quality
          </p>
          <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
            No Palm Oil. No Compromise.
          </h2>
          <p className="story-reveal mt-7 text-pretty text-lg leading-8 text-white/66">
            Excessive use of heavily processed palm oil can make fast food feel cheaper, heavier,
            and less aligned with everyday nutrition goals. Diets high in processed saturated fats
            can contribute to cholesterol buildup risks over time, especially when paired with low
            activity and poor overall nutrition.
          </p>
          <p className="story-reveal mt-5 text-pretty text-base leading-7 text-white/54">
            Protein Burgers avoids cheap oil shortcuts and uses sunflower oil, olive oil blends,
            and rice bran oil to keep the bite crisp, the flavor fresher, and the food quality more
            performance-focused.
          </p>
          <div className="story-reveal mt-8 grid gap-3">
            {riskNotes.map((note) => (
              <div key={note} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
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

function IngredientsSection() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(94,136,91,0.12),transparent_30rem),radial-gradient(circle_at_86%_64%,rgba(214,65,53,0.1),transparent_30rem)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
              High protein ingredients
            </p>
            <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
              Engineered for Performance
            </h2>
          </div>
          <p className="story-reveal max-w-xl text-pretty text-base leading-7 text-white/58">
            Grilled chicken, paneer protein, egg protein, fresh vegetables, and balanced macros
            create fast food that feels built for training days and real schedules.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ingredients.map(({ title, grams, benefit, icon: Icon, image }) => (
            <motion.article
              key={title}
              whileHover={{ y: -10 }}
              className="story-reveal group overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.055] shadow-glass backdrop-blur-xl"
            >
              <div className="relative aspect-[1.05] overflow-hidden bg-black">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="story-parallax h-[112%] w-full object-cover opacity-[0.88] transition duration-700 group-hover:scale-105"
                />
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
          ))}
        </div>
      </div>
    </section>
  );
}

function SaucesSection() {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#030405_0%,#090605_48%,#030405_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
            Sauce laboratory
          </p>
          <h2 className="story-reveal mt-5 text-balance font-display text-4xl font-black leading-none sm:text-6xl">
            Premium Signature Sauces
          </h2>
          <p className="story-reveal mt-7 text-pretty text-lg leading-8 text-white/62">
            Every sauce is treated like a finishing material: glossy, layered, balanced, and built
            to make lean protein feel cinematic without drowning the macros.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sauces.map((sauce, index) => (
            <motion.article
              key={sauce.name}
              whileHover={{ y: -8, scale: 1.015 }}
              className={`story-reveal group relative min-h-48 overflow-hidden rounded-[8px] border border-white/10 bg-gradient-to-br ${sauce.tone} p-5 shadow-glass backdrop-blur-xl`}
            >
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl transition duration-500 group-hover:bg-[#f0c76f]/18" />
              <div className="absolute bottom-0 left-5 right-5 h-px bg-[linear-gradient(90deg,transparent,rgba(255,232,181,0.72),transparent)]" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                  0{index + 1}
                </p>
                <h3 className="mt-6 text-2xl font-black text-white">{sauce.name}</h3>
                <p className="mt-4 text-sm leading-6 text-white/58">{sauce.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AthleteSection() {
  const points = [
    'High protein meals',
    'Cleaner ingredients',
    'Balanced nutrition',
    'Gym-friendly fast food',
    'Performance-focused meals',
  ];

  return (
    <section className="story-section relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(240,199,111,0.12),transparent_34rem)]" />
      <div className="mx-auto max-w-6xl text-center">
        <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
          Athlete-focused fast food
        </p>
        <h2 className="story-reveal mt-5 text-balance font-display text-5xl font-black leading-none sm:text-7xl lg:text-8xl">
          Fast Food Built for Athletes
        </h2>
        <p className="story-reveal mx-auto mt-8 max-w-3xl text-pretty text-lg leading-8 text-white/62">
          Built for the person leaving the gym, heading to class, working late, or chasing a
          cleaner routine. The point is not restriction. The point is fast food that respects
          performance.
        </p>

        <div className="story-reveal mt-12 grid gap-3 sm:grid-cols-5">
          {points.map((point) => (
            <div key={point} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
              <ShieldCheck className="mx-auto size-5 text-[#ffe1a0]" strokeWidth={1.8} />
              <p className="mt-3 text-sm font-bold leading-5 text-white/72">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingCta({ navigate }) {
  return (
    <section className="story-section relative isolate overflow-hidden px-5 pb-24 pt-12 sm:px-8 lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(240,199,111,0.18),transparent_32rem),rgba(255,255,255,0.055)] px-5 py-16 text-center shadow-glass backdrop-blur-xl sm:px-8 lg:py-24">
        <p className="story-reveal text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
          Full menu
        </p>
        <h2 className="story-reveal mx-auto mt-5 max-w-4xl text-balance font-display text-4xl font-black leading-none sm:text-6xl">
          Choose the category. Build the meal. Keep the performance.
        </h2>
        <motion.button
          type="button"
          whileHover={{ y: -4, scale: 1.025 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/menu')}
          className="story-reveal group mt-10 inline-flex items-center gap-3 rounded-full border border-[#f0c76f]/50 bg-[#f0c76f] px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-[#130f08] shadow-glow transition duration-300 hover:bg-[#ffe1a0]"
        >
          Explore Full Menu
          <ArrowRight className="size-5 transition duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </motion.button>
      </div>
    </section>
  );
}

function MenuPage({ navigate }) {
  const [active, setActive] = useState(categories[0].title);
  const activeCategory = useMemo(
    () => categories.find((category) => category.title === active) ?? categories[0],
    [active],
  );

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.menu-shell',
        { autoAlpha: 0, y: 36, filter: 'blur(14px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      );

      gsap.to('.menu-side-glow', {
        y: 26,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative isolate min-h-screen bg-[#030405]"
    >
      <TopBar navigate={navigate} variant="menu" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(214,65,53,0.12),transparent_30rem),radial-gradient(circle_at_86%_24%,rgba(240,199,111,0.1),transparent_28rem)]" />
      <div className="smoke-layer opacity-35" />

      <div className="menu-shell mx-auto grid max-w-[98rem] gap-7 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12 lg:px-12 lg:pb-24 xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-14">
        <aside className="relative z-20 lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-black/32 p-4 shadow-glass backdrop-blur-2xl">
            <div className="menu-side-glow absolute -right-16 top-10 size-40 rounded-full bg-[#f0c76f]/14 blur-3xl" />
            <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,232,181,0.58),transparent)]" />
            <p className="relative mb-4 px-3 text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">
              Categories
            </p>
            <div className="relative flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {categories.map((category) => {
                const isActive = active === category.title;
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setActive(category.title)}
                    className={`group flex min-w-max items-center justify-between gap-4 rounded-[8px] border px-4 py-4 text-left transition duration-300 lg:min-w-0 ${
                      isActive
                        ? 'border-[#f0c76f]/45 bg-[#f0c76f]/14 text-[#ffe1a0]'
                        : 'border-white/8 bg-black/16 text-white/58 hover:border-white/16 hover:bg-white/[0.06] hover:text-white/84'
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-black">{category.title}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] opacity-55">
                        {category.eyebrow}
                      </span>
                    </span>
                    <ArrowRight
                      className={`size-4 transition duration-300 ${isActive ? 'translate-x-1' : 'opacity-35 group-hover:translate-x-1'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">
                Full menu
              </p>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeCategory.title}
                  initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(12px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 text-balance font-display text-4xl font-black leading-none sm:text-6xl"
                >
                  {activeCategory.title}
                </motion.h1>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory.summary}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="max-w-xl text-pretty text-base leading-7 text-white/58"
              >
                {activeCategory.summary}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.title}
              initial={{ opacity: 0, y: 26, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(16px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {activeCategory.items.map((item, index) => (
                <ProductCard key={item.name} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </motion.div>
  );
}

function ProductCard({ item, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="product-card group relative overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] shadow-glass backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,232,181,0.72),transparent)]" />
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#d64135]/12 blur-3xl" />
      </div>

      <div className="relative aspect-[1.05] overflow-hidden bg-black">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_48%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur-md">
            {item.protein} protein
          </span>
          <span className="rounded-full border border-[#f0c76f]/35 bg-[#f0c76f]/14 px-3 py-1.5 text-xs font-bold text-[#ffe0a0] backdrop-blur-md">
            {item.price}
          </span>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex min-h-[3.25rem] items-start justify-between gap-3">
          <h2 className="text-pretty text-xl font-black leading-tight">{item.name}</h2>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/56">
            {item.calories}
          </span>
        </div>
        <p className="mt-4 min-h-[4.75rem] text-sm leading-6 text-white/58">{item.description}</p>
        <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(240,199,111,0.42),rgba(255,255,255,0.08),transparent)]" />
        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/40">
          <span>Clean oils</span>
          <span>Fresh prep</span>
        </div>
      </div>
    </motion.article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
