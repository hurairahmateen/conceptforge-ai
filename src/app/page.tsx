"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar, { ViewState } from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import ConceptForm from '@/components/ConceptForm';
import ConceptResults from '@/components/ConceptResults';
import Showcase from '@/components/Showcase';
import Methodology from '@/components/Methodology';
import Pricing from '@/components/Pricing';
import { generateConceptAction } from './actions';
import { ConceptFormData, ArchitecturalConcept } from '@/types/concept';
import { Compass } from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<ViewState>('landing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ArchitecturalConcept | null>(null);
  const [lastFormData, setLastFormData] = useState<ConceptFormData | null>(null);

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    setError(null);
  };

  const handleGenerate = async (formData: ConceptFormData) => {
    setLoading(true);
    setError(null);
    setLastFormData(formData);
    try {
      const concept = await generateConceptAction(formData);
      setResult(concept);
      setView('results');
    } catch (err) {
      console.error("Generation failed:", err);
      let errorMessage = "Unknown error occurred";

      if (err instanceof Error) {
        try {
          // Attempt to parse raw JSON error strings from LLM providers
          const parsed = JSON.parse(err.message);
          if (parsed.error && typeof parsed.error.message === 'string') {
            errorMessage = parsed.error.message;
          } else {
            errorMessage = err.message;
          }
        } catch {
          // Not a JSON string
          errorMessage = err.message;
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      // Sanitize specific known errors for better UX
      const lowerError = errorMessage.toLowerCase();
      if (lowerError.includes("api key not valid") || lowerError.includes("incorrect api key")) {
        errorMessage = "Invalid API key provided. Please check your token and try again.";
      } else if (lowerError.includes("429") || lowerError.includes("exceeded your current quota")) {
        errorMessage = "API Quota Exceeded. Please check your plan and billing details, or provide a different API key.";
      }

      setError(`Failed to generate concept: ${errorMessage}`);
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
    <div className="min-h-screen bg-arch-cream selection:bg-arch-accent/20">
      <Navbar onNavigate={handleNavigate} currentView={view} />

      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingHero onStart={() => setView('form')} />
          )}

          {view === 'form' && (
            <ConceptForm
              onBack={() => {
                setView('landing');
                setError(null);
              }}
              onSubmit={handleGenerate}
              isLoading={loading}
              error={error}
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

          {view === 'showcase' && <Showcase />}
          {view === 'methodology' && <Methodology />}
          {view === 'pricing' && <Pricing />}
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
