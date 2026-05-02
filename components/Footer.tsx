'use client';

import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Magnetic from '@/components/animations/Magnetic';

export default function Footer() {
  return (
    <footer
      className="bg-slate-950 border-t border-white/5 pt-20 pb-8 relative overflow-hidden"
      id="contact-me"
    >
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          initial={{
            x: Math.random() * 1200,
            y: Math.random() * 400,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16 relative z-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white tracking-tight">Salman Shah</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Frontend Developer passionate about creating beautiful, interactive, and
            high-performance web experiences.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-6 tracking-wide">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['About', 'Projects', 'Qualification', 'Contact Me'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-blue-400 transition-colors inline-block relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-white font-semibold mb-6 tracking-wide">Connect With Me</h3>
          <div className="flex gap-4">
            <Magnetic>
              <a
                href="https://github.com/salman-ibn-riyaj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-slate-900 border border-white/10 text-gray-400 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <FaGithub size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/salman-ibn-riyaj/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-slate-900 border border-white/10 text-gray-400 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <FaLinkedin size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://x.com/salmanshahrz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-slate-900 border border-white/10 text-gray-400 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <FaTwitter size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=salmanibnriyaj@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-slate-900 border border-white/10 text-gray-400 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <Mail size={18} />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-center text-gray-600 text-xs border-t border-white/5 pt-8 relative z-10"
      >
        © 2026 Salman Shah. All rights reserved. Built with Next.js, Tailwind CSS &amp; Framer
        Motion.
      </motion.div>
    </footer>
  );
}
