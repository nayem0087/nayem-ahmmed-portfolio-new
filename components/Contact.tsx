'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { LogoGithub, LogoLinkedin } from '@gravity-ui/icons';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formRef.current) return;

        const SERVICE_ID = 'service_fgzldlm';
        const TEMPLATE_ID = 'template_28hygos';
        const PUBLIC_KEY = 'NTiYE9BsH5Qd0kvaK';

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(
                () => {
                    setLoading(false);
                    setSuccess(true);
                    formRef.current?.reset();
                    setTimeout(() => setSuccess(false), 6000);
                },
                (error) => {
                    setLoading(false);
                    setError('Failed to send message. Please try again later.');
                    console.error(error.text);
                }
            );
    };

    return (
        <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300" id="contact">
            <div className="max-w-6xl mx-auto">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                        Get In Touch
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium tracking-widest uppercase text-sm">
                        Let's build something amazing together
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side: Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="space-y-3 mb-6">
                            <h3 className="text-2xl font-bold text-blue-500">
                                Contact Information
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <a
                                href="mailto:nayemk0087@gmail.com"
                                className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Mail size={22} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Email Me</p>
                                    <p className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base truncate">nayemk0087@gmail.com</p>
                                </div>
                            </a>

                            <a
                                href="tel:+8801888252746"
                                className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Call Me</p>
                                    <p className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base">+880 1888252746</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 transition-all duration-300 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Location</p>
                                    <p className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base">Bangladesh</p>
                                </div>
                            </div>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <LogoLinkedin size={22} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">LinkedIn</p>
                                    <p className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base truncate">linkedin.com/in/nayem-ahmmed</p>
                                </div>
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 transition-transform flex-shrink-0">
                                    <LogoGithub size={22} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">GitHub</p>
                                    <p className="text-slate-800 dark:text-gray-200 font-medium text-sm sm:text-base truncate">github.com/nayem-ahmmed</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form Wrapper */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Send Me Message Heading (Outside the card, on top) */}
                        <div className="space-y-3 mb-6">
                            <h3 className="text-2xl font-bold text-blue-500">
                                Send Me Message
                            </h3>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-8 rounded-3xl shadow-xl dark:shadow-2xl relative">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm">
                                        Thank you for reaching out. Your message has been sent directly to my email.
                                    </p>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                                    {error && (
                                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                            <AlertCircle size={18} /> {error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            required
                                            placeholder="Write your message here..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors text-sm resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} /> Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}