import { Hero } from "@/components/home/Hero";
import { PublishCta } from "@/components/home/PublishCta";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { SeoLinks } from "@/components/home/SeoLinks";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PublishCta />
      <FeaturedListings />
      <SeoLinks />
      <Footer />
    </main>
  );
}
