import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from './hooks/usePathname';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { HomePage } from './components/home/HomePage';
import { MenuPage } from './components/menu/MenuPage';

function isMenuPath(path) {
  return path === '/menu' || path.endsWith('/menu');
}

export default function App() {
  const [path, navigate] = usePathname();
  const onMenu = isMenuPath(path);

  useSmoothScroll(onMenu);

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
    <main className="min-h-screen overflow-x-hidden bg-[#030405] text-white">
      {onMenu ? (
        <MenuPage key="menu" navigate={navigate} />
      ) : (
        <HomePage key="home" navigate={navigate} />
      )}
    </main>
  );
}
