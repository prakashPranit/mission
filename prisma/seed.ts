
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    const posts = [
        {
            title: 'The Art of Digital Mandapa',
            slug: 'art-of-digital-mandapa',
            excerpt: 'Exploring the fusion of tradition and technology in modern architecture.',
            content: '<p>This is a sample post about the Digital Mandapa project. It combines traditional architectural concepts with digital interfaces.</p>',
            tags: 'Architecture,Digital,Tradition',
            readTime: '3 min read',
            published: true,
            featured: true,
            coverImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop'
        },
        {
            title: 'Building with Next.js and Prisma',
            slug: 'building-with-nextjs-prisma',
            excerpt: 'A technical deep dive into the stack powering this platform.',
            content: '<p>Next.js and Prisma provide a powerful combination for building full-stack applications with type safety and performance.</p>',
            tags: 'Tech,Next.js,Prisma',
            readTime: '5 min read',
            published: true,
            featured: false,
        },
        {
            title: 'Future of Digital Spaces',
            slug: 'future-of-digital-spaces',
            excerpt: 'What does the future hold for online community spaces?',
            content: '<p>As we move towards more immersive web experiences, the concept of a digital "place" becomes increasingly important.</p>',
            tags: 'Future,Web,Community',
            readTime: '4 min read',
            published: false,
            featured: false,
        }
    ]

    for (const p of posts) {
        const post = await prisma.post.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        })
        console.log(`Created post with id: ${post.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
