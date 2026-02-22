"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Loader2, Sparkles } from 'lucide-react';
import { ConceptFormData } from '@/types/concept';

interface ConceptFormProps {
    onBack: () => void;
    onSubmit: (data: ConceptFormData) => Promise<void>;
    isLoading: boolean;
}

export default function ConceptForm({ onBack, onSubmit, isLoading }: ConceptFormProps) {
    const [formData, setFormData] = useState<ConceptFormData>({
        projectType: 'Residential',
        siteArea: '',
        location: '',
        priorities: '',
        designStyle: 'Minimalist',
        additionalNotes: '',
        llmProvider: 'gemini'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <motion.section
            key="form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="px-6 max-w-3xl mx-auto pt-10"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-black/40 hover:text-black mb-8 transition-colors"
                type="button"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to home
            </button>

            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-4xl font-serif font-bold mb-3">Define Your Vision</h2>
                    <p className="text-black/50">Provide the parameters for your architectural concept.</p>
                </div>

                {/* LLM Provider Toggle */}
                <div className="flex bg-arch-slate p-1 rounded-lg border border-black/5 w-full md:w-auto">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, llmProvider: 'gemini' })}
                        className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${formData.llmProvider === 'gemini' ? 'bg-white shadow-sm text-arch-accent' : 'text-black/50 hover:text-black'}`}
                    >
                        Gemini AI
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, llmProvider: 'openai' })}
                        className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${formData.llmProvider === 'openai' ? 'bg-white shadow-sm text-arch-accent' : 'text-black/50 hover:text-black'}`}
                    >
                        OpenAI
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Project Type</label>
                        <select
                            className="input-field appearance-none"
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        >
                            <option>Residential</option>
                            <option>Commercial</option>
                            <option>Cultural</option>
                            <option>Industrial</option>
                            <option>Public Space</option>
                            <option>Hospitality</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/60">Site Area (sqm)</label>
                        <input
                            type="text"
                            placeholder="e.g. 1,200 sqm"
                            className="input-field"
                            value={formData.siteArea}
                            onChange={(e) => setFormData({ ...formData, siteArea: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Location / Climate</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                        <input
                            type="text"
                            placeholder="e.g. Coastal Mediterranean, Arid Desert, Urban Dense"
                            className="input-field pl-11"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Design Style</label>
                    <div className="flex flex-wrap gap-2">
                        {['Minimalist', 'Brutalist', 'Biophilic', 'Parametric', 'Vernacular', 'Industrial'].map((style) => (
                            <button
                                key={style}
                                type="button"
                                onClick={() => setFormData({ ...formData, designStyle: style })}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${formData.designStyle === style
                                    ? 'bg-arch-charcoal text-white border-arch-charcoal'
                                    : 'bg-white text-black/60 border-black/10 hover:border-black/30'
                                    }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Client Priorities</label>
                    <textarea
                        placeholder="What matters most? e.g. Privacy, natural light, social interaction, luxury feel..."
                        className="input-field min-h-[120px] resize-none"
                        value={formData.priorities}
                        onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">Additional Notes (Optional)</label>
                    <textarea
                        placeholder="Any specific constraints or inspirations..."
                        className="input-field min-h-[80px] resize-none"
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-3 py-5"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Synthesizing Concept...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Architectural Concept
                        </>
                    )}
                </button>
            </form>
        </motion.section>
    );
}
