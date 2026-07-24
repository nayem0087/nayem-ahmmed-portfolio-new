'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Briefcase } from 'lucide-react';
import Magnetic from '@/components/animations/Magnetic';

const navItems = [
  { label: 'Home', slug: 'home' },
  { label: 'About', slug: 'about' },
  { label: 'Tech Stack', slug: 'tech-stack' },
  { label: 'Skills', slug: 'skills' },
  { label: 'Projects', slug: 'projects' },
  { label: 'Qualification', slug: 'qualification' },
  { label: 'Contact Me', slug: 'contact-me' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-[200] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Magnetic>
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-white/20 group-hover:border-blue-500 transition-colors duration-300">
              <img src="/nayem.jpg" alt="nayem ahmmed" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Nayem <span className="text-blue-600 dark:text-blue-500">Ahmmed</span>
              </span>
            </div>
          </a>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-600 dark:text-gray-400 items-center">
          {navItems.map((item) => (
            <Magnetic key={item.slug}>
              <a href={`#${item.slug}`} className="relative group py-2">
                <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Right Actions (Theme Toggle & Hire Me & Hamburger) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 transition hover:bg-gray-200 dark:hover:bg-white/10"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
          </button>

          {/* Hire Me Button (Desktop) */}
          <a
            href="#contact-me"
            className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition shadow-md shadow-blue-500/20"
          >
            <Briefcase size={16} /> Hire Me
          </a>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 text-gray-900 dark:text-white"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-current block mb-1.5"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-0.5 bg-current block mb-1.5"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-current block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
          {navItems.map((item, index) => (
            <motion.a
              key={item.slug}
              href={`#${item.slug}`}
              onClick={handleLinkClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.06 }}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:text-blue-500 transition-colors py-1"
            >
              {item.label}
            </motion.a>
          ))}

          {/* Hire Me Button (Mobile) */}
          <motion.a
            href="#contact-me"
            onClick={handleLinkClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
            transition={{ delay: navItems.length * 0.06 }}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md mt-2"
          >
            <Briefcase size={18} /> Hire Me
          </motion.a>
        </div>
      </motion.div>
    </nav>
  );
}