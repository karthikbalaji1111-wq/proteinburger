import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(disabled = false) {
  useEffect(() => {
    if (disabled) {
      delete window.lenis;
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      ScrollTrigger.refresh();
      return undefined;
    }

    let lenis;
    let onTick;

    try {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenis.on('scroll', ScrollTrigger.update);

      onTick = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      window.lenis = lenis;
    } catch (error) {
      console.warn('Lenis disabled:', error);
    }

    return () => {
      if (onTick) gsap.ticker.remove(onTick);
      if (lenis) {
        delete window.lenis;
        lenis.destroy();
      }
    };
  }, [disabled]);
}
