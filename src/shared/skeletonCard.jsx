import { motion } from "framer-motion";
import Shimmer from "./shimmer";

const SkeletonCard = ({width = 'w-48', height = '', className = '' }) => {
    return (
      <motion.div 
        className={`relative ${width} ${height} ${className} p-4 bg-gray-300 rounded-lg overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
      >
        {/* Add Shimmer Effect */}
        <Shimmer />
  
        {/* Skeleton Structure */}
        <div className="w-full h-40 bg-gray-300 rounded-md mb-4 relative"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2 relative"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded relative"></div>
      </motion.div>
    );
  };

  export default SkeletonCard;