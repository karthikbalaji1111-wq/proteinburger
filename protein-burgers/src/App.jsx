import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const HomePage = lazy(() => import('./components/home/HomePage').then((module) => ({ default: module.HomePage })));
const MenuPage = lazy(() => import('./components/menu/MenuPage').then((module) => ({ default: module.MenuPage })));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })));
const BuildYourOwnPage = lazy(() => import('./components/pages/BuildYourOwnPage').then((module) => ({ default: module.BuildYourOwnPage })));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage').then((module) => ({ default: module.CheckoutPage })));
const TrackingPage = lazy(() => import('./components/pages/TrackingPage').then((module) => ({ default: module.TrackingPage })));

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
    window.scrollTo(0, 0);
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
        <Suspense fallback={<PageSkeleton />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage navigate={navigate} />} />
            <Route path="/menu" element={<MenuPage navigate={navigate} />} />
            <Route path="/menu/:slug" element={<ProductDetailPage />} />
            <Route path="/build" element={<BuildYourOwnPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#030405] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-3 w-40 rounded-full bg-[#f0c76f]/25" />
        <div className="mt-8 h-16 max-w-2xl rounded-[8px] bg-white/[0.07]" />
        <div className="mt-5 h-5 max-w-xl rounded-full bg-white/[0.055]" />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="h-64 rounded-[8px] border border-white/10 bg-white/[0.045]" />
          <div className="h-64 rounded-[8px] border border-white/10 bg-white/[0.045]" />
          <div className="h-64 rounded-[8px] border border-white/10 bg-white/[0.045]" />
        </div>
      </div>
    </div>
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
