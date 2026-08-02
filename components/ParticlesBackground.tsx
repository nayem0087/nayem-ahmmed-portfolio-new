'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * ParticlesBackground
 * --------------------
 * A production-grade, performant ambient particle background.
 *
 * Why this differs from a typical "350 x <motion.div>" implementation:
 *  - 350 separate Framer Motion nodes each run their own animation loop,
 *    trigger layout/paint, and hold a JS timer. That's extremely heavy
 *    on low/mid-end devices and causes jank, especially on mobile.
 *  - This version renders every particle on a single <canvas> with one
 *    requestAnimationFrame loop, which is the standard, scalable approach
 *    for ambient particle effects (used by libraries like tsparticles).
 *
 * Features:
 *  - Single RAF loop, GPU-friendly canvas compositing
 *  - Respects `prefers-reduced-motion` (falls back to a static / no-op render)
 *  - Debounced resize handling with devicePixelRatio scaling (crisp on retina)
 *  - Cleans up all listeners / RAF on unmount (no leaks)
 *  - Pauses when the tab is hidden (saves battery/CPU)
 *  - Fully configurable via props, sane defaults preserve original look
 *  - SSR-safe (no `window`/`document` access during render)
 *  - Theme-aware: works on both light and dark backgrounds. Pass `theme="light"`
 *    or `theme="dark"` explicitly, or leave `theme="auto"` (default) to follow
 *    the OS/browser `prefers-color-scheme`, updating live if it changes.
 */

export interface ParticlesBackgroundProps {
  /** Number of particles to render. Default: 350 */
  count?: number;
  /**
   * Particle color (any valid CSS color). If omitted, a sensible default is
   * chosen automatically based on `theme` (white on dark, dark slate on light).
   */
  color?: string;
  /** Min/max particle radius in px. Default: [0.5, 2] (small, subtle dots) */
  sizeRange?: [number, number];
  /** Min/max vertical drift speed (px/sec). Default: [4, 10] */
  speedRange?: [number, number];
  /** Glow blur amount in px. If omitted, chosen automatically based on `theme`. */
  glow?: number;
  /**
   * Which color scheme to render for.
   * - 'dark': bright particles, glowing, for dark backgrounds (original look)
   * - 'light': muted dark particles, minimal glow, for light backgrounds
   * - 'auto' (default): follows `prefers-color-scheme` and updates live
   */
  theme?: 'light' | 'dark' | 'auto';
  /** Top-left ambient blob color. If omitted, chosen automatically based on `theme`. */
  blobColorTopLeft?: string;
  /** Bottom-right ambient blob color. If omitted, chosen automatically based on `theme`. */
  blobColorBottomRight?: string;
  /** Extra classnames for the outer wrapper */
  className?: string;
}

type ParticleState = {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speed: number;
  phase: number;
  swayAmplitude: number;
};

const DEFAULT_SIZE_RANGE: [number, number] = [0.5, 2];
const DEFAULT_SPEED_RANGE: [number, number] = [4, 10];

const THEME_PRESETS = {
  dark: {
    color: 'rgba(255,255,255,0.85)',
    glow: 6,
    blobColorTopLeft: 'rgba(34,197,94,0.10)',
    blobColorBottomRight: 'rgba(168,85,247,0.10)',
  },
  light: {
    color: 'rgba(15,23,42,0.45)', // slate-900 at low opacity — visible but not harsh on light bg
    glow: 1,
    blobColorTopLeft: 'rgba(34,197,94,0.08)',
    blobColorBottomRight: 'rgba(168,85,247,0.08)',
  },
} as const;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBackground({
  count = 350,
  color,
  sizeRange = DEFAULT_SIZE_RANGE,
  speedRange = DEFAULT_SPEED_RANGE,
  glow,
  theme = 'auto',
  blobColorTopLeft,
  blobColorBottomRight,
  className = '',
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleState[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Resolve 'auto' against the OS/browser color-scheme preference, live.
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme !== 'auto') {
      setResolvedTheme(theme);
      return;
    }
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const update = () => setResolvedTheme(mql.matches ? 'light' : 'dark');
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [theme]);

  const preset = THEME_PRESETS[resolvedTheme];
  const resolvedColor = color ?? preset.color;
  const resolvedGlow = glow ?? preset.glow;
  const resolvedBlobTopLeft = blobColorTopLeft ?? preset.blobColorTopLeft;
  const resolvedBlobBottomRight = blobColorBottomRight ?? preset.blobColorBottomRight;

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          size: randomBetween(sizeRange[0], sizeRange[1]),
          speed: randomBetween(speedRange[0], speedRange[1]),
          phase: Math.random() * Math.PI * 2,
          swayAmplitude: randomBetween(6, 18),
        };
      });
    },
    [count, sizeRange, speedRange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(width, height);
    };

    resize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener('resize', handleResize);

    const draw = (time: number) => {
      const { width, height } = sizeRef.current;
      const dt = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = resolvedColor;
      ctx.shadowColor = resolvedColor;
      ctx.shadowBlur = resolvedGlow;

      for (const p of particlesRef.current) {
        if (!prefersReducedMotion) {
          p.y -= p.speed * dt;
          if (p.y < -10) {
            p.y = height + 10;
            p.baseX = Math.random() * width;
          }
          p.phase += dt * 0.6;
          p.x = p.baseX + Math.sin(p.phase) * p.swayAmplitude;
        }

        ctx.globalAlpha = 0.4 + 0.4 * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      if (rafRef.current === null) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    start();

    return () => {
      stop();
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [resolvedColor, resolvedGlow, initParticles]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[180px]"
        style={{ backgroundColor: resolvedBlobTopLeft }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[180px]"
        style={{ backgroundColor: resolvedBlobBottomRight }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}