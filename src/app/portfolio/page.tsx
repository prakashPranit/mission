"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Note: Badge is not yet installed, need to install or use styled span
import { ExternalLink, Github, Code2, Cpu, Smartphone } from "lucide-react";

// Mock Data
const projects = [
    {
        id: 1,
        title: "Vedic AI Art Generator",
        category: "Web Dev",
        description: "Generative adversarial network trained on ancient Indian temple architecture patterns.",
        tech: ["Next.js", "Python", "TensorFlow", "WebGL"],
        image: "/api/placeholder/400/300",
        repo: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 2,
        title: "Smart Irrigation Node",
        category: "Hardware/IoT",
        description: "LoRaWAN based soil moisture sensing node with 5-year battery life.",
        tech: ["ESP32", "LoRaWAN", "C++", "KiCad"],
        image: "/api/placeholder/400/300",
        repo: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 3,
        title: "Temple Run 4.0",
        category: "App Dev",
        description: "A gamified exploration of Hampi ruins with AR capabilities.",
        tech: ["React Native", "Unity", "ARKit"],
        image: "/api/placeholder/400/300",
        repo: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 4,
        title: "Crypto Mandalas",
        category: "Web Dev",
        description: "NFT marketplace for procedural geometric art.",
        tech: ["Solidity", "Web3.js", "Next.js"],
        image: "/api/placeholder/400/300",
        repo: "https://github.com",
        demo: "https://demo.com"
    }
];

const categories = ["All", "Web Dev", "App Dev", "Hardware/IoT"];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading text-4xl md:text-6xl font-bold text-primary mb-4"
                >
                    The Arsenal
                </motion.h1>
                <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                    A collection of digital artifacts and hardware inventions.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                            : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                        >
                            <Card className="h-full bg-card/40 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/60 transition-colors group overflow-hidden relative">
                                {/* Stone Frame decorations (corners) could be generic CSS pseudo-elements */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacity-50" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary opacity-50" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary opacity-50" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary opacity-50" />

                                <CardHeader className="p-0">
                                    <div className="w-full h-48 bg-muted/30 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80 z-10" />
                                        {/* Placeholder for project image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-heading">
                                            {project.category === "Hardware/IoT" ? <Cpu /> : project.category === "App Dev" ? <Smartphone /> : <Code2 />}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 relative z-20 -mt-12">
                                    <div className="mb-4">
                                        <span className="text-xs font-bold text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20 backdrop-blur-md">
                                            {project.category}
                                        </span>
                                    </div>
                                    <CardTitle className="font-heading text-xl mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    <CardDescription className="font-body text-sm mb-4">
                                        {project.description}
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 flex gap-4">
                                    <Button size="sm" variant="outline" className="flex-1 gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                                        <a href={project.repo} target="_blank" rel="noreferrer">
                                            <Github className="w-4 h-4" /> Code
                                        </a>
                                    </Button>
                                    <Button size="sm" className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                        <a href={project.demo} target="_blank" rel="noreferrer">
                                            <ExternalLink className="w-4 h-4" /> Live
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
