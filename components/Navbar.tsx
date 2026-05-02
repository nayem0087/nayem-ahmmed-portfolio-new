'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';

export default function Navbar() {
  const navItems = ['Home', 'About', 'Tech Stack', 'Skills', 'Projects', 'Qualification', 'Contact Me'];
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed w-full z-[200] bg-slate-950/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Magnetic>
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-blue-500 transition-colors">
              <img src="/profile.png" alt="Salman Shah" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter hidden sm:block">
              Salman Shah
            </span>
          </a>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          {navItems.map((item) => (
            <Magnetic key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative group py-2"
              >
                <span className="group-hover:text-white transition-colors">{item}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white block mb-1.5"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-0.5 bg-white block mb-1.5"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white block"
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6 text-lg font-medium">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={handleLinkClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.06 }}
              className="text-gray-300 hover:text-white active:text-blue-500 transition-colors py-2"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
