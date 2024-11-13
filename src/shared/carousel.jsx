// Carousel.js
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Carousel = ({ children }) => {

  return (
    <div className="overflow-hidden">
      <motion.div
        
        className="flex cursor-grab gap-6"
       
      >
      
        {children}
      </motion.div>
    </div>
  );
};

export default Carousel;
