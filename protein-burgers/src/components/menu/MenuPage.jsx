import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { categories, slugifyName } from '../../data/catalog';
import { TopBar } from '../layout/TopBar';
import { ProductCard } from './ProductCard';
import { ProductDetailPanel } from './ProductDetailPanel';

export function MenuPage({ navigate }) {
  const [active, setActive] = useState(categories[0].title);
  const [selectedItem, setSelectedItem] = useState(null);

  const activeCategory = useMemo(
    () => categories.find((category) => category.title === active) ?? categories[0],
    [active],
  );

  const openItem = (item) => {
    if (activeCategory.title === 'Burgers') {
      navigate(`/menu/${slugifyName(item.name)}`);
      return;
    }
    setSelectedItem(item);
  };

  return (
    <div className="menu-page relative min-h-screen bg-[#030405]">
      <TopBar navigate={navigate} variant="menu" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(214,65,53,0.12),transparent_30rem),radial-gradient(circle_at_86%_24%,rgba(240,199,111,0.1),transparent_28rem)]" />

      <div className="menu-shell relative z-10 mx-auto grid max-w-[104rem] gap-7 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-14 lg:px-12 lg:pb-24">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[8px] border border-white/12 bg-black/52 p-4 shadow-glass backdrop-blur-3xl">
            <p className="mb-4 px-3 text-xs font-black uppercase tracking-[0.28em] text-[#f0c76f]">Categories</p>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {categories.map((category) => {
                const isActive = active === category.title;
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => setActive(category.title)}
                    className={`flex min-w-max items-center justify-between gap-4 rounded-[8px] border px-4 py-4 text-left transition duration-300 lg:min-w-0 ${
                      isActive
                        ? 'border-[#f0c76f]/45 bg-[#f0c76f]/14 text-[#ffe1a0]'
                        : 'border-white/8 bg-black/20 text-white/70 hover:border-white/16'
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-black">{category.title}</span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] opacity-55">
                        {category.eyebrow}
                      </span>
                    </span>
                    <ArrowRight className={`size-4 shrink-0 ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.38em] text-[#f0c76f]">Full menu</p>
              <h1 className="mt-3 font-display text-4xl font-black leading-none text-white sm:text-6xl">
                {activeCategory.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{activeCategory.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/build')}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-[#f0c76f]/45 bg-[#f0c76f]/12 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#ffe1a0] transition hover:bg-[#f0c76f] hover:text-[#130f08]"
            >
              Build your own
              <ArrowRight className="size-4" />
            </button>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {activeCategory.items.map((item, index) => {
              const itemWithCategory = { ...item, category: activeCategory.title };
              return (
                <ProductCard
                  key={item.name}
                  item={itemWithCategory}
                  index={index}
                  onSelect={openItem}
                  isBurger={activeCategory.title === 'Burgers'}
                />
              );
            })}
          </div>
        </section>
      </div>

      <ProductDetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
