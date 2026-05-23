import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    let lenis;
    let onTick;
    let onRefresh;

    try {
      lenis = new Lenis({
        duration: 1.45,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.05,
        lerp: 0.07,
        infinite: false,
      });

      lenis.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      onRefresh = () => lenis.resize();
      ScrollTrigger.addEventListener('refresh', onRefresh);

      onTick = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      window.lenis = lenis;

      requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    } catch (error) {
      console.warn('Lenis smooth scroll disabled:', error);
    }

    return () => {
      if (onRefresh) ScrollTrigger.removeEventListener('refresh', onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      if (onTick) gsap.ticker.remove(onTick);
      if (lenis) {
        delete window.lenis;
        lenis.destroy();
      }
    };
  }, []);
}
