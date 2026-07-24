'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Download } from 'lucide-react';
import gsap from 'gsap';
import SplitType from 'split-type';
import Magnetic from '@/components/animations/Magnetic';

const ROLES = [
    'Frontend Web Developer',
    'Node.js Developer',
    'React JS Developer',
    'MERN Stack Developer',
    'Web Developer',
];

function useTypingEffect(words: string[]) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];
        const typingSpeed = isDeleting ? 40 : 80;
        const pauseBeforeDelete = 1400;
        const pauseBeforeNext = 400;

        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (isDeleting && text === '') {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }, pauseBeforeNext);
        } else {
            timeout = setTimeout(() => {
                setText((prev) =>
                    isDeleting
                        ? currentWord.slice(0, prev.length - 1)
                        : currentWord.slice(0, prev.length + 1)
                );
            }, typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words]);

    return text;
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const typedRole = useTypingEffect(ROLES);

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
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', stagger: 0.1 },
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
            className="relative min-h-screen flex items-center justify-center text-gray-900 dark:text-white overflow-x-hidden pt-32 pb-20 transition-colors duration-300"
            id="home"
        >
            {/* Background Gradient Blobs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none dark:mix-blend-screen"
                animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[100px] pointer-events-none dark:mix-blend-screen"
                animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* Sidebar Socials */}
            <div className="hidden md:flex absolute left-6 md:left-10 flex-col gap-6 text-gray-400 dark:text-gray-500 z-50 hero-socials">
                <Magnetic>
                    <a target="_blank" href="https://www.linkedin.com/in/nayem-ahmmed/" className="p-2 block" rel="noopener noreferrer">
                        <FaLinkedin className="hover:text-blue-500 cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
                <Magnetic>
                    <a target="_blank" href="https://github.com/nayem0087" className="p-2 block" rel="noopener noreferrer">
                        <FaGithub className="hover:text-gray-900 dark:hover:text-white cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
                <Magnetic>
                    <a target="_blank" href="https://x.com/NayemAhmmed87?t=hTPZMCKKEzfgmSgvi8iidg&s=09" className="p-2 block" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-blue-400 cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
                <Magnetic>
                    <a target="_blank" href="https://www.facebook.com/share/199Svkezc8" className="p-2 block" rel="noopener noreferrer">
                        <FaFacebook className="hover:text-blue-600 cursor-pointer text-2xl transition-colors" />
                    </a>
                </Magnetic>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="max-w-6xl w-full mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10"
            >
                {/* Left Content */}
                <div className="space-y-6">
                    <p className="text-xl hero-subtitle text-blue-600 dark:text-blue-400 font-medium">Hey, I&apos;m</p>
                    <h1 ref={textRef} className="text-4xl md:text-7xl font-bold tracking-tight">
                        Nayem <span className='text-blue-500'>Ahmmed</span> 👋
                    </h1>

                    {/* Designation — dynamic typing effect */}
                    <p className="text-2xl text-gray-700 dark:text-gray-300 hero-subtitle min-h-[2.5rem]">
                        I am a{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {typedRole}
                            <span className="inline-block w-[2px] h-6 bg-blue-600 dark:bg-blue-400 ml-1 align-middle animate-pulse" />
                        </span>
                    </p>

                    <p ref={descRef} className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed text-lg">
                        🚀 Turning ideas into stunning interactive experiences 💻 | Available for freelance
                        projects 🌟
                    </p>

                    <div className="hero-btn pt-8 relative z-20 flex flex-wrap items-center gap-4">
                        <Magnetic>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=nayemk0087@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
                            >
                                Say Hello
                            </a>
                        </Magnetic>

                        {/* Resume Download Button */}
                        <Magnetic>
                            <a
                                href="https://drive.google.com/file/d/1vGGti64ep1aZoJX9n8fuFjWUhyW9-q0W/view?usp=drive_link"
                                download
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 font-bold rounded-full hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                <Download size={16} /> Download Resume
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
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-100/60 to-purple-100/60 dark:from-blue-900/50 dark:to-purple-900/50 p-2 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-2xl">
                            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-full overflow-hidden">
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
                <span className="text-gray-400 dark:text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-blue-500 to-transparent" />
            </motion.div>
        </section>
    );
}