import { motion } from "framer-motion";
import SpringModal from "@/shared/springModal";
import { useState } from "react";
//Tip Card Component

const EventTipCard = ({ tip }) => {
    const [isOpen, setIsOpen] = useState(false);
    const IconComponent = tip.icon;
  
    const handleCardClick = () => {
      setIsOpen(true);
    };
  
    return (
      <>
        <motion.div
          className="flex flex-col max-w-56 gap-4 p-4 bg-galactic-darkGray rounded-lg shadow-lg items-center cursor-pointer"
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={handleCardClick}
        >
          <div className="bg-galactic-accent w-24 h-24 rounded-full flex items-center justify-center mb-3">
            <IconComponent className="w-12 h-12 text-galactic-primary" />
          </div>
          <h5 className="text-galactic-text text-xl tracking-wider font-[Poppins] text-center">
            {tip.title}
          </h5>
          <p className="text-galactic-text text-sm tracking-wider font-[Poppins] text-center">
            {tip.description}
          </p>
        </motion.div>
  
        <SpringModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={tip}
          buttonText="Understood!"
        />
      </>
    );
  };

  export default EventTipCard;