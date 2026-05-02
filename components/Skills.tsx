'use client';

import { BadgeCheck } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React from 'react';

const frontendSkills = [
  { name: 'HTML5', level: 'Moderately Good', progress: 72 },
  { name: 'JavaScript', level: 'Moderately Good', progress: 68 },
  { name: 'Next.JS', level: 'Moderately Good', progress: 65 },
  { name: 'Tailwind CSS', level: 'Moderately Good', progress: 74 },
  { name: 'React.JS', level: 'Moderately Good', progress: 70 },
];

const SkillCard = ({
  title,
  skills,
}: {
  title: string;
  skills: typeof frontendSkills;
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="relative group rounded-3xl p-[1px] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 group-hover:opacity-50 transition-opacity" />

      {/* Mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative bg-slate-900/90 backdrop-blur-xl h-full w-full rounded-[23px] p-8 md:p-10 z-10 border border-white/5">
        <h3 className="text-2xl font-bold text-center mb-10 text-white tracking-tight">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {skills.map((skill, index) => (
            <div key={skill.name} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-500 flex-shrink-0" size={20} />
                <div className="flex justify-between w-full items-end">
                  <h4 className="font-semibold text-sm text-gray-200">{skill.name}</h4>
                  <p className="text-xs text-gray-500">{skill.level}</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1 relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section className="py-32 px-6 bg-slate-950 text-white relative" id="skills">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Skills</h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">
            My Technical Arsenal
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full">
            <SkillCard title="Frontend Specialization" skills={frontendSkills} />
          </div>
        </div>
      </div>
    </section>
  );
}
