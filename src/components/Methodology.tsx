import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Layers, Palette } from 'lucide-react';

export default function Methodology() {
    return (
        <motion.section
            key="methodology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 max-w-4xl mx-auto pt-10"
        >
            <div className="mb-20">
                <h2 className="text-5xl font-serif font-bold mb-6">Our Methodology</h2>
                <p className="text-xl text-black/60 leading-relaxed">
                    ConceptForge AI doesn&apos;t just &quot;draw&quot; buildings. It synthesizes architectural theory, site data, and client priorities into a cohesive design narrative.
                </p>
            </div>

            <div className="space-y-24">
                {[
                    {
                        step: "01",
                        title: "Contextual Analysis",
                        desc: "We begin by analyzing the site's environmental data—climate, topography, and urban fabric. This ensures the concept is grounded in its specific physical reality.",
                        icon: <MapPin className="w-8 h-8 text-arch-accent" />
                    },
                    {
                        step: "02",
                        title: "Philosophical Synthesis",
                        desc: "Our engine maps your design style and priorities against historical and contemporary architectural movements to create a unique design philosophy.",
                        icon: <Compass className="w-8 h-8 text-arch-accent" />
                    },
                    {
                        step: "03",
                        title: "Spatial Logic",
                        desc: "We generate zoning strategies that optimize for your specific needs, whether it's social interaction in a public space or privacy in a residence.",
                        icon: <Layers className="w-8 h-8 text-arch-accent" />
                    },
                    {
                        step: "04",
                        title: "Material Curation",
                        desc: "Finally, we curate a material palette that balances aesthetic vision with sustainability and technical performance.",
                        icon: <Palette className="w-8 h-8 text-arch-accent" />
                    }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-12 items-start" style={{ alignItems: 'flex-start' }}>
                        <div className="w-16 h-16 rounded-2xl bg-arch-slate flex items-center justify-center shrink-0">
                            {item.icon}
                        </div>
                        <div className="space-y-4">
                            <span className="font-mono text-xs text-arch-accent font-bold tracking-widest">{item.step}</span>
                            <h3 className="font-serif text-3xl font-bold">{item.title}</h3>
                            <p className="text-black/50 leading-relaxed text-lg">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
