"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative w-full h-[120vh] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* 1. Background: Persistent Fixed Mandala (Subtle) */}
            <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    style={{ opacity }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Overlay to fade mandala slightly for text readability */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />

                    {/* Large outer ring - Reduced Contrast */}
                    <div className="absolute w-[180vw] h-[180vw] md:w-[140vw] md:h-[140vw] rounded-full border-[1px] border-primary/10 opacity-20" />
                    <div className="absolute w-[160vw] h-[160vw] md:w-[130vw] md:h-[130vw] rounded-full border-[1px] border-primary/5 opacity-15" />

                    {/* Spirograph / Mesh Pattern SVG - Subtle */}
                    <svg className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] text-primary/10 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                        <path d="M50 0 A50 50 0 0 1 50 100 A50 50 0 0 1 50 0 Z" fill="none" stroke="currentColor" strokeWidth="0.2" />
                        {[...Array(12)].map((_, i) => (
                            <ellipse
                                key={i}
                                cx="50"
                                cy="50"
                                rx="20"
                                ry="45"
                                transform={`rotate(${i * 15} 50 50)`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.1"
                            />
                        ))}
                    </svg>

                    {/* Inner Glow - Soft */}
                    <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 blur-[100px] rounded-full" />
                </motion.div>
            </div>

            {/* 2. Content Layer */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mt-[-10vh]">

                {/* Pill Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="px-4 py-1.5 rounded-full border border-primary/40 bg-primary/5 text-primary text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-md">
                        Est • 2024
                    </span>
                </motion.div>

                {/* Main Title: AlphaQubit Style (Large Serif) */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="font-heading text-7xl md:text-9xl font-medium text-foreground tracking-tight leading-[0.9] mb-4"
                >
                    VidyaPeeth
                </motion.h1>

                {/* Subtitle: High Contrast Italic Serif */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className="font-heading italic text-4xl md:text-6xl text-muted-foreground/80 font-light tracking-wide mb-8">
                        The Architecture of <span className="text-primary/90">Consciousness</span>
                    </h2>
                </motion.div>

                {/* Description: Clean Sans */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="font-body text-lg text-muted-foreground/70 max-w-lg leading-relaxed mb-12"
                >
                    A convergent space for Electrical Engineering, Full Stack Development, and Ancient Wisdom.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button className="rounded-full h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide">
                        Read the Paper
                    </Button>
                </motion.div>

            </div>

            {/* 3. Deep 3D Elements (Subtle Orbs mimicking screenshot blobs) */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-gradient-to-tl from-secondary/20 to-transparent blur-3xl opacity-30 animate-pulse delay-1000" />

            {/* 4. Bottom Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer text-muted-foreground/50 hover:text-primary transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="text-[10px] uppercase tracking-widest font-medium">Discover</span>
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center">
                    <ArrowDown className="w-3 h-3" />
                </div>
            </motion.div>

        </section>
    );
}
