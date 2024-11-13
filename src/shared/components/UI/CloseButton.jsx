import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa'; 
import { useState } from 'react';

const CloseButton = ({onClick}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className={`relative p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full text-white shadow-lg`}
      onClick={onClick}
      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Close Icon */}
      <FaTimes size={14} />

      {/* Dynamic Anime Sparkles */}
      {hovered && (
        <motion.div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.5, 1, 0], scale: [0.5, 1, 1.5] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-yellow-300 rounded-full opacity-50 blur-xl animate-ping"></div>
        </motion.div>
      )}
    </motion.button>
  );
};

export default CloseButton;
