"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
            <div className="container h-16 flex items-center justify-between mx-auto px-6 md:px-12 max-w-7xl">
                {/* Logo / Brand */}
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        {/* Rotating Outer Ring (Mandala/Gear) */}
                        <svg className="absolute w-full h-full text-primary animate-[spin_10s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100">
                            <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                            <path d="M50 0 L55 15 L50 20 L45 15 Z" fill="currentColor" transform="rotate(0 50 50)" />
                            <path d="M50 0 L55 15 L50 20 L45 15 Z" fill="currentColor" transform="rotate(90 50 50)" />
                            <path d="M50 0 L55 15 L50 20 L45 15 Z" fill="currentColor" transform="rotate(180 50 50)" />
                            <path d="M50 0 L55 15 L50 20 L45 15 Z" fill="currentColor" transform="rotate(270 50 50)" />
                        </svg>
                        {/* Static Inner Core (Digital Node) */}
                        <svg className="absolute w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" transform="rotate(45 12 12)" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-lg font-bold tracking-wider text-primary leading-none group-hover:text-primary/80 transition-colors">
                            VIDYA-PEETH
                        </span>
                        <span className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase leading-none mt-1 group-hover:text-primary/60 transition-colors">
                            Digital Mandapa
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-primary transition-colors py-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
