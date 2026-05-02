'use client';

import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const educationData = [
  {
    title: 'SSC',
    school: 'Idgah High School',
    years: '2007 - 2012',
    gpa: '4.63',
    background: 'Science',
    subject: 'Higher Math',
  },
  {
    title: 'HSC',
    school: 'Kapasia Degree College',
    years: '2012 - 2014',
    gpa: '4.70',
    background: 'Science',
    subject: 'Math',
  },
];

export default function Qualification() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-32 px-6 bg-slate-950 text-white relative" id="qualification">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Qualification</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">
            My Personal Journey
          </p>
        </motion.div>

        <div className="flex justify-center gap-12 mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 font-bold text-blue-500 bg-blue-500/10 px-6 py-3 rounded-full border border-blue-500/20"
          >
            <GraduationCap size={24} /> Education
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative w-full mx-auto md:w-2/3">
          {/* Background line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-800" />
          {/* Animated fill line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 top-0 bottom-0 w-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />

          <div className="space-y-16 py-10">
            {educationData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="relative pl-16 group"
              >
                {/* Glowing dot */}
                <div className="absolute left-[20px] top-2 w-4 h-4 bg-slate-950 border-2 border-blue-500 rounded-full group-hover:bg-blue-500 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                {/* Connector */}
                <div className="absolute left-[36px] top-4 w-8 h-[2px] bg-slate-800 group-hover:bg-blue-500/50 transition-colors duration-300" />

                <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl group-hover:border-blue-500/30 transition-colors duration-300 hover:bg-slate-900/80">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">{item.school}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.background} · {item.subject}
                  </p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <p className="text-blue-400 text-xs font-medium bg-blue-500/10 inline-block px-3 py-1 rounded-full">
                      {item.years}
                    </p>
                    <p className="text-emerald-400 text-xs font-medium bg-emerald-500/10 inline-block px-3 py-1 rounded-full border border-emerald-500/20">
                      GPA {item.gpa}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
