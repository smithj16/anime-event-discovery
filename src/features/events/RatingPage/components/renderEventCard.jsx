import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";


const renderEventCard = (event) => {
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

  export default renderEventCard;