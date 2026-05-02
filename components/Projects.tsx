'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'The Digi Tools',
    description: 'This is a platform where you can buy different types of digital tools.',
    tags: ['TypeScript', 'Next.js', 'Node.js'],
    link: 'https://assignment-6-navy.vercel.app/',
    github: 'https://github.com/salman-ibn-riyaj/assignment-6',
    image: '/digiTools.png',
  },
  {
    title: 'KeenKeeper',
    description:
      'An app built with Next.js 15 and Tailwind CSS, offering real-time chatting, collaboration, comments, and so on.',
    tags: ['TypeScript', 'Next.js'],
    link: 'https://assignment-7-smoky-nine.vercel.app/',
    github: 'https://github.com/salman-ibn-riyaj/assignment-7',
    image: '/keenKeeper.png',
  },
  {
    title: 'The Book Vibe',
    description:
      'A modern platform built with Next.js and Tailwind CSS. Offers a chance to buy interesting books of novels or storybooks, also you can read them online.',
    tags: ['Next.js', 'React'],
    link: 'https://bok-vibe-project.vercel.app/',
    github: 'https://github.com/salman-ibn-riyaj/bok-vibe-project',
    image: '/bookVibe.png',
  },
];

export default function Projects() {
  return (
    <section className="py-32 px-6 bg-slate-950 relative" id="projects">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Projects
          </h2>
          <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">
            Selected Works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
