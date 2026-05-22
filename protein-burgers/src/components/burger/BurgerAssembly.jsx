import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BottomBunSVG,
  CheeseSVG,
  LettuceSVG,
  OnionsSVG,
  PattySVG,
  SauceSVG,
  TomatoesSVG,
  TopBunSVG,
} from './BurgerSVGs';

export function BurgerAssembly({ containerRef }) {
  const shadowRef = useRef(null);
  const bottomBunRef = useRef(null);
  const pattyRef = useRef(null);
  const cheeseRef = useRef(null);
  const lettuceRef = useRef(null);
  const sauceRef = useRef(null);
  const tomatoesRef = useRef(null);
  const onionsRef = useRef(null);
  const topBunRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const triggeredRef = useRef({ bunBottom: false, patty: false, bunTop: false });

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const dir = self.direction;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const h = canvas.height;
            const centerX = canvas.width / 2;
            const bottomBunLandingY = h * 0.72;
            const pattyLandingY = h * 0.64;
            const topBunLandingY = h * 0.44;

            const spawnSteamPuff = (spawnY) => {
              for (let i = 0; i < 14; i++) {
                particlesRef.current.push({
                  type: 'steam',
                  x: centerX + (Math.random() - 0.5) * 90,
                  y: spawnY + (Math.random() - 0.5) * 15,
                  vx: (Math.random() - 0.5) * 1.1,
                  vy: -0.8 - Math.random() * 1.4,
                  size: 10 + Math.random() * 9,
                  growth: 0.28 + Math.random() * 0.28,
                  alpha: 0.14 + Math.random() * 0.08,
                  life: 0,
                  maxLife: 55 + Math.random() * 35,
                  angle: Math.random() * Math.PI * 2,
                  speedAngle: (Math.random() - 0.5) * 0.05,
                });
              }
            };

            if (dir === 1) {
              if (p >= 0.11 && !triggeredRef.current.bunBottom) {
                triggeredRef.current.bunBottom = true;
                spawnSteamPuff(bottomBunLandingY);
              }
              if (p >= 0.32 && !triggeredRef.current.patty) {
                triggeredRef.current.patty = true;
                spawnSteamPuff(pattyLandingY);
              }
              if (p >= 0.82 && !triggeredRef.current.bunTop) {
                triggeredRef.current.bunTop = true;
                spawnSteamPuff(topBunLandingY);
              }
            } else {
              if (p < 0.08) triggeredRef.current.bunBottom = false;
              if (p < 0.28) triggeredRef.current.patty = false;
              if (p < 0.78) triggeredRef.current.bunTop = false;
            }
          },
        },
      });

      tl.fromTo(
        shadowRef.current,
        { scale: 0.15, opacity: 0 },
        { scale: 1, opacity: 0.95, duration: 0.15, ease: 'power1.out' },
        0,
      );

      tl.fromTo(
        bottomBunRef.current,
        { y: -650, rotation: -18, scale: 1.25, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.15, ease: 'power1.out' },
        0,
      );

      tl.fromTo(
        pattyRef.current,
        { y: -850, rotation: 12, scale: 1.35, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.18, ease: 'bounce.out' },
        0.14,
      );

      tl.fromTo(
        cheeseRef.current,
        { y: -950, rotation: -8, scale: 1.15, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.14, ease: 'power1.out' },
        0.28,
      );

      tl.fromTo(
        lettuceRef.current,
        { y: -1050, rotation: 14, scale: 1.2, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.14, ease: 'power2.out' },
        0.38,
      );

      tl.fromTo(
        sauceRef.current,
        { y: -1150, rotation: -6, scale: 1.1, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.12, ease: 'power1.out' },
        0.48,
      );

      tl.fromTo(
        tomatoesRef.current,
        { y: -1250, rotation: 20, scale: 1.25, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.14, ease: 'power1.out' },
        0.58,
      );

      tl.fromTo(
        onionsRef.current,
        { y: -1350, rotation: -16, scale: 1.2, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.12, ease: 'power1.out' },
        0.68,
      );

      tl.fromTo(
        topBunRef.current,
        { y: -1450, rotation: 10, scale: 1.3, opacity: 0 },
        { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.16, ease: 'power2.out' },
        0.78,
      );

      const squeezeTargets = [
        topBunRef.current,
        onionsRef.current,
        tomatoesRef.current,
        sauceRef.current,
        lettuceRef.current,
        cheeseRef.current,
        pattyRef.current,
      ];

      tl.to(squeezeTargets, { yPercent: 3.5, scaleY: 0.94, duration: 0.04, ease: 'power1.inOut' }, 0.93);
      tl.to(squeezeTargets, { yPercent: 0, scaleY: 1, duration: 0.03, ease: 'power1.out' }, 0.97);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let animationId;
    const updateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        if (p.type === 'steam') {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.angle) * 0.35;
          p.angle += p.speedAngle;
          p.size += p.growth;
          const lifePercent = p.life / p.maxLife;
          const alpha = lifePercent < 0.2 ? (p.life / (p.maxLife * 0.2)) * p.alpha : (1 - lifePercent) * p.alpha;
          ctx.save();
          ctx.globalAlpha = alpha;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, 'rgba(255, 238, 222, 0.4)');
          grad.addColorStop(0.35, 'rgba(240, 240, 240, 0.2)');
          grad.addColorStop(1, 'rgba(240, 240, 240, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationId = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="burger-assembly-layer pointer-events-none fixed inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="reflective-plate" style={{ top: '310px', bottom: 'auto' }} />
      <div ref={shadowRef} className="burger-shadow" style={{ top: '315px', bottom: 'auto' }} />
      <canvas ref={canvasRef} className="absolute inset-0 z-30 h-full w-full" style={{ mixBlendMode: 'screen' }} />
      <div className="relative z-10 flex h-[450px] w-[320px] items-center justify-center">
        <div ref={bottomBunRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '290px', willChange: 'transform, opacity' }}>
          <BottomBunSVG className="h-full w-full" />
        </div>
        <div ref={pattyRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '245px', willChange: 'transform, opacity' }}>
          <PattySVG className="h-full w-full" />
        </div>
        <div ref={cheeseRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '228px', willChange: 'transform, opacity' }}>
          <CheeseSVG className="h-full w-full" />
        </div>
        <div ref={lettuceRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '202px', willChange: 'transform, opacity' }}>
          <LettuceSVG className="h-full w-full" />
        </div>
        <div ref={sauceRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '194px', willChange: 'transform, opacity' }}>
          <SauceSVG className="h-full w-full" />
        </div>
        <div ref={tomatoesRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '165px', willChange: 'transform, opacity' }}>
          <TomatoesSVG className="h-full w-full" />
        </div>
        <div ref={onionsRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '148px', willChange: 'transform, opacity' }}>
          <OnionsSVG className="h-full w-full" />
        </div>
        <div ref={topBunRef} className="absolute left-1/2 w-[300px] -translate-x-1/2" style={{ top: '80px', willChange: 'transform, opacity' }}>
          <TopBunSVG className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
