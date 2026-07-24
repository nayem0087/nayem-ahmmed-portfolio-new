'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { allProjects } from '@/data/projectsData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-24 px-6 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white mb-12 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">All Projects</h1>
          <p className="text-blue-600 dark:text-blue-400 text-sm tracking-widest uppercase font-medium">
            Explore my complete projects of works & applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}