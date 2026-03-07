"use client";

import React, { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export type ViewState = 'landing' | 'form' | 'results' | 'showcase' | 'methodology' | 'pricing';

interface NavbarProps {
    onNavigate: (view: ViewState) => void;
    currentView?: ViewState;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 bg-white/80 backdrop-blur-md border-b border-black/5">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onNavigate('landing')}
            >
                <div className="w-8 h-8 bg-arch-charcoal rounded-lg flex items-center justify-center">
                    <Compass className="text-white w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight">ConceptForge AI</span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-black/60">
                <button onClick={() => onNavigate('showcase')} className={`hover:text-black transition-colors ${currentView === 'showcase' ? 'text-black font-bold' : ''}`}>Showcase</button>
                <button onClick={() => onNavigate('methodology')} className={`hover:text-black transition-colors ${currentView === 'methodology' ? 'text-black font-bold' : ''}`}>Methodology</button>
                <button onClick={() => onNavigate('pricing')} className={`hover:text-black transition-colors ${currentView === 'pricing' ? 'text-black font-bold' : ''}`}>Pricing</button>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => onNavigate('form')}
                    className="px-5 py-2 hidden md:inline-flex border-2 border-transparent bg-black/5 text-arch-charcoal font-medium rounded-lg text-sm hover:bg-black/10 transition-all"
                >
                    Generate
                </button>

                {user ? (
                    <div className="flex gap-2 items-center">
                        <Link href="/dashboard" className="px-5 py-2 text-sm font-medium hover:text-black text-black/60 transition-colors">
                            Dashboard
                        </Link>
                        <button onClick={handleSignOut} className="px-5 py-2 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-all">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="px-5 py-2 bg-arch-charcoal text-white rounded-lg text-sm font-medium hover:bg-black transition-all">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
