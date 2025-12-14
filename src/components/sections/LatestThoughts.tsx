"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
    {
        title: "The Architecture of Consciousness",
        excerpt: "Exploring the parallels between distributed computing systems and Vedic concepts of consciousness.",
        date: "Dec 10, 2024",
        readTime: "8 min read",
        tag: "Spirituality",
        image: "/images/blog-consciousness.png"
    },
    {
        title: "Rust for Embedded Systems: A Paradigm Shift",
        excerpt: "Why memory safety matters more than ever in the world of IoT and hardware interfaces.",
        date: "Nov 28, 2024",
        readTime: "6 min read",
        tag: "Techne",
        image: "/images/blog-rust.png"
    },
    {
        title: "Geopolitics of Semiconductors",
        excerpt: "Understanding the supply chain fragility and the new era of silicon sovereignty.",
        date: "Nov 15, 2024",
        readTime: "12 min read",
        tag: "Jnana",
        image: "/images/blog-semiconductors.png"
    },
    {
        title: "The Silent Observer",
        excerpt: "Debugging the mind through Vipassana. Optimizing cognitive load in high-stakes engineering.",
        date: "Oct 20, 2024",
        readTime: "5 min read",
        tag: "Atman",
        image: "/images/blog-silent-observer.png"
    }
];

export function LatestThoughts() {
    return (
        <section className="py-20 container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
                <div>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-2">
                        Latest Thoughts
                    </h2>
                    <p className="font-body text-muted-foreground">Musings on science, spirit, and the silicon between.</p>
                </div>
                <Link href="/blog">
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-transparent p-0">
                        Read the Blog <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="rounded-2xl h-full bg-card/30 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-500 hover:bg-card/50 hover:-translate-y-2 group flex flex-col shadow-sm hover:shadow-[0_10px_40px_-15px_rgba(255,159,28,0.1)] overflow-hidden">
                            {/* Hero Image */}
                            <div className="w-full h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-primary/20">
                                        {article.tag}
                                    </span>
                                </div>
                            </div>

                            <CardHeader className="pt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        {article.readTime}
                                    </span>
                                </div>
                                <CardTitle className="font-heading text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                                    {article.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-body text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="mt-auto pt-6 border-t border-border/10 text-xs text-muted-foreground flex justify-between items-center">
                                <span>{article.date}</span>
                                <span className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 flex items-center gap-1 font-medium">
                                    Read Article <ArrowRight className="w-3 h-3" />
                                </span>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
