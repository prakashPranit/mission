"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Cpu, Feather, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
    {
        id: "techne",
        title: "Techne",
        label: "Engineering",
        icon: <Cpu className="w-8 h-8 text-[#FF9F1C]" />,
        color: "bg-[#1a1b1e]",
        border: "border-[#FF9F1C]/40",
        accent: "text-[#FF9F1C]",
        bg: "bg-[#FF9F1C]"
    },
    {
        id: "jnana",
        title: "Jnana",
        label: "Philosophy",
        icon: <BookOpen className="w-8 h-8 text-[#2EC4B6]" />,
        color: "bg-[#1a1b1e]",
        border: "border-[#2EC4B6]/40",
        accent: "text-[#2EC4B6]",
        bg: "bg-[#2EC4B6]"
    },
    {
        id: "vijnana",
        title: "Vijnana",
        label: "Science",
        icon: <Brain className="w-8 h-8 text-[#d97757]" />,
        color: "bg-[#1a1b1e]",
        border: "border-[#d97757]/40",
        accent: "text-[#d97757]",
        bg: "bg-[#d97757]"
    },
    {
        id: "kavya",
        title: "Kavya",
        label: "Art",
        icon: <Feather className="w-8 h-8 text-[#22c55e]" />,
        color: "bg-[#1a1b1e]",
        border: "border-[#22c55e]/40",
        accent: "text-[#22c55e]",
        bg: "bg-[#22c55e]"
    },
    {
        id: "atman",
        title: "Atman",
        label: "Self",
        icon: <Globe className="w-8 h-8 text-[#eab308]" />,
        color: "bg-[#1a1b1e]",
        border: "border-[#eab308]/40",
        accent: "text-[#eab308]",
        bg: "bg-[#eab308]"
    }
];

export function ArticleCategories() {
    return (
        <section className="py-24 container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-4">
                    The Library of Minds
                </h2>
                <p className="font-body text-xl text-muted-foreground max-w-lg mx-auto">
                    Chronicles bound in digital gold.
                </p>
            </div>

            {/* Books Grid - 2 cols on mobile, 3 on md, 5 on lg */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/blog?category=${category.id}`}
                        className="group relative h-[280px] w-full max-w-[240px] mx-auto perspective-1000"
                    >
                        {/* The "Book" Wrapper */}
                        <div className="relative w-full h-full transition-transform duration-500 style-3d group-hover:rotate-y-[-20deg] origin-left">

                            {/* Front Cover - Minimal */}
                            <div className={cn(
                                "absolute inset-0 z-10 bg-card rounded-r-md border-y border-r border-l-[3px] shadow-lg flex flex-col p-4 items-center justify-center text-center transition-all duration-300",
                                category.border,
                                "bg-[#1a1b1e] border-l-white/10" // Dark minimal base with subtle spine hint
                            )}>
                                {/* Minimal Accent Line */}
                                <div className={cn("absolute top-4 bottom-4 left-3 w-[1px] opacity-20", category.bg || "bg-white")} />

                                {/* Content */}
                                <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-z-10">
                                    <div className={cn("mb-4 p-3 rounded-full bg-primary/5 backdrop-blur-sm", category.accent)}>
                                        {category.icon}
                                    </div>
                                    <h3 className={cn("font-heading text-xl font-bold mb-2", category.accent)}>
                                        {category.title}
                                    </h3>
                                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                                        {category.label}
                                    </span>
                                </div>
                            </div>

                            {/* "Inside" Pages (Subtle) */}
                            <div className="absolute inset-y-[2px] right-0 w-[calc(100%-4px)] z-0 bg-white/5 rounded-r-md transform translate-z-[-4px] shadow-sm ml-[4px]">
                                <div className="absolute inset-y-1 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .style-3d { transform-style: preserve-3d; }
                .rotate-y-\[-20deg\] { transform: rotateY(-20deg); }
                .translate-z-10 { transform: translateZ(10px); }
                .translate-z-\[-4px\] { transform: translateZ(-4px); }
                .origin-left { transform-origin: left center; }
            `}</style>

        </section>
    );
}
