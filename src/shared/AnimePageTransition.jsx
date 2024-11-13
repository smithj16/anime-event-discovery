// components/PageTransition.js
import { motion } from "framer-motion";

const animePageTransitionVariants = {
    initial: {
      opacity: 0,
      y: "100%",
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 1.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

const AnimePageTransition = ({ children }) => {
  return (
    <motion.div
      variants={animePageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimePageTransition;
