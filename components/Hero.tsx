'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import SplitType from 'split-type';
import Magnetic from '@/components/animations/Magnetic';

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        if (!textRef.current || !descRef.current) return;

        const ctx = gsap.context(() => {
            const splitText = new SplitType(textRef.current!, { types: 'chars,words' });

            const tl = gsap.timeline();

            tl.fromTo(
                splitText.chars,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: 'power4.out', delay: 0.2 }
            )
                .fromTo(
                    '.hero-subtitle',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo(
                    descRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo(
                    '.hero-btn',
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
                    '-=0.4'
                )
                .fromTo(
                    '.hero-socials a',
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
                    '-=0.8'
                );

            return () => {
                splitText.revert();
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-x-hidden pt-32 pb-20"
            id="home"
        >
            {/* Background Gradient Blobs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
                animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
                animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* Sidebar Socials */}
            <div className="hidden md:flex absolute left-6 md:left-10 flex-col gap-6 text-gray-400 z-50 hero-socials">
                <Magnetic>
                    <a target="_blank" href="https://www.linkedin.com/in/nayem-ahmmed/" className="p-2 block" rel="noopener noreferrer">
                        <FaLinkedin className="hover:text-blue-500 cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
                <Magnetic>
                    <a target="_blank" href="https://github.com/nayem0087" className="p-2 block" rel="noopener noreferrer">
                        <FaGithub className="hover:text-white cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
                <Magnetic>
                    <a target="_blank" href="https://x.com/NayemAhmmed87?t=hTPZMCKKEzfgmSgvi8iidg&s=09" className="p-2 block" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-blue-400 cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="max-w-6xl w-full mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10"
            >
                {/* Left Content */}
                <div className="space-y-6">
                    <p className="text-xl hero-subtitle text-blue-400 font-medium">Hey, I&apos;m</p>
                    <h1 ref={textRef} className="text-4xl md:text-7xl font-bold tracking-tight">
                        Nayem Ahmmed 👋
                    </h1>
                    <p className="text-2xl text-gray-300 hero-subtitle">I am a Frontend Web Developer</p>
                    <p ref={descRef} className="text-gray-400 max-w-sm leading-relaxed text-lg">
                        🚀 Turning ideas into stunning interactive experiences 💻 | Available for freelance
                        projects 🌟
                    </p>
                    <div className="hero-btn pt-8 relative z-20">
                        <Magnetic>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=nayemk0087@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
                            >
                                Say Hello
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Right Content — Avatar */}
                <div className="relative flex justify-center md:justify-end">
                    <motion.div
                        className="w-72 h-72 md:w-96 md:h-96 relative"
                        animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {/* Glowing Rings */}
                        <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-2 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-900/50 to-purple-900/50 p-2 backdrop-blur-sm border border-white/10 shadow-2xl">
                            <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden">
                                <img
                                    src="/nayem.jpg"
                                    alt="Nayem Ahmmed"
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-blue-500 to-transparent" />
            </motion.div>
        </section>
    );
}
