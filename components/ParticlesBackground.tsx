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
 *  - Depth-layered ("parallax") particles: each dot is assigned a random depth.
 *    Nearer particles are bigger, brighter and drift faster; farther ones are
 *    smaller, dimmer and slower. This reads as a polished, layered starfield
 *    instead of a flat wall of identical dots — the standard technique used
 *    in premium hero-section backgrounds.
 *
 * NOTE ON DENSITY (updated):
 *  The previous defaults (count=800, opacityRange up to 0.9, glow=8) read as
 *  too dense/bright for most layouts. Defaults below are tuned for a subtle,
 *  ambient feel: fewer particles, lower opacity ceiling, softer glow. Pass
 *  props to override if you want it denser/brighter again.
 */

export interface ParticlesBackgroundProps {
  /** Number of particles to render. Default: 200 (subtle, ambient density). */
  count?: number;
  /**
   * Particle color (any valid CSS color). If omitted, a sensible default is
   * chosen automatically based on `theme` (white on dark, dark slate on light).
   */
  color?: string;
  /** Min/max particle radius in px, at closest depth. Default: [0.5, 1.8] */
  sizeRange?: [number, number];
  /** Min/max vertical drift speed (px/sec), at closest depth. Default: [8, 20] */
  speedRange?: [number, number];
  /** Min/max base opacity, at farthest/closest depth. Default: [0.08, 0.5] */
  opacityRange?: [number, number];
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
  /** 0 = farthest layer, 1 = nearest layer. Drives size/speed/opacity. */
  depth: number;
  baseOpacity: number;
};

// Tuned down from the original [0.5, 2] / [10, 28] / [0.15, 0.9] so the field
// reads as a light ambient dusting rather than a dense, bright wall of dots.
const DEFAULT_SIZE_RANGE: [number, number] = [0.5, 1.8];
const DEFAULT_SPEED_RANGE: [number, number] = [8, 20];
const DEFAULT_OPACITY_RANGE: [number, number] = [0.08, 0.5];
const DEFAULT_COUNT = 200;

const THEME_PRESETS = {
  dark: {
    color: 'rgba(168,85,247,0.9)', // violet-500 — matches the reference screenshot
    glow: 4,
    blobColorTopLeft: 'rgba(139,92,246,0.10)',
    blobColorBottomRight: 'rgba(88,28,135,0.14)',
  },
  light: {
    color: 'rgba(109,40,217,0.45)', // violet-800 at low opacity for light backgrounds
    glow: 1.5,
    blobColorTopLeft: 'rgba(139,92,246,0.06)',
    blobColorBottomRight: 'rgba(88,28,135,0.06)',
  },
} as const;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBackground({
  count = DEFAULT_COUNT,
  color,
  sizeRange = DEFAULT_SIZE_RANGE,
  speedRange = DEFAULT_SPEED_RANGE,
  opacityRange = DEFAULT_OPACITY_RANGE,
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
        // depth: 0 = farthest (small, dim, slow), 1 = nearest (big, bright, fast).
        // Weighted toward smaller/farther particles so the field reads as a
        // natural distribution rather than everything looking the same size.
        const depth = Math.pow(Math.random(), 1.6);
        return {
          x,
          y,
          baseX: x,
          size: sizeRange[0] + (sizeRange[1] - sizeRange[0]) * depth,
          speed: speedRange[0] + (speedRange[1] - speedRange[0]) * depth,
          phase: Math.random() * Math.PI * 2,
          swayAmplitude: randomBetween(4, 20),
          depth,
          baseOpacity:
            opacityRange[0] + (opacityRange[1] - opacityRange[0]) * depth,
        };
      });
    },
    [count, sizeRange, speedRange, opacityRange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // --- Pre-render a soft radial "glow" sprite once, offscreen. ---
    // Stamping this with drawImage per-particle is far cheaper than setting
    // ctx.shadowBlur + filling a shape per-particle every frame, which is a
    // well-known perf cliff in Canvas2D (especially on Safari/mobile) once
    // you're drawing hundreds of glowing shapes per frame.
    const SPRITE_SIZE = 64;
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = SPRITE_SIZE;
    spriteCanvas.height = SPRITE_SIZE;
    const spriteCtx = spriteCanvas.getContext('2d');
    if (spriteCtx) {
      const cx = SPRITE_SIZE / 2;
      const cy = SPRITE_SIZE / 2;
      const gradient = spriteCtx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      // Extract the rgb channel of resolvedColor so we can build a gradient
      // that fades this exact hue out to fully transparent.
      gradient.addColorStop(0, resolvedColor);
      gradient.addColorStop(0.4, resolvedColor);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      spriteCtx.fillStyle = gradient;
      spriteCtx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    }

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

      for (const p of particlesRef.current) {
        if (!prefersReducedMotion) {
          p.y -= p.speed * dt;
          if (p.y < -10) {
            p.y = height + 10;
            p.baseX = Math.random() * width;
          }
          p.phase += dt * (0.4 + p.depth * 0.4);
          p.x = p.baseX + Math.sin(p.phase) * p.swayAmplitude;
        }

        // Gentle twinkle around each particle's own base opacity, plus a
        // wider glow halo for nearer (larger) particles.
        const twinkle = 0.75 + 0.25 * Math.sin(p.phase * 1.3);
        ctx.globalAlpha = p.baseOpacity * twinkle;

        const haloSize = p.size * (4 + p.depth * (resolvedGlow / 2));
        ctx.drawImage(
          spriteCanvas,
          p.x - haloSize / 2,
          p.y - haloSize / 2,
          haloSize,
          haloSize
        );

        // Crisp bright core on top of the soft halo, so particles still
        // read as sharp points up close, not just blurry blobs.
        ctx.globalAlpha = p.baseOpacity * twinkle;
        ctx.fillStyle = resolvedColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
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