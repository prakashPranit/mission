import { Hero } from "@/components/sections/Hero";
import { ModernAbout } from "@/components/sections/ModernAbout";
import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";
import { LatestThoughts } from "@/components/sections/LatestThoughts";
import { ArticleCategories } from "@/components/sections/ArticleCategories";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <ModernAbout />
      <FeaturedCarousel />
      <ArticleCategories />
      <LatestThoughts />
    </div>
  );
}
