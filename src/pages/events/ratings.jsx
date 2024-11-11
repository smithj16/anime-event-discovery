import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import VerticalTabs from "@/components/shared/sidebarNav";
import HorizontalBar from "@/components/shared/horizontalBar";
import MobileBar from "@/components/shared/mobileBar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { popularEventsCardData } from "@/utils/popularEventsData";
import { FaStar, FaFire, FaCalendarAlt } from "react-icons/fa";


const Header = () => {
  const backgroundImage = "/images/heroImage6.jpg";
  return (
    <div className="relative">
      <div
        className="bg-cover bg-no-repeat h-[30vh] md:h-[40vh] "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* NavBar with Dropdown */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <NavBar />
        </div>

        {/* Header Text */}
        <div className="flex justify-center items-end pb-8 h-full bg-black/40">
          <h1 className="text-center text-6xl lg:text-9xl text-galactic-secondary font-[Poppins-bold]">
            Events
          </h1>
        </div>
      </div>
    </div>
  );
};

const renderEventCard = (event, cardSize) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={event._id}
      className="bg-galactic-lightGray rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        {/* Image with overlay */}
        <Image
          src={event.images.card}
          width={1000}
          height={1000}
          alt={event.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-2 left-2">
          <h3 className="text-lg font-bold text-white">{event.name}</h3>
          <p className="text-sm text-gray-200">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-galactic-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
          <FaStar className="mr-1" /> {event.rating}
        </div>
      </div>
      <div className="p-4">
        <p className="text-galactic-text text-sm mb-2">
          {event.description.slice(0, 80)}...
        </p>
        <div className="flex items-center justify-between">
          {/* Attendees */}
          <div className="flex items-center text-galactic-secondary text-sm">
            <FaCalendarAlt className="mr-1" />{" "}
            {event.attendees.toLocaleString()} attendees
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="text-galactic-accent hover:text-galactic-primary">
              <svg /* Like Icon SVG */ className="h-5 w-5" />
            </button>
            <button className="text-galactic-accent hover:text-galactic-primary">
              <svg /* Share Icon SVG */ className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const renderSection = (title, icon, description, events, isMobile) => {

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-galactic-primary flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </h2>
          <p className="text-galactic-text mt-1">{description}</p>
        </div>
        <a href="#" className="text-galactic-accent hover:underline">
          See All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => renderEventCard(event))}
      </div>
    </div>
  );
};

const EventsRatingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const menuItems = [
    { name: "Events", href: "/events" },
    { name: "Search Events", href: "/events/searchEvents" },
    { name: "Upcoming Events", href: "/events/upcomingEvents" },
    { name: "Popular Events", href: "/events/popularEvents" },
    { name: "Event Ratings", href: "/events/ratings" },
    { name: "Whats New ", href: "/events/whatsNew" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server-side, avoiding hydration mismatch
    return null;
  }

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
    <div className="flex flex-col">
      <Header />
      <main>
        <div className="flex flex-col lg:flex-row  bg-slate-900">
          {isMobile ? (
            <MobileBar menuItems={menuItems} />
          ) : isTablet ? (
            <HorizontalBar menuItems={menuItems} />
          ) : (
            <VerticalTabs menuItems={menuItems} />
          )}
          <div className="w-full  p-8">
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsRatingPage;
