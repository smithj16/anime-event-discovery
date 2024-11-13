//FeaturedEvent Card
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Heart,
    Calendar,
    MapPin,
    Users,
  } from "lucide-react";
  import formatDate from "@/hooks/dateFormatter";
import { useState } from "react";

const FeaturedEventCard = ({ event }) => {
    const date = formatDate(event.date, "format4");
    const toggleFavorite = (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      );
    };
    const [favorites, setFavorites] = useState([]);
  
    return (
      <motion.div
        key={event.id}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={event.images?.card}
          alt={event.name}
          width={400}
          height={400}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            <span>{date.toLocaleString()}</span>
          </div>
          <div className="flex items-center mb-2 font-semibold">
            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
            <span>{`${event.location?.city} ${event.location?.state}`}</span>
          </div>
          <div className="flex items-center mb-2">
            <Users className="w-4 h-4 mr-2 text-purple-400" />
            <span>{event.attendees.toLocaleString()} attendees</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.categories.map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-purple-700 text-white text-xs font-semibold rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => toggleFavorite(event.id)}
              className="flex items-center"
              aria-label={
                favorites.includes(event.id)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`w-5 h-5 mr-1 ${
                  favorites.includes(event.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
              <span>{event.likes.toLocaleString()}</span>
            </button>
            <button
              onClick={() => console.log(event)}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  export default FeaturedEventCard;