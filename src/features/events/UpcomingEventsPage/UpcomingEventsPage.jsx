//UpcomingEventsPage
import FilteredEventsSection from "./components/FilteredEventSection";
import HeroSection from "./components/UpcomingEventsHero";
import FeaturedEventSection from "./components/FeaturedEventSection";
import { popularEventsData } from "@/utils/popularEventsData";
import EventPageLayout from "../components/EventPageLayout";

const UpcomingEventsPage = () => {
  return (
    <EventPageLayout styles='py-10'>
      <div className="px-8">
        <HeroSection />
      </div>
      <FeaturedEventSection />
      <FilteredEventsSection events={popularEventsData} />
    </EventPageLayout>
  );
};

export default UpcomingEventsPage;
