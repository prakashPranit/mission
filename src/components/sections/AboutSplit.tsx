"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Network } from "lucide-react";

const services = [
    {
        icon: <Cpu className="w-8 h-8 text-primary" />,
        title: "Hardware Engineering",
        description: "Designing circuits, IoT systems, and embedded solutions. The physical pulse of the machine.",
        tags: ["PCB Design", "IoT", "Embedded C", "Sensors"],
        delay: 0,
        color: "primary"
    },
    {
        icon: <Terminal className="w-8 h-8 text-accent" />,
        title: "Software Development",
        description: "Architecting scalable applications and modern web interfaces. The logic that drives life.",
        tags: ["Next.js", "TypeScript", "React", "Node.js"],
        delay: 0.1,
        color: "accent"
    },
    {
        icon: <Network className="w-8 h-8 text-secondary" />,
        title: "System Architecture",
        description: "Bridging hardware and cloud. Designing the holistic infrastructure for complex systems.",
        tags: ["Cloud", "Microservices", "DevOps", "System Design"],
        delay: 0.2,
        color: "secondary"
    }
];

export function AboutSplit() {
    return (
        <section className="relative w-full py-32 lg:py-40 overflow-hidden bg-background">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Technical Domains
                    </h2>
                    <p className="font-body text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
                        A convergence of multiple disciplines to build complete digital-physical systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: service.delay }}
                            viewport={{ once: true }}
                            className="group relative border border-border/50 rounded-xl bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="p-6 flex flex-col items-start gap-4 relative z-10 h-full">
                                <div className={`w-14 h-14 rounded-lg bg-${service.color}/10 flex items-center justify-center border border-${service.color}/20 mb-2 group-hover:scale-105 transition-transform duration-300`}>
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold text-foreground font-heading tracking-wide">
                                    {service.title}
                                </h3>

                                <p className="text-sm text-muted-foreground/80 leading-relaxed min-h-[60px]">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                                    {service.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground border border-border px-2 py-1 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
