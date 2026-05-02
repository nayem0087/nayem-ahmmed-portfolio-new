'use client';

import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGit,
} from 'react-icons/si';

const technologies = [
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400 group-hover:text-yellow-300 transition-colors" /> },
  { name: 'React', icon: <SiReact className="text-cyan-400 group-hover:text-cyan-300 transition-colors" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white group-hover:text-gray-200 transition-colors" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-green-500 group-hover:text-green-400 transition-colors" /> },
  { name: 'Express', icon: <SiExpress className="text-white group-hover:text-gray-200 transition-colors" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-600 group-hover:text-green-400 transition-colors" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400 group-hover:text-cyan-300 transition-colors" /> },
  { name: 'Git', icon: <SiGit className="text-orange-600 group-hover:text-orange-500 transition-colors" /> },
];

export default function TechStack() {
  return (
    <section className="bg-slate-950 py-32 px-4 overflow-hidden relative" id="tech-stack">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Technologies
          </h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">
            Tools I use daily
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div
          className="relative w-full flex overflow-hidden py-10"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <motion.div
            className="flex gap-12 whitespace-nowrap min-w-full"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
          >
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer shrink-0 w-32 relative"
              >
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ y: -10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="w-20 h-20 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl text-4xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5 relative z-10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {tech.icon}
                </motion.div>
                <span className="mt-6 text-sm font-medium text-gray-500 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
