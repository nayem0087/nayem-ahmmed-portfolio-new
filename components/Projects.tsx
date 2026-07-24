'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { allProjects } from '@/data/projectsData';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <section className="py-32 px-6 bg-white dark:bg-slate-950 relative transition-colors duration-300" id="projects">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Projects
          </h2>
          <p className='max-w-3xl mx-auto text-gray-600'>A selection of projects demonstrating my expertise in modern web development, problem-solving, and creating responsive, user-focused applications.</p>
        </motion.div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>

        {/* Browse More Projects Button */}
        <div className="flex justify-center">
          <Link href="/projects">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition-all duration-300 cursor-pointer group"
            >
              Browse More Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}