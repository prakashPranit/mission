"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import { toast } from "sonner";
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost, PostData } from "@/app/actions";
import { Loader2, Save, ArrowLeft, Bold, Italic, Link as LinkIcon, Heading1, Heading2, Quote, Image as ImageIcon, Video, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useRouter } from 'next/navigation';

interface PostEditorProps {
    post?: {
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage: string | null;
        tags: string;
        readTime: string;
    };
}

export function PostEditor({ post }: PostEditorProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [title, setTitle] = useState(post?.title || "");
    const [slug, setSlug] = useState(post?.slug || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [coverImage, setCoverImage] = useState(post?.coverImage || "");
    const [tags, setTags] = useState(post?.tags || "");
    const [readTime, setReadTime] = useState(post?.readTime || "5 min read");

    // Tiptap Editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Image,
            Youtube.configure({ width: 500, height: 300 }),
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Tell your story...' }),
            BubbleMenuExtension,
            FloatingMenuExtension
        ],
        content: post?.content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[350px] p-6 font-body prose-headings:font-heading prose-headings:text-amber-500 prose-p:text-zinc-300 prose-strong:text-amber-400 prose-a:text-blue-400 prose-blockquote:border-l-amber-500 prose-blockquote:text-zinc-400 prose-li:text-zinc-300',
            },
        },
        immediatelyRender: false,
    });

    const addImage = useCallback(() => {
        const url = window.prompt('URL')
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt('YouTube URL')

        if (url && editor) {
            editor.commands.setYoutubeVideo({ src: url })
        }
    }, [editor]);

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) return

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor]);

    const handleSave = async () => {
        if (!editor) return;

        // Validation "Roasts" 🌶️
        if (!title.trim()) {
            toast.error("Untitled Chronicle?", {
                description: "Even the shortest story needs a name. Give it a title!",
                duration: 4000,
            });
            return;
        }

        if (editor.isEmpty) {
            toast.error("The Scroll is Blank!", {
                description: "Cannot publish an empty void. Write something meaningful.",
                duration: 4000,
            });
            return;
        }

        setIsSaving(true);

        const data: PostData = {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
            excerpt,
            content: editor.getHTML(),
            coverImage,
            tags,
            readTime,
            published: true
        };

        try {
            if (post) {
                await updatePost(post.id, data);
                toast.success("Chronicle Updated", { description: "Your revisions have been etched into history." });
            } else {
                await createPost(data);
                toast.success("New Chronicle Born", { description: "The world shall know of this tale." });
            }
            router.refresh();
        } catch (error) {
            console.error("Failed to save:", error);
            // Handling the specific unique constraint error
            if (String(error).includes("Unique constraint")) {
                toast.error("Duplicate Slug Detected", {
                    description: "A chronicle with this URL slug already exists. Change the title or slug.",
                });
            } else {
                toast.error("Submission Failed", {
                    description: "The digital spirits are displeased. Try again later.",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-40 pt-24">
            {/* Header / Actions */}
            <div className="flex items-center justify-between py-4 sticky top-20 z-40 bg-background/80 backdrop-blur-md mb-8 border-b border-border rounded-xl px-4 mt-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="text-xl font-bold font-heading">
                        {post ? 'Edit Chronicle' : 'New Chronicle'}
                    </h1>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Publish'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-8">
                    <Input
                        placeholder="Enter Chronicle Title..."
                        className="text-5xl font-bold font-heading border-b-2 border-border/10 px-0 h-auto focus-visible:ring-0 focus-visible:border-amber-500 placeholder:text-foreground/20 bg-transparent text-white drop-shadow-sm rounded-none transition-all duration-300"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (!post) {
                                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                            }
                        }}
                    />

                    <div className="relative min-h-[350px] border border-white/10 rounded-xl bg-zinc-950/50 backdrop-blur-md p-1 shadow-2xl transition-all duration-500 focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/20">
                        {editor && (
                            <>
                                {/* Bubble Menu - Floating Format Toolbar */}
                                <BubbleMenu editor={editor} className="flex overflow-hidden rounded-md border border-amber-500/20 bg-zinc-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-amber-500/10">
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('bold') ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <Bold className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('italic') ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <Italic className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('heading', { level: 2 }) ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <Heading2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={setLink} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('link') ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <LinkIcon className="w-4 h-4" />
                                    </Button>
                                </BubbleMenu>

                                {/* Floating Menu - Plus Button for Blocks */}
                                <FloatingMenu editor={editor} className="flex overflow-hidden rounded-md border border-amber-500/20 bg-zinc-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-amber-500/10">
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('heading', { level: 1 }) ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <Heading1 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('bulletList') ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <List className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={addImage} className="h-8 w-8 p-0 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/20">
                                        <ImageIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={addYoutube} className="h-8 w-8 p-0 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/20">
                                        <Video className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`h-8 w-8 p-0 hover:bg-amber-500/20 hover:text-amber-500 ${editor.isActive('blockquote') ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400'}`}>
                                        <Quote className="w-4 h-4" />
                                    </Button>
                                </FloatingMenu>
                            </>
                        )}
                        <EditorContent editor={editor} className="min-h-[350px] outline-none" />
                    </div>
                </div>

                {/* Sidebar Metadata */}
                <div className="space-y-6 lg:sticky lg:top-32 h-fit">
                    <div className="bg-card/30 border border-white/10 rounded-xl p-6 space-y-6 backdrop-blur-md shadow-xl">
                        <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                            <span className="w-1 h-4 bg-amber-500 rounded-full" /> Metadata
                        </h3>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Slug</label>
                            <Input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="font-mono text-sm bg-black/20 border-white/10 focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500/50 transition-all placeholder:text-muted-foreground/30"
                                placeholder="post-url-slug"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Excerpt</label>
                            <Textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                className="resize-none h-32 bg-black/20 border-white/10 focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500/50 transition-all placeholder:text-muted-foreground/30"
                                placeholder="Brief summary for cards..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Cover Image</label>
                            <div className="flex gap-2">
                                <Input
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    placeholder="https://..."
                                    className="bg-black/20 border-white/10 focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500/50 transition-all placeholder:text-muted-foreground/30"
                                />
                            </div>
                            {coverImage && (
                                <div className="mt-2 aspect-video rounded-md overflow-hidden border border-white/10 bg-black/40 shadow-inner">
                                    <img src={coverImage} alt="Preview" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Read Time</label>
                                <Input
                                    value={readTime}
                                    onChange={(e) => setReadTime(e.target.value)}
                                    className="bg-black/20 border-white/10 focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500/50 transition-all placeholder:text-muted-foreground/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Tags</label>
                                <Input
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Tech,Art"
                                    className="bg-black/20 border-white/10 focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:border-amber-500/50 transition-all placeholder:text-muted-foreground/30"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
