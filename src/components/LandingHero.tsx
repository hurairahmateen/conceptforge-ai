"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingHeroProps {
    onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
    return (
        <motion.section
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative px-6 max-w-7xl mx-auto pt-20 pb-32 overflow-hidden"
        >
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-grid opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />

            <div className="max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-arch-slate border border-black/5 text-xs font-semibold uppercase tracking-wider mb-6"
                >
                    <Sparkles className="w-3 h-3 text-arch-accent" />
                    Next Gen Architectural Intelligence
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.95] mb-8 tracking-tighter">
                    AI Powered <br />
                    <span className="text-black/40 italic">Architectural</span> <br />
                    Concept Ideation
                </h1>

                <p className="text-xl text-black/60 leading-relaxed mb-10 max-w-xl">
                    Transform project constraints into visionary architectural narratives.
                    ConceptForge AI generates deep design philosophies, material palettes,
                    and zoning strategies tailored to your site and style.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStart}
                        className="btn-primary flex items-center justify-center gap-2 group"
                    >
                        Start Your Concept
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="btn-secondary">
                        View Sample Output
                    </button>
                </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/5 pt-12">
                {[
                    { label: "01", title: "Site Specific", desc: "Concepts rooted in local climate, topography, and urban context." },
                    { label: "02", title: "Philosophical Depth", desc: "Beyond aesthetics—generate meaningful design narratives." },
                    { label: "03", title: "Material Intelligence", desc: "Curated palettes that balance sustainability and visual impact." }
                ].map((item, i) => (
                    <div key={i} className="space-y-4">
                        <span className="font-mono text-xs opacity-40">{item.label}</span>
                        <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
                        <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
