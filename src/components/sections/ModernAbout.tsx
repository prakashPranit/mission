

import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Globe, Cpu, Terminal, Network } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Hardware Engineering",
        description: "Designing circuits, IoT systems, and embedded solutions. The physical pulse of the machine.",
        tags: ["PCB Design", "IoT", "Embedded C"],
        color: "amber"
    },
    {
        icon: <Terminal className="w-6 h-6" />,
        title: "Software Development",
        description: "Architecting scalable applications and modern web interfaces. The logic that drives life.",
        tags: ["Next.js", "TypeScript", "React"],
        color: "blue"
    },
    {
        icon: <Network className="w-6 h-6" />,
        title: "System Architecture",
        description: "Bridging hardware and cloud. Designing the holistic infrastructure for complex systems.",
        tags: ["Cloud", "Microservices", "DevOps"],
        color: "green"
    }
];

export function ModernAbout() {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-zinc-950">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}



                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight">
                        Building the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
                            Digital Physical
                        </span>
                    </h2>

                    <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                        I am <strong className="text-zinc-100">Pranit Prakash</strong>. I bridge the gap between silicon and soul.
                        My work lies at the intersection of embedded systems, modern web architecture, and digital philosophy.
                        Constructing robust mandapas for the modern age.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <Cpu className="w-5 h-5 text-amber-500" />
                            <div>
                                <h4 className="text-sm font-bold text-zinc-200">Embedded</h4>
                                <p className="text-xs text-zinc-500">Rust, C++, IoT</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <div>
                                <h4 className="text-sm font-bold text-zinc-200">Web</h4>
                                <p className="text-xs text-zinc-500">Next.js, React</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <Database className="w-5 h-5 text-green-500" />
                            <div>
                                <h4 className="text-sm font-bold text-zinc-200">Data</h4>
                                <p className="text-xs text-zinc-500">Prisma, SQL</p>
                            </div>
                        </div>
                    </div>

                    <Link href="/about" className="inline-flex items-center gap-2 text-zinc-300 hover:text-amber-500 transition-colors group">
                        <span className="border-b border-transparent group-hover:border-amber-500 transition-all">Read Full Protocol</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>


                    {/* Right: Technical Domains (Services) */}

                    {/* Decorative background blob */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-blue-500/10 rounded-full blur-[80px] -z-10" />

                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 flex items-start gap-4 backdrop-blur-md"
                        >
                            <div className={`p-3 rounded-lg bg-${service.color}-500/10 text-${service.color}-500 shrink-0`}>
                                {service.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-100 mb-1 group-hover:text-amber-500 transition-colors">{service.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 border border-white/5 px-1.5 py-0.5 rounded bg-black/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
