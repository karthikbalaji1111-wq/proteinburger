import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './components/home/HomePage';
import { MenuPage } from './components/menu/MenuPage';
import { BuildYourOwnPage } from './components/pages/BuildYourOwnPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { TrackingPage } from './components/pages/TrackingPage';
import { CartProvider } from './context/CartContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function isCommercePath(path) {
  return path !== '/';
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const onCommerce = isCommercePath(location.pathname);

  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.toggle('route-menu', onCommerce);
    document.documentElement.classList.toggle('route-home', !onCommerce);

    const refresh = () => {
      ScrollTrigger.refresh();
      window.lenis?.resize?.();
    };

    window.lenis?.scrollTo?.(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 200);

    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove('route-menu', 'route-home');
    };
  }, [location.pathname, onCommerce]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/menu" element={<MenuPage navigate={navigate} />} />
          <Route path="/menu/:slug" element={<ProductDetailPage />} />
          <Route path="/build" element={<BuildYourOwnPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <main className="min-h-screen overflow-x-hidden bg-[#030405] text-white">
          <AppRoutes />
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}
