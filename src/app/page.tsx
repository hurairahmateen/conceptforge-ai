"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import ConceptForm from '@/components/ConceptForm';
import ConceptResults from '@/components/ConceptResults';
import { generateConceptAction } from './actions';
import { ConceptFormData, ArchitecturalConcept } from '@/types/concept';
import { Compass } from 'lucide-react';

type ViewState = 'landing' | 'form' | 'results';

export default function Home() {
  const [view, setView] = useState<ViewState>('landing');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArchitecturalConcept | null>(null);
  const [lastFormData, setLastFormData] = useState<ConceptFormData | null>(null);

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
  };

  const handleGenerate = async (formData: ConceptFormData) => {
    setLoading(true);
    setLastFormData(formData);
    try {
      const concept = await generateConceptAction(formData);
      setResult(concept);
      setView('results');
    } catch (error) {
      console.error("Generation failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to generate concept: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
      await handleGenerate(lastFormData);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-arch-accent/20">
      <Navbar onNavigate={handleNavigate} />

      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingHero onStart={() => setView('form')} />
          )}

          {view === 'form' && (
            <ConceptForm
              onBack={() => setView('landing')}
              onSubmit={handleGenerate}
              isLoading={loading}
            />
          )}

          {view === 'results' && result && lastFormData && (
            <ConceptResults
              result={result}
              formData={lastFormData}
              onBack={() => setView('form')}
              onRegenerate={handleRegenerate}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-40">
            <Compass className="w-4 h-4" />
            <span className="font-serif font-bold">ConceptForge AI</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-black/40">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
          <p className="text-xs text-black/30 font-mono">© {new Date().getFullYear()} Architectural Intelligence Systems</p>
        </div>
      </footer>
    </div>
  );
}
