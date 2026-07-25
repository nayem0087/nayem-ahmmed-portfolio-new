'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Layers, MapPin, Send } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="md:py-24 py-14 md:py-32 px-4 sm:px-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">About Me</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase text-xs sm:text-sm">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Bento Grid Cards (Optimized for Light & Dark) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4 bg-slate-100 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative"
          >
            {/* Card 1: Express & Node Backend */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between">
              <Server className="text-blue-600 dark:text-blue-500 w-6 h-6 mb-4" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">Express & Node</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Backend API</p>
              </div>
            </div>

            {/* Card 2: MongoDB Database */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between">
              <Database className="text-emerald-600 dark:text-emerald-500 w-6 h-6 mb-4" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">MongoDB</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Database</p>
              </div>
            </div>

            {/* Card 3: Next.js / Frontend */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between">
              <Layers className="text-indigo-600 dark:text-indigo-500 w-6 h-6 mb-4" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">Next.js</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Frontend Core</p>
              </div>
            </div>

            {/* Card 4: Location */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between">
              <MapPin className="text-rose-600 dark:text-rose-500 w-6 h-6 mb-4" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">Bangladesh</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">Based in BD</p>
              </div>
            </div>

            {/* Quote Box spanning full width */}
            <div className="col-span-2 p-4 rounded-xl bg-slate-200/70 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800/60 italic text-xs sm:text-sm text-slate-600 dark:text-gray-400">
              &quot;Building robust full-stack web applications from database schema to seamless user interfaces.&quot;
              <span className="block mt-1 not-italic font-semibold text-blue-600 dark:text-blue-500 text-xs">— Nayem Ahmmed</span>
            </div>
          </motion.div>

          {/* Right Side: Detailed Info & Personality */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4 text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Hi! I&apos;m <span className="text-slate-900 dark:text-white font-semibold">Nayem Ahmmed</span>, a dedicated <span className="text-slate-900 dark:text-white font-semibold">Full-Stack MERN Developer</span> from Bangladesh, focused on building clean, functional, and high-performance digital solutions.
              </p>
              <p>
                My programming journey started with a passion for web design. Today, I build end-to-end applications utilizing <span className="text-slate-900 dark:text-white font-semibold">React.js & Next.js</span> on the frontend, and power them with scalable APIs using <span className="text-slate-900 dark:text-white font-semibold">Node.js, Express.js, and MongoDB</span> databases.
              </p>
            </div>

            {/* Structured Info List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 py-4 border-y border-slate-200 dark:border-slate-800 text-sm">
              <div>
                <span className="text-slate-500 dark:text-gray-400">Name:</span> <span className="font-semibold text-slate-900 dark:text-white ml-2">Nayem Ahmmed</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-400">Location:</span> <span className="font-semibold text-slate-900 dark:text-white ml-2">Bangladesh 🇧🇩</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-400">Expertise:</span> <span className="font-semibold text-slate-900 dark:text-white ml-2">MERN & Next.js</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-gray-400">Status:</span> <span className="font-semibold text-emerald-600 dark:text-emerald-500 ml-2 flex items-center gap-1.5 inline-flex"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open to Work</span>
              </div>
            </div>

            {/* Get in Touch Button */}
            <div className="pt-2">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 group"
                >
                  Get in Touch
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}