"use client";

import React from 'react';
import { Compass } from 'lucide-react';

interface NavbarProps {
    onNavigate: (view: 'landing' | 'form' | 'results') => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onNavigate('landing')}
            >
                <div className="w-8 h-8 bg-arch-charcoal rounded-lg flex items-center justify-center">
                    <Compass className="text-white w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight">ConceptForge AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
                <a href="#" className="hover:text-black transition-colors">Showcase</a>
                <a href="#" className="hover:text-black transition-colors">Methodology</a>
                <a href="#" className="hover:text-black transition-colors">Pricing</a>
            </div>
            <button
                onClick={() => onNavigate('form')}
                className="px-5 py-2.5 bg-arch-charcoal text-white rounded-lg text-sm font-medium hover:bg-black transition-all"
            >
                Get Started
            </button>
        </nav>
    );
}
