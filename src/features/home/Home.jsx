import MissionSection from "../../features/home/MissionSection/missionSection";
import LatestAnimeNewsSection from "./LastestAnimeNewsSection/lastestAnimeSection";
import Footer from "@/shared/components/Footer/Footer";
import PopularEventsSection from "../../features/home/PopularEventsSection/popularEventsSection";
import NavBar from "@/shared/components/NavBar/NavBar";
import HeroSection from "@/features/home/HeroSection/heroSection";

const Home = ({ upcomingEventsData, popularEventsData }) => {
  return (
    <div className="bg-cosmic-5 flex flex-col">
      <NavBar />
      <HeroSection upcomingEventsData={upcomingEventsData} />
      <MissionSection />
      <PopularEventsSection popularEventsData={popularEventsData} />
      <LatestAnimeNewsSection />
      <Footer />
    </div>
  );
};

export default Home;
