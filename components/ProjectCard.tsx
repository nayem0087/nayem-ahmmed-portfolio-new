'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { Project } from '@/data/projectsData';

interface ProjectCardProps extends Project {
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  tags,
  link,
  github,
  image,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300"
    >
      {/* Image Area */}
      <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons row */}
        <div className="flex gap-3 mt-auto">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-center font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] text-sm flex items-center justify-center"
          >
            <span className="relative z-10">
              Live Demo
            </span>
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            title="GitHub Client Repo"
          >
            <FaGithub size={18} />
          </a>

          <Link
            href={`/projects/${id}`}
            className="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-white/10 text-blue-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 text-sm font-medium flex items-center justify-center"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};