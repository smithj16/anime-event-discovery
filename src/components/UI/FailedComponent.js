// FailedApiComponent.jsx

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const FailedApiComponent = (error) => {
  error = "error";
  const image = "/images/hawks.png";
  return (
    <div className="flex justify-center">
      <motion.div
        className="max-w-5xl w-full flex flex-col items-center p-8 bg-galactic-lightGray/80 border border-gray-200 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Image
          src={image}
          alt="Error"
          className="mb-6 rounded-full"
          width={100}
          height={32}
        />
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="mb-4 text-center text-gray-600">Sorry this service is down. Reason:{error}</p>
      </motion.div>
    </div>
  );
};
