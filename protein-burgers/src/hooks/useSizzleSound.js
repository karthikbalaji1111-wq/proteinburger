import { useCallback, useRef } from 'react';

/** Short procedural grill sizzle — no external audio file required. */
export function useSizzleSound() {
  const ctxRef = useRef(null);
  const lastPlayRef = useRef(0);

  const play = useCallback(() => {
    const now = performance.now();
    if (now - lastPlayRef.current < 420) return;
    lastPlayRef.current = now;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!ctxRef.current) {
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const duration = 0.55;
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < length; i++) {
        const t = i / length;
        const envelope = Math.sin(Math.PI * t) * (1 - t * 0.35);
        data[i] = (Math.random() * 2 - 1) * envelope * 0.22;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400 + Math.random() * 800;
      filter.Q.value = 0.7;

      const gain = ctx.createGain();
      gain.gain.value = 0.14;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {
      /* ignore autoplay restrictions */
    }
  }, []);

  return play;
}
