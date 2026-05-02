'use client';

import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { X, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  link,
  github,
  image,
  index,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showDetail, setShowDetail] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -10 }}
        className="group relative flex flex-col h-full rounded-2xl bg-slate-900 border border-white/5 overflow-hidden shadow-2xl"
      >
        {/* Spotlight glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
          }}
        />

        {/* Image Area */}
        <div className="h-48 w-full bg-slate-800 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        </div>

        <div className="p-6 flex flex-col flex-grow relative z-20">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                key={tag}
                className="bg-slate-800/80 backdrop-blur-sm border border-white/5 text-gray-300 text-xs px-3 py-1 rounded-full group-hover:border-blue-500/30 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Buttons row */}
          <div className="flex gap-3 mt-auto">
            {/* Live Demo */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex-1 bg-white text-black py-3 rounded-xl text-center font-bold transition-all group/btn"
            >
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300 text-sm">
                Live Demo
              </span>
              <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            {/* GitHub */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-white/10 text-gray-400 hover:bg-white hover:text-black transition-all duration-300"
              title="GitHub Repo"
            >
              <FaGithub size={20} />
            </a>

            {/* View Detail */}
            <button
              onClick={() => setShowDetail(true)}
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-white/10 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              title="View Details"
            >
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Image */}
              <div className="h-52 w-full relative overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                {/* Close button */}
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/80 border border-white/10 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 border border-white/10 text-gray-300 font-bold rounded-xl hover:bg-white hover:text-black transition-colors duration-300 text-sm"
                  >
                    <FaGithub size={16} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
