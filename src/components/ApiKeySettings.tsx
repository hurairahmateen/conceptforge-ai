"use client";

import React, { useState, useEffect } from "react";
import { Key, Save, Check } from "lucide-react";

export default function ApiKeySettings() {
    const [geminiKey, setGeminiKey] = useState("");
    const [openaiKey, setOpenaiKey] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    // Hydrate state from localStorage on initial client render
    useEffect(() => {
        const storedGemini = localStorage.getItem("gemini_api_key");
        const storedOpenai = localStorage.getItem("openai_api_key");

        if (storedGemini) setGeminiKey(storedGemini);
        if (storedOpenai) setOpenaiKey(storedOpenai);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem("gemini_api_key", geminiKey);
        localStorage.setItem("openai_api_key", openaiKey);

        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
    };

    return (
        <section className="bg-white border border-black/5 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-arch-charcoal">
                <Key className="w-5 h-5 text-black/50" />
                <h2 className="font-serif text-2xl font-bold">API Key Configurations</h2>
            </div>

            <p className="text-sm text-black/50 mb-6 max-w-2xl">
                Set your custom provider API keys here. These keys are stored directly and securely
                in your browser's local memory and are never saved to our database. Leave blank to
                use the application's default rate-limited keys.
            </p>

            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                        Gemini API Key
                    </label>
                    <input
                        type="password"
                        placeholder="AIzaSy..."
                        className="input-field w-full bg-black/5 px-4 py-3 rounded-xl border border-transparent focus:border-black/10 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/5 transition-all"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60">
                        OpenAI API Key
                    </label>
                    <input
                        type="password"
                        placeholder="sk-proj-..."
                        className="input-field w-full bg-black/5 px-4 py-3 rounded-xl border border-transparent focus:border-black/10 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/5 transition-all"
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-arch-slate border border-black/5 text-arch-charcoal font-medium py-2.5 px-6 rounded-lg hover:bg-black/5 transition-all active:scale-[0.98]"
                    >
                        {isSaved ? (
                            <>
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-green-700">Keys Saved Securely</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save API Keys
                            </>
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}
