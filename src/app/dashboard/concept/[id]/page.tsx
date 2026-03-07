import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ConceptResultsWrapper from './ConceptResultsWrapper'

export default async function ConceptDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { id } = await params;

    const { data, error } = await supabase
        .from('concepts')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (error || !data) {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen bg-arch-cream selection:bg-arch-accent/20">
            <ConceptResultsWrapper
                concept={data.generated_content}
                promptData={data.prompt_data}
            />
        </div>
    )
}
