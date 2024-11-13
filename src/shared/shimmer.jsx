
import { motion } from 'framer-motion';

const Shimmer = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-shimmer"></div>
  );
};

export default Shimmer;