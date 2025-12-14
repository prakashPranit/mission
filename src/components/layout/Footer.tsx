import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background pt-20 pb-12 mt-auto relative overflow-hidden">
            {/* Minimal Top Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">

                    {/* Left: Explore (Horizontal Links) */}
                    <div className="flex flex-col items-center lg:items-start gap-4 flex-1">
                        <h4 className="font-heading text-sm text-primary/80 uppercase tracking-widest">Explore</h4>
                        <nav className="flex gap-6 text-sm text-muted-foreground/80 font-medium">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                            <Link href="/blog" className="hover:text-primary transition-colors">Library</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        </nav>
                    </div>

                    {/* Center: Brand */}
                    <div className="flex flex-col items-center text-center gap-2 flex-shrink-0 px-12">
                        <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                            <svg className="w-5 h-5 text-primary animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                                <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)" />
                            </svg>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground tracking-widest">VIDYA-PEETH</h3>
                    </div>

                    {/* Right: Connect (Horizontal Links) */}
                    <div className="flex flex-col items-center lg:items-end gap-4 flex-1">
                        <h4 className="font-heading text-sm text-primary/80 uppercase tracking-widest">Connect</h4>
                        <div className="flex gap-6 text-sm text-muted-foreground/80">
                            <Link href="https://github.com" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
                                <Github className="h-4 w-4" /> <span className="hidden xl:inline">GitHub</span>
                            </Link>
                            <Link href="https://twitter.com" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
                                <Twitter className="h-4 w-4" /> <span className="hidden xl:inline">Twitter</span>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
                                <Linkedin className="h-4 w-4" /> <span className="hidden xl:inline">LinkedIn</span>
                            </Link>
                            <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                                <Mail className="h-4 w-4" /> <span className="hidden xl:inline">Email</span>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-20 flex flex-col items-center gap-4 text-[10px] text-muted-foreground/40 font-mono text-center">
                    <div className="w-24 h-px bg-border/60" />
                    <span>© {new Date().getFullYear()} Digital Mandapa. Designed with Consciousness.</span>
                </div>
            </div>
        </footer>
    );
}
