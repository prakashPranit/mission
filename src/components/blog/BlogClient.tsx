"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, ArrowRight, Search, Grid, List as ListIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Article, getStrapiMedia } from "@/lib/strapi";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    tags: string; // Comma separated
    readTime: string;
    publishedAt: Date;
}

interface BlogClientProps {
    articles: BlogPost[];
    categories: string[];
}

export function BlogClient({ articles, categories }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categoryNames = ["All", ...categories];

    const filteredPosts = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const articleTags = article.tags.split(',').map(t => t.trim());
            const matchesCategory = selectedCategory === "All" || articleTags.includes(selectedCategory);

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, articles]);

    const featuredPost = filteredPosts[0];
    const gridPosts = filteredPosts.slice(1);

    return (
        <div className="container mx-auto px-6 md:px-12 py-20 min-h-screen max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
                <span className="text-sm font-medium tracking-[0.2em] text-primary uppercase">Latest Updates</span>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
                    Our latest chronicles and artifacts
                </h1>
            </div>

            {/* Filter Pills */}
            <div className="flex justify-center flex-wrap gap-2 mb-16">
                {categoryNames.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300",
                            selectedCategory === cat
                                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(255,159,28,0.3)]"
                                : "bg-card/50 border-white/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-12"
                    >
                        {/* FEATURED POST */}
                        {featuredPost && (
                            <Link href={`/blog/${featuredPost.slug}`} className="group relative block w-full bg-card/30 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,159,28,0.1)]">
                                <div className="grid md:grid-cols-2 gap-0 h-full">
                                    {/* Image Side */}
                                    <div className="relative aspect-video md:aspect-auto h-full min-h-[300px] overflow-hidden">
                                        {featuredPost.coverImage ? (
                                            <img
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-muted" />
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center justify-between mb-6">
                                            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 uppercase tracking-wider text-xs px-3 py-1">
                                                {featuredPost.tags.split(',')[0] || "Featured"}
                                            </Badge>
                                            <span className="text-muted-foreground text-sm font-mono">
                                                {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>

                                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] group-hover:text-primary transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-3">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center text-primary font-medium tracking-wide group/link w-max">
                                            Read Full Chronicle <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* GRID POSTS */}
                        {gridPosts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {gridPosts.map((article) => {
                                    const imageUrl = article.coverImage || null;
                                    const firstCategory = article.tags.split(',')[0] || "Article";
                                    const date = new Date(article.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

                                    return (
                                        <Link key={article.id} href={`/blog/${article.slug}`} className="group flex flex-col h-full bg-card/20 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                                            {/* Image */}
                                            <div className="aspect-[3/2] w-full overflow-hidden relative bg-muted">
                                                {imageUrl ? (
                                                    <img src={imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-muted" />
                                                )}

                                                {/* Float Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-white/10 hover:bg-background text-xs">
                                                        {firstCategory}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-mono text-muted-foreground">{date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span className="text-xs font-mono text-muted-foreground">{article.readTime}</span>
                                                </div>

                                                <h3 className="text-xl font-heading font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>

                                                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow leading-relaxed">
                                                    {article.excerpt}
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                                    <span>Read Article</span>
                                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="text-center py-32 border border-dashed border-border/50 rounded-3xl">
                        <h3 className="text-xl font-bold text-foreground mb-2">No artifacts found</h3>
                        <p className="text-muted-foreground">Adjust your filters to uncover more.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-4 text-primary"
                        >
                            Reset System
                        </Button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
