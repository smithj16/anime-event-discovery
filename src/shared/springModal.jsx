import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";

const SpringModal = ({ isOpen, setIsOpen, data, buttonText }) => {

    const IconComponent = data?.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-2 md:p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-12 h-12 md:w-16 md:h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <IconComponent />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">
                {data.title}
              </h3>
              <p className="text-sm md:text-base text-center mb-6">
                {data.modalDescription}
              </p>
              <div className="w-2/3 md:w-1/3 mx-auto">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-sm  hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  {buttonText}
                </button>
              </div>
             
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;