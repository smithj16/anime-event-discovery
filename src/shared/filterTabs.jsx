// FilterTabs.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FilterTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allCategories = ["All", ...categories];
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-4 w-44" ref={dropdownRef}>
      {/* Dropdown Button */}

      <button
        className="w-full px-4 py-2 font-bold tracking-wider border-2 border-galactic-darkGray text-galactic-deepElectricPurple bg-galactic-accent text-left flex justify-between items-center rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedCategory || "Select Category"}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full bg-gray-700 border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-auto"
          >
            {allCategories.map((category) => (
              <li key={category}>
                <button
                  className={`w-full text-left text-galactic-secondary px-4 py-2 duration-150 hover:bg-purple-600 hover:text-white focus:outline-none ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    onSelectCategory(category);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedCategory === category}
                >
                  {category}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterTabs;
