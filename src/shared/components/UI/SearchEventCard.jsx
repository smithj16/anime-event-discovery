/// EventCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FcLike, FcRatings, FcBarChart } from "react-icons/fc";
import Image from "next/image";

const SearchEventCard = ({ event }) => {
  const {
    name,
    date,
    location,
    description,
    website_url,
    images,
    categories,
    likes,
    rating,
    attendees,
  } = event;

  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const locationText = `${location.city}, ${location.state}`;

  return (
    <motion.div
      className="relative h-full bg-galactic-darkGray rounded-lg shadow-lg flex flex-col justify-between overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden">
        <Image
          src={images.card}
          alt={name}
          width={400}
          height={400}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-galactic-primary mb-2">{name}</h2>
        <p className="text-galactic-text text-sm">{formattedDate}</p>
        <p className="text-galactic-text text-xs mb-2">{locationText}</p>
        <p className="text-galactic-text text-sm mb-4 flex-grow">{description}</p>

        {/* Icon Bar */}
        <div className="flex justify-between items-center text-galactic-text mb-3">
          <div className="flex items-center space-x-2">
            <FcLike className="w-5 h-5" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FcRatings className="w-5 h-5" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FcBarChart className="w-5 h-5" />
            <span>{attendees}</span>
          </div>
        </div>
      </div>

      {/* Call-to-Action Button */}
      <a
        href={website_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto bg-galactic-primary text-white font-bold py-2 px-4 text-center hover:bg-galactic-accent transition-colors duration-300"
      >
        Learn More
      </a>
    </motion.div>
  );
};

export default SearchEventCard;
