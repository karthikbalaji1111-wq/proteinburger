import { useRef } from 'react';

export function HeroBackground({ videoRef, containerRef }) {
  return (
    <div
      ref={containerRef}
      className="homepage-bg-video pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="hero-video h-full w-full object-cover"
        src="/media/hero-burger.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-[#030405]/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(3,4,5,0.55)_72%,#030405_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030405]/20 via-transparent to-[#030405]" />
    </div>
  );
}
