import MissionSection from "./missionSection";
import HeroSection from "./HeroSection/heroSection";
import LatestAnimeNewsSection from "./lastestAnimeSection";
import Footer from "@/components/Footer/Footer";
import PopularEventsSection from "./popularEventsSection";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import HeroSectionTwo from "@/components/shared/heroSection";

//Home Component
const Home = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server-side, avoiding hydration mismatch
    return null;
  }

  return (
    <div className="bg-cosmic-5 flex flex-col">
      <NavBar/>
      <HeroSectionTwo />
      <main>
        <MissionSection />
        <PopularEventsSection />
        <LatestAnimeNewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
