import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ValueProposition from "@/components/home/ValueProposition";
import Bestsellers from "@/components/home/Bestsellers";
import ProductCategories from "@/components/home/ProductCategories";
import ProcessSteps from "@/components/home/ProcessSteps";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <Bestsellers />
        <ProductCategories />
        <ProcessSteps />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
