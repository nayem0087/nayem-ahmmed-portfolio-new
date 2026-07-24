'use client';

import { useRef } from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const educationData = [
  {
    title: 'Bachelor of Arts',
    school: 'Shah Jalal Govt. College',
    years: '2023 - 2026',
    gpa: 'pending',
    background: 'Humanities',
    subject: 'Statistics',
  },
  {
    title: 'HSC',
    school: 'Shah Jalal Govt. College',
    years: '2021 - 2023',
    gpa: '3.50',
    background: 'Humanities',
    subject: 'Statistics',
  },
  {
    title: 'SSC',
    school: 'Montola High School',
    years: '2019 - 2021',
    gpa: '3.83',
    background: 'Science',
    subject: 'Physics',
  },
];

const trainingData = [
  {
    title: 'Complete MERN Stack Web Development',
    platform: 'Programming Hero',
    years: '2026',
    category: 'Full Stack Development',
    description: 'Advanced web development course focusing on React, Node.js, Express, and MongoDB.',
  },
  {
    title: 'HTML, CSS & Tailwind CSS Mastery',
    platform: 'Programming Hero / Self-Taught',
    years: '2025',
    category: 'Frontend Foundations',
    description: 'Learned modern UI design, responsive layouts, and utility-first styling.',
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
    <section className="py-32 px-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300 overflow-hidden" id="qualification">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Education & Training</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase text-sm">
            My Academic & Professional Journey
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Education */}
          <div className="lg:col-span-6">
            <div className="flex justify-center gap-4 mb-12">
              <div className="flex items-center gap-3 font-bold text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-500/20 shadow-sm dark:shadow-none">
                <GraduationCap size={24} /> Education
              </div>
            </div>

            <div ref={containerRef} className="relative pl-6 md:pl-8">
              {/* Background line */}
              <div className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />
              {/* Animated fill line */}
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-[2px] bg-blue-600 dark:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              />

              <div className="space-y-12">
                {educationData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.2,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="relative pl-12 group"
                  >
                    {/* Glowing dot */}
                    <div className="absolute left-[-2px] md:left-[2px] top-2 w-4 h-4 bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-blue-500 rounded-full group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    {/* Connector */}
                    <div className="absolute left-[14px] md:left-[18px] top-4 w-6 h-[2px] bg-slate-200 dark:bg-slate-800 group-hover:bg-blue-400 dark:group-hover:bg-blue-500/50 transition-colors duration-300" />

                    <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-6 rounded-2xl group-hover:border-blue-300 dark:group-hover:border-blue-500/30 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900/80 shadow-sm dark:shadow-none">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">{item.school}</p>
                      <p className="text-slate-500 dark:text-gray-500 text-xs mt-1">
                        {item.background} · {item.subject}
                      </p>
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-medium bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-transparent">
                          {item.years}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                          GPA {item.gpa}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Training & Courses */}
          <div className="lg:col-span-6">
            <div className="flex justify-center gap-4 mb-12">
              <div className="flex items-center gap-3 font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-6 py-3 rounded-full border border-purple-200 dark:border-purple-500/20 shadow-sm dark:shadow-none">
                <BookOpen size={24} /> Training & Courses
              </div>
            </div>

            <div className="relative pl-6 md:pl-8">
              {/* Background line */}
              <div className="absolute left-[22px] md:left-[26px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />

              <div className="space-y-12">
                {trainingData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.2,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="relative pl-12 group"
                  >
                    {/* Glowing dot */}
                    <div className="absolute left-[-2px] md:left-[2px] top-2 w-4 h-4 bg-white dark:bg-slate-950 border-2 border-purple-600 dark:border-purple-400 rounded-full group-hover:bg-purple-600 dark:group-hover:bg-purple-400 transition-colors duration-300 z-10 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    {/* Connector */}
                    <div className="absolute left-[14px] md:left-[18px] top-4 w-6 h-[2px] bg-slate-200 dark:bg-slate-800 group-hover:bg-purple-400 dark:group-hover:bg-purple-500/50 transition-colors duration-300" />

                    <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-6 rounded-2xl group-hover:border-purple-300 dark:group-hover:border-purple-500/30 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900/80 shadow-sm dark:shadow-none">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                          <Award size={18} />
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">{item.platform}</p>
                      <p className="text-slate-500 dark:text-gray-500 text-xs mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <span className="text-purple-600 dark:text-purple-400 text-xs font-medium bg-purple-50 dark:bg-purple-500/10 px-3 py-1 rounded-full border border-purple-100 dark:border-transparent">
                          {item.years}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-medium bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}