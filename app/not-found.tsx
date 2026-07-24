'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-6 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className="relative"
        >
          <span className="text-8xl sm:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center blur-2xl opacity-20 bg-blue-600 rounded-full -z-10" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            <Home size={18} /> Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold text-sm transition-all"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </motion.div>

      </div>
    </main>
  );
}