"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Types ---
export type PostData = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string;
    readTime: string;
    published?: boolean;
    featured?: boolean;
};

// --- Actions ---

export async function createPost(data: PostData) {
    await db.post.create({
        data: {
            ...data,
            published: true, // Auto-publish for simplicity in V1
        },
    });
    revalidatePath("/blog");
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function updatePost(id: number, data: PostData) {
    await db.post.update({
        where: { id },
        data,
    });
    revalidatePath("/blog");
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function deletePost(id: number) {
    await db.post.delete({
        where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/dashboard");
}

export async function seedPosts() {
    const mockPosts = [
        {
            slug: "architecture-of-consciousness",
            title: "The Architecture of Consciousness: Distributed Systems in Nature",
            excerpt: "How modern distributed computing patterns mirror ancient Vedic concepts of the universal mind. A deep dive into fractals, recursion, and the Atman-Brahman duality.",
            content: `
                <h2>The Cosmic Network</h2>
                <p>In the realm of computer science, we often pride ourselves on the invention of distributed systems—networks of independent nodes communicating to achieve a common goal, resilient to failure and capable of immense parallel processing. Yet, looking at the biological and metaphysical structures described in ancient texts, one begins to wonder if we are merely rediscovering an architecture that has existed for eons.</p>
                <p>The <strong>Rg Veda</strong> speaks of <em>Indra's Net</em>, an infinite web of jewels where each jewel reflects all others. This is not unlike a peer-to-peer network where the state of the system is holographically distributed. If a single node goes down, the truth of the system remains intact in the collective.</p>
                
                <h2>Recursion and Fractals</h2>
                <p>Nature loves recursion. From the branching of trees to the firing of neurons, the pattern repeats at every scale. In code, we write:</p>
                <pre><code>def fibrous_growth(n):
    if n == 0: return
    draw_branch(n)
    fibrous_growth(n-1)</code></pre>
                <p>This simple logic creates complex beauty. Similarly, the concept of <em>Atman</em> (the individual self) being identical to <em>Brahman</em> (the universal reality) suggests a fractal universe. We are not just parts of the whole; we are the whole, instantiated in a localized context. This architectural pattern—the microcosm reflecting the macrocosm—is the ultimate optimization for information storage.</p>

                <blockquote>"You are the universe experiencing itself." — Alan Watts</blockquote>

                <h2>Latency and the Illusion of Time</h2>
                <p>In distributed systems, latency is the delay between cause and effect across nodes. In consciousness, is 'time' merely the latency of perception processing? When we meditate, we often aim to reduce this operational latency, bringing the observer closer to the event, until the gap dissolves entirely. That state of zero-latency perception? That is the <em>Now</em>.</p>
            `,
            published: true,
            readTime: "8 min read",
            tags: "Jnana,Science,Philosophy",
            coverImage: "/images/blog-consciousness.png"
        },
        {
            slug: "rust-embedded-paradigm",
            title: "Rust for Embedded Systems: A Paradigm Shift in Hardware",
            excerpt: "Memory safety without garbage collection. Why Rust is becoming the standard for critical infrastructure and IoT devices.",
            content: `
                <h2>The C/C++ Dynasty</h2>
                <p>For decades, C and C++ have ruled the embedded world. They offered precise control over hardware, but at a steep cost: memory safety. Buffer overflows, dangling pointers, and data races were the specters that haunted every firmware engineer. We accepted these risks as the price of performance.</p>
                
                <h2>Enter the Crab</h2>
                <p><strong>Rust</strong> changes the equation. By enforcing memory safety at compile-time through its ownership model, it eliminates entire classes of bugs before the code ever runs on silicon. No garbage collector means deterministic performance—crucial for real-time systems where a 10ms pause can mean a crashed drone or a failed medical device.</p>
                
                <h2>The Borrow Checker</h2>
                <p>The borrow checker is often seen as the enemy of new Rustaceans, but it is actually the sternest, most distinct mentor you will ever have. It forces you to think about object lifecycles correctly.</p>
                <ul>
                    <li><strong>Ownership:</strong> Each value has a variable that’s its owner.</li>
                    <li><strong>Borrowing:</strong> You can have multiple immutable references or one mutable reference, but not both.</li>
                </ul>
                <p>This simple rule prevents data races. In a multi-core embedded environment, this is a superpower. You can write concurrent code without fear.</p>
                
                <h2>The Future is Safe</h2>
                <p>With major adoption in the Linux kernel and support from industry giants, Rust is not just a trend. It is the necessary evolution of systems programming. We are moving from an era of "move fast and break things" to "move fast and verify everything".</p>
            `,
            published: true,
            readTime: "6 min read",
            tags: "Techne,Engineering",
            coverImage: "/images/blog-rust.png"
        },
        {
            slug: "geopolitics-semiconductors",
            title: "The Geopolitics of Semiconductors: Silicon Sovereignty",
            excerpt: "Analyzing the global supply chain, the CHIPS act, and the strategic importance of nanometers in modern warfare.",
            content: `
                <h2>The New Oil</h2>
                <p>Data is the new oil, they say. But if data is oil, then semiconductors are the internal combustion engine. Without them, the modern world halts. From the F-35 fighter jet to your toaster, silicon chips are the bedrock of civilization.</p>
                
                <h2>The Choke Points</h2>
                <p>The global supply chain for advanced experimentation is incredibly fragile. It relies on a few key players:</p>
                <ol>
                    <li><strong>Design:</strong> USA (NVIDIA, Apple, AMD)</li>
                    <li><strong>Lithography:</strong> Netherlands (ASML) - The sole provider of EUV machines.</li>
                    <li><strong>Manufacturing:</strong> Taiwan (TSMC) - Producing over 90% of the world's most advanced chips.</li>
                </ol>
                <p>This concentration of power creates a massive geopolitical bottleneck. The "Silicon Shield" protecting Taiwan is also a target.</p>
                
                <h2>The Nano-War</h2>
                <p>We are currently fighting a war measured in nanometers. The drop from 5nm to 3nm is not just a technical achievement; it is a strategic dominance. The nation that controls the most advanced compute controls the future of AI. And the nation that controls AI, controls the economic and military destiny of the 21st century.</p>
                <p>The CHIPS Act and similar initiatives in Europe and China are frantic attempts to achieve "Silicon Sovereignty"—the ability to sustain one's own technological infrastructure without reliance on potential adversaries.</p>
            `,
            published: true,
            readTime: "12 min read",
            tags: "Jnana,Polity",
            coverImage: "/images/blog-semiconductors.png"
        },
        {
            slug: "silent-observer",
            title: "The Silent Observer: Vipassana for Engineers",
            excerpt: "Debugging the mind. How meditation practices can enhance cognitive load management and problem-solving skills.",
            content: `
                <h2>The Stack Overflow of the Mind</h2>
                <p>As engineers, we deal with complex systems, constant context switching, and high cognitive load. Our minds are often like a browser with 500 tabs open—leaking memory, sluggish, and prone to crashing.</p>
                
                <h2>Vipassana: The Debugger</h2>
                <p><strong>Vipassana</strong>, which means "to see things as they really are," is essentially a debugging tool for consciousness. It doesn't ask you to chant or visualize; it asks you to <em>observe</em>. You monitor the raw input/output of your sensations without reacting.</p>
                
                <h2>The Algorithmic Loop</h2>
                <p>Our brains run a simple, often destructive loop:</p>
                <pre><code>while(alive):
    sensation = detect_input()
    if sensation == PLEASANT:
        crave(sensation)  // Infinite loop of wanting more
    elif sensation == UNPLEASANT:
        avert(sensation)  // Infinite loop of avoiding pain</code></pre>
                <p>This reactivity prevents deep focus. By practicing equanimity—observing the sensation without running the <code>crave()</code> or <code>avert()</code> functions—we break the loop. We free up CPU cycles.</p>
                
                <h2>Refactoring the Self</h2>
                <p>Regular practice leads to a refactored mind. You become less reactive to critical bugs, tighter deadlines, or production outages. You become the <strong>Silent Observer</strong>—the root user of your own system, capable of acting with clarity rather than reacting with panic.</p>
            `,
            published: true,
            readTime: "5 min read",
            tags: "Atman,Self-Dev",
            coverImage: "/images/blog-silent-observer.png"
        }
    ];

    for (const post of mockPosts) {
        await db.post.upsert({
            where: { slug: post.slug },
            update: post, // Overwrite with new content
            create: post
        });
    }
}
