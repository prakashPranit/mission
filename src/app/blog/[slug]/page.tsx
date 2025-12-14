import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await db.post.findUnique({
        where: { slug },
    });

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | The Digital Mandapa`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = await db.post.findUnique({
        where: { slug },
    });

    if (!post) {
        notFound();
    }

    const tags = post.tags.split(',').map(t => t.trim());
    const firstTag = tags[0] || "General";

    // Using createdAt as published date for now
    const date = new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="min-h-screen bg-background relative">
            {/* Hero Section */}
            <div className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center pt-20">
                {/* Full Width Image with Overlay */}
                <div className="absolute inset-0 z-0 bg-muted">
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 z-10 relative max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <Badge variant="outline" className="border-white/20 text-white bg-white/10 backdrop-blur-md px-4 py-1 text-xs tracking-[0.2em] uppercase">
                            {firstTag}
                        </Badge>
                    </div>

                    <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-8 text-sm md:text-base text-white/90 font-medium tracking-wide">
                        <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary" /> {date}</span>
                        <div className="w-1 h-1 bg-white/50 rounded-full" />
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {post.readTime}</span>
                    </div>
                </div>
            </div>

            <article className="container mx-auto px-4 py-16 max-w-3xl relative z-10">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors group">
                    <div className="p-2 rounded-full border border-border group-hover:border-primary/50 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium tracking-wide">Return to Library</span>
                </Link>

                {/* Content (HTML) */}
                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer / Author */}
                <div className="mt-20 pt-10 border-t border-border/40 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40" />
                    <div>
                        <h4 className="font-heading font-bold text-lg">Pranit Prakash</h4>
                        <p className="text-muted-foreground text-sm">Full Stack Developer & Electrical Engineer. Seeking the Ghost in the Shell.</p>
                    </div>
                </div>
            </article>
        </div>
    );
}
