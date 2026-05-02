'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import Magnetic from '@/components/animations/Magnetic';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden"
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-bold mb-4 tracking-tight">About</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">
            My Introduction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Portrait with Parallax */}
          <div className="flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-80 h-80 md:w-96 md:h-96 rounded-2xl bg-gradient-to-b from-blue-900/30 to-transparent flex items-center justify-center overflow-hidden border border-white/5 relative group"
            >
              <motion.img
                style={{ y: imageY }}
                src="/profile.png"
                alt="Salman Shah"
                className="w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(2,6,23,0.8)] pointer-events-none" />
            </motion.div>
          </div>

          {/* Details */}
          <div>
            <div className="text-gray-300 leading-relaxed mb-10 text-lg space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Proficient in{' '}
                <span className="text-white font-semibold">React.js, Next.js, and Node.js</span>,
                I build scalable, high-performance applications.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Skilled in MongoDB and modern database architectures. I deliver innovative
                real-time systems and impactful solutions.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Always eager to learn new technologies and build products that provide exceptional
                user experiences.
              </motion.p>
            </div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Magnetic>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group">
                  Download Resume
                  <span className="text-lg group-hover:translate-y-1 transition-transform">📄</span>
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
