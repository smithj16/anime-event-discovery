"use-client";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import VerticalTabs from "../../components/shared/sidebarNav";
import MobileBar from "@/components/shared/mobileBar";
import HorizontalBar from "@/components/shared/horizontalBar";
import { Image } from "@/components/shared/image";
import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import { popularEventsData, popularEventsCardData } from "@/utils/popularEventsData";
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";
import Modal from "@/components/shared/eventCardModal";
import formatDate from "@/utils/dateFormatter";

const getRandomHeight = () => {
  const heights = [280, 320, 350, 380, 420]; // Adjusted possible heights to avoid too small cards
  return heights[Math.floor(Math.random() * heights.length)];
};

const batchSize = 10; // Number of events to load per batch

//Header

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
//Hero Section

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % popularEventsData.length
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        {popularEventsData.map((slide, index) => (
          <AnimatePresence key={index} mode="wait">
            {currentIndex === index && (
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.images.card})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                key={index}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={popularEventsData[currentIndex].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="bg-slate-900/60 py-10"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-galactic-primary">
              {popularEventsData[currentIndex].name}
            </h1>
            <p className="mt-4 text-lg md:text-2xl text-galactic-secondary">
              {popularEventsData[currentIndex].description}
            </p>
            <button
              href={popularEventsData[currentIndex].website}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
            >
              Visit Website
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {popularEventsData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

//Popular Event Card Grid Section

const PopularEventsSection = () => {
  const [events, setEvents] = useState(
    popularEventsCardData.slice(0, batchSize)
  );
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [heights, setHeights] = useState([]);

  useEffect(() => {
    const initialHeights = popularEventsCardData.map(() => getRandomHeight());
    setHeights(initialHeights);
  }, []);

  const handleShowMore = () => {
    const newVisibleCount = visibleCount + batchSize;
    setEvents(popularEventsCardData.slice(0, newVisibleCount));
    setVisibleCount(newVisibleCount);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto py-32">
      <h2 className="text-6xl md:text-8xl font-[Special-Elite] text-galactic-primary text-center mb-32">
        Popular Events
      </h2>
      <motion.div
        className="p-2 lg:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        layout
      >
        {events.map((event, index) => {
          const height = heights[index] || 350; // Default height as a fallback
          const showDescription = height >= 350;
          console.log(event);
          const selectedFormat = "format4";
          const formattedDate = formatDate(event.date,selectedFormat)
          return (
            <motion.div
              key={event.id}
              className="overflow-hidden rounded-lg relative bg-galactic-complementaryOrange cursor-pointer"
              style={{ gridRowEnd: `span ${Math.ceil(height / 10)}` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => openModal(event)}
            >
              <Image
                src={event?.images?.card}
                alt={event?.name}
                className="w-full object-cover"
                style={{ height: `${height}px`, maxHeight: "450px" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent text-white"
                style={{
                  minHeight: "120px",
                  padding: "1rem",
                  boxSizing: "border-box",
                }}
              >
                <h3 className="text-lg font-bold">{event?.name}</h3>
                <p className="text-sm mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {formattedDate}
                </p>
                <div className="flex flex-wrap mb-2">
                  {event.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex items-center mb-2">
                  <FaStar className="text-yellow-400 mr-2" />
                  <span>{event.rating}</span>
                  <FaHeart className="text-red-500 ml-4 mr-2" />
                  <span>{event.likes}</span>
                </div>
                {showDescription && (
                  <p className="mt-2 text-sm overflow-hidden text-ellipsis">
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      {visibleCount < popularEventsCardData.length && (
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Show More
          </motion.button>
        </div>
      )}
      {selectedEvent && (
        <Modal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

//Popular Event Page
const PopularEventsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 525px)" });
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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main>
        <div className="flex flex-col lg:flex-row bg-slate-900">
        {isMobile ? (
            <MobileBar menuItems={menuItems} />
          ) : isTablet ? (
            <HorizontalBar menuItems={menuItems} />
          ) : (
            <VerticalTabs menuItems={menuItems} />
          )}
          <div className="w-full bg-galactic-complementaryYellow">
            <HeroSection />
            <PopularEventsSection events={popularEventsCardData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PopularEventsPage;
