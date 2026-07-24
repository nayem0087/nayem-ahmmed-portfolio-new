'use client';

import { use } from 'react';
import { allProjects } from '@/data/projectsData';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Layers, AlertCircle, Rocket } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { notFound } from 'next/navigation';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const project = allProjects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-24 px-6 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Projects
        </Link>

        {/* Project Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">{project.description}</p>
        </div>

        {/* Project Image */}
        <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-10 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-slate-100 dark:bg-slate-900">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Details Grid */}
        <div className="space-y-8">
          {/* Main Tech Stack */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <h3 className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-base mb-4 uppercase tracking-wider">
              <Layers size={20} /> Main Technology Stack Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm px-4 py-1.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges Faced */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <h3 className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-base mb-3">
              <AlertCircle size={20} /> Challenges Faced While Developing
            </h3>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{project.challenges}</p>
          </div>

          {/* Future Plans */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <h3 className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-base mb-3">
              <Rocket size={20} /> Future Plans & Improvements
            </h3>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{project.futurePlans}</p>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-300 text-base shadow-lg"
            >
              <ExternalLink size={18} /> Live Project Link
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-gray-200 font-bold rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 text-base"
            >
              <FaGithub size={18} /> GitHub Repo (Client)
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}