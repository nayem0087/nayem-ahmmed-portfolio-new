'use client';

import React from 'react';
import { motion } from 'framer-motion';

const particles = Array.from({ length: 150 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 1.5 + 0.8, // 0.8px - 2.3px
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 5,
  xMove: Math.random() * 20 - 10, // ← Added
}));

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-0 w-[35vw] h-[35vw] rounded-full bg-green-500/5 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] rounded-full bg-purple-500/5 blur-[140px]" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/70"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 4px rgba(255,255,255,0.4)',
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, p.xMove, 0],
            opacity: [0.15, 0.6, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}