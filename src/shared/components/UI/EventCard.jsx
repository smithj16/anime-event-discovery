import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { format, isValid } from "date-fns";

const dateFormats = new Map([
  ["format1", "yyyy-MM-dd HH:mm:ss"], // Full date and time
  ["format2", "MMMM do, yyyy"], // Month day, Year
  ["format3", "dd MMMM yyyy"], // Day Month Year
  ["format4", "MM/dd/yyyy"], // Short date
  ["format5", "dd-MM-yyyy HH:mm"], // Day-Month-Year Time
  ["default", "yyyy-MM-dd'T'HH:mm:ssXXX"], // Default ISO format
]);

const formatDate = (isoDateString, formatType = "default") => {
  const date = new Date(isoDateString);

  // Check if the date is valid
  if (!isValid(date)) {
    throw new Error("Invalid date string");
  }

  // Get the format string from the map
  const dateFormat = dateFormats.get(formatType) || dateFormats.get("default");

  // Format the date
  return format(date, dateFormat);
};

export const Card = ({ data }) => {
  const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);
  const [isTagsHovered, setIsTagsHovered] = useState(false);
  const selectedFormat = "format4";

  return (
    <motion.div
      whileHover="hover"
      className="w-[220px] h-[300px] relative border-2 rounded-badge"
    >
      <div className="h-[50%] p-4 flex flex-col justify-center bg-galactic-primary/80 rounded-b-badge w-full absolute bottom-0 text-galactic-text space-y-3">
        <h3 className="text-xl font-semibold text-white text-center">
          {data.name}
        </h3>
        <div className="flex justify-around items-center">
          <span>{formatDate(data.date, selectedFormat)}</span>
          <span className="border-r-2 border-slate-400 h-full mx-2"></span>
          <span
            className="font-semibold hover:cursor-pointer"
            onMouseEnter={() => setIsTagsHovered(true)}
            onMouseLeave={() => setIsTagsHovered(false)}
          >
            Reviews
          </span>
        </div>
        <p
          className="text-lg font-semibold text-center text-slate-300 hover:cursor-pointer mt-2"
          onMouseEnter={() => setIsDescriptionHovered(true)}
          onMouseLeave={() => setIsDescriptionHovered(false)}
        >
          Description
        </p>
      </div>

      <motion.div
        initial={{
          bottom: "0%",
          right: "0%",
        }}
        variants={{
          hover: {
            bottom: "50%",
            right: "50%",
          },
        }}
        className="absolute inset-0 bg-slate-200 z-10 rounded-badge"
        style={{
          backgroundImage: `url(${data.images.card})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <a
        href="#"
        rel="nofollow"
        className="w-1/2 h-1/2 absolute top-0 right-0 grid place-content-center bg-white rounded-tr-badge text-black hover:text-indigo-500 transition-colors"
      >
        <div className="flex items-center">
          <span className="text-xs">MORE</span>
          <FiArrowUpRight className="text-lg" />
        </div>
      </a>
      {isDescriptionHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-12 z-30 left-[2%] transform -translate-x-1/2 bg-galactic-secondary text-white text-xs md:text-sm p-2 rounded-md  w-max max-w-[200px] md:max-w-xs"
        >
          {data.description}
        </motion.div>
      )}
      {isTagsHovered && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-12 left-[2%] transform -translate-x-1/2 bg-galactic-secondary text-white text-xs md:text-sm p-2 rounded-md z-20 w-max max-w-[200px] md:max-w-xs"
        >
          <ul>
            {data.categories.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};
