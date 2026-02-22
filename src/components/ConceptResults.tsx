"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Layers, Maximize, Palette, Leaf, ChevronLeft, Copy, RefreshCw } from 'lucide-react';
import { ArchitecturalConcept, ConceptFormData } from '@/types/concept';

interface ConceptResultsProps {
    result: ArchitecturalConcept;
    formData: ConceptFormData;
    onBack: () => void;
    onRegenerate: () => void;
}

export default function ConceptResults({ result, formData, onBack, onRegenerate }: ConceptResultsProps) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <motion.section
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 max-w-6xl mx-auto pt-10"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm text-black/40 hover:text-black mb-4 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to form
                    </button>
                    <h2 className="text-5xl font-serif font-bold tracking-tight">{result.conceptName}</h2>
                    <p className="text-black/50 mt-2">Generated for your {formData.projectType} project in {formData.location}.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onRegenerate}
                        className="btn-secondary flex items-center gap-2 py-3 px-6"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                    </button>
                    <button className="btn-primary flex items-center gap-2 py-3 px-6">
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Narrative */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                                <Compass className="w-6 h-6 text-arch-accent" />
                                Concept Overview
                            </h3>
                            <button onClick={() => copyToClipboard(result.overview)} className="text-black/20 hover:text-black transition-colors" title="Copy to clipboard">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-lg text-black/70 leading-relaxed font-light whitespace-pre-line">
                            {result.overview}
                        </p>
                    </div>

                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-serif text-2xl font-bold flex items-center gap-3">
                                <Layers className="w-6 h-6 text-arch-accent" />
                                Design Philosophy
                            </h3>
                            <button onClick={() => copyToClipboard(result.designPhilosophy)} className="text-black/20 hover:text-black transition-colors" title="Copy to clipboard">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-black/60 leading-relaxed italic border-l-2 border-arch-accent/20 pl-6 py-2 whitespace-pre-line">
                            {result.designPhilosophy}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-3">
                                <Maximize className="w-5 h-5 text-arch-accent" />
                                Zoning Strategy
                            </h3>
                            <ul className="space-y-4">
                                {result.zoningBreakdown.map((zone, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-arch-accent mt-1.5 shrink-0" />
                                        {zone}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="glass-card p-8 rounded-2xl">
                            <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-3">
                                <Leaf className="w-5 h-5 text-arch-accent" />
                                Sustainability
                            </h3>
                            <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line">
                                {result.sustainabilityNotes}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Palette & Details */}
                <div className="space-y-8">
                    <div className="glass-card p-8 rounded-2xl">
                        <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-3">
                            <Palette className="w-5 h-5 text-arch-accent" />
                            Material Palette
                        </h3>
                        <div className="space-y-6">
                            {result.materialPalette.map((material, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-medium text-black/80">{material}</span>
                                        <span className="text-[10px] font-mono opacity-30 uppercase">Primary</span>
                                    </div>
                                    <div className="h-12 w-full bg-arch-slate rounded-lg border border-black/5 overflow-hidden">
                                        <div
                                            className="h-full w-full opacity-10"
                                            style={{
                                                backgroundColor: i % 3 === 0 ? '#1A1A1A' : i % 3 === 1 ? '#2563EB' : '#A8A29E',
                                                backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-arch-charcoal text-white">
                        <h3 className="font-serif text-xl font-bold mb-4">Architect&apos;s Note</h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            This concept is generated using ConceptForge AI&apos;s architectural synthesis engine ({formData.llmProvider === 'gemini' ? 'Gemini' : 'OpenAI'}).
                            It is intended for early-stage ideation and should be further developed through rigorous site analysis and technical feasibility studies.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Compass className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest">Concept ID</p>
                                <p className="text-xs font-mono opacity-40">CF-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
