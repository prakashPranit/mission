import { PostEditor } from "@/components/editor/PostEditor";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;
    const post = await db.post.findUnique({
        where: { id: parseInt(id) },
    });

    if (!post) {
        notFound();
    }

    // Convert nulls to undefined or empty strings if needed by the component, 
    // though Prisma returns null and component expects string | null for coverImage.
    // We pass it directly.

    return (
        <div className="container mx-auto px-6">
            <PostEditor post={post} />
        </div>
    );
}
