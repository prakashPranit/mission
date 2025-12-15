import Link from "next/link";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { seedPosts, deletePost } from "@/app/actions";
import { Plus, Edit, Trash2, Globe, FileText, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    // Auto-seed on visit if empty
    await seedPosts();

    const posts = await db.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.published).length;
    const draftPosts = totalPosts - publishedPosts;

    return (
        <div className="container mx-auto px-4 md:px-6 pt-24 pb-12 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2 text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your chronicles and artifacts.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/blog" target="_blank">
                        <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary/50 text-foreground">
                            <Globe className="w-4 h-4" /> View Site
                        </Button>
                    </Link>
                    <Link href="/dashboard/new">
                        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="w-4 h-4" /> New Post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Dashboard Overview - Bento Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
                {[
                    { label: "Total Chronicles", value: totalPosts, icon: FileText, color: "text-blue-400", bg: "from-blue-500/20 to-transparent" },
                    { label: "Published", value: publishedPosts, icon: CheckCircle, color: "text-green-400", bg: "from-green-500/20 to-transparent" },
                    { label: "Drafts", value: draftPosts, icon: Clock, color: "text-amber-400", bg: "from-amber-500/20 to-transparent" },
                ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all duration-500">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bg} opacity-20 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-40 transition-opacity`} />
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-bold font-heading text-foreground">{stat.value}</h3>
                            </div>
                            <div className={`p-3 bg-white/5 rounded-2xl ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* List View - Modern Cards */}
            <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" /> Recent Chronicles
                    </h2>
                </div>

                <div className="grid gap-3">
                    {posts.length === 0 ? (
                        <div className="p-16 text-center text-muted-foreground bg-zinc-900/30 rounded-3xl border border-dashed border-white/10">
                            <p>No scrolls found in the archive.</p>
                            <Button variant="link" className="text-amber-500">Start Writing</Button>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="group relative flex flex-col md:flex-row items-center gap-6 p-3 pr-6 bg-zinc-900/40 hover:bg-zinc-900/80 border border-white/5 hover:border-amber-500/30 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-amber-500/5">
                                {/* Thumbnail */}
                                <div className="w-full md:w-32 h-20 rounded-xl bg-zinc-950 overflow-hidden relative border border-white/5 group-hover:border-amber-500/20 transition-colors">
                                    {post.coverImage ? (
                                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-grow min-w-0 flex flex-col justify-center h-full space-y-1">
                                    <h3 className="font-heading font-bold text-lg text-zinc-100 group-hover:text-amber-500 transition-colors truncate pr-4">{post.title}</h3>
                                    <p className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                                        <span className="opacity-50">/</span> {post.slug}
                                    </p>
                                </div>

                                {/* Meta Chips */}
                                <div className="flex md:flex items-center gap-3 mt-2 md:mt-0 w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar pb-1 md:pb-0">
                                    <div className="flex gap-2">
                                        {post.tags.split(',').slice(0, 2).map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-medium text-zinc-400 border border-white/5 whitespace-nowrap">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.published ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`} title={post.published ? 'Published' : 'Draft'} />
                                </div>

                                {/* Floating Actions */}
                                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-4 top-4 md:top-auto md:right-4 md:relative md:right-auto bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-1 rounded-lg md:p-0">
                                    <Link href={`/dashboard/${post.id}`}>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <form action={deletePost.bind(null, post.id)}>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
