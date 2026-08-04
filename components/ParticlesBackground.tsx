'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface ParticlesBackgroundProps {
  count?: number;
  /**
   * Palette of colors particles are randomly assigned from — this is what
   * makes the field colorful instead of a single flat hue. Falls back to a
   * theme-appropriate vibrant palette if omitted. If you pass the old
   * single `color` prop instead, it's used as a one-color palette.
   */
  colors?: string[];
  /** @deprecated Use `colors` for a multi-color field. Still works as a single-color override. */
  color?: string;
  sizeRange?: [number, number];
  /** Vertical rise speed range, in px/frame. Default: [0.6, 1.5] (moderate) */
  speedRange?: [number, number];
  opacityRange?: [number, number];
  glow?: number;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  /**
   * How far below the viewport a dot can spawn/respawn, as a multiple of
   * the viewport height. Default: 1.3
   */
  spawnDepth?: number;
}

type ParticleState = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  depth: number;
  baseOpacity: number;
  color: string;
};

// Size/opacity/glow kept at original values — only the particle count is
// reduced, so each dot still looks the same size as before, there are just
// fewer of them on screen. Speed range is a moderate upward drift
// (px/frame), no connecting lines — dots simply rise from the bottom to
// the top of the screen. All dots share one color by default; pass a
// multi-entry `colors` array if you want a mixed-color field instead.
const DEFAULT_SIZE_RANGE: [number, number] = [0.9, 2.4];
const DEFAULT_SPEED_RANGE: [number, number] = [0.6, 1.5];
const DEFAULT_OPACITY_RANGE: [number, number] = [0.3, 0.85];
const DEFAULT_COUNT = 4;
// How far below the viewport a dot can spawn, as a multiple of the
// viewport height — this is the "max distance" knob now that the old
// connecting-line maxDistance no longer applies (lines were removed).
// Bigger = dots start further down and take longer to rise into view.
const DEFAULT_SPAWN_DEPTH = 1.3;

const THEME_PRESETS = {
  dark: {
    glow: 8,
    colors: ['rgba(168,85,247,0.95)'], // violet — single color by default
  },
  light: {
    glow: 3,
    colors: ['rgba(109,40,217,0.6)'], // violet — single color by default
  },
} as const;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function ParticlesBackground({
  count = DEFAULT_COUNT,
  colors,
  color,
  sizeRange = DEFAULT_SIZE_RANGE,
  speedRange = DEFAULT_SPEED_RANGE,
  opacityRange = DEFAULT_OPACITY_RANGE,
  glow,
  theme = 'auto',
  className = '',
  spawnDepth = DEFAULT_SPAWN_DEPTH,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<ParticleState[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

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
  // Precedence: explicit `colors` array > legacy single `color` (used as a
  // one-color palette) > theme's default multi-color palette.
  const resolvedColors = colors ?? (color ? [color] : preset.colors);
  const resolvedGlow = glow ?? preset.glow;

  const pickColor = useCallback(
    () => resolvedColors[Math.floor(Math.random() * resolvedColors.length)],
    [resolvedColors]
  );

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: count }, () => {
        const depth = Math.random();
        const speed = randomBetween(speedRange[0], speedRange[1]);
        return {
          x: Math.random() * width,
          // Spawn below the viewport, up to spawnDepth screen-heights
          // further down, so on page load — and on every reload — the
          // dots visibly rise in from the bottom rather than already
          // being in place.
          y: height + Math.random() * height * spawnDepth,
          size: sizeRange[0] + (sizeRange[1] - sizeRange[0]) * depth,
          // Rising motion: negative vy moves the dot upward each frame.
          // A slight negative-to-positive vx gives it a gentle horizontal
          // sway instead of a perfectly straight line, which reads as more
          // natural than a rigid vertical path.
          vx: randomBetween(-0.25, 0.25),
          vy: -speed,
          depth,
          baseOpacity: opacityRange[0] + (opacityRange[1] - opacityRange[0]) * depth,
          color: pickColor(),
        };
      });
    },
    [count, sizeRange, speedRange, opacityRange, spawnDepth, pickColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      const particles = particlesRef.current;

      // Update and draw particles — dots only, no connecting lines.
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap horizontally so gentle sway never carries a dot off-screen.
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          // Once a dot rises past the top, respawn it below the viewport
          // (not immediately at the bottom edge) with a fresh random x and
          // color, so entries stay staggered instead of all lining up.
          if (p.y < -p.size) {
            p.y = height + Math.random() * height * spawnDepth * 0.3;
            p.x = Math.random() * width;
            p.color = pickColor();
          }
        }

        ctx.globalAlpha = p.baseOpacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = resolvedGlow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
  }, [resolvedGlow, initParticles, pickColor, spawnDepth]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}