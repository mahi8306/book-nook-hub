import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { Bestsellers } from "@/components/home/Bestsellers";
import { GenreSection } from "@/components/home/GenreSection";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedBooks />
      <Bestsellers />
      <GenreSection />
      <Newsletter />
    </Layout>
  );
};

export default Index;
