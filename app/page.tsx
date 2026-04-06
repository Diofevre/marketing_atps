import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import About from "@/components/sections/About";
import Bento from "@/components/sections/Bento";
import BlogSection from "@/components/sections/Blog";
import Faqs from "@/components/sections/Faqs";
import Hero from "@/components/sections/Hero";
import KeyBenefits from "@/components/sections/KeyBenefits";
import Pricing from "@/components/sections/Pricing";
import ProductOverview from "@/components/sections/ProductOverview";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Bento />
      <ProductOverview />
      <About />
      <KeyBenefits />
      <Testimonials />
      <Work />
      <Pricing />
      <Faqs/>
      <BlogSection />
      <Footer />
    </>
  );
};

export default HomePage;