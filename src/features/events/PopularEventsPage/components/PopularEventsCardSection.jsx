//Popular Event Card Grid Section
import Image from "next/image";
import Modal from "@/shared/eventCardModal";
import { motion } from "framer-motion";
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa";
import { popularEventsCardData } from "@/utils/popularEventsData";
import { useState,useEffect } from "react";
import formatDate from "@/hooks/dateFormatter";

const getRandomHeight = () => {
  const heights = [280, 320, 350, 380, 420]; // Adjusted possible heights to avoid too small cards
  return heights[Math.floor(Math.random() * heights.length)];
};

const batchSize = 10;

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
          const formattedDate = formatDate(event.date, selectedFormat);
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
                width={1000}
                height={1000}
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

export default PopularEventsSection;
