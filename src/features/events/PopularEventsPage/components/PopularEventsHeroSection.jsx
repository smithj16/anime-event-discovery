import { AnimatePresence, motion } from "framer-motion";
import { popularEventsData } from "anime-event-discovery/src/utils/popularEventsData";
import { useState,useEffect } from "react";

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleSlideChange = (index) => {
      setCurrentIndex(index);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % popularEventsData.length
        );
      }, 5000); // Change slide every 5 seconds
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          {popularEventsData.map((slide, index) => (
            <AnimatePresence key={index} mode="wait">
              {currentIndex === index && (
                <motion.div
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.images.card})` }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  key={index}
                />
              )}
            </AnimatePresence>
          ))}
        </div>
  
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={popularEventsData[currentIndex].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="bg-slate-900/60 py-10"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-galactic-primary">
                {popularEventsData[currentIndex].name}
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-galactic-secondary">
                {popularEventsData[currentIndex].description}
              </p>
              <button
                href={popularEventsData[currentIndex].website}
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
              >
                Visit Website
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
  
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {popularEventsData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  

  export default HeroSection