'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type TrailParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number; // 0 (dead) -> 1 (just spawned)
  decay: number;
};

export interface CustomCursorProps {
  /** Diameter of the inner dot, in px. Default: 8 */
  dotSize?: number;
  /** Diameter of the outer ring at rest, in px. Default: 32 */
  ringSize?: number;
  /** Diameter of the outer ring while hovering an interactive element. Default: 56 */
  ringHoverSize?: number;
  /** Cursor accent color (any valid CSS color). Default: violet to match a purple UI theme */
  color?: string;
  /** Spring stiffness for the ring's trailing motion. Higher = snappier. Default: 400 */
  stiffness?: number;
  /** Spring damping for the ring's trailing motion. Higher = less overshoot. Default: 35 */
  damping?: number;
  /** Whether dots spurt from the cursor as it moves. Default: true */
  enableTrail?: boolean;
  /** Trail particle color. If omitted, uses `color`. */
  trailColor?: string;
  /** Particles spawned per mousemove event while idle. Default: 1 */
  trailSpawnRate?: number;
  /** Particles spawned per mousemove event while hovering an interactive element. Default: 3 */
  trailHoverSpawnRate?: number;
  /** Min/max trail particle radius in px. Default: [1, 3] */
  trailSizeRange?: [number, number];
  /** How long each trail particle lives, in ms. Default: 600 */
  trailLifeMs?: number;
}

export default function CustomCursor({
  dotSize = 8,
  ringSize = 32,
  ringHoverSize = 56,
  color = '#a855f7', // violet-500
  stiffness = 400,
  damping = 35,
  enableTrail = true,
  trailColor,
  trailSpawnRate = 1,
  trailHoverSpawnRate = 3,
  trailSizeRange = [1, 3],
  trailLifeMs = 500,
}: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const ringCurrentSize = isHovering ? ringHoverSize : ringSize;

  // Raw pointer position — updates instantly, drives the dot.
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring-smoothed position — lags slightly behind, drives the ring.
  const prefersReducedMotionRef = useRef(false);
  const ringX = useSpring(dotX, { stiffness, damping, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness, damping, mass: 0.5 });

  // Offset each axis by half the element's size so the element is centered
  // on the pointer, while staying purely transform-based (no left/top) so
  // the browser never has to run layout — just a cheap GPU-composited
  // translate on every frame. The ring's offset is recomputed whenever its
  // size changes (rest vs. hover) so it stays centered either way.
  const dotOffsetX = useTransform(dotX, (v) => v - dotSize / 2);
  const dotOffsetY = useTransform(dotY, (v) => v - dotSize / 2);
  const ringOffsetX = useTransform(ringX, (v) => v - ringCurrentSize / 2);
  const ringOffsetY = useTransform(ringY, (v) => v - ringCurrentSize / 2);

  const trailCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailParticlesRef = useRef<TrailParticle[]>([]);
  const trailRafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const resolvedTrailColor = trailColor ?? color;

  useEffect(() => {
    // Only take over the cursor on devices with a precise pointer (mouse/
    // trackpad). Touch devices report `coarse` and should keep native touch
    // behavior entirely untouched.
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    prefersReducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    setEnabled(true);
  }, []);

  useEffect(() => {
    // This effect intentionally waits for `enabled` (set by the effect
    // above) rather than running unconditionally on mount. While `enabled`
    // is false the component renders `null`, so the <canvas> ref below
    // wouldn't exist in the DOM yet if this ran on the very first mount.
    if (!enabled) return;

    // Force `cursor: none` on every element, not just <html>. Many elements
    // (buttons, links, inputs) get an explicit `cursor: pointer` from the
    // browser's UA stylesheet or from Tailwind/CSS resets — that explicit
    // value overrides the inherited `none` from <html>, which is why the
    // native cursor can reappear (and the custom one look like it
    // "vanished") specifically while hovering interactive elements.
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-custom-cursor', 'true');
    styleTag.textContent = '*, *:hover { cursor: none !important; }';
    document.head.appendChild(styleTag);

    // --- Particle trail setup (canvas-based, same technique as a
    // performant starfield: one RAF loop, one <canvas>, no per-particle
    // DOM nodes). Skipped entirely if the caller disabled it or the user
    // prefers reduced motion. ---
    const trailCanvas = trailCanvasRef.current;
    const trailCtx = trailCanvas?.getContext('2d') ?? null;
    const trailActive =
      enableTrail && !prefersReducedMotionRef.current && !!trailCtx;

    const resizeTrailCanvas = () => {
      if (!trailCanvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      trailCanvas.width = window.innerWidth * dpr;
      trailCanvas.height = window.innerHeight * dpr;
      trailCanvas.style.width = `${window.innerWidth}px`;
      trailCanvas.style.height = `${window.innerHeight}px`;
      trailCtx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnTrailParticles = (x: number, y: number) => {
      if (!trailActive) return;
      const count = isHoveringRef.current ? trailHoverSpawnRate : trailSpawnRate;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 40; // px/sec outward drift
        trailParticlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size:
            trailSizeRange[0] +
            Math.random() * (trailSizeRange[1] - trailSizeRange[0]),
          life: 1,
          decay: 1000 / trailLifeMs,
        });
      }
      // Hard cap so a very fast/long mouse session can't unboundedly grow
      // the array on a tab that's been idle-open for a while.
      if (trailParticlesRef.current.length > 400) {
        trailParticlesRef.current.splice(
          0,
          trailParticlesRef.current.length - 400
        );
      }
    };

    let lastTrailTime = 0;
    const drawTrail = (time: number) => {
      if (trailActive && trailCtx && trailCanvas) {
        const dt = lastTrailTime ? (time - lastTrailTime) / 1000 : 0;
        lastTrailTime = time;

        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        trailCtx.fillStyle = resolvedTrailColor;

        const particles = trailParticlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life -= p.decay * dt;
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          // Ease outward drift to a stop so dots settle rather than fly off.
          p.vx *= 0.94;
          p.vy *= 0.94;

          trailCtx.globalAlpha = p.life;
          trailCtx.beginPath();
          trailCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          trailCtx.fill();
        }
        trailCtx.globalAlpha = 1;
      }
      trailRafRef.current = requestAnimationFrame(drawTrail);
    };

    if (trailActive) {
      resizeTrailCanvas();
      window.addEventListener('resize', resizeTrailCanvas);
      trailRafRef.current = requestAnimationFrame(drawTrail);
    }

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setIsVisible(true);
      spawnTrailParticles(e.clientX, e.clientY);

      // Treat anything tagged data-cursor-hover, plus common interactive
      // tags, as "hoverable" so the ring reacts without extra markup on
      // every single link/button.
      const target = e.target as HTMLElement | null;
      const hoverable = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      isHoveringRef.current = hoverable;
      setIsHovering(hoverable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // `mouseout`/`mouseover` on window bubble reliably and let us detect
    // the pointer actually leaving/re-entering the browser viewport, by
    // checking for a null relatedTarget — unlike mouseenter/mouseleave on
    // <html>, which can be inconsistent across browsers.
    const handleWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setIsVisible(false);
    };
    const handleWindowMouseOver = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseout', handleWindowMouseOut);
    window.addEventListener('mouseover', handleWindowMouseOver);

    return () => {
      styleTag.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseout', handleWindowMouseOut);
      window.removeEventListener('mouseover', handleWindowMouseOver);
      window.removeEventListener('resize', resizeTrailCanvas);
      if (trailRafRef.current !== null) {
        cancelAnimationFrame(trailRafRef.current);
        trailRafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const reduced = prefersReducedMotionRef.current;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 150ms ease' }}
      aria-hidden="true"
    >
      {/* Particle trail — drawn on a single canvas, updated in its own RAF
          loop independent of React renders. */}
      {enableTrail && (
        <canvas ref={trailCanvasRef} className="absolute inset-0" />
      )}

      {/* Inner dot — tracks the raw pointer position with no lag. Purely
          transform-driven (x/y), so the browser never runs layout for it. */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: color,
          x: dotOffsetX,
          y: dotOffsetY,
        }}
        animate={{ scale: isClicked ? 0.6 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Outer ring — spring-lagged for a smooth trailing feel, grows and
          fills on hover to signal an interactive target. Position (x/y) is
          driven by a motion value so it stays off the React render path;
          only size/scale/border animate through React state changes. */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{
          x: reduced ? dotOffsetX : ringOffsetX,
          y: reduced ? dotOffsetY : ringOffsetY,
          borderColor: color,
          backgroundColor: isHovering ? `${color}1A` : 'transparent', // ~10% fill on hover
        }}
        animate={{
          width: ringCurrentSize,
          height: ringCurrentSize,
          scale: isClicked ? 0.85 : 1,
          borderWidth: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      />
    </div>
  );
}