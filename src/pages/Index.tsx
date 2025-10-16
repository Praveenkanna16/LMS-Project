import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { Features } from "@/components/Features";
import { LearningPaths } from "@/components/LearningPaths";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <Features />
      <LearningPaths />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
