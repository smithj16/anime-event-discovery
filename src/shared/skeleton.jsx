import React from 'react';
import { motion } from 'framer-motion';


const Skeleton = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <motion.div
      className={`bg-gray-300 rounded-md ${width} ${height} ${className} animate-pulse`}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 0.4 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.8
      }}
    />
  );
};

export default Skeleton;
