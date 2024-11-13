//EventsRating Page
import { popularEventsCardData } from "@/utils/popularEventsData";
import { FaStar, FaFire, FaCalendarAlt } from "react-icons/fa";
import renderSection from "./components/renderSection";
import EventPageLayout from "../components/EventPageLayout";

const EventsRatingPage = () => {
  // Function to get top 7 events for each category
  const getTopEvents = (events, criteria) => {
    // Create a copy of the events array to avoid mutating the original
    const eventsCopy = [...events];

    switch (criteria) {
      case "topRated":
        return eventsCopy.sort((a, b) => b.rating - a.rating).slice(0, 7);
      case "trending":
        return eventsCopy.sort((a, b) => b.likes - a.likes).slice(0, 7);
      case "new":
        return eventsCopy
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 7);
      default:
        return [];
    }
  };

  const eventData = popularEventsCardData;
  const topRatedEvents = getTopEvents(eventData, "topRated");
  const trendingEvents = getTopEvents(eventData, "trending");
  const newEvents = getTopEvents(eventData, "new");

  return (
    <EventPageLayout styles='p-8'>
     {({isMobile}) => (
        <>
          {/* Top Rated Events Section */}
          {renderSection(
            "Top Rated Events",
            <FaStar className="text-galactic-primary" />,
            "Explore events with the highest ratings from our community.",
            topRatedEvents.filter((event) => event.rating >= 4.7),
            isMobile
          )}

          {/* Trending Rated Events Section */}
          {renderSection(
            "Trending Rated Events",
            <FaFire className="text-red-500" />,
            "Check out events that are gaining popularity rapidly.",
            trendingEvents.filter((event) => event.likes > 1000),
            isMobile
          )}

          {/* New Events Section */}
          {renderSection(
            "New Events",
            <FaCalendarAlt className="text-galactic-secondary" />,
            "Discover the latest events added to our platform.",
            newEvents.sort((a, b) => new Date(b.date) - new Date(a.date)),
            isMobile
          )}
        </>
      )}
    </EventPageLayout>
  );
};

export default EventsRatingPage;
