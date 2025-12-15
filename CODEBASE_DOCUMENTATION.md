# Digital Mandapa - Codebase Documentation

## Project Overview

**Digital Mandapa** is a full-stack web application that combines blog/portfolio functionality with a philosophical theme around ancient wisdom and modern technology. The name "Mandapa" refers to traditional Indian architectural pavilions for discourse and learning.

## Technology Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Shadcn/ui components
- **Rich Text Editor**: Tiptap with extensive extensions
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Docker containerization

## Directory Structure

```
digital-mandapa/
├── prisma/                    # Database layer
│   ├── schema.prisma         # Database schema definition
│   ├── seed.ts              # Database seeding script
│   ├── migrations/          # Database migration files
│   └── dev.db              # SQLite development database
├── public/                   # Static assets
│   └── images/             # Blog post cover images
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── blog/          # Blog listing and detail pages
│   │   ├── contact/       # Contact page
│   │   ├── dashboard/     # Admin dashboard for content management
│   │   ├── portfolio/     # Portfolio showcase
│   │   ├── actions.ts     # Server actions for CRUD operations
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles and design tokens
│   ├── components/        # Reusable React components
│   │   ├── blog/         # Blog-specific components
│   │   ├── editor/       # Rich text editor components
│   │   ├── layout/       # Navigation and footer
│   │   ├── sections/     # Landing page sections
│   │   └── ui/           # Shadcn/ui components
│   └── lib/              # Utility libraries
│       ├── db.ts        # Prisma client singleton
│       ├── strapi.ts    # Strapi CMS integration (unused)
│       └── utils.ts     # Utility functions
```

## Database Schema

### Post Model
```typescript
model Post {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   // HTML from Tiptap editor
  coverImage  String?
  tags        String   // Comma-separated tags
  readTime    String   @default("5 min read")
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Database Configuration**:
- PostgreSQL for production
- SQLite for development
- Prisma client singleton pattern for connection management

## Key Components

### Layout Components
- **Navbar** (`src/components/layout/Navbar.tsx`): Fixed navigation with mobile menu, featuring animated mandala logo
- **Footer** (`src/components/layout/Footer.tsx`): Three-column layout with navigation, branding, and social links

### Page Sections (Home page)
- **Hero** (`src/components/sections/Hero.tsx`): Full-screen hero with parallax effects and mandala animations
- **ModernAbout** (`src/components/sections/ModernAbout.tsx`): Service showcase with technical domains
- **FeaturedCarousel** (`src/components/sections/FeaturedCarousel.tsx`): Featured blog posts carousel
- **ArticleCategories** (`src/components/sections/ArticleCategories.tsx`): Blog category filtering
- **LatestThoughts** (`src/components/sections/LatestThoughts.tsx`): Recent blog posts grid

### Core Functionality
- **PostEditor** (`src/components/editor/PostEditor.tsx`): Advanced rich text editor with Tiptap, supporting images, videos, links
- **BlogClient** (`src/components/blog/BlogClient.tsx`): Client-side blog listing with search and category filtering
- **Dashboard** (`src/app/dashboard/page.tsx`): Admin interface for managing posts with statistics

## API Routes and Server Actions

### Server Actions (`src/app/actions.ts`)
- `createPost(data: PostData)`: Create new blog post
- `updatePost(id: number, data: PostData)`: Update existing post
- `deletePost(id: number)`: Delete post
- `seedPosts()`: Populate database with sample content

### Page Routes
- `/`: Home page with hero and content sections
- `/blog`: Blog listing with filtering
- `/blog/[slug]`: Individual blog post
- `/dashboard`: Admin dashboard
- `/dashboard/new`: Create new post
- `/dashboard/[id]`: Edit existing post
- `/portfolio`: Portfolio showcase
- `/contact`: Contact page

## Configuration Files

### Next.js Configuration (`next.config.ts`)
- Standalone output for Docker deployment
- Environment variable validation for production

### TypeScript Configuration (`tsconfig.json`)
- Strict mode enabled
- Path aliases (`@/*` → `./src/*`)
- Modern ES2017 target

### Tailwind Configuration (in `src/app/globals.css`)
- Custom design system with dark theme
- Vedic-inspired color palette (saffron/orange primary)
- Custom CSS variables for theming
- Typography plugin for rich text content

### Shadcn/ui Configuration (`components.json`)
- New York style variant
- TypeScript and RSC enabled
- Lucide React icons
- Path aliases configured

## Design System

### Color Palette
- **Primary**: Saffron/Orange (#FF6B35) - Vedic inspiration
- **Background**: Dark obsidian (#0A0A0A)
- **Surface**: Slate gray variations
- **Text**: White and gray variations

### Typography
- **Headings**: Cinzel (serif, classical feel)
- **Body**: Cormorant Garamond (elegant serif)
- **UI**: Inter (modern sans-serif)

### Design Philosophy
- **Vedic Modernism**: Fusion of ancient Indian architectural concepts with modern digital aesthetics
- **Dark Theme**: Obsidian-inspired with saffron accents
- **Minimalist**: Clean layouts with purposeful animations

## Deployment

### Docker Configuration
- Multi-stage build for optimization
- Node.js 20 Alpine base image
- Prisma generation during build
- Standalone output for minimal runtime
- Non-root user for security

### Deployment Options
1. **Vercel**: Primary deployment platform with automatic builds
2. **Docker/EC2**: Self-hosted option with full control
3. **Local Development**: SQLite with hot reloading

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct database connection for migrations
- `NEXT_PUBLIC_STRAPI_API_URL`: Strapi CMS integration (currently unused)

## Development Patterns

### Code Patterns
- **Server Components**: Leverages Next.js App Router for server-side rendering
- **Server Actions**: Type-safe database operations without API routes
- **Component Composition**: Modular, reusable components with clear separation of concerns
- **Error Handling**: Toast notifications with user-friendly error messages

### Performance Optimizations
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Automatic with App Router
- **Database Connection**: Prisma singleton pattern
- **Static Generation**: Where applicable for blog content

### Content Management
- **Rich Text Editing**: Advanced Tiptap editor with bubble/floating menus
- **Auto-seeding**: Development database automatically populated with sample content
- **Slug Generation**: Automatic URL-friendly slug creation from titles

## Notable Features

### Rich Text Editor
- Tiptap-based with extensive extensions
- Support for images, videos, links, formatting
- Bubble and floating menus for better UX
- Auto-save functionality

### Animations
- Framer Motion for smooth transitions
- Parallax effects on hero section
- Mandala SVG animations
- Hover states and micro-interactions

### Responsive Design
- Mobile-first approach
- Hamburger menu for navigation
- Responsive grid layouts
- Touch-friendly interactions

## Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run migrations
npx prisma studio    # Open Prisma Studio
npx prisma db seed   # Seed database
```

### Deployment
```bash
docker build -t digital-mandapa .
docker run -p 3000:3000 digital-mandapa
```

## Future Considerations

### Potential Enhancements
- Comments system for blog posts
- Search functionality with Algolia
- Newsletter subscription
- RSS feed for blog
- Image optimization CDN
- Analytics integration

### Technical Debt
- Migrate from Strapi.ts to fully integrated CMS
- Add error boundaries
- Implement caching strategy
- Add comprehensive testing
- Performance monitoring

## Security Notes

- Input sanitization in rich text editor
- SQL injection prevention via Prisma
- Environment variable protection
- CSRF protection via Next.js
- Secure headers configuration

---

*This documentation serves as a comprehensive reference for the Digital Mandapa codebase, covering all aspects of the application from architecture to deployment.*