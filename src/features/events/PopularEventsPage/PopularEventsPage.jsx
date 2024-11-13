//Popular Event Page
import PopularEventsSection from "./components/PopularEventsCardSection";
import HeroSection from "./components/PopularEventsHeroSection";
import { popularEventsCardData } from "@/utils/popularEventsData";
import EventPageLayout from "../components/EventPageLayout";

const PopularEventsPage = () => {
  return (
    <EventPageLayout styles="bg-galactic-complementaryYellow">
      <HeroSection />
      <PopularEventsSection events={popularEventsCardData} />
    </EventPageLayout>
  );
};

export default PopularEventsPage;
