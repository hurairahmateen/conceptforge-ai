import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState<string>('Professional');

    return (
        <motion.section
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 max-w-6xl mx-auto pt-10"
        >
            <div className="mb-16 text-center">
                <h2 className="text-5xl font-serif font-bold mb-4">Simple, Transparent Pricing</h2>
                <p className="text-black/50">Choose the plan that fits your architectural workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        name: "Free",
                        price: "$0",
                        desc: "For students and hobbyists exploring architectural AI.",
                        features: ["3 Concepts per month", "Standard Synthesis", "Basic Material Palettes", "Community Support"]
                    },
                    {
                        name: "Professional",
                        price: "$29",
                        desc: "For independent architects and small studios.",
                        features: ["Unlimited Concepts", "Advanced Synthesis Engine", "Full Material Palettes", "Export to PDF/CAD", "Priority Support"],
                        popular: true
                    },
                    {
                        name: "Studio",
                        price: "$99",
                        desc: "For large firms requiring collaborative features.",
                        features: ["Team Workspaces", "Custom AI Training", "API Access", "Dedicated Account Manager", "White-label Exports"]
                    }
                ].map((plan, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`glass-card p-10 rounded-3xl flex flex-col cursor-pointer transition-all duration-300 ${selectedPlan === plan.name
                            ? 'border-arch-accent ring-2 ring-arch-accent shadow-xl scale-[1.02] bg-white'
                            : 'border-black/5 hover:border-black/20 opacity-80 hover:opacity-100'
                            }`}
                    >
                        {plan.popular && <span className="text-[10px] font-bold uppercase tracking-widest text-arch-accent mb-4">Most Popular</span>}
                        <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-black/40 text-sm">/month</span>
                        </div>
                        <p className="text-sm text-black/50 mb-8 leading-relaxed">{plan.desc}</p>
                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-black/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-arch-accent" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-xl font-medium transition-all ${plan.popular ? 'bg-arch-accent text-white hover:bg-black' : 'bg-arch-slate text-black hover:bg-black/5'}`}>
                            {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
                        </button>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
