'use client';

import { BadgeCheck } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React from 'react';

const frontendSkills = [
  { name: 'Next.js', level: 'Advanced', progress: 85 },
  { name: 'React.js', level: 'Advanced', progress: 90 },
  { name: 'TypeScript', level: 'Intermediate', progress: 75 },
  { name: 'JavaScript (ES6+)', level: 'Advanced', progress: 88 },
  { name: 'Tailwind CSS', level: 'Advanced', progress: 92 },
  { name: 'HTML5', level: 'Advanced', progress: 95 },
  { name: 'Shopify', level: 'Intermediate', progress: 70 },
];

const backendSkills = [
  { name: 'Node.js', level: 'Intermediate', progress: 75 },
  { name: 'Express.js', level: 'Intermediate', progress: 78 },
  { name: 'MongoDB', level: 'Intermediate', progress: 72 },
  { name: 'JWT & Authentication', level: 'Intermediate', progress: 70 },
  { name: 'Better Auth', level: 'Intermediate', progress: 68 },
];

const SkillCard = ({
  title,
  skills,
  delay = 0,
}: {
  title: string;
  skills: typeof frontendSkills;
  delay?: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group rounded-3xl p-[1px] overflow-hidden shadow-xl dark:shadow-2xl"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Interactive Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.18), transparent 80%)`,
        }}
      />

      <div className="relative bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl h-full w-full rounded-[23px] p-8 md:p-10 z-10 border border-slate-200/80 dark:border-white/10 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
              className="flex flex-col gap-2 group/skill"
            >
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600 dark:text-blue-500 flex-shrink-0 group-hover/skill:scale-110 transition-transform duration-300" size={20} />
                <div className="flex justify-between w-full items-end">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-gray-200">{skill.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">{skill.level}</p>
                </div>
              </div>
              
              {/* Progress bar with smooth animation */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1 relative p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.08 + 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-[1px] left-[1px] bottom-[1px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section className="md:py-32 py-16 px-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300" id="skills">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 dark:opacity-100" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Skills</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase text-sm">
            My Technical Arsenal
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Frontend Category */}
          <SkillCard title="Frontend Specialization" skills={frontendSkills} delay={0.1} />

          {/* Backend Category */}
          <SkillCard title="Backend & Database" skills={backendSkills} delay={0.2} />
        </div>
      </div>
    </section>
  );
}