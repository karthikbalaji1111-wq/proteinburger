import { useEffect, useRef } from 'react';

export function SteamEffect({ active }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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

    const particles = [];
    const maxParticles = 40;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (active && particles.length < maxParticles && Math.random() < 0.2) {
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * 48,
          y: height * 0.7 + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.7 - Math.random() * 0.9,
          alpha: 0.14 + Math.random() * 0.1,
          size: 9 + Math.random() * 10,
          growth: 0.26 + Math.random() * 0.2,
          life: 0,
          maxLife: 90 + Math.random() * 70,
          angle: Math.random() * Math.PI * 2,
          speedAngle: (Math.random() - 0.5) * 0.04,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.angle) * 0.3;
        p.angle += p.speedAngle;
        p.size += p.growth;

        const lifePercent = p.life / p.maxLife;
        const alpha = lifePercent < 0.25 ? (p.life / (p.maxLife * 0.25)) * p.alpha : (1 - lifePercent) * 0.22;

        if (p.life >= p.maxLife || p.y < -p.size) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(255, 235, 215, ${alpha * 1.1})`);
        grad.addColorStop(0.4, `rgba(240, 240, 240, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(240, 240, 240, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
