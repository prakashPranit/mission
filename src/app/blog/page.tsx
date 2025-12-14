import { BlogClient } from "@/components/blog/BlogClient";
import { db } from "@/lib/db";
import { seedPosts } from "@/app/actions";

export const revalidate = 60; // Revalidate every minute

export default async function BlogListingPage() {

    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    // Extract unique categories from tags
    const allTags = posts.flatMap(p => p.tags.split(',').map(t => t.trim()));
    const uniqueCategories = Array.from(new Set(allTags));

    // Map Prisma Post to Client Post (interface matches mostly, just need to map dates if needed or ensure types align)
    // Prisma createdAt/updatedAt are Dates. Client expects publishedAt as Date.
    // Our schema has published: Boolean, but we can treat createdAt as publishedAt for now.

    const clientPosts = posts.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        coverImage: p.coverImage,
        tags: p.tags,
        readTime: p.readTime,
        publishedAt: p.createdAt // Using createdAt as published date
    }));

    return <BlogClient articles={clientPosts} categories={uniqueCategories} />;
}
