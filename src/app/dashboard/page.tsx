import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Compass, Calendar, ArrowRight } from 'lucide-react'
import { ArchitecturalConcept, ConceptFormData } from '@/types/concept'
import ApiKeySettings from '@/components/ApiKeySettings'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: concepts, error } = await supabase
        .from('concepts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-arch-cream">
            <nav className="w-full px-6 py-4 flex justify-between items-center bg-white border-b border-black/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-arch-charcoal rounded-lg flex items-center justify-center">
                        <Compass className="text-white w-5 h-5" />
                    </div>
                    <Link href="/" className="font-serif text-xl font-bold tracking-tight">ConceptForge AI</Link>
                </div>
                <div className="flex gap-4">
                    <Link href="/" className="px-5 py-2 border-2 border-transparent bg-black/5 text-arch-charcoal font-medium rounded-lg text-sm hover:bg-black/10 transition-all">
                        New Concept
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-10">
                    <h1 className="font-serif text-4xl font-bold mb-2">My Dashboard</h1>
                    <p className="text-black/50 text-lg">Manage your settings and view generated architectural narratives.</p>
                </header>

                <ApiKeySettings />

                <h2 className="font-serif text-3xl font-bold mb-6 mt-12">My Concepts</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">Failed to load concepts: {error.message}</div>
                )}

                {concepts?.length === 0 && !error && (
                    <div className="text-center py-24 bg-white/50 border border-black/5 rounded-3xl">
                        <h3 className="font-serif text-2xl font-bold mb-2">No concepts yet</h3>
                        <p className="text-black/50 mb-6">You haven't generated any concepts yet. Start ideating now.</p>
                        <Link href="/" className="px-6 py-3 bg-arch-charcoal text-white rounded-xl font-medium hover:bg-black transition-all">
                            Create New Concept
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {concepts?.map((c) => {
                        const generatedContent = c.generated_content as ArchitecturalConcept;
                        const promptData = c.prompt_data as Partial<ConceptFormData>;
                        const date = new Date(c.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                        })

                        return (
                            <Link
                                href={`/dashboard/concept/${c.id}`}
                                key={c.id}
                                className="group flex flex-col justify-between bg-white border border-black/5 rounded-2xl p-6 hover:shadow-xl hover:border-black/10 transition-all"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-arch-accent/80 bg-arch-accent/10 px-3 py-1 rounded-full">
                                            {promptData?.projectType || 'Concept'}
                                        </span>
                                        <div className="text-xs text-black/40 flex items-center gap-1 font-mono">
                                            <Calendar className="w-3 h-3" /> {date}
                                        </div>
                                    </div>

                                    <h2 className="font-serif text-2xl font-bold mb-3 group-hover:text-arch-accent transition-colors">
                                        {generatedContent.conceptName || 'Untitled Concept'}
                                    </h2>
                                    <p className="text-black/60 text-sm line-clamp-3 mb-6">
                                        {generatedContent.overview}
                                    </p>
                                </div>

                                <div className="flex items-center text-sm font-bold text-arch-charcoal group-hover:text-arch-accent transition-colors">
                                    View details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
