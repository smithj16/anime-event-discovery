// CharacterWithMessage.jsx
import { AnimatePresence, motion } from "framer-motion";
import DotExpandButton from "./DotExpandButton";
import CloseButton from "./CloseButton";

const CharacterWithMessage = ({ imageSrc, event, onClose }) => {
  if (!event) return (<div className="py-14 text-3xl md:text-5xl text-galactic-background">click on a event</div>);

  const characterVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="relative flex justify-between p-6 bg-slate-800 border border-gray-300 rounded-lg shadow-lg max-w-lg">
      <motion.div 
      className="absolute right-3 top-3"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={buttonVariants}
      transition={{ duration: 0.5 }}
      >
        <CloseButton onClick={onClose}/>
      </motion.div>
      {/* Message Section (Takes up most space) */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={messageVariants}
        transition={{ duration: 0.5 }}
        className="w-2/3"
      >
        <h3 className="font-extrabold text-2xl font-[Special-Elite] text-galactic-primary">
          {event.name}
        </h3>
        <p className="mt-2 font-bold text-sm tracking-wider text-galactic-secondary font-[Poppins]">
          {event.description}
        </p>
        <div className=" mt-4">
          <DotExpandButton text="More" onClick={onClose} />
        </div>
      </motion.div>

      {/* Character Section (Smaller) */}
      <motion.img
        src={imageSrc}
        alt="Anime Character"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={characterVariants}
        transition={{ duration: 0.5 }}
        className="w-1/3 h-auto object-contain"
      />
    </div>
  );
};

export default CharacterWithMessage;
