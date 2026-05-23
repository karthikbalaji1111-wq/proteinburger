import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './components/home/HomePage';
import { MenuPage } from './components/menu/MenuPage';
import { CartProvider } from './context/CartContext';
import { usePathname } from './hooks/usePathname';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function isMenuPath(path) {
  return path === '/menu' || path.endsWith('/menu');
}

function AppRoutes() {
  const [path, navigate] = usePathname();
  const onMenu = isMenuPath(path);

  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.toggle('route-menu', onMenu);
    document.documentElement.classList.toggle('route-home', !onMenu);

    const refresh = () => {
      ScrollTrigger.refresh();
      window.lenis?.resize?.();
    };

    refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 200);

    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove('route-menu', 'route-home');
    };
  }, [path, onMenu]);

  return (
    <>
      {onMenu ? <MenuPage key="menu" navigate={navigate} /> : <HomePage key="home" navigate={navigate} />}
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <main className="min-h-screen overflow-x-hidden bg-[#030405] text-white">
        <AppRoutes />
      </main>
    </CartProvider>
  );
}
