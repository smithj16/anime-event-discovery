import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "./image";
import { FaStar, FaHeart, FaCalendarAlt, FaTimes } from "react-icons/fa";
import formatDate from "@/hooks/dateFormatter";

const Modal = ({ event, isOpen, onClose }) => {
  const selectedFormat = "format4";
  const formattedDate = formatDate(event.date, selectedFormat);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-3xl mx-4 md:mx-0"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          >
            <FaTimes size={24} />
          </button>
          <Image
            src={event?.images?.card}
            alt={event?.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{event?.name}</h2>
          <p className="text-sm mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" />
            {formattedDate} - `{event?.location?.street}  {event?.location?.city}`
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
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400 mr-2" />
            <span>{event.rating}</span>
            <FaHeart className="text-red-500 ml-4 mr-2" />
            <span>{event.likes}</span>
          </div>
          <p className="text-gray-700">{event.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
