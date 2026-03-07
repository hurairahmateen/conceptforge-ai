import { login, signup } from './actions'
import { Compass } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; message?: string }>
}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen bg-arch-cream selection:bg-arch-accent/20 flex flex-col items-center justify-center p-6">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
                <Compass className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
                <span className="font-serif font-bold text-black/40 group-hover:text-black transition-colors">
                    ConceptForge AI
                </span>
            </Link>

            <div className="w-full max-w-md bg-white/50 backdrop-blur-xl border border-black/5 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-black/50 text-sm">Sign in to save and manage your architectural concepts.</p>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="architect@studio.com"
                            required
                            className="w-full bg-black/5 px-4 py-3 rounded-xl border border-transparent focus:border-black/10 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/5 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="w-full bg-black/5 px-4 py-3 rounded-xl border border-transparent focus:border-black/10 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/5 transition-all"
                        />
                    </div>

                    {params?.error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 text-center font-medium">
                            {params.error}
                        </div>
                    )}

                    {params?.message && (
                        <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl border border-green-100 text-center font-medium">
                            {params.message}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button
                            formAction={login}
                            className="bg-arch-charcoal text-white font-medium py-3 rounded-xl hover:bg-black transition-transform active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                        <button
                            formAction={signup}
                            className="bg-black/5 text-arch-charcoal font-medium py-3 rounded-xl hover:bg-black/10 transition-transform active:scale-[0.98]"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
