import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import NewsSection from "@/components/NewsSection";
import MediaSection from "@/components/MediaSection";
import AffiliatesSection from "@/components/AffiliatesSection";
import ChampionsSection from "@/components/ChampionsSection";
import TransparencySection from "@/components/TransparencySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <MediaSection />
      <AffiliatesSection />
      <ChampionsSection />
      <TransparencySection />
      <FooterSection />
    </div>
  );
};

export default Index;
