import { ArrowLeft, ArrowRight, Menu as MenuIcon } from 'lucide-react';

export function TopBar({ navigate, variant = 'glass' }) {
  const isMenu = variant === 'menu';

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
      <a
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
        className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 py-2 pl-2 pr-4 backdrop-blur-xl transition duration-300 hover:border-white/22 hover:bg-white/[0.07]"
      >
        <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-sm font-black text-[#f1c76f] shadow-glow">
          PB
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/76">Protein Burgers</span>
      </a>

      <a
        href={isMenu ? '#/' : '#/menu'}
        onClick={(e) => {
          e.preventDefault();
          navigate(isMenu ? '/' : '/menu');
        }}
        className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/76 backdrop-blur-xl transition duration-300 hover:border-[#f0c76f]/45 hover:text-[#ffe1a0]"
      >
        {isMenu ? <ArrowLeft className="size-4" /> : <MenuIcon className="size-4" />}
        {isMenu ? 'Home' : 'Menu'}
      </a>
    </div>
  );
}
