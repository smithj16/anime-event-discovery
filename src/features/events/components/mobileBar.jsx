import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const MobileBar = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) {
    return null; // Return null on server-side render to avoid hydration mismatch
  }

  return (
    <div className="relative z-20">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="p-3 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white focus:outline-none w-full"
      >
        {isOpen ? <div className="duration-200">Close</div> : <div className="duration-200">Menu</div>}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          key="mobile-bar"
          className="absolute top-18 left-0 w-full bg-gradient-to-b from-purple-700 to-purple-900 text-white rounded-md shadow-lg"
        >
          <ul className="flex flex-col items-center p-4 space-y-4">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-lg font-bold font-anime-style hover:text-yellow-400"
                >
                  {/* Anime Styled Icon */}
                  <span className="mr-2">🌸</span>
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default MobileBar;
