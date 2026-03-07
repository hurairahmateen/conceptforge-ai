'use client'

import ConceptResults from '@/components/ConceptResults'
import { useRouter } from 'next/navigation'
import { ArchitecturalConcept, ConceptFormData } from '@/types/concept'
import Link from 'next/link'
import { Compass } from 'lucide-react'

interface WrapperProps {
    concept: ArchitecturalConcept
    promptData: ConceptFormData
}

export default function ConceptResultsWrapper({ concept, promptData }: WrapperProps) {
    const router = useRouter()

    return (
        <>
            <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-arch-charcoal rounded-lg flex items-center justify-center">
                        <Compass className="text-white w-5 h-5" />
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold tracking-tight">ConceptForge AI</Link>
                </div>
                <Link href="/dashboard" className="px-5 py-2 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-all">
                    Back to Dashboard
                </Link>
            </nav>
            <main className="pt-24 pb-20">
                <ConceptResults
                    result={concept}
                    formData={promptData}
                    onBack={() => router.push('/dashboard')}
                    onRegenerate={() => router.push('/')} // Directing them home if they want a new one
                    isRegenerating={false}
                />
            </main>
        </>
    )
}
